import { memo, useEffect, useRef } from 'react';
import './sunbeam-scene.css';

// Sunbeam scene (prototype only, between the comparison table and Live Feed; Kev, 20 Oct): the café
// video scrubs with scroll and Julian's tracker card (GSAP) follows the video time. Kev's drop-in,
// with its markup in React and the scripts unchanged; the overlay script adds its own elements, so
// this renders once (memo, its one prop is static) and initialises once. Videos in public/media (need
// range requests; Vercel serves them); the poster is optimised by Astro and passed in. Mobile (< 760px): the cropped video is its own rounded box and the
// card sits over its top edge (Kev, 21 Oct).
// Needs hydrating so the scripts run: client:idle, so its height (set by the script) is final soon
// after load and anchors further down the page land in the right place. The video (1–2.5 MB) and the
// poster load only once the scene is half a screen away, so they don't compete with the hero.
export interface ScenePoster {
  src: string;
  srcSet?: string;
}

export const SunbeamScene = memo(function SunbeamScene({ poster }: { poster: ScenePoster }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.ready) return;
    el.dataset.ready = 'true';
    // Loaded in the browser only: the scripts (and GSAP) touch window on import.
    import('@/scripts/motion/scene-scrub.js').then(({ initSunbeamScene }) => initSunbeamScene(el));

    const video = el.querySelector('video');
    if (!video) return;
    const load = () => {
      video.preload = 'auto';
      video.load();
    };
    if (!('IntersectionObserver' in window)) return load();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          load();
        }
      },
      { rootMargin: '50% 0px' }
    );
    io.observe(el);
  }, []);

  return (
    <section ref={ref} className="scene-band" id="scene" aria-label="Example: a purchase tracked live">
      <div className="scene-track">
        <div className="scene-pin">
          <div className="scene">
            <img
              className="media"
              src={poster.src}
              srcSet={poster.srcSet}
              sizes="(max-width: 759px) calc(100vw - 32px), min(calc(100vw - 96px), 1600px)"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <video
              className="media"
              muted
              playsInline
              preload="none"
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
