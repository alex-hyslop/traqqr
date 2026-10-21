/* Sunbeam scene, scroll-scrubbed. Scroll position → target video time; the video seeks towards it
   (smoothed, one seek in flight) and Julian's overlay is drawn from the same time (overlay.seek).
   Usage: initSunbeamScene(sectionEl) — see SunbeamScene.astro for the markup. */
import './gsap-global.js';
import './sunbeam-overlay.js';

/** @param {ParentNode} [scope] */
export function initSunbeamScene(scope = document) {
  const root = scope.querySelector('.scene'); if (!root || !window.SunbeamOverlay || !window.gsap) return;
  const track = scope.querySelector('.scene-track'), pin = scope.querySelector('.scene-pin');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [poster, video] = root.querySelectorAll('.media');
  const bar = root.querySelector('.scrub-bar i');
  const VW = 1920, VH = 1080, DUR = SunbeamOverlay.DURATION, SCRUB = 1.5, MOBILE_BP = 760, FOCUS_M = .55, MARGIN = 16;
  const clamp = (v,a,b) => Math.min(b, Math.max(a, v));
  let overlay = null, shownT = 0, failed = false;

  function layout(){
    if (!overlay) return;
    const w = root.clientWidth, mobile = w < MOBILE_BP;
    if (mobile){
      // first pass sizes the card, second places everything around its real height. The video is its own
      // box starting halfway down the card, so the card sits over the box's top edge (Kev, 21 Oct).
      let { cardHeight } = overlay.layout({ cardTop: 0, scale: 1.15, focusX: FOCUS_M });
      const vt = Math.round(cardHeight / 2), vh = Math.round(w*.9);
      root.style.height = (vt + vh) + 'px';
      root.style.setProperty('--media-top', vt + 'px');
      for (const m of [poster, video]) Object.assign(m.style, { top: vt+'px', height: vh+'px', objectPosition: `${FOCUS_M*100}% 50%` });
      overlay.layout({ mediaTop: vt, mediaHeight: vh, focusX: FOCUS_M, cardTop: 0, scale: 1.15 });
    } else {
      root.style.height = '';
      for (const m of [poster, video]) Object.assign(m.style, { top:'0', height:'100%', objectPosition:'50% 50%' });
      overlay.layout();
    }
    const sh = pin.offsetHeight;
    track.style.setProperty('--scene-h', sh + 'px');
    track.style.setProperty('--scrub', (innerHeight*SCRUB) + 'px');
    track.style.setProperty('--pin-top', Math.max(80, (innerHeight - sh)/2) + 'px');
    render(shownT);
  }

  function render(t){
    overlay && overlay.seek(t);
    bar.style.transform = `scaleX(${(t/DUR).toFixed(4)})`;
    if (t > .15) root.classList.add('played');
  }

  let target = 0, raf = 0;
  const targetFromScroll = () => {
    const r = track.getBoundingClientRect(), pinTop = parseFloat(track.style.getPropertyValue('--pin-top')) || 80;
    return clamp((pinTop - r.top) / Math.max(1, track.offsetHeight - pin.offsetHeight), 0, 1) * DUR;
  };
  function frame(){
    raf = 0;
    target = targetFromScroll();
    shownT += (target - shownT) * .22;
    if (Math.abs(target - shownT) < .004) shownT = target;
    render(shownT);
    if (!failed && video.readyState >= 1 && !video.seeking && Math.abs(video.currentTime - shownT) > 1/48) {
      video.currentTime = Math.min(shownT, (video.duration || DUR) - .02);
    }
    if (shownT !== target || video.seeking) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  video.addEventListener('error', () => failed = true);
  video.querySelectorAll('source').forEach(src => src.addEventListener('error', () => { if (video.networkState === 3) failed = true; }));
  video.addEventListener('seeked', kick);
  video.addEventListener('loadeddata', () => { poster.style.visibility = 'hidden'; kick(); });

  const start = () => {
    overlay = SunbeamOverlay(root, { autoLayout: false });
    new ResizeObserver(layout).observe(root);
    addEventListener('resize', layout);
    layout();
    if (reduce){
      root.classList.add('static','played');
      const end = () => { video.currentTime = Math.max(0, (video.duration||DUR) - .04); };
      video.readyState >= 1 ? end() : video.addEventListener('loadedmetadata', end, { once:true });
      shownT = DUR; render(DUR); return;
    }
    addEventListener('scroll', kick, { passive:true });
    kick();
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(start);
}
