// Landing nav content (Kev's 20 Oct nav update, Figma 5073:16323). Labels, descriptions and
// hrefs are placeholders until the pages exist; desktop dropdowns and the mobile menu share them.

export interface NavLink {
  title: string;
  href: string;
  description?: string;
}

export const productLinks: NavLink[] = [
  { title: 'Live Feed', description: 'Watch every event arrive as it happens.', href: '/#product' },
  { title: 'Reverse proxy', description: 'Track through your own subdomain.', href: '/#reverse-proxy' },
  { title: 'Event Inspector', description: 'See exactly what reached Meta.', href: '#' },
];

export const resourceLinks: (NavLink & { icon: 'docs' | 'help' | 'blog' })[] = [
  { title: 'Docs', description: 'Set-up guides and API reference.', href: '#', icon: 'docs' },
  { title: 'Help center', description: 'Answers to common questions.', href: '#', icon: 'help' },
  { title: 'Blog', description: 'Product news and tracking tips.', href: '#', icon: 'blog' },
];

export const integrationsHref = '/#integrations';
export const pricingHref = '/#pricing';
export const loginHref = '#';
export const signupHref = '/signup';
