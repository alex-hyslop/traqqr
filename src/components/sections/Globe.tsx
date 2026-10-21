import { memo, useEffect, useRef } from 'react';
import './globe.css';

// Example data only: these readouts and the live events in globe.js are made up.
const signals = [
  { city: 'Berlin', side: 'right', minor: false, top: 90, place: 'DE · BERLIN', event: 'Purchase · €49.00', source: 'Digistore24 · server' },
  { city: 'London', side: 'left', minor: true, top: 150, place: 'UK · LONDON', event: 'Lead', source: 'Deduplicated' },
  { city: 'Madrid', side: 'left', minor: false, top: 250, place: 'ES · MADRID', event: 'Purchase · €129.00', source: 'Ablefy · server' },
  { city: 'Istanbul', side: 'right', minor: false, top: 240, place: 'TR · ISTANBUL', event: 'Registration', source: 'EverWebinar' },
  { city: 'Dubai', side: 'left', minor: true, top: 380, place: 'AE · DUBAI', event: 'PageView', source: 'Reverse proxy' },
] as const;

function Tick() {
  return (
    <svg className="ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// Globe above the footer (Figma: Brand / Horizon glow 5004:62533): Kev's drop-in, with its markup in
// React and his globe.js unchanged. globe.js rewrites the readouts' text itself, so this renders once
// (memo, no props) and initialises once. Below 980px only 3 readouts show; reduced motion: no movement.
// Needs hydrating (client:visible) so the script runs.
export const Globe = memo(function Globe() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.ready) return;
    el.dataset.ready = 'true';
    // Loaded in the browser only: the script touches window on import, and the dot data is 68 KB.
    import('@/scripts/motion/globe.js').then(({ initGlobe }) => initGlobe(el));
  }, []);

  return (
    <section ref={ref} className="globe-sec" id="globe" aria-label="Example events arriving from around Europe">
      <div className="dome" aria-hidden="true" />
      <canvas aria-hidden="true" />
      {signals.map((s) => (
        <div key={s.city} className={`sig ${s.side}${s.minor ? ' minor' : ''}`} data-city={s.city} data-top={s.top}>
          <i className="stem" />
          <i className="tick" />
          <div className="ro">
            <span className="k">{s.place}</span>
            <b>{s.event}</b>
            <span className="s">
              {s.source}
              <em role="img" aria-label="confirmed">
                <Tick />
              </em>
            </span>
          </div>
        </div>
      ))}
    </section>
  );
});
