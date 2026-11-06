// The fingerprint page's live demo asks this for the caller's own IP and city (src/scripts/live-demo).
// It answers only about the request itself, from Vercel's geo headers, and never caches or logs it.
// Same response shape as the Workers version on the research/cloudflare-workers branch (worker/index.js).
const number = (value) => (value != null && value !== '' && Number.isFinite(Number(value)) ? Number(value) : null);

export function GET(request) {
  const h = request.headers;
  const city = h.get('x-vercel-ip-city');
  const body = {
    ip: h.get('x-real-ip') || h.get('x-forwarded-for')?.split(',')[0].trim() || null,
    city: city ? decodeURIComponent(city) : null,
    country: h.get('x-vercel-ip-country') || null,
    latitude: number(h.get('x-vercel-ip-latitude')),
    longitude: number(h.get('x-vercel-ip-longitude')),
  };
  return Response.json(body, {
    headers: { 'Cache-Control': 'no-store, private', 'X-Robots-Tag': 'noindex' },
  });
}
