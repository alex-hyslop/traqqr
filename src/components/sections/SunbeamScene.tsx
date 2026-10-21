import { memo, useEffect, useRef } from 'react';
import './sunbeam-scene.css';

// Sunbeam scene (prototype only, between the comparison table and Live Feed; Kev, 20 Oct): the café
// video scrubs with scroll and Julian's tracker card (GSAP) follows the video time. Kev's drop-in,
// with its markup in React and the scripts unchanged; the overlay script adds its own elements, so
// this renders once (memo, no props) and initialises once. Media in public/media (needs range
// requests; Vercel serves them). Mobile (< 760px): the cropped video is its own rounded box and the
// card sits over its top edge (Kev, 21 Oct).
// Needs hydrating so the scripts run: client:idle, so its height (set by the script) is final soon
// after load and anchors further down the page land in the right place.
export const SunbeamScene = memo(function SunbeamScene() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.ready) return;
    el.dataset.ready = 'true';
    // Loaded in the browser only: the scripts (and GSAP) touch window on import.
    import('@/scripts/motion/scene-scrub.js').then(({ initSunbeamScene }) => initSunbeamScene(el));
  }, []);

  return (
    <section ref={ref} className="scene-band" id="scene" aria-label="Example: a purchase tracked live">
      <div className="scene-track">
        <div className="scene-pin">
          <div className="scene">
            <img className="media" src="/media/poster.jpg" alt="" aria-hidden="true" />
            <video
              className="media"
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src="/media/scrub-720.mp4" type="video/mp4" media="(max-width: 768px)" />
              <source src="/media/scrub-720.webm" type="video/webm" media="(max-width: 768px)" />
              <source src="/media/scrub-1080.mp4" type="video/mp4" />
              <source src="/media/scrub-1080.webm" type="video/webm" />
            </video>
            <div className="hint" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
              <span>Scroll to play</span>
            </div>
            <div className="scrub-bar" aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
