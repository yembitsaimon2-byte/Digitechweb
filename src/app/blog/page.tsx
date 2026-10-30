import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogListClient from '@/components/blog/BlogListClient';
import CtaSection from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Blog Digitech Web | Conseils, Coulisses & Réalisations Web',
  description:
    'Conseils, coulisses et réalisations d’une agence web à Casablanca. Retours d’expérience, guides techniques et vision par Yembit Saïmon.',
  alternates: {
    canonical: 'https://digitech-web.fr/blog',
  },
  openGraph: {
    title: 'Blog Digitech Web | Conseils, Coulisses & Réalisations Web',
    description:
      'Conseils, coulisses et réalisations d’une agence web à Casablanca. Retours d’expérience, guides techniques et vision par Yembit Saïmon.',
    url: 'https://digitech-web.fr/blog',
    siteName: 'Digitech Web',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Digitech Web',
    description: 'Conseils, coulisses et réalisations d’une agence web à Casablanca.',
    url: 'https://digitech-web.fr/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Digitech Web',
      url: 'https://digitech-web.fr',
      logo: {
        '@type': 'ImageObject',
        url: 'https://digitech-web.fr/images/digi-logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* En-tête de page */}
      <section
        style={{
          paddingTop: 'clamp(8rem, 14vw, 13rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          paddingInline: 'var(--grid-gutter)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <span className="type-label" style={{ display: 'block', marginBottom: '1.5rem' }}>
            Ressources & Réflexions
          </span>
          <h1
            className="type-display"
            style={{
              color: 'var(--color-cream)',
              maxWidth: '16ch',
              lineHeight: 1.1,
            }}
          >
            Blog Digitech Web
          </h1>
          <p
            className="type-lead"
            style={{
              marginTop: '1.5rem',
              maxWidth: '54ch',
              color: 'var(--color-cream-dim)',
            }}
          >
            Conseils, coulisses et réalisations d&apos;une agence web à Casablanca.
          </p>
        </div>
      </section>

      {/* Liste des articles */}
      <section
        style={{
          paddingBlock: 'var(--section-md)',
          paddingInline: 'var(--grid-gutter)',
          minHeight: '400px',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <BlogListClient initialPosts={posts} />
        </div>
      </section>

      {/* CTA final */}
      <CtaSection />
    </>
  );
}
