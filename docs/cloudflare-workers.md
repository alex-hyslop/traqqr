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
- **Worker name and account.** Both are fixed in `wrangler.jsonc`: `traqqr-site` in the Digital Results International / KlickTipp account, next to `traqqr` and `traqqr-website`. A deploy can't land on those. `traqqr-site` already existed there, empty and with no deployments, and Alex chose it on 6 Nov. Alex's role can deploy to the existing Workers but not create new ones.

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

## Deploy to workers.dev

Live since 6 Nov at https://traqqr-site.digital-results-international-klicktipp.workers.dev (noindex). Parity against Vercel matches the local run: the same 9 header differences, all listed above.

- **Charset:** deployed static assets come without `charset=utf-8`, unlike `wrangler dev`. The Worker adds it to text responses, so `llms.txt`'s umlauts render correctly.

```sh
cd ~/Localdev/traqqr && git switch research/cloudflare-workers
npx -y wrangler@4.154.0 login                    # if not logged in
npx -y wrangler@4.154.0 deploy --dry-run         # builds; nothing is uploaded
npx -y wrangler@4.154.0 deploy                   # creates or updates the Worker "traqqr-site" only
IGNORE_HEADERS='x-robots-tag' bash scripts/parity.sh https://traqqr.vercel.app https://traqqr-site.digital-results-international-klicktipp.workers.dev
curl -sI https://traqqr-site.digital-results-international-klicktipp.workers.dev/ | grep -i x-robots-tag   # noindex
```

- **Rollback:** `npx -y wrangler@4.154.0 rollback`, or delete the `traqqr-site` Worker. Vercel isn't touched.
## staging.traqqr.ai: the site and the app on one host

staging.traqqr.ai is the app's staging (Vercel project `traqqr.ai`, behind Vercel's login). The site takes the host over by path. The app keeps everything under `/app`, which is its basePath (on traqqr.ai every other path is a 404).

- **The Worker** passes `/app`, `/app/*`, `/_vercel/*` and `/.well-known/*` on to the origin (Vercel) unchanged, with the same host and cookies, so Vercel's login keeps working. Every other path is the site: noindex, with the sign-up link on `/app/login`.
- **The route** `staging.traqqr.ai/*` → `traqqr-site` is in `wrangler.jsonc`. It only runs while the DNS record is proxied.
- **Tested locally on 6 Nov** with `wrangler dev --local-upstream staging.traqqr.ai --upstream-protocol https`:
  - The app paths returned Vercel's own login redirect, exactly as staging does today.
  - `/`, `/de/` and `/pricing/` were the site.
  - `/apple` and `/de/nope` were the site's 404s.

### Switching it on

1. **Deploy** the Worker with the route: `npx -y wrangler@4.154.0 deploy`. While the record is DNS only, nothing changes for visitors.
2. **Proxy the record:** Cloudflare → traqqr.ai → DNS → `staging`: from DNS only to **Proxied**, with the same target.
3. **Check:**

```sh
S=https://staging.traqqr.ai
curl -sI $S/ | grep -iE '^HTTP|x-robots|^server'                  # 200, x-robots-tag: noindex, server: cloudflare
curl -sI $S/app/login | grep -iE '^HTTP|^location|^server'         # 302 to vercel.com/sso-api, as before the switch
curl -s $S/pricing/ | grep -o 'href="/app/login[^"]*"' | sort -u   # the sign-up links stay on staging
IGNORE_HEADERS='x-robots-tag' bash scripts/parity.sh https://traqqr.vercel.app $S
```

   Then log in to the app at `$S/app/` in a browser to check that Vercel's login wall still lets you in.

4. **Rollback:** switch the record back to **DNS only**. Staging is then exactly as before, within seconds. Removing the route also works.

**Heads-up for the app team:** the bare staging.traqqr.ai now shows the site. Use `/app/` for the app.

**Still later:** connect Workers Builds, and at launch move traqqr.ai the same way and set `site` in `astro.config.mjs`.

## Not carried over from the 28 Oct research

- **The split-test proof is dropped.** That was `/split-demo/`, the cookie Worker and the `canonicalPath` prop. It added pages Vercel doesn't have.
- **Where it still is:** commit `0b1f307`, and the local branch `research/cloudflare-workers-28oct`, which also has the research write-up.
