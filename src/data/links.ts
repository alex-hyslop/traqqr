// Landing nav content (Kev's 20 Oct nav update, Figma 5073:16323). Labels and descriptions are
// placeholders, and every href is "#" until the pages exist (Kev, 20 Oct: MVP homepage),
// except "Start free trial" and "Log in", which go to the app login.
// Desktop dropdowns and the mobile menu share them.

export interface NavLink {
  title: string;
  href: string;
  description?: string;
}

export const productLinks: NavLink[] = [
  { title: 'Live Feed', description: 'Watch every event arrive as it happens.', href: '#' },
  { title: 'Reverse proxy', description: 'Track through your own subdomain.', href: '#' },
  { title: 'Event Inspector', description: 'See exactly what reached Meta.', href: '#' },
];

export const resourceLinks: (NavLink & { icon: 'docs' | 'help' | 'blog' })[] = [
  { title: 'Docs', description: 'Set-up guides and API reference.', href: '#', icon: 'docs' },
  { title: 'Help center', description: 'Answers to common questions.', href: '#', icon: 'help' },
  { title: 'Blog', description: 'Product news and tracking tips.', href: '#', icon: 'blog' },
];

export const integrationsHref = '#';
export const pricingHref = '#';
export const signupHref = 'https://traqqr.ai/app/login';
export const loginHref = signupHref;
/** The 2-minute demo video, once it exists. */
export const demoHref = '#';
