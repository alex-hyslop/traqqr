/* Traqqr · CTA card backgrounds · "Target lock" + "Dot field" · v1 · 5 Nov 2026
   Two subtle, desktop-only backgrounds for Block / CTA. Each page uses one of them, set on the card:
     data-cta-bg="lock"  → four HUD corner brackets slide in from the card's corners and lock around the main button,
                           with faint range lines coming in from the sides at the button's height (8s loop).
     data-cta-bg="dots"  → a faint dot grid (16px pitch, like the footer) with a slow ring of brighter dots closing in
                           on the main button every 5s; the dots near the button are always a touch brighter.
   Both are white at low opacity. The only amber in the card is the button. No glow on the button.

   Finding the button: the element marked [data-cta-bg-target] (the main, amber button). Its box inside the card is read
   fresh every frame (offsetLeft/Top up to the card, so the button's hover lift doesn't make anything jitter). Taller
   cards, wrapped copy and one-button layouts all work.
   Optional [data-cta-bg-copy] on the copy block: the dot field fades to 30% behind it so the headline stays clean.

   Markup (Block / CTA):
     <div class="cta-card" data-cta-bg="dots">                 ← position:relative, overflow:hidden, isolation:isolate
       <div class="copy" data-cta-bg-copy>…</div>
       <div class="actions">
         <a class="btn btn-primary" data-cta-bg-target href="/signup">14 Tage kostenlos testen</a>
         <a class="btn btn-outline" href="#demo">Demo ansehen</a>
       </div>
     </div>
   The script adds its own <canvas aria-hidden="true"> as the card's first child.

   Usage:  import { mountAllCtaBackgrounds } from './cta-bg.js'; mountAllCtaBackgrounds();
   Rules: runs only at ≥ 1024px with a fine pointer; paused while < 35% visible or the tab is hidden;
   reduced motion shows a still frame (lock: brackets locked; dots: the grid, brighter near the button).
   Back-compat: data-cta-lock / data-cta-lock-target from cta-lock.js still work and mean "lock". */

const bez = (x1, y1, x2, y2) => t => {
  let lo = 0, hi = 1;
  for (let i = 0; i < 20; i++) { const m = (lo + hi) / 2, x = 3 * m * (1 - m) ** 2 * x1 + 3 * m * m * (1 - m) * x2 + m ** 3; x < t ? lo = m : hi = m; }
  const m = (lo + hi) / 2; return 3 * m * (1 - m) ** 2 * y1 + 3 * m * m * (1 - m) * y2 + m ** 3;
};
const house = bez(.2, .7, .2, 1), soft = bez(.42, 0, .58, 1);
const cl = v => v < 0 ? 0 : v > 1 ? 1 : v;

// Timing and look. Change here, nowhere else.
const T = { loop: 8, in: 2.4, hold: 2.4, out: 1 };                       // lock: in → hold → out → pause
const LOOK = { pad: 14, arm: 14, inset: 20, bracket: .38, line: .10, tickGap: 24, tickSpeed: 14, lineGap: 28, lineInset: 24 };
const DOTS = { pitch: 16, size: 1.5, base: .05, near: .07, ring: .32, ringWidth: 34, period: 5, behindCopy: .3, copyFade: 40 };

