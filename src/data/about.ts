import type { ImageMetadata } from 'astro';
import type { Locale } from '@/i18n';

// The About page's journey (Kev's 6 Nov handover: Figma 5400:3 DE, 5402:1998 EN, mobile 5401:485). One entry
// per step, oldest first; the timeline alternates photo and text on its own, and the last step ends on the
// Traqqr mark and the trial button. To add a photo, put it in src/assets/about/, import it here and set
// `image` (any size from about 1000px wide; Astro makes the responsive sizes). `alt` describes the photo.
//
// ⚑ PLACEHOLDER: the titles and texts are lorem ipsum, step 3 is a whole placeholder step, and there are no
// photos yet. Kev is sending the real copy and photos (6 Nov).

type Copy = Record<Locale, string>;

export interface JourneyStep {
  /** "FEBRUAR 2025" / "FEBRUARY 2025"; shown in caps. */
  date: Copy;
  place: Copy;
  title: Copy;
  text: Copy;
  image?: ImageMetadata;
  alt: Copy;
}

const lorem: Copy = {
  de: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
};

export const journey: JourneyStep[] = [
  {
    date: { de: 'Februar 2025', en: 'February 2025' },
    place: { de: 'Bulgarien', en: 'Bulgaria' },
    title: { de: 'Lorem ipsum dolor sit amet', en: 'Lorem ipsum dolor sit amet' },
    text: lorem,
    alt: { de: 'Foto aus Bulgarien, Februar 2025', en: 'Photo from Bulgaria, February 2025' },
  },
  {
    date: { de: 'April 2025', en: 'April 2025' },
    place: { de: 'Indien', en: 'India' },
    title: { de: 'Consectetur adipiscing elit', en: 'Consectetur adipiscing elit' },
    text: lorem,
    alt: { de: 'Foto aus Indien, April 2025', en: 'Photo from India, April 2025' },
  },
  {
    date: { de: '[Datum]', en: '[Date]' },
    place: { de: '[Ort]', en: '[Place]' },
    title: { de: 'Sed do eiusmod tempor', en: 'Sed do eiusmod tempor' },
    text: lorem,
    alt: { de: '[Foto]', en: '[Photo]' },
  },
  {
    date: { de: 'Heute', en: 'Today' },
    place: { de: '[Ort]', en: '[Place]' },
    title: { de: 'Traqqr.ai ist live', en: 'Traqqr.ai is live' },
    text: lorem,
    alt: { de: '[Foto]', en: '[Photo]' },
  },
];
