// The motion pieces in traqqr-motion.js (Kev's 3 Nov handover §6.2): each one's design size, whether it
// scrolls (a 240vh track with a sticky stage) and whether it mounts below md (§6.5: only the marquee).
export const motionPieces = {
  'live-feed-hero': { size: [640, 470], scroll: false, mobile: false },
  'live-feed-marquee': { size: [1200, 170], scroll: false, mobile: true },
  'live-feed-split': { size: [1000, 330], scroll: false, mobile: false },
  'proxy-flow': { size: [640, 560], scroll: false, mobile: false },
  'inspector-hero': { size: [1000, 520], scroll: false, mobile: false },
  'inspector-payload': { size: [1100, 520], scroll: true, mobile: false },
  'fingerprint-360': { size: [760, 580], scroll: false, mobile: false },
  'fingerprint-journey': { size: [1200, 270], scroll: true, mobile: false },
  'klicktipp-card': { size: [600, 530], scroll: false, mobile: false },
  'klicktipp-flow': { size: [1100, 230], scroll: true, mobile: false },
  'integrations-hub': { size: [1200, 500], scroll: false, mobile: false },
} as const;

export type MotionId = keyof typeof motionPieces;
