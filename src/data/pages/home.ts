import type { Section } from '@/data/sections';
import type { Locale } from '@/i18n';
import { homeDe } from './home.de';
import { homeEn } from './home.en';

export interface HomePage {
  title: string;
  description: string;
  features: string[];
  sections: Section[];
}

export const homePages: Record<Locale, HomePage> = { de: homeDe, en: homeEn };
