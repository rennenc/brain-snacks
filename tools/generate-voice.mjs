#!/usr/bin/env node
// Turns tools/voice-lines.json into mp3 files, once, so the games play a good Hebrew voice
// instead of the browser's. Files land in site/games/<game>/voice/<id>.mp3 with a manifest.json.
//
//   ELEVENLABS_API_KEY=... node tools/generate-voice.mjs            (ElevenLabs, model eleven_v3)
//   CARTESIA_API_KEY=...   node tools/generate-voice.mjs            (Cartesia, model sonic-2, language he)
//
// Options (environment): VOICE_ID to pick a voice, FORCE=1 to regenerate files that already exist.
// Only lines that are new or changed are generated, so re-running costs nothing.
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const lines = JSON.parse(fs.readFileSync(path.join(root, 'tools/voice-lines.json'), 'utf8'));
const EL = process.env.ELEVENLABS_API_KEY, CA = process.env.CARTESIA_API_KEY;
if (!EL && !CA) { console.error('Set ELEVENLABS_API_KEY or CARTESIA_API_KEY.'); process.exit(1); }

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
    body: JSON.stringify({ model_id: process.env.MODEL_ID || 'sonic-2', transcript: text, language: 'he',
      voice: { mode: 'id', id: process.env.VOICE_ID || 'bf0a246a-8642-498a-9950-80c35e9276b5' },
      output_format: { container: 'mp3', sample_rate: 44100, bit_rate: 128000 } }) });
  if (!r.ok) throw new Error(`Cartesia ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return Buffer.from(await r.arrayBuffer());
}
const speak = EL ? elevenlabs : cartesia, provider = EL ? 'elevenlabs' : 'cartesia';

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
