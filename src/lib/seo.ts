export interface PageMeta {
  title: string;
  description: string;
  /** Absolute URL of the current page — pass Astro.url.href */
  url: string;
  /** Path to an OG image relative to /public, e.g. "/og-default.jpg" */
  ogImage?: string;
}

export const SITE_NAME = "Traqqr";

export function buildMeta({ title, description, url, ogImage = "/og-default.jpg" }: PageMeta) {
  return {
    title: title === SITE_NAME ? title : `${title} | ${SITE_NAME}`,
    description,
    canonical: url,
    ogImage,
  };
}

export function organizationJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl.replace(/\/$/, "")}/favicon.svg`,
  };
}
