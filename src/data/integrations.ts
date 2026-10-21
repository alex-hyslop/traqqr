// The nine integrations, in one place: the integrations strip uses the colour tiles, the nav
// dropdown the one-colour logos. Logos are exported from Figma (Brand Icon / … and … · Mono).
import ablefyMono from '@/assets/integrations/mono/ablefy.svg';
import cloudflareMono from '@/assets/integrations/mono/cloudflare.svg';
import digistore24Mono from '@/assets/integrations/mono/digistore24.svg';
import everwebinarMono from '@/assets/integrations/mono/everwebinar.svg';
import facebookMono from '@/assets/integrations/mono/facebook.svg';
import hubspotMono from '@/assets/integrations/mono/hubspot.svg';
import klicktippMono from '@/assets/integrations/mono/klicktipp.svg';
import metaAdsMono from '@/assets/integrations/mono/meta-ads.svg';
import webinarisMono from '@/assets/integrations/mono/webinaris.svg';
import ablefy from '@/assets/integrations/ablefy.svg';
import cloudflare from '@/assets/integrations/cloudflare.svg';
import digistore24 from '@/assets/integrations/digistore24.svg';
import everwebinar from '@/assets/integrations/everwebinar.svg';
import facebook from '@/assets/integrations/facebook.svg';
import hubspot from '@/assets/integrations/hubspot.svg';
import klicktipp from '@/assets/integrations/klicktipp.svg';
// Meta Ads is a 2x PNG: its symbol is a raster gradient, and the SVG export was 338 KB.
import metaAds from '@/assets/integrations/meta-ads.webp';
import webinaris from '@/assets/integrations/webinaris.svg';
import { assetUrl } from '@/lib/asset-url';

export interface Integration {
  name: string;
  /** 48px colour logo for the integrations strip tiles. */
  logo: string;
  /** 16px one-colour (white) logo for the nav dropdown. */
  mono: string;
}

export const integrations: Integration[] = [
  { name: 'Meta Ads', logo: assetUrl(metaAds), mono: assetUrl(metaAdsMono) },
  { name: 'Facebook', logo: assetUrl(facebook), mono: assetUrl(facebookMono) },
  { name: 'Cloudflare', logo: assetUrl(cloudflare), mono: assetUrl(cloudflareMono) },
  { name: 'KlickTipp', logo: assetUrl(klicktipp), mono: assetUrl(klicktippMono) },
  { name: 'Digistore24', logo: assetUrl(digistore24), mono: assetUrl(digistore24Mono) },
  { name: 'Ablefy', logo: assetUrl(ablefy), mono: assetUrl(ablefyMono) },
  { name: 'EverWebinar', logo: assetUrl(everwebinar), mono: assetUrl(everwebinarMono) },
  { name: 'Webinaris', logo: assetUrl(webinaris), mono: assetUrl(webinarisMono) },
  { name: 'HubSpot', logo: assetUrl(hubspot), mono: assetUrl(hubspotMono) },
];
