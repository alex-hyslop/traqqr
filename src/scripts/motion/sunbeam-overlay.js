/*
 * Sunbeam overlay (Traqqr): the signal readout over the laptop video, as ONE paused GSAP timeline in VIDEO SECONDS.
 * Drop-in for the website's scroll-scrubbed scene: call overlay.seek(videoTime) wherever the old render(t) was called.
 *
 *   const overlay = SunbeamOverlay(sceneEl);          // sceneEl = the element the video covers (position: relative)
 *   overlay.seek(t);                                   // t in video seconds (0 … 5.04); pure: same t → same picture
 *   overlay.layout({ mediaTop, mediaHeight, focusX })  // call on resize (optional args for the mobile layout)
 *
 * Needs gsap 3 + CustomEase, Space Mono, and sunbeam-overlay.css.
 *
 * One chain of cause and effect; nothing else moves:
 *   1.62 s  the sunlight reaches the laptop → a point appears on the lid and the line draws up from it
 *   2.30 s  the line's tip arrives           → it IS the tick; the card unfolds sideways out of it (content uncovered, not animated)
 *   3.05 s  a lead happens                   → the event and source lines roll up together; amber edge acknowledges it
 *   3.60 s  the purchase (the sun reaches her face) → same roll; the amount counts up to €49.00
 *   always  the card's rim warms with the sunlight in the footage (the only light in the scene)
 * Card placement and information are the website's (Traqqr Motion Kit §4).
 */
