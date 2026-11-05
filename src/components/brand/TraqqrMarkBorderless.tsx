"use client";
import { useEffect, useId, useRef } from "react";

// Geometry from Figma "Brand / Traqqr mark · Borderless" (5143:20), viewBox 0 0 40 40.
// The tile is the full squircle; the shadow is cut out of it with a mask.
const TILE = "M20.0018 0C28.921 0 33.8266 0 36.9115 3.08486C40 6.16972 40 11.0827 40 19.9982C40 28.9174 40 33.8266 36.9115 36.9115C33.8266 39.9963 28.921 39.9963 20.0018 39.9963C11.0827 39.9963 6.17341 39.9963 3.08855 36.9115C0 33.8266 0 28.9174 0 19.9982C0 11.079 0 6.16972 3.08486 3.08486C6.17341 0 11.0827 0 20.0018 0Z";
const STAR = [[20.2083,4.0874],[22.298,18.0227],[36.2334,20.1125],[22.298,22.2022],[20.2083,36.1375],[18.1185,22.2022],[4.18323,20.1125],[18.1185,18.0227]];
const CENTER = { x: 20.2083, y: 20.1125 };
const DEFAULT = Math.atan2(16.036, 19.069); // the logo's own cut-out angle (~40°)
const LENGTH = 60;                          // reaches past the tile edge from every point

// The cut-out = the star swept along one direction (one quad per edge, all wound the same way)
function shadowPath(angle: number) {
  const vx = Math.cos(angle) * LENGTH, vy = Math.sin(angle) * LENGTH;
  return STAR.map(([ax, ay], i) => {
    const [bx, by] = STAR[(i + 1) % STAR.length];
    const cw = (bx - ax) * vy - (by - ay) * vx > 0;
    return cw
      ? `M${ax},${ay}L${bx},${by}L${bx + vx},${by + vy}L${ax + vx},${ay + vy}Z`
      : `M${ax},${ay}L${ax + vx},${ay + vy}L${bx + vx},${by + vy}L${bx},${by}Z`;
  }).join("");
}

export function TraqqrMarkBorderless({ size = 40, ease = 0.06 }: { size?: number; ease?: number }) {
  const svg = useRef<SVGSVGElement>(null);
  const cut = useRef<SVGPathElement>(null);
  const mask = useId();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(hover: hover)").matches) return; // touch: keep the static logo
    let target = DEFAULT, x = Math.cos(DEFAULT), y = Math.sin(DEFAULT), raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = svg.current!.getBoundingClientRect();
      const cx = r.left + (CENTER.x / 40) * r.width;
      const cy = r.top + (CENTER.y / 40) * r.height;
      target = Math.atan2(cy - e.clientY, cx - e.clientX); // point away from the cursor
    };
    const onLeave = () => { target = DEFAULT; };
    const tick = () => {
      x += (Math.cos(target) - x) * ease;
      y += (Math.sin(target) - y) * ease;
      cut.current?.setAttribute("d", shadowPath(Math.atan2(y, x)));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [ease]);

  return (
    <svg ref={svg} viewBox="0 0 40 40" width={size} height={size} role="img" aria-label="Traqqr">
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
          <rect width="40" height="40" fill="#fff" />
          <path ref={cut} d={shadowPath(DEFAULT)} fill="#000" />
        </mask>
      </defs>
      <path d={TILE} fill="#424242" mask={`url(#${mask})`} />
      <path d={`M${STAR.map((p) => p.join(",")).join("L")}Z`} fill="#FFAB40" />
    </svg>
  );
}