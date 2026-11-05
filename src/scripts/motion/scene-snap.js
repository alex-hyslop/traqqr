/* Sunbeam scene · "play in view" · v3 · 5 Nov 2026 (replaces the v2 snap section; same file name, same markup)
   The red-haired woman at her laptop, sunlight coming in. Kev, 5 Nov: the snap/lock was annoying, so the page now
   scrolls NATURALLY past the scene. Nothing is locked, nothing hijacks the wheel, touch or keyboard.
   · When the scene is ≥ 60% in view, the video plays once from the start (5.04 s) and Julian's tracker card
     (sunbeam-overlay.js) is drawn from video.currentTime every frame.
   · Scroll on whenever you like. The video keeps playing while it's still partly on screen.
   · Once the scene has left the screen completely, it resets to the start. Scroll back to it (from above or below)
     and it plays again from the start.
   · Hidden tab: paused. Reduced motion: no autoplay, the last frame with the finished card (as before).
   Site changes (Kev, 4 Nov): on mobile the video is its own rounded box starting halfway down the card, so the
   card sits over the box's top edge, with no top fade (layout() below; commit 4774ee4). The hint is gone from the
   markup (SunbeamScene.tsx), so there's nothing to hide here.
   Usage: initSunbeamSnap(sectionEl) or initSunbeamScene(sectionEl) — the same function; markup in SunbeamScene.tsx.
   Needs gsap@3.14.2 (+ CustomEase) for the overlay, as before. */
import './gsap-global.js';
import './sunbeam-overlay.js';

const PLAY_AT = .6;    // share of the scene that must be on screen to start playing
const RESET_AT = 0;    // reset once it's completely off screen

export function initSunbeamScene(band) {
  const root = band && band.querySelector('.scene'); if (!root || !window.SunbeamOverlay || !window.gsap) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [poster, video] = root.querySelectorAll('.media');
  const bar = root.querySelector('.scrub-bar i');
  const DUR = window.SunbeamOverlay ? SunbeamOverlay.DURATION : 5.04, MOBILE_BP = 760, FOCUS_M = .55, MARGIN = 16;
  let overlay = null;

  function layout() {
    if (!overlay) return;
    const w = root.clientWidth, mobile = w < MOBILE_BP;
    if (mobile) {
      // first pass sizes the card, second places everything around its real height; the video box starts
      // halfway down the card
      const { cardHeight } = overlay.layout({ cardTop: 0, scale: 1.15, focusX: FOCUS_M });
      const vt = Math.round(cardHeight / 2), vh = Math.round(w * .9);
      root.style.height = (vt + vh) + 'px';
      root.style.setProperty('--media-top', vt + 'px');
      for (const m of [poster, video]) Object.assign(m.style, { top: vt + 'px', height: vh + 'px', objectPosition: `${FOCUS_M * 100}% 50%` });
      overlay.layout({ mediaTop: vt, mediaHeight: vh, focusX: FOCUS_M, cardTop: 0, scale: 1.15 });
    } else {
      root.style.height = '';
      for (const m of [poster, video]) Object.assign(m.style, { top: '0', height: '100%', objectPosition: '50% 50%' });
      overlay.layout();
    }
    draw(video.currentTime || 0);
  }
  function draw(t) {
    overlay && overlay.seek(Math.min(t, DUR));
    bar.style.transform = `scaleX(${Math.min(1, t / DUR).toFixed(4)})`;
  }

  // ---- playback: play once from the start each time the scene comes into view; the overlay follows the video clock
  let raf = 0, failed = false;
  const tick = () => { draw(video.currentTime); if (!video.paused && !video.ended) raf = requestAnimationFrame(tick); else { raf = 0; if (video.ended) draw(DUR); } };
  function play() {
    root.classList.add('played');
    if (failed) { draw(DUR); return; }
    try { video.currentTime = 0; } catch (e) {}
    draw(0);
    const p = video.play(); if (p && p.catch) p.catch(() => draw(DUR));   // autoplay refused → show the finished card
    cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
  }
  video.addEventListener('playing', () => { poster.style.visibility = 'hidden'; if (!raf) raf = requestAnimationFrame(tick); });
  video.addEventListener('ended', () => draw(DUR));
  video.addEventListener('error', () => failed = true);

  // ---- in-view engine: no snapping, no locked scroll
  let armed = true, ticking = 0;
  function reset() {
    armed = true;
    try { video.pause(); video.currentTime = 0; } catch (e) {}
    cancelAnimationFrame(raf); raf = 0; draw(0);
  }
  function check() {
    ticking = 0;
    const r = root.getBoundingClientRect(), vh = innerHeight;
    const seen = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    const share = seen / Math.max(1, Math.min(r.height, vh));            // tall scenes count as "in" once they fill the screen
    if (share >= PLAY_AT && armed && !document.hidden) { armed = false; play(); }
    else if (share <= RESET_AT && !armed) reset();
  }
  const onScroll = () => { if (!ticking) ticking = requestAnimationFrame(check); };

  const start = () => {
    overlay = SunbeamOverlay(root, { autoLayout: false });
    new ResizeObserver(layout).observe(root);
    addEventListener('resize', layout);
    layout();
    if (reduce) {                       // no autoplay: the last frame and the finished card
      root.classList.add('static', 'played');
      const end = () => { video.currentTime = Math.max(0, (video.duration || DUR) - .04); };
      video.readyState >= 1 ? end() : video.addEventListener('loadedmetadata', end, { once: true });
      draw(DUR); return;
    }
    draw(0);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { try { video.pause(); } catch (e) {} }
      else if (!armed && !video.ended) { const p = video.play(); if (p && p.catch) p.catch(() => {}); if (!raf) raf = requestAnimationFrame(tick); }
      onScroll();
    });
    onScroll();                          // already in view on load (or after a #scene jump)
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(start);
}

// v2 name, so existing imports keep working
export const initSunbeamSnap = initSunbeamScene;