(function (global) {
  "use strict";
  const gsap = global.gsap;
  // eases: values from brands/traqqr/tokens/motion.js and shared/motion/motion-core.js (copied so this file stands alone)
  const EASE = { flow: [0.65, 0.12, 0.05, 1], house: [0.2, 0.7, 0.2, 1], soft: [0.339, 0.068, 0.663, 0.935], count: [0.215, 0.61, 0.355, 1] };
  const ease = {};
  Object.entries(EASE).forEach(([n, [a, b, c, d]]) => {
    ease[n] = global.CustomEase ? global.CustomEase.create("sbo." + n, `M0,0 C${a},${b} ${c},${d} 1,1`) : "power2.inOut";
  });
  if (gsap.config) gsap.config({ force3D: true }); // sub-pixel smooth, no one-pixel pop on landing

  // The footage: 1920×1080, 24 fps, 5.04 s. Positions are fractions of that frame (cover-mapped).
  const VW = 1920, VH = 1080, DUR = 5.04, FPS = 24;
  // Sunlight on the scene, measured per frame by the website (0 → 1). Drives only the rim.
  const BEAM = [0.013,0.005,0.003,0.003,0.004,0,0.001,0,0.001,0.001,0.003,0.003,0.006,0.003,0.005,0.006,0.009,0.008,0.01,0.012,0.015,0.012,0.015,0.015,0.017,0.016,0.019,0.019,0.023,0.02,0.023,0.024,0.026,0.026,0.031,0.036,0.046,0.049,0.059,0.071,0.106,0.12,0.143,0.165,0.192,0.206,0.225,0.241,0.267,0.276,0.296,0.312,0.338,0.351,0.374,0.391,0.419,0.432,0.454,0.473,0.502,0.518,0.544,0.568,0.6,0.617,0.648,0.673,0.707,0.729,0.76,0.789,0.823,0.841,0.867,0.886,0.909,0.919,0.937,0.949,0.972,0.973,0.98,0.984,0.99,0.986,0.989,0.991,0.995,0.99,0.993,0.994,0.998,0.994,0.996,0.997,1,0.995,0.997,0.997,1,0.994,0.995,0.995,0.997,0.994,0.995,0.995,0.997,0.992,0.994,0.994,0.996,0.992,0.993,0.993,0.995,0.99,0.992,0.992,0.995];
  const beamAt = (t) => { const f = Math.min(BEAM.length - 1, Math.max(0, t * FPS)), i = Math.floor(f), j = Math.min(BEAM.length - 1, i + 1); return BEAM[i] + (BEAM[j] - BEAM[i]) * (f - i); };

  const CFG = {
    laptop: { x: 0.432, y: 0.556 },  // the source on the lid
    stemTop: 0.2,                     // where the line ends and the card sits
    lineStart: 1.62,                  // the sunlight reaches the laptop (BEAM rises past ~0.1)
    lineDur: 0.68,                    // the line draws up; its tip arrives at cardIn
    cardIn: 2.3, openDur: 0.52,       // the card unfolds out of the tip
    roll: 0.44, ping: 0.6, countDur: 0.72,
    gap: 10, margin: 16, scaleBase: 950, scaleMax: 1.7,
  };
  const EVENTS = [
    { at: 2.3, event: "PageView", source: "Reverse proxy" },
    { at: 3.05, event: "Lead", source: "KlickTipp · server" },
    { at: 3.6, event: "Purchase", amount: 49, source: "Digistore24 · server" }, // as the light reaches her face
  ];
  const eur = (v) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format(v);
  const label = (e, k = 1) => (e.amount != null ? `${e.event} · ${eur(e.amount * k)}` : e.event);
  const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  function SunbeamOverlay(root, opts = {}) {
    const el = (cls, tag, parent) => { const n = document.createElement(tag || "i"); n.className = cls; (parent || box).appendChild(n); return n; };
    const box = document.createElement("div"); box.className = "sbo"; root.appendChild(box);
    const stem = el("sbo-stem"), src = el("sbo-dot"), tip = el("sbo-dot");
    const card = el("sbo-card", "div"), ro = el("sbo-ro", "div", card);
    el("sbo-k", "span", ro).textContent = "DE · BERLIN";
    const winB = el("sbo-win", "div", ro), winS = el("sbo-win s", "div", ro);
    const ping = el("sbo-ping", "i", ro), rim = el("sbo-rim", "i", ro);
    const rowsB = EVENTS.map((e) => { const r = el("sbo-row", "b", winB); r.textContent = label(e); return r; });
    const rowsS = EVENTS.map((e) => { const r = el("sbo-row", "span", winS); r.innerHTML = `${e.source}<em class="sbo-ok">${CHECK}</em>`; return r; });
    // fixed width = the longest line, so the card never resizes when events swap (kit rule)
    const longest = Math.max(...EVENTS.map((e) => label(e).length), ...EVENTS.map((e) => (e.source.length + 3) * 0.846));
    winB.style.width = longest * 0.62 + "em";
    card.setAttribute("role", "status");

    let L = null, tl = null, now = 0;

    /** layout: cover-map the 1920×1080 frame into the root (optionally a media band for the mobile layout) */
    function layout({ mediaTop = 0, mediaHeight, focusX = 0.5, cardTop = null, scale: forceScale } = {}) {
      const w = root.clientWidth, h = mediaHeight || root.clientHeight;
      const s = Math.max(w / VW, h / VH), dw = VW * s, dh = VH * s, ox = (w - dw) * focusX, oy = mediaTop + (h - dh) / 2;
      const scale = forceScale || Math.min(CFG.scaleMax, Math.max(1, w / CFG.scaleBase));
      card.style.fontSize = 13 * scale + "px";
      const cw = card.offsetWidth, ch = card.offsetHeight, lx = ox + CFG.laptop.x * dw, ly = oy + CFG.laptop.y * dh, gap = CFG.gap * scale;
      let ty, cx, cy, open;
      if (cardTop != null) {
        // Traqqr site, mobile: the card sits in a band above the video; the line rises out of the frame into its bottom edge
        cy = cardTop; ty = cardTop + ch;
        cx = Math.min(w - cw - CFG.margin, Math.max(CFG.margin, lx - cw * 0.3));
        open = Math.min(100, Math.max(0, (lx - cx) / cw * 100));
      } else {
        ty = oy + CFG.stemTop * dh; cy = ty - 4 * scale;
        cx = lx - gap - cw; open = 100;
        if (cx < CFG.margin) { cx = lx + gap; open = 0; }
      }
      L = { lx, ly, ty, open };
      Object.assign(card.style, { left: cx + "px", top: cy + "px" });
      Object.assign(src.style, { left: lx + "px", top: ly + "px" });
      Object.assign(tip.style, { left: lx + "px", top: ly + "px" });
      Object.assign(stem.style, { left: lx + "px", top: ty + "px", height: Math.max(0, ly - ty) + "px" });
      build(); seek(now);
      return { cardHeight: ch };
    }

    /** the timeline, in video seconds. Rebuilt on layout (positions are in px). */
    function build() {
      if (tl) { tl.kill(); gsap.set([stem, src, tip, card, ro, ping, rim, ...rowsB, ...rowsS], { clearProps: "transform,opacity,visibility,clipPath" }); }
      tl = gsap.timeline({ paused: true });
      const rise = L.ly - L.ty;

      // ── 1. the sunlight reaches the laptop: the source point appears and the line draws up from it ──
      //    the tip rides the line's end on the same curve and the same frames, so it can never leave the line
      tl.fromTo(src, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 4 / 24, ease: ease.house, immediateRender: true }, CFG.lineStart);
      tl.fromTo(tip, { opacity: 0 }, { opacity: 1, duration: 2 / 24, ease: "none", immediateRender: true }, CFG.lineStart);
      tl.fromTo(stem, { scaleY: 0 }, { scaleY: 1, duration: CFG.lineDur, ease: ease.flow, immediateRender: true }, CFG.lineStart);
      tl.fromTo(tip, { y: 0 }, { y: -rise, duration: CFG.lineDur, ease: ease.flow, immediateRender: true }, CFG.lineStart);

      // ── 2. the tip arrives: the card unfolds sideways out of it. One move; the content is uncovered, not animated. ──
      //    (left card: opens from its right edge at the line, toward the left; right card: the mirror)
      // opens outward from the point where the line meets the card (right edge for a left card, left edge for a right card)
      const shut = `inset(0% ${100 - L.open}% 0% ${L.open}% round 4px)`;
      tl.set(card, { autoAlpha: 0 }, 0);
      tl.set(card, { autoAlpha: 1 }, CFG.cardIn);
      tl.fromTo(ro, { clipPath: shut }, { clipPath: "inset(0% 0% 0% 0% round 4px)", duration: CFG.openDur, ease: ease.flow, immediateRender: false }, CFG.cardIn);
      tl.set(ro, { clipPath: "none" }, CFG.cardIn + CFG.openDur); // release the clip so the shadow shows

      // ── 3. each new event: both lines roll up together (one beat, one ease), the amber edge acknowledges it ──
      rowsB.forEach((r, i) => gsap.set([r, rowsS[i]], { yPercent: i ? 110 : 0, opacity: i ? 0 : 1 }));
      EVENTS.forEach((e, i) => {
        if (!i) return;
        const at = e.at, prev = [rowsB[i - 1], rowsS[i - 1]], next = [rowsB[i], rowsS[i]];
        tl.to(prev, { yPercent: -110, opacity: 0, duration: CFG.roll, ease: ease.flow }, at);
        tl.fromTo(next, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: CFG.roll, ease: ease.flow, immediateRender: false }, at);
        tl.set(ping, { opacity: 1 }, at);
        tl.to(ping, { opacity: 0, duration: CFG.ping, ease: ease.soft }, at + 0.04);
        if (e.amount != null) {
          // the amount counts while the line rolls in and the sun reaches her face; whole frames, lands exactly on the value
          const proxy = { p: 0 }, frames = Math.round(CFG.countDur * FPS), cE = gsap.parseEase(ease.count);
          const write = () => { const f = Math.round(proxy.p * frames); rowsB[i].textContent = label(e, f >= frames ? 1 : cE(f / frames)); };
          tl.fromTo(proxy, { p: 0 }, { p: 1, duration: CFG.countDur, ease: "none", immediateRender: false, onStart: write, onUpdate: write, onReverseComplete: write }, at);
        }
      });

      // ── the only light: the card's rim warms with the sunlight in the footage (no separate glows) ──
      const sun = { t: 0 };
      const warm = () => { rim.style.opacity = (0.45 * beamAt(sun.t)).toFixed(3); };
      tl.fromTo(sun, { t: 0 }, { t: DUR, duration: DUR, ease: "none", immediateRender: true, onUpdate: warm, onReverseComplete: warm }, 0);
      tl.set({}, {}, DUR);
    }

    function seek(t) { now = Math.min(DUR, Math.max(0, t)); if (tl) tl.seek(now, false); return api; }
    const api = { seek, layout, get timeline() { return tl; }, duration: DUR, element: box };
    if (opts.autoLayout !== false) layout();
    return api;
  }

  global.SunbeamOverlay = SunbeamOverlay;
  global.SunbeamOverlay.DURATION = DUR;
})(typeof window !== "undefined" ? window : globalThis);

