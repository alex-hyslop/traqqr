/* Sunbeam scene · "snap section" · v2 · 3 Nov 2026 (replaces scene-scrub.js)
   The red-haired woman at her laptop, sunlight coming in. It is NOT scroll-scrubbed any more:
   · scrolling into the scene snaps it to fill the screen (750 ms) and the video plays once from the start (5.04 s);
   · Julian's tracker card (sunbeam-overlay.js) is drawn from video.currentTime every frame;
   · while you're in the scene, ONE scroll / swipe / arrow key moves you out of the whole block,
     to the next or the previous section. There's no slow scroll through it;
   · the rest of the page scrolls normally.
   Ported 1:1 from the "snap section" test in the Traqqr Homepage Motion artifact (22 Oct,
   https://claude.ai/artifact/WL1mnDNLaNCVFA7QAnzrFD), plus: DE/EN hint text, and a nav jump (#scene) also plays it.
   Site change (Kev, 4 Nov): on mobile the v1 layout is back. The video is its own rounded box starting halfway
   down the card, so the card sits over the box's top edge; no top fade (as on 21 Oct, commit 4774ee4).
   Usage: initSunbeamSnap(sectionEl) — markup in SunbeamScene.astro. Needs gsap@3.14.2 (+ CustomEase). */
import './gsap-global.js';
import './sunbeam-overlay.js';

const HINT = {
  de: { idle: 'Zum Abspielen scrollen', in: 'Weiterscrollen' },
  en: { idle: 'Scroll into view to play', in: 'Scroll to continue' },
};

export function initSunbeamSnap(band) {
  const root = band && band.querySelector('.scene'); if (!root || !window.SunbeamOverlay || !window.gsap) return;
  const lang = (document.documentElement.lang || 'de').toLowerCase().startsWith('en') ? 'en' : 'de';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [poster, video] = root.querySelectorAll('.media');
  const bar = root.querySelector('.scrub-bar i');
  const hint = root.querySelector('.hint span');
  const DUR = SunbeamOverlay.DURATION, MOBILE_BP = 760, FOCUS_M = .55, MARGIN = 16;
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

  // ---- playback: play once from the start each time you snap in; the overlay follows the video clock
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

  // ---- snap engine
  let state = 'out', anim = 0, lockUntil = 0, lastWheel = 0, wheelAcc = 0;
  const ease = t => 1 - Math.pow(1 - t, 4);
  function scrollToY(y, ms, done) {
    cancelAnimationFrame(anim);
    const y0 = scrollY, d = y - y0, t0 = performance.now();
    if (Math.abs(d) < 2) { done && done(); return; }
    const step = now => { const k = Math.min(1, (now - t0) / ms); window.scrollTo(0, y0 + d * ease(k)); if (k < 1) anim = requestAnimationFrame(step); else { anim = 0; done && done(); } };
    anim = requestAnimationFrame(step);
  }
  const bandTop = () => band.getBoundingClientRect().top + scrollY;
  const snapY = () => Math.round(bandTop() + (band.offsetHeight - innerHeight) / 2);   // band centred = fills the screen
  const settleIn = () => { state = 'in'; lockUntil = performance.now() + 450; hint.textContent = HINT[lang].in; play(); };
  function enter() { state = 'snapping'; scrollToY(snapY(), 750, settleIn); }
  function leave(dir) {
    state = 'leaving';
    try { video.pause(); } catch (e) {}
    const y = dir > 0 ? bandTop() + band.offsetHeight      // block fully above the screen; the next section starts at the top
                      : bandTop() - innerHeight;            // block fully below the screen; the previous section ends at the bottom
    scrollToY(Math.max(0, y), 750, () => { state = 'out'; lockUntil = performance.now() + 450; });
  }
  // Is the band arriving in the direction we're travelling?
  function arriving(dir) {
    const r = band.getBoundingClientRect(), vh = innerHeight;
    return dir > 0 ? (r.top > 4 && r.top < vh + 4) : (r.bottom < vh - 4 && r.bottom > -4);
  }
  function intent(dir, e) {
    const now = performance.now();
    if (state === 'snapping' || state === 'leaving') { e && e.cancelable && e.preventDefault(); return; }
    if (state === 'in') {
      e && e.cancelable && e.preventDefault();
      if (now < lockUntil) return;            // swallow the tail of the gesture that brought us in
      leave(dir); return;
    }
    if (now < lockUntil) return;
    if (arriving(dir)) { e && e.cancelable && e.preventDefault(); enter(); }
  }

  const start = () => {
    overlay = SunbeamOverlay(root, { autoLayout: false });
    new ResizeObserver(layout).observe(root);
    addEventListener('resize', layout);
    layout();
    if (reduce) {                       // no snap, no autoplay: the last frame and the finished card
      root.classList.add('static', 'played');
      const end = () => { video.currentTime = Math.max(0, (video.duration || DUR) - .04); };
      video.readyState >= 1 ? end() : video.addEventListener('loadedmetadata', end, { once: true });
      draw(DUR); return;
    }
    hint.textContent = HINT[lang].idle;

    // wheel / trackpad: a burst of wheel events is one gesture
    addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const now = performance.now(), fresh = now - lastWheel > 220; lastWheel = now;
      if (state !== 'out') { e.preventDefault(); if (state === 'in' && fresh && now >= lockUntil) leave(Math.sign(e.deltaY)); else if (state === 'in') lockUntil = Math.max(lockUntil, now + 120); return; }
      wheelAcc = fresh ? e.deltaY : wheelAcc + e.deltaY;
      if (Math.abs(wheelAcc) > 8) intent(Math.sign(wheelAcc), e);
    }, { passive: false });
    // touch: one swipe
    let ty = null, tHandled = false;
    addEventListener('touchstart', e => { ty = e.touches[0].clientY; tHandled = false; }, { passive: true });
    addEventListener('touchmove', e => {
      if (ty == null) return;
      const dy = ty - e.touches[0].clientY;
      if (state !== 'out') { e.preventDefault(); if (!tHandled && Math.abs(dy) > 24 && state === 'in' && performance.now() >= lockUntil) { tHandled = true; leave(Math.sign(dy)); } return; }
      if (!tHandled && Math.abs(dy) > 24 && arriving(Math.sign(dy)) && performance.now() >= lockUntil) { tHandled = true; e.preventDefault(); enter(); }
    }, { passive: false });
    addEventListener('touchend', () => { ty = null; }, { passive: true });
    // keyboard
    addEventListener('keydown', e => {
      if (e.target.closest && e.target.closest('input,textarea,select,[contenteditable]')) return;
      const down = ['ArrowDown', 'PageDown', ' '].includes(e.key) && !e.shiftKey, up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
      if (down || up) intent(down ? 1 : -1, e);
    });
    // safety net + nav jumps: if the user drags the scrollbar or follows a #scene link, keep the state honest
    let settle = 0;
    addEventListener('scroll', () => {
      if (anim) return;
      const r = band.getBoundingClientRect();
      if (state === 'in' && (r.bottom < innerHeight * .5 || r.top > innerHeight * .5)) state = 'out';
      clearTimeout(settle);
      settle = setTimeout(() => {          // landed with the scene filling the screen (e.g. an anchor jump): play it
        if (state !== 'out' || anim) return;
        const q = band.getBoundingClientRect();
        if (Math.abs(q.top - (innerHeight - q.height) / 2) < 48) settleIn();
      }, 140);
    }, { passive: true });
    if (location.hash === '#' + band.id) requestAnimationFrame(() => scrollToY(snapY(), 1, settleIn));
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(start);
}
