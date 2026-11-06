// Writes dist/_headers and dist/_redirects for Cloudflare Workers static assets from vercel.json, so the
// security headers, the media cache header and the redirects have one source for both hosts. Runs after
// `astro build` in the Workers build only (wrangler.jsonc's build.command), so Vercel's output doesn't change.
// It also checks that the 404 routes in vercel.json match the 404 pages Workers will pick ("404-page"
// handling serves the nearest 404.html up the path). Anything in vercel.json it can't translate fails the build.
import { access, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const { routes } = JSON.parse(await readFile(new URL('vercel.json', root), 'utf8'));

// vercel.json `src` regex → Cloudflare paths. Only the shapes used today: a literal path, an optional
// trailing slash (`/?`) and one catch-all at the end (`(.*)`, which becomes `*` and `$1` → `:splat`).
function paths(src) {
  const match = /^\^(\/[\w/-]*?)(\/\?|\(\.\*\)|\.\*)?\$$/.exec(src);
  if (!match) throw new Error(`cf-assets: can't translate the vercel.json route "${src}"`);
  const [, path, tail] = match;
  if (tail === '/?') return [path, `${path}/`];
  if (tail) return [`${path}*`];
  return [path];
}

const headers = [];
const redirects = [];
const notFound = [];
let phase = 'before';
for (const route of routes) {
  if (route.handle) {
    phase = route.handle;
    continue;
  }
  if (phase === 'error') {
    notFound.push(route);
    continue;
  }
  if (phase !== 'before') throw new Error(`cf-assets: no Workers equivalent for a route after "${phase}"`);
  const location = route.headers?.Location;
  if (route.status === 301 && location) {
    for (const from of paths(route.src)) redirects.push(`${from} ${location.replace('$1', ':splat')} 301`);
  } else if (route.headers && route.continue) {
    const lines = Object.entries(route.headers).map(([name, value]) => `  ${name}: ${value}`);
    for (const path of paths(route.src)) headers.push(path, ...lines, '');
  } else {
    throw new Error(`cf-assets: no Workers equivalent for the vercel.json route "${route.src}"`);
  }
}

// Not in vercel.json: Vercel's Astro preset caches the hashed build files for a year. Workers doesn't by itself.
headers.push('/_astro/*', '  Cache-Control: public, max-age=31536000, immutable', '');

// Each 404 route must point at the 404.html in its own folder, which is what "404-page" picks there.
for (const route of notFound) {
  const [folder] = paths(route.src);
  if (route.status !== 404 || route.dest !== `${folder.replace(/\*$/, '')}404.html`) {
    throw new Error(`cf-assets: the 404 route "${route.src}" → "${route.dest}" isn't the nearest 404.html`);
  }
  await access(new URL(`.${route.dest}`, dist));
}
await access(new URL('404.html', dist));

const banner = '# Generated from vercel.json by scripts/cf-assets.mjs. Edit vercel.json, not this file.\n';
await writeFile(new URL('_headers', dist), banner + headers.join('\n'));
await writeFile(new URL('_redirects', dist), `${banner + redirects.join('\n')}\n`);
console.log(`cf-assets: ${headers.filter((l) => l.startsWith('/')).length} header rules, ${redirects.length} redirects, ${notFound.length + 1} 404 pages checked`);
