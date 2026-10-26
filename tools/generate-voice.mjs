#!/usr/bin/env node
// Turns tools/voice-lines.json into mp3 files, once, so the games play a good Hebrew voice
// instead of the browser's. Files land in site/games/<game>/voice/<id>.mp3 with a manifest.json.
//
//   ELEVENLABS_API_KEY=... node tools/generate-voice.mjs            (ElevenLabs, model eleven_v3)
//   CARTESIA_API_KEY=...   node tools/generate-voice.mjs            (Cartesia, model sonic-3, Hebrew voice Ayala)
//   VOICE_PROVIDER=edge    node tools/generate-voice.mjs            (Microsoft neural voice, free, no key:
//                                                                      needs `pip install edge-tts`; voice he-IL-HilaNeural)
//
// Options (environment): VOICE_ID to pick a voice, FORCE=1 to regenerate files that already exist.
// Only lines that are new or changed are generated, so re-running costs nothing.
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto'; import { execFileSync } from 'node:child_process'; import os from 'node:os';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');   // safe with spaces in the path
// keys can also sit in the git-ignored .env.local at the repo root (KEY=value lines); the real environment wins
const envFile = path.join(root, '.env.local');
if (fs.existsSync(envFile)) for (const l of fs.readFileSync(envFile, 'utf8').split('\n')) {
  const m = l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/); if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ''); }
const lines = JSON.parse(fs.readFileSync(path.join(root, 'tools/voice-lines.json'), 'utf8'));
const EL = process.env.ELEVENLABS_API_KEY, CA = process.env.CARTESIA_API_KEY, EDGE = process.env.VOICE_PROVIDER === 'edge';
if (!EL && !CA && !EDGE) { console.error('Set ELEVENLABS_API_KEY or CARTESIA_API_KEY, or VOICE_PROVIDER=edge.'); process.exit(1); }

async function elevenlabs(text) {
  const voice = process.env.VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';   // a warm, clear female voice
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': EL, 'content-type': 'application/json' },
    body: JSON.stringify({ text, model_id: process.env.MODEL_ID || 'eleven_v3' }) });   // eleven_v3 detects Hebrew by itself
  if (!r.ok) throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return Buffer.from(await r.arrayBuffer());
}
async function cartesia(text) {
  const r = await fetch('https://api.cartesia.ai/tts/bytes', {
    method: 'POST', headers: { 'X-API-Key': CA, 'Cartesia-Version': '2025-04-16', 'content-type': 'application/json' },
    body: JSON.stringify({ model_id: process.env.MODEL_ID || 'sonic-3', transcript: text, language: 'he',
      voice: { mode: 'id', id: process.env.VOICE_ID || 'ebc02c0d-61fd-48f2-a6c9-0d6683b7d466' },   // Ayala, an expressive Hebrew narrator,
      output_format: { container: 'mp3', sample_rate: 44100, bit_rate: 128000 } }) });
  if (!r.ok) throw new Error(`Cartesia ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return Buffer.from(await r.arrayBuffer());
}
async function edge(text) {
  const out = path.join(os.tmpdir(), `voice-${process.pid}-${Date.now()}.mp3`);
  execFileSync(process.env.EDGE_TTS_BIN || 'edge-tts', ['--voice', process.env.VOICE_ID || 'he-IL-HilaNeural', '--rate=' + (process.env.VOICE_RATE || '-8%'),
    '--pitch=' + (process.env.VOICE_PITCH || '+6Hz'), '--text', text, '--write-media', out], { stdio: 'pipe' });   // "=": a leading "-" would read as a flag
  const buf = fs.readFileSync(out); fs.unlinkSync(out); return buf;
}
const speak = EDGE ? edge : EL ? elevenlabs : cartesia, provider = EDGE ? 'edge:' + (process.env.VOICE_ID || 'he-IL-HilaNeural') : EL ? 'elevenlabs' : 'cartesia:' + (process.env.MODEL_ID || 'sonic-3');

for (const [game, entries] of Object.entries(lines)) {
  if (game.startsWith('_')) continue;
  const dir = path.join(root, 'site/games', game, 'voice'); fs.mkdirSync(dir, { recursive: true });
  const manPath = path.join(dir, 'manifest.json');
  const man = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, 'utf8')) : { files: {} };
  let made = 0;
  for (const [id, text] of Object.entries(entries)) {
    const hash = crypto.createHash('sha1').update(provider + '|' + text).digest('hex').slice(0, 10);
    const file = `${id}.mp3`, out = path.join(dir, file);
    if (!process.env.FORCE && man.files[id]?.hash === hash && fs.existsSync(out)) continue;
    process.stdout.write(`${game}/${id} … `);
    fs.writeFileSync(out, await speak(text));
    man.files[id] = { file, hash, text }; made++; console.log('ok');
  }
  man.provider = provider; man.updated = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(manPath, JSON.stringify(man, null, 2) + '\n');
  console.log(`${game}: ${made} new clip(s), ${Object.keys(man.files).length} in all.`);
}
