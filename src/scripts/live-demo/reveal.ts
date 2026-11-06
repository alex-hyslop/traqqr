// The live demo after the visitor's click: compute the visitor ID, ask /api/whoami for this request's own IP
// and city, read browser, device and time zone, keep the visit in this browser's localStorage, and fill the
// card. Nothing is sent anywhere else. A value that can't be read is shown as "Nicht prüfbar", never guessed:
// incognito and VPN can't be proven from a browser (no IP database, and heuristics change with every browser
// release), so both always show it.
import { browserName, deviceName, timeZone } from './device';
import { visitorId } from './fingerprint';
import type { DemoMap } from './map';
import type { LiveDemoProps } from '@/data/sections';

type Copy = LiveDemoProps['copy'];

/** /api/whoami's answer, the same on Vercel and Cloudflare. Any field can be null. */
interface WhoAmI {
  ip: string | null;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface Visit {
  ts: number;
  ip: string | null;
  city: string | null;
  country: string | null;
  lat: number | null;
  lon: number | null;
  browser: string | null;
  device: string | null;
  tz: string | null;
}

// Only on the visitor's device: the visits per visitor ID, for "visits this week" and stepping back.
const STORAGE_KEY = 'tq-live-demo';
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const SAME_VISIT_MS = 30 * 60 * 1000;
const MAX_VISITS = 10;

async function whoami(): Promise<WhoAmI | null> {
  try {
    const response = await fetch('/api/whoami', { cache: 'no-store', headers: { Accept: 'application/json' } });
    if (!response.ok || !response.headers.get('Content-Type')?.includes('json')) return null;
    return (await response.json()) as WhoAmI;
  } catch {
    return null;
  }
}

function readHistory(): Record<string, Visit[]> {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeHistory(history: Record<string, Visit[]>) {
  try {
    if (Object.keys(history).length) localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage blocked: the card still shows this visit.
  }
}

/** This week's visits for this ID, newest first, with the current one merged in if it's the same visit. */
function recordVisit(id: string | null, visit: Visit): Visit[] {
  if (!id) return [visit];
  const history = readHistory();
  const past = (history[id] ?? []).filter((v) => visit.ts - v.ts < WEEK_MS);
  const [last] = past;
  const visits = last && visit.ts - last.ts < SAME_VISIT_MS && last.ip === visit.ip ? [visit, ...past.slice(1)] : [visit, ...past];
  history[id] = visits.slice(0, MAX_VISITS);
  writeHistory(history);
  return history[id];
}

export async function reveal(root: HTMLElement) {
  const copy = JSON.parse(root.dataset.copy ?? '{}') as Copy;
  const locale = root.dataset.locale ?? 'de';
  const unknownClass = root.dataset.badgeUnknown ?? '';
  const card = root.querySelector<HTMLElement>('[data-card]')!;
  const status = root.querySelector<HTMLElement>('[data-status]')!;
  const field = (name: string) => root.querySelector<HTMLElement>(`[data-f="${name}"]`)!;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.dataset.state = 'loading';
  card.inert = false;
  card.setAttribute('aria-busy', 'true');
  card.focus();
  status.textContent = copy.loading;

  const minimum = new Promise((resolve) => setTimeout(resolve, reducedMotion ? 0 : 700));
  const [id, geo] = await Promise.all([visitorId().catch(() => null), whoami(), minimum]);
  const now: Visit = {
    ts: Date.now(),
    ip: geo?.ip ?? null,
    city: geo?.city ?? null,
    country: geo?.country ?? null,
    lat: geo?.latitude ?? null,
    lon: geo?.longitude ?? null,
    browser: browserName(),
    device: deviceName(),
    tz: timeZone(),
  };
  let visits = recordVisit(id, now);
  let index = 0;

  const count = (n: number, [one, many]: [string, string]) => `${n} ${n === 1 ? one : many}`;
  const regions = (() => {
    try {
      return new Intl.DisplayNames([locale], { type: 'region' });
    } catch {
      return null;
    }
  })();
  const relative = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const place = (v: Visit) => {
    const country = v.country ? (regions?.of(v.country) ?? v.country) : null;
    return [v.city, country].filter(Boolean).join(', ') || null;
  };
  const ago = (ts: number) => {
    const minutes = Math.round((ts - Date.now()) / 60000);
    if (Math.abs(minutes) < 60) return relative.format(minutes, 'minute');
    const hours = Math.round(minutes / 60);
    return Math.abs(hours) < 24 ? relative.format(hours, 'hour') : relative.format(Math.round(hours / 24), 'day');
  };
  /** A value, or the "Nicht prüfbar" badge when it's missing. */
  const set = (el: HTMLElement, value: string | null) => {
    if (value) {
      el.textContent = value;
      return;
    }
    const badge = document.createElement('span');
    badge.className = unknownClass;
    badge.textContent = copy.unknown;
    el.replaceChildren(badge);
  };
  const distinct = (pick: (v: Visit) => string | null) => new Set(visits.map(pick).filter(Boolean)).size;

  // The map loads once, and only if a visit has a place to show.
  const mapEl = root.querySelector<HTMLElement>('[data-map]')!;
  const staticDot = root.querySelector<HTMLElement>('[data-map-dot]');
  let map: DemoMap | null = null;
  let mapLoading = false;
  const showMap = async (v: Visit) => {
    const where = place(v);
    mapEl.setAttribute('aria-label', copy.map.replace('{place}', where ?? copy.unknown));
    mapEl.querySelector('[data-map-unknown]')?.remove();
    if (v.lat == null || v.lon == null) {
      staticDot?.remove();
      mapEl.querySelector<HTMLElement>('.maplibregl-canvas-container')?.style.setProperty('visibility', 'hidden');
      const badge = document.createElement('span');
      badge.dataset.mapUnknown = '';
      badge.className = `${unknownClass} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`;
      badge.textContent = copy.unknown;
      mapEl.append(badge);
      return;
    }
    mapEl.querySelector<HTMLElement>('.maplibregl-canvas-container')?.style.removeProperty('visibility');
    if (map) return map.show(v.lat, v.lon);
    if (mapLoading) return;
    mapLoading = true;
    try {
      const { createMap } = await import('./map');
      staticDot?.remove();
      map = createMap(mapEl, v.lat, v.lon, reducedMotion);
    } catch {
      mapLoading = false;
    }
  };

  const newer = root.querySelector<HTMLButtonElement>('[data-newer]')!;
  const older = root.querySelector<HTMLButtonElement>('[data-older]')!;
  const clear = root.querySelector<HTMLButtonElement>('[data-clear]')!;

  const renderVisit = () => {
    const v = visits[index];
    field('when').textContent = index === 0 ? copy.now : ago(v.ts);
    set(field('place'), place(v));
    set(field('ip'), v.ip);
    set(field('browser'), v.browser);
    set(field('device'), v.device);
    set(field('timezone'), v.tz);
    set(field('incognito'), null);
    set(field('vpn'), null);
    newer.disabled = index === 0;
    older.disabled = index >= visits.length - 1;
    void showMap(v);
  };
  const renderStats = () => {
    set(field('stat-visits'), count(visits.length, copy.units.visit));
    set(field('stat-incognito'), null);
    const ips = distinct((v) => v.ip);
    set(field('stat-ips'), ips ? count(ips, copy.units.ip) : null);
    const places = distinct((v) => (v.city || v.country ? `${v.city}|${v.country}` : null));
    set(field('stat-locations'), places ? count(places, copy.units.location) : null);
    clear.hidden = !id;
  };

  set(field('id'), id);
  renderStats();
  renderVisit();
  newer.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    renderVisit();
  });
  older.addEventListener('click', () => {
    index = Math.min(visits.length - 1, index + 1);
    renderVisit();
  });
  clear.addEventListener('click', () => {
    if (!id) return;
    const history = readHistory();
    delete history[id];
    writeHistory(history);
    visits = [visits[0]];
    index = 0;
    renderStats();
    renderVisit();
  });

  root.dataset.state = 'revealed';
  card.removeAttribute('aria-busy');
  status.textContent = copy.loaded;
}
