#!/usr/bin/env bash
# Compares two deployments of the site, e.g. Vercel against Workers:
#   scripts/parity.sh https://traqqr.vercel.app http://localhost:8787
# For every page in A's sitemap, both 404s, the redirects and a few static files it compares the status,
# the redirect target, the key headers and a hash of the page's <main> HTML. It also compares the sitemap
# URL sets. Prints one line per check and exits 1 if anything differs.
# IGNORE_HEADERS leaves out headers whose difference is expected, e.g. a noindex host against production:
#   IGNORE_HEADERS='x-robots-tag' scripts/parity.sh https://traqqr.vercel.app http://localhost:8787
set -uo pipefail

if [ $# -ne 2 ]; then
  echo "usage: $0 <base-url-a> <base-url-b>" >&2
  exit 2
fi
A=${1%/}
B=${2%/}
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
HEADERS='content-type|cache-control|content-security-policy|strict-transport-security|x-content-type-options|x-frame-options|referrer-policy|permissions-policy|cross-origin-opener-policy|x-robots-tag'
DIFFS=0

# fetch <base> <path> <out>: writes <out>.h (status, location and key headers, sorted) and <out>.b (the body).
fetch() {
  local method=(-X GET)
  [[ $2 == /media/* ]] && method=(-I)
  curl -s "${method[@]}" -o "$3.b" -D "$3.raw" "$1$2"
  {
    head -1 "$3.raw" | awk '{print "status: " $2}'
    tr -d '\r' < "$3.raw" | grep -iE "^(location|$HEADERS):" | grep -ivE "^(${IGNORE_HEADERS:-^$}):" | awk -F': ' '{ printf "%s: %s\n", tolower($1), substr($0, length($1) + 3) }' | sort
  } > "$3.h"
}

# The <main> element of a page (the nav, footer and head differ by nothing but are left out on purpose).
main_hash() {
  perl -0ne 'print $1 if m{(<main\b.*</main>)}s' "$1" | shasum -a 256 | cut -c1-12
}

# check <path> [main]: compares one URL on both bases.
check() {
  local path=$1 id
  id=$(printf '%s' "$path" | shasum | cut -c1-10)
  fetch "$A" "$path" "$TMP/a$id"
  fetch "$B" "$path" "$TMP/b$id"
  local result=same
  if ! diff -q "$TMP/a$id.h" "$TMP/b$id.h" > /dev/null; then
    result=DIFF
    diff "$TMP/a$id.h" "$TMP/b$id.h" | grep '^[<>]' | sed 's/^</    A/; s/^>/    B/' > "$TMP/d$id"
  fi
  local hashes=''
  if [ "${2:-}" = main ]; then
    local ha hb
    ha=$(main_hash "$TMP/a$id.b")
    hb=$(main_hash "$TMP/b$id.b")
    hashes=" main=$ha"
    if [ "$ha" != "$hb" ]; then
      result=DIFF
      hashes=" main A=$ha B=$hb"
    fi
  fi
  printf '%-4s %-40s %s%s\n' "$result" "$path" "$(head -1 "$TMP/a$id.h" | cut -d' ' -f2)" "$hashes"
  [ -f "$TMP/d$id" ] && cat "$TMP/d$id"
  [ "$result" = same ] || DIFFS=$((DIFFS + 1))
}

sitemap_paths() {
  curl -s "$1/sitemap-0.xml" | grep -o '<loc>[^<]*</loc>' | sed -E 's#</?loc>##g; s#^https?://[^/]+##' | sort -u
}

echo "A: $A"
echo "B: $B"
echo
echo '# Sitemap URL set'
sitemap_paths "$A" > "$TMP/sa"
sitemap_paths "$B" > "$TMP/sb"
if diff -q "$TMP/sa" "$TMP/sb" > /dev/null; then
  echo "same $(wc -l < "$TMP/sa" | tr -d ' ') URLs"
else
  echo 'DIFF'
  diff "$TMP/sa" "$TMP/sb" | grep '^[<>]' | sed 's/^</    A/; s/^>/    B/'
  DIFFS=$((DIFFS + 1))
fi

echo
echo '# Pages (every sitemap URL)'
while read -r path; do check "$path" main; done < "$TMP/sa"

echo
echo '# 404s'
check /this-page-does-not-exist/ main
check /de/diese-seite-gibt-es-nicht/ main

echo
echo '# Redirects'
for path in /en /en/ /en/pricing/ /en/de/preise/ /integrationen /integrationen/; do check "$path"; done

echo
echo '# Without the trailing slash'
for path in /pricing /de/preise; do check "$path"; done

echo
echo '# Static files'
asset=$(grep -o '/_astro/[^"]*\.js' "$(ls "$TMP"/a*.b | head -1)" | head -1)
for path in "$asset" /media/scrub-720.mp4 /og.png /favicon.svg /robots.txt /llms.txt /sitemap-index.xml; do check "$path"; done

echo
if [ "$DIFFS" -eq 0 ]; then
  echo 'No differences.'
else
  echo "$DIFFS check(s) differ."
  exit 1
fi
