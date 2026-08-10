import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://digitech-web.fr/sitemap.xml',
    host: 'https://digitech-web.fr',
  };
}
