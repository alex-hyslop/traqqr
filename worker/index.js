// The site on Cloudflare Workers: the static Astro build in ./dist served as static assets, with this Worker
// in front of everything but /media/* (wrangler.jsonc's run_worker_first) for the two rules that depend on
// the host, which a static build can't know. The build is the same one Vercel serves.
// - noindex: every host but production gets `X-Robots-Tag: noindex` and the robots meta, as *.vercel.app does.
// - Sign-up link: staging.traqqr.ai links to its own /app/login; every other host keeps https://traqqr.ai/app/login.
// Headers, redirects and the 404 pages come from dist/_headers and dist/_redirects (scripts/cf-assets.mjs).

const PRODUCTION = new Set(['traqqr.ai', 'www.traqqr.ai']);
const STAGING = 'staging.traqqr.ai';
const SIGNUP = 'https://traqqr.ai/app/login'; // signupHref in src/data/links.ts
const NOINDEX = '<meta name="robots" content="noindex" />';
// Responses that can hold the sign-up link: the pages, the islands' JS (SiteNav imports it) and llms.txt.
const TEXT = /^(text\/html|text\/plain|text\/javascript|application\/javascript)\b/;

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const { hostname } = new URL(request.url);
    if (PRODUCTION.has(hostname)) return response;

    const type = response.headers.get('Content-Type') ?? '';
    const html = type.startsWith('text/html');
    const staging = hostname === STAGING;
    let out;
    if (html || (staging && TEXT.test(type))) {
      let body = await response.text();
      if (staging) body = body.replaceAll(SIGNUP, '/app/login');
      // Today's build already has the meta (astro.config.mjs's site is on *.vercel.app); this keeps it once that changes.
      if (html && !/<meta name="robots"/.test(body)) body = body.replace('</head>', `${NOINDEX}</head>`);
      out = new Response(body, response);
      out.headers.delete('Content-Length');
    } else {
      out = new Response(response.body, response);
    }
    out.headers.set('X-Robots-Tag', 'noindex');
    return out;
  },
};
