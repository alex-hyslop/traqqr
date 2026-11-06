# The site on Cloudflare Workers

Step 1 of moving staging.traqqr.ai to Cloudflare Workers, 6 Nov 2026. This is the branch `research/cloudflare-workers`, rebuilt on `main`. Vercel stays the live host, and its output doesn't change: the Workers files are only used by `wrangler`.

## How it works

- **Same build.** Workers serves the same static Astro build (`dist/`) as static assets. There is no adapter and no SSR.
- **The Worker (`worker/index.js`).** It runs in front of every path except `/media/*` and handles the two rules that depend on the host, which a static build can't know:

| Host | `X-Robots-Tag` and robots meta | Sign-up link |
|---|---|---|
| `traqqr.ai`, `www.traqqr.ai` | none (indexable) | `https://traqqr.ai/app/login` |
| `staging.traqqr.ai` | `noindex` | `/app/login` |
| `*.workers.dev`, anything else | `noindex` | `https://traqqr.ai/app/login` |

- **How it changes the link on staging.** On staging the Worker swaps the link everywhere it appears: in the HTML, in the islands' props, in the `/_astro/*.js` bundles (SiteNav imports it) and in `/llms.txt`. On every other host the HTML is byte-for-byte the build.
- **Headers and redirects: one source, `vercel.json`.**
  - After `astro build`, `scripts/cf-assets.mjs` writes `dist/_headers` and `dist/_redirects` from it. It does this only in the Workers build (`build.command` in `wrangler.jsonc`), so Vercel never sees those files.
  - What it writes: the CSP and security headers, the `/media/*` cache header, and the `/en` and `/integrationen` 301s.
  - **One addition not in `vercel.json`:** `/_astro/*` is cached for a year as immutable. Vercel's Astro preset already does this; Workers doesn't by itself.
  - **If it can't translate a route, the build fails.** To change a header or a redirect, edit `vercel.json` only.
- **404s.** `not_found_handling: "404-page"` serves the nearest `404.html` with status 404: `dist/de/404.html` under `/de/`, otherwise `dist/404.html`. `cf-assets.mjs` checks that this matches the 404 routes in `vercel.json`.
- **Worker name and account.** Both are fixed in `wrangler.jsonc`: `traqqr-site-staging` in the Digital Results International / KlickTipp account. A deploy can't land on the other Workers there (`traqqr-website`, `traqqr`, and a `traqqr-site` of unknown origin).

## The private library token

- **What needs it.** Installing `@klicktipp/traqqr-components` needs `GITHUB_TOKEN` with the `read:packages` scope; `.npmrc` reads it. The token is never committed.
- **Local:** `export GITHUB_TOKEN=$(gh auth token -u alex-hyslop)` before `pnpm install`. You only need it when `node_modules` has to be installed: `wrangler deploy` builds from the `node_modules` that are already there.
- **Workers Builds (later):**
  - Add `GITHUB_TOKEN` as a secret under Settings → Build → Variables and secrets. Use a fine-grained or classic token with `read:packages` only.
  - Pnpm 12 doesn't expand `${GITHUB_TOKEN}` in `.npmrc` (seen locally, 20 Oct). If the install gets a 401, set the build variable `PNPM_VERSION=10`.

## Run and check it locally

```sh
pnpm cf:dev                      # astro build + cf-assets, then wrangler dev on localhost:8787
IGNORE_HEADERS='x-robots-tag' pnpm cf:parity https://traqqr.vercel.app http://localhost:8787
npx -y wrangler@4.154.0 dev --port 8788 --local-upstream staging.traqqr.ai   # act as staging
```

`scripts/parity.sh A B` compares two deployments:
- the sitemap URL set
- for every sitemap page, both 404s, the redirects and some static files: the status, the redirect target, the key headers and a hash of each page's `<main>` HTML

It exits 1 if anything differs.

## Known differences from Vercel (6 Nov, wrangler dev against traqqr.vercel.app)

All 20 pages and both 404s have the same status, headers and `<main>` HTML. The sitemaps match, and so do the redirect targets. What differs:

| What | Vercel | Workers | Why |
|---|---|---|---|
| `X-Robots-Tag` | not sent; noindex is the meta tag only | `noindex` on every host but production | Asked for: the header and the meta on staging and workers.dev |
| `/pricing` (no trailing slash) | 200, the page itself | 307 to `/pricing/` | Workers' default `auto-trailing-slash`. Every link uses the slash, so this only gives each page one URL. Serving both would need Worker code. |
| The 301s | no security headers; `Cache-Control: max-age=0` | the security headers; no `Cache-Control` | Workers applies `_headers` to its redirects too. Browsers may cache the 301s, which are permanent. |
| `.js` content type | `application/javascript` | `text/javascript` | Both are valid; `text/javascript` is the current standard |

## Deploy to workers.dev (Alex)

```sh
cd ~/Localdev/traqqr && git switch research/cloudflare-workers
npx -y wrangler@4.154.0 login                    # if not logged in
npx -y wrangler@4.154.0 deploy --dry-run         # builds; nothing is uploaded
npx -y wrangler@4.154.0 deploy                   # creates or updates the Worker "traqqr-site-staging" only
IGNORE_HEADERS='x-robots-tag' bash scripts/parity.sh https://traqqr.vercel.app https://traqqr-site-staging.<subdomain>.workers.dev
curl -sI https://traqqr-site-staging.<subdomain>.workers.dev/ | grep -i x-robots-tag   # noindex
```

- **Rollback:** `npx -y wrangler@4.154.0 rollback`, or delete the `traqqr-site-staging` Worker. Vercel isn't touched.
- **Later steps, not part of step 1:**
  - add `staging.traqqr.ai` as a custom domain of `traqqr-site-staging`
  - connect Workers Builds
  - at launch, set `site` in `astro.config.mjs` to `https://traqqr.ai`. The build has the noindex meta for as long as `site` is on `*.vercel.app`, on any host.

## Not carried over from the 28 Oct research

- **The split-test proof is dropped.** That was `/split-demo/`, the cookie Worker and the `canonicalPath` prop. It added pages Vercel doesn't have.
- **Where it still is:** commit `0b1f307`, and the local branch `research/cloudflare-workers-28oct`, which also has the research write-up.
