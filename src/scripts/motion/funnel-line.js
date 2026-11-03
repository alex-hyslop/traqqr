/* Homepage v2 · §4 long-funnel charcoal band · scroll-drawn journey line · v2 · 3 Nov 2026
   As you scroll through the band, the vertical line draws down and a soft WHITE light rides its tip (the light IS the
   line's leading edge, never a separate dot travelling along it). Each step the tip passes switches on with one short ping
   and stays lit. When the tip reaches the last step (Kauf / Purchase) it turns AMBER and lands there: that is the band's
   one amber accent. Scrolling back up reverses everything (it's scroll-scrubbed, a pure function of scroll position).

   Markup (your Astro section, built from Figma 5217:727 / 5217:1414):
     <section data-tq-funnel>
       <div data-tq-funnel-rail>                         ← position:relative; the column the line runs down
         <i data-tq-funnel-line></i>                     ← the 1px line (absolute, full rail height)
         <i data-tq-funnel-tip></i>                      ← the light at the tip (absolute, top:0; the script moves it)
       </div>
       <article data-tq-step>…<i data-tq-dot></i>…01 ■ AD-KLICK…</article>   ← six steps, in order; each has a dot on the line
       …
       <article data-tq-step data-tq-amber>…<i data-tq-dot></i>…06 ■ KAUF…</article>
     </section>
   The script only sets transform / opacity / box-shadow / [data-on] / [data-lit]; style everything else in CSS (see CSS below).
   Reduced motion: everything shows, the amber light sits on Kauf, nothing moves. */

export const FUNNEL_CSS = `
[data-tq-funnel-line]{position:absolute;left:0;top:0;bottom:0;width:1px;transform-origin:50% 0;
  background:linear-gradient(to bottom,rgba(255,255,255,.12),rgba(255,255,255,.85))}
[data-tq-funnel-tip]{position:absolute;left:0;top:0;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:#fafaf9;
  box-shadow:0 0 12px 3px rgba(255,255,255,.45);will-change:transform,opacity,box-shadow}
[data-tq-funnel-tip][data-lit]{background:#ffb74d;box-shadow:0 0 22px 6px rgba(255,183,77,.55)}
[data-tq-step]{will-change:opacity,transform}
[data-tq-dot]{transition:none}
[data-tq-step][data-on] [data-tq-dot]{background:#fafaf9}
[data-tq-step][data-tq-amber][data-on] [data-tq-dot]{background:#ffb74d}
`;

const bez = (x1, y1, x2, y2) => t => {           // cubic-bezier(x1,y1,x2,y2) at t, by bisection (fine for UI)
  let lo = 0, hi = 1;
  for (let i = 0; i < 24; i++) { const m = (lo + hi) / 2, x = 3 * m * (1 - m) ** 2 * x1 + 3 * m * m * (1 - m) * x2 + m ** 3; x < t ? lo = m : hi = m; }
  const m = (lo + hi) / 2; return 3 * m * (1 - m) ** 2 * y1 + 3 * m * m * (1 - m) * y2 + m ** 3;
};
const house = bez(.2, .7, .2, 1), soft = bez(.42, 0, .58, 1);
const cl = v => v < 0 ? 0 : v > 1 ? 1 : v;

export function mountFunnel(section) {
  const rail = section.querySelector('[data-tq-funnel-rail]') || section;
  const line = section.querySelector('[data-tq-funnel-line]'), tip = section.querySelector('[data-tq-funnel-tip]');
  const steps = [...section.querySelectorAll('[data-tq-step]')];
  const dots = steps.map(s => s.querySelector('[data-tq-dot]') || s);
  if (!document.getElementById('tq-funnel-css')) { const st = document.createElement('style'); st.id = 'tq-funnel-css'; st.textContent = FUNNEL_CSS; document.head.appendChild(st); }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // where each dot sits on the rail (px from the rail's top), measured on layout changes
  let H = 1, at = [];
  const measure = () => {
    H = Math.max(1, rail.offsetHeight);
    // offsetTop, not getBoundingClientRect: the steps' own rise (translateY) must not shift where the dots are measured
    const topIn = el => { let y = 0, n = el; while (n && n !== rail) { y += n.offsetTop; n = n.offsetParent; } return y; };
    at = dots.map(d => topIn(d) + d.offsetHeight / 2);
  };

  let raf = 0;
  const draw = () => {
    raf = 0;
    const r = rail.getBoundingClientRect(), vh = innerHeight;
    const last = at[at.length - 1] ?? H;
    // the tip sits at 60% of the viewport height and stops on the last dot (Kauf), where it lands
    const y = reduced ? last : Math.min(last, Math.max(0, vh * .6 - r.top));
    line.style.transform = `scaleY(${(y / H).toFixed(4)})`;
    tip.style.transform = `translateY(${y.toFixed(1)}px)`;
    tip.style.opacity = y > 0 ? 1 : 0;

    steps.forEach((s, i) => {
      const past = y - at[i];                                       // px the tip has travelled past this dot
      const k = reduced ? 1 : house(cl((past + 24) / 72));          // the step comes on as the tip arrives (house curve)
      s.style.opacity = (.25 + .75 * k).toFixed(3);
      s.style.transform = `translateY(${(8 * (1 - k)).toFixed(2)}px)`;
      s.toggleAttribute('data-on', past >= 0);
      // one short ping on the dot as the tip passes: scale 1 → 1.8 → 1 and a glow, over ~90px of scroll, then it stays lit
      const p = reduced ? 0 : (past >= 0 && past < 90 ? Math.sin(Math.PI * soft(past / 90)) : 0);
      const amber = s.hasAttribute('data-tq-amber');
      dots[i].style.transform = `scale(${(1 + .8 * p).toFixed(3)})`;
      dots[i].style.boxShadow = p > .01 ? `0 0 ${(14 * p).toFixed(1)}px rgba(${amber ? '255,183,77' : '255,255,255'},${(.6 * p).toFixed(2)})` : 'none';
    });

    // landing: within the last 48px before Kauf the tip warms from white to amber, and stays amber once it's there
    const w = reduced ? 1 : cl(1 - (last - y) / 48);
    tip.toggleAttribute('data-lit', w >= 1);
    if (w > 0 && w < 1) {
      const g = Math.round(250 - 67 * w), b = Math.round(249 - 172 * w);           // #fafaf9 → #ffb74d
      tip.style.background = `rgb(${Math.round(250 + 5 * w)},${g},${b})`;
      tip.style.boxShadow = `0 0 ${(12 + 10 * w).toFixed(1)}px ${(3 + 3 * w).toFixed(1)}px rgba(255,${Math.round(255 - 72 * w)},${Math.round(255 - 178 * w)},${(.45 + .1 * w).toFixed(2)})`;
    } else { tip.style.background = ''; tip.style.boxShadow = ''; }
  };
  const req = () => { if (!raf) raf = requestAnimationFrame(draw); };
  const ro = new ResizeObserver(() => { measure(); req(); }); ro.observe(rail);
  measure(); draw();
  if (!reduced) { addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); }
  return { destroy() { ro.disconnect(); removeEventListener('scroll', req); removeEventListener('resize', req); } };
}
