// The site on Cloudflare Workers: the static Astro build in ./dist served as static assets, with this Worker
// in front of everything but /media/* (wrangler.jsonc's run_worker_first) for the two rules that depend on
// the host, which a static build can't know. The build is the same one Vercel serves.
// - noindex: every host but production gets `X-Robots-Tag: noindex` and the robots meta, as *.vercel.app does.
// - Sign-up link: staging.traqqr.ai links to its own /app/login; every other host keeps https://traqqr.ai/app/login.
// - The app on staging: staging.traqqr.ai is shared with the app (Vercel project traqqr.ai). Its paths go on to
//   Vercel untouched, with the same host and cookies, so its login wall keeps working; everything else is the site.
// Headers, redirects and the 404 pages come from dist/_headers and dist/_redirects (scripts/cf-assets.mjs).

const PRODUCTION = new Set(['traqqr.ai', 'www.traqqr.ai']);
const STAGING = 'staging.traqqr.ai';
const SIGNUP = 'https://traqqr.ai/app/login'; // signupHref in src/data/links.ts
const NOINDEX = '<meta name="robots" content="noindex" />';
// The app's paths on staging: the app itself (basePath /app), Vercel's own routes, and certificate checks.
const APP_PATHS = /^\/(app(\/|$)|_vercel\/|\.well-known\/)/;
// Responses that can hold the sign-up link: the pages, the islands' JS (SiteNav imports it) and llms.txt.
const TEXT = /^(text\/html|text\/plain|text\/javascript|application\/javascript)\b/;

export default {
  async fetch(request, env) {
    const { hostname, pathname } = new URL(request.url);
    // A Worker's request to its own zone goes to the origin, not back through the Worker.
    if (hostname === STAGING && APP_PATHS.test(pathname)) return fetch(request);

    const response = await env.ASSETS.fetch(request);
    const type = response.headers.get('Content-Type') ?? '';
    // Deployed static assets come without a charset (wrangler dev adds one); Vercel sends utf-8, and llms.txt has umlauts.
    const contentType = TEXT.test(type) && !/charset/i.test(type) ? `${type}; charset=utf-8` : type;
    if (PRODUCTION.has(hostname)) {
      if (contentType === type) return response;
      const out = new Response(response.body, response);
      out.headers.set('Content-Type', contentType);
      return out;
    }

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
    if (contentType) out.headers.set('Content-Type', contentType);
    out.headers.set('X-Robots-Tag', 'noindex');
    return out;
  },
};
