// Page-level effects ported from Kev's motion prototype (prototype/index.html, 20 Oct): Kev asked for
// them after seeing the prototype artifact.
// - Cursor light: a warm glow that follows the pointer, plus the grid lines lighting up around it on
//   .grid-bg sections. Desktop pointers only, as in the prototype.
// - Dark until on screen: [data-reveal] sections sit dimmed and fade up as they scroll into view,
//   and go dark again when they leave. Off with reduced motion.
// Styles: "Ambient effects" in global.css.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;

if (fine) {
  root.classList.add('has-cursor');
  // The grid sections are static HTML, so they're all in the page by the time this runs.
  const grids = document.querySelectorAll<HTMLElement>('.grid-bg');
  let raf = 0;
  let x = 0;
  let y = 0;
  addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        root.style.setProperty('--cx', `${x}px`);
        root.style.setProperty('--cy', `${y}px`);
        grids.forEach((section) => {
          const r = section.getBoundingClientRect();
          if (y < r.top - 250 || y > r.bottom + 250) return;
          section.style.setProperty('--mx', `${x - r.left}px`);
          section.style.setProperty('--my', `${y - r.top}px`);
        });
      });
    },
    { passive: true }
  );
}

if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-dark', !e.isIntersecting)),
    { threshold: 0.15 }
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((section) => {
    const r = section.getBoundingClientRect();
    if (r.top > innerHeight * 0.9 || r.bottom < 0) section.classList.add('is-dark');
    io.observe(section);
  });
}
