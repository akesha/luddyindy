// ElevenLabs TTS proxy for the Luddy Major Explorer.
// Keeps the API key server-side; the public site POSTs { text, voice } here.

const ALLOWED_ORIGINS = [
  'https://akesha.github.io',
  'http://localhost:8745',
];

const VOICES = {
  scout: 'wWWn96OtTHu1sn8SRGEr',
  narrator: 'EST9Ui6982FZPSi7gCHi',
};

const MAX_TEXT_LENGTH = 1500;

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response('Forbidden', { status: 403 });
    }
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders(origin) });
    }

    let body;
    try { body = await request.json(); } catch {
      return new Response('Bad request', { status: 400, headers: corsHeaders(origin) });
    }
    const text = (body.text || '').trim();
    const voiceId = VOICES[body.voice] || VOICES.narrator;
    if (!text || text.length > MAX_TEXT_LENGTH) {
      return new Response('Text missing or too long', { status: 400, headers: corsHeaders(origin) });
    }

    // The site text is fixed, so cache generated audio at the edge to save credits.
    const cacheKeyData = new TextEncoder().encode(voiceId + '|' + text);
    const digest = await crypto.subtle.digest('SHA-256', cacheKeyData);
    const hash = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
    const cacheKey = new Request('https://tts-cache.internal/' + hash);
    const cache = caches.default;

    const cached = await cache.match(cacheKey);
    if (cached) {
      const resp = new Response(cached.body, cached);
      Object.entries(corsHeaders(origin)).forEach(([k, v]) => resp.headers.set(k, v));
      return resp;
    }

    const upstream = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voiceId, {
      method: 'POST',
      headers: { 'xi-api-key': env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!upstream.ok) {
      return new Response('TTS failed: ' + upstream.status, { status: 502, headers: corsHeaders(origin) });
    }

    const audio = await upstream.arrayBuffer();
    const cacheable = new Response(audio, {
      headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=31536000' },
    });
    ctx.waitUntil(cache.put(cacheKey, cacheable.clone()));

    const resp = new Response(audio, {
      headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=31536000', ...corsHeaders(origin) },
    });
    return resp;
  },
};