export function mountCtaBackground(card) {
  const mode = card.getAttribute('data-cta-bg') || (card.hasAttribute('data-cta-lock') ? 'lock' : 'lock');
  const target = card.querySelector('[data-cta-bg-target]') || card.querySelector('[data-cta-lock-target]');
  if (!target) return null;
  const copyEl = card.querySelector('[data-cta-bg-copy]');
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none';
  card.prepend(cv);
  const ctx = cv.getContext('2d');
  const desktop = matchMedia('(min-width: 1024px) and (pointer: fine)');
  const reducedQ = matchMedia('(prefers-reduced-motion: reduce)');
  const label = card.getAttribute('data-cta-lock-label');

  let W = 0, H = 0, dpr = 1, visible = false, raf = 0; const t0 = performance.now();
  const size = () => { dpr = Math.min(2, devicePixelRatio || 1); W = card.clientWidth; H = card.clientHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); };
  const boxOf = el => {
    let x = 0, y = 0, n = el;
    while (n && n !== card) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    if (n !== card) { const r = el.getBoundingClientRect(), c = card.getBoundingClientRect(); x = r.left - c.left; y = r.top - c.top; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  };

  function drawLock(t, reduced) {
    const s = reduced ? T.in + .5 : t % T.loop;
    const b = boxOf(target), { pad, arm } = LOOK;
    const goal = { l: b.x - pad, r: b.x + b.w + pad, t: b.y - pad, b: b.y + b.h + pad };
    const start = { l: LOOK.inset, r: W - LOOK.inset, t: LOOK.inset, b: H - LOOK.inset };
    const k = house(cl(s / T.in));
    const outStart = T.in + T.hold, out = s > outStart ? cl((s - outStart) / T.out) : 0;
    const alpha = s < outStart + T.out ? 1 - out : 0;
    const lerp = (a, z) => a + (z - a) * k;
    const bx = { l: lerp(start.l, goal.l), r: lerp(start.r, goal.r), t: lerp(start.t, goal.t), b: lerp(start.b, goal.b) };
    const locked = s >= T.in && s < outStart;
    const pulse = locked && !reduced ? 1 + .06 * Math.sin(Math.PI * cl((s - T.in) / .5)) : 1;
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
  }

  function drawDots(t, reduced) {
    const b = boxOf(target), tx = b.x + b.w / 2, ty = b.y + b.h / 2;
    const c = copyEl ? boxOf(copyEl) : null;
    const maxD = Math.hypot(Math.max(tx, W - tx), Math.max(ty, H - ty)) || 1;
    const g = DOTS.pitch, half = DOTS.size / 2;
    for (let y = g / 2; y < H; y += g) for (let x = g / 2; x < W; x += g) {
      const d = Math.hypot(x - tx, y - ty);
      let a = DOTS.base + DOTS.near * (1 - d / maxD);                     // always a touch brighter near the button
      if (!reduced) for (const off of [0, .5]) {                          // two rings, half a cycle apart
        const ph = (t / DOTS.period + off) % 1, R = maxD * (1 - soft(ph)), fade = ph > .85 ? (1 - ph) / .15 : 1;
        a += DOTS.ring * Math.exp(-(((d - R) / DOTS.ringWidth) ** 2)) * fade * cl(d / 60);
      }
      if (c) {                                                            // keep the headline clean
        const dx = Math.max(c.x - x, 0, x - (c.x + c.w)), dy = Math.max(c.y - y, 0, y - (c.y + c.h));
        a *= DOTS.behindCopy + (1 - DOTS.behindCopy) * cl(Math.hypot(dx, dy) / DOTS.copyFade);
      }
      ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`; ctx.fillRect(x - half, y - half, DOTS.size, DOTS.size);
    }
  }

  const draw = now => {
    raf = 0;
    const on = desktop.matches;
    cv.style.display = on ? '' : 'none';
    if (!on) return;
    const reduced = reducedQ.matches, t = (now - t0) / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    (mode === 'dots' ? drawDots : drawLock)(t, reduced);
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

  return { mode, destroy() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', onVis); desktop.removeEventListener('change', kick); reducedQ.removeEventListener('change', kick); cv.remove(); } };
}

// the right edge of the button row (so the lock's right range line also clears the outline button next to the CTA)
function rightEdgeOfRow(target, card, fallback) {
  const row = target.parentElement; if (!row || row === card) return fallback;
  const c = card.getBoundingClientRect(), t = target.getBoundingClientRect();
  let r = fallback;
  for (const el of row.children) { const b = el.getBoundingClientRect(); if (Math.abs((b.top + b.bottom) / 2 - (t.top + t.bottom) / 2) < t.height / 2) r = Math.max(r, b.right - c.left); }
  return r;
}

export function mountAllCtaBackgrounds(root = document) {
  return [...root.querySelectorAll('[data-cta-bg], [data-cta-lock]')].map(mountCtaBackground).filter(Boolean);
}
