/* Traqqr · CTA card background · "Target lock" · v1 · 5 Nov 2026
   Desktop only. Four HUD corner brackets slide in from the card's corners and lock around the main CTA button,
   hold, fade, and start again. Two faint range lines with ticks run in from both sides at the button's height.
   All white at low opacity: the only amber in the card is the button itself. No glow on the button.

   Finding the button: the script never uses fixed positions. Every frame it reads where the element marked
   [data-cta-lock-target] sits inside the card (offsetLeft/Top up to the card, so the button's own hover
   transform doesn't make the brackets jitter). If the card gets taller, the copy wraps, or the buttons move,
   the brackets follow on the next frame.

   Markup (Block / CTA):
     <div class="cta-card" data-cta-lock>                       ← must be position:relative (it is) and overflow:hidden
       …copy…
       <a class="btn btn-primary" data-cta-lock-target>14 Tage kostenlos testen →</a>
       <a class="btn btn-outline">Demo ansehen</a>
     </div>
   The script adds its own <canvas> as the card's first child (absolute, inset 0, z-index -1, pointer-events none),
   so give the card `isolation:isolate`.

   Usage:  import { mountAllCtaLocks } from './cta-lock.js'; mountAllCtaLocks();
   Rules (same as the other motion pieces): runs only at ≥ 1024px with a fine pointer; paused while < 35% visible
   or the tab is hidden; reduced motion shows the locked frame, still. */

const bez = (x1, y1, x2, y2) => t => {
  let lo = 0, hi = 1;
  for (let i = 0; i < 20; i++) { const m = (lo + hi) / 2, x = 3 * m * (1 - m) ** 2 * x1 + 3 * m * m * (1 - m) * x2 + m ** 3; x < t ? lo = m : hi = m; }
  const m = (lo + hi) / 2; return 3 * m * (1 - m) ** 2 * y1 + 3 * m * m * (1 - m) * y2 + m ** 3;
};
const house = bez(.2, .7, .2, 1);
const cl = v => v < 0 ? 0 : v > 1 ? 1 : v;

// Timing (seconds) and look. Change here, nowhere else.
const T = { loop: 8, in: 2.4, hold: 2.4, out: 1 };              // in → hold → out → pause (the rest of the loop)
const LOOK = { pad: 14, arm: 14, inset: 20, bracket: .38, line: .10, tickGap: 24, tickSpeed: 14, lineGap: 28, lineInset: 24 };

export function mountCtaLock(card) {
  const target = card.querySelector('[data-cta-lock-target]');
  if (!target) return null;
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none';
  card.prepend(cv);
  const ctx = cv.getContext('2d');
  const desktop = matchMedia('(min-width: 1024px) and (pointer: fine)');
  const reducedQ = matchMedia('(prefers-reduced-motion: reduce)');
  const label = card.getAttribute('data-cta-lock-label');      // optional tiny mono readout, e.g. "START · 14 TAGE"

  let W = 0, H = 0, dpr = 1, visible = false, raf = 0, t0 = performance.now();

  const size = () => {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = card.clientWidth; H = card.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
  };
  // the button's box inside the card, ignoring transforms (hover lift) — read fresh every frame
  const box = () => {
    let x = 0, y = 0, n = target;
    while (n && n !== card) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    if (n !== card) { const r = target.getBoundingClientRect(), c = card.getBoundingClientRect(); x = r.left - c.left; y = r.top - c.top; }
    return { x, y, w: target.offsetWidth, h: target.offsetHeight };
  };

  const draw = now => {
    raf = 0;
    const on = desktop.matches;
    cv.style.display = on ? '' : 'none';
    if (!on) return;
    const reduced = reducedQ.matches;
    const t = (now - t0) / 1000, s = reduced ? T.in + .5 : t % T.loop;
    const b = box(), { pad, arm } = LOOK;
    const goal = { l: b.x - pad, r: b.x + b.w + pad, t: b.y - pad, b: b.y + b.h + pad };
    const start = { l: LOOK.inset, r: W - LOOK.inset, t: LOOK.inset, b: H - LOOK.inset };
    const k = house(cl(s / T.in));
    const outStart = T.in + T.hold, out = s > outStart ? cl((s - outStart) / T.out) : 0;
    const alpha = s < outStart + T.out ? 1 - out : 0;
    const lerp = (a, z) => a + (z - a) * k;
    const bx = { l: lerp(start.l, goal.l), r: lerp(start.r, goal.r), t: lerp(start.t, goal.t), b: lerp(start.b, goal.b) };
    const locked = s >= T.in && s < outStart;
    const pulse = locked && !reduced ? 1 + .06 * Math.sin(Math.PI * cl((s - T.in) / .5)) : 1;   // one small "click" on lock

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1; ctx.lineCap = 'square';

    // brackets
    ctx.save();
    const cx = (bx.l + bx.r) / 2, cy = (bx.t + bx.b) / 2;
    ctx.translate(cx, cy); ctx.scale(pulse, pulse); ctx.translate(-cx, -cy);
    ctx.strokeStyle = `rgba(255,255,255,${(LOOK.bracket * alpha).toFixed(3)})`;
    const corner = (x, y, dx, dy) => { ctx.beginPath(); ctx.moveTo(x + dx * arm, y); ctx.lineTo(x, y); ctx.lineTo(x, y + dy * arm); ctx.stroke(); };
    corner(bx.l, bx.t, 1, 1); corner(bx.r, bx.t, -1, 1); corner(bx.l, bx.b, 1, -1); corner(bx.r, bx.b, -1, -1);
    ctx.restore();

    // range lines + ticks at the button's height (they stop short of the brackets and of any second button)
    const y = Math.round(b.y + b.h / 2) + .5, la = LOOK.line * (reduced ? 1 : .4 + .6 * k) * (1 - out * .6);
    const leftEnd = goal.l - LOOK.lineGap, rightStart = rightEdgeOfRow(target, card, goal.r) + LOOK.lineGap;
    const x0 = LOOK.lineInset, x1 = W - LOOK.lineInset;
    ctx.strokeStyle = `rgba(255,255,255,${la.toFixed(3)})`;
    ctx.beginPath();
    if (leftEnd > x0) { ctx.moveTo(x0, y); ctx.lineTo(leftEnd, y); }
    if (rightStart < x1) { ctx.moveTo(rightStart, y); ctx.lineTo(x1, y); }
    ctx.stroke();
    const shift = reduced ? 0 : (t * LOOK.tickSpeed) % LOOK.tickGap;
    const tick = (x, m) => { ctx.strokeStyle = `rgba(255,255,255,${(la * 1.4 * m).toFixed(3)})`; ctx.beginPath(); ctx.moveTo(x, y - 3.5); ctx.lineTo(x, y + 3.5); ctx.stroke(); };
    for (let x = x0 + shift; x < leftEnd; x += LOOK.tickGap) tick(x, cl((x - x0) / (leftEnd - x0)));
    for (let x = x1 - shift; x > rightStart; x -= LOOK.tickGap) tick(x, cl((x1 - x) / (x1 - rightStart)));

    if (label && (locked || reduced)) {
      ctx.font = '400 9px "Space Mono", ui-monospace, monospace'; ctx.textAlign = 'right';
      ctx.fillStyle = `rgba(255,255,255,${(.32 * alpha).toFixed(3)})`; ctx.fillText(label, goal.l - 6, goal.t - 4);
    }
    if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(draw);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };

  const ro = new ResizeObserver(() => { size(); kick(); }); ro.observe(card);
  const io = new IntersectionObserver(es => { visible = es[0].intersectionRatio >= .35; if (visible) kick(); }, { threshold: [0, .35, 1] }); io.observe(card);
  const onVis = () => { if (!document.hidden) kick(); };
  document.addEventListener('visibilitychange', onVis);
  desktop.addEventListener('change', kick); reducedQ.addEventListener('change', kick);
  if (document.fonts) document.fonts.ready.then(kick);
  size(); kick();

  return { destroy() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', onVis); desktop.removeEventListener('change', kick); reducedQ.removeEventListener('change', kick); cv.remove(); } };
}

// the right edge of the button row (so the right range line also clears the outline button next to the CTA)
function rightEdgeOfRow(target, card, fallback) {
  const row = target.parentElement; if (!row || row === card) return fallback;
  const c = card.getBoundingClientRect(), t = target.getBoundingClientRect();
  let r = fallback;
  for (const el of row.children) { const b = el.getBoundingClientRect(); if (Math.abs((b.top + b.bottom) / 2 - (t.top + t.bottom) / 2) < t.height / 2) r = Math.max(r, b.right - c.left); }
  return r;
}

export function mountAllCtaLocks(root = document) {
  return [...root.querySelectorAll('[data-cta-lock]')].map(mountCtaLock).filter(Boolean);
}
