import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, true);

  if (!post) {
    return {
      title: 'Article introuvable — Digitech Web',
    };
  }

  // Title: keep <= 60 characters
  let title = post.title;
  if (title.length > 60) {
    const parts = title.split('|');
    if (parts[0].trim().length <= 60) {
      title = parts[0].trim();
    } else {
      title = title.substring(0, 57) + '...';
    }
  }

  // Description: keep around 150-160 characters
  let description = post.description;
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }

  const url = `https://www.digitechweb.online/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: 'Digitech Web',
      locale: 'fr_FR',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `/blog/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/blog/${post.slug}/opengraph-image`],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, process.env.NODE_ENV !== 'production');

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 2);
  const articleUrl = `https://www.digitechweb.online/blog/${post.slug}`;

  // Formatter la date en français
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Structured Data (JSON-LD)
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://www.digitechweb.online/a-propos',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digitech Web',
      url: 'https://www.digitechweb.online',
      foundingDate: '2022',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.digitechweb.online/images/digi-logo.png',
      },
    },
    image: `https://www.digitechweb.online${post.coverImage}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: post.tags.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.digitechweb.online',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.digitechweb.online/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  // Person schema pour Yembit Saïmon
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yembit Saïmon',
    jobTitle: 'Fondateur & Développeur Web',
    worksFor: {
      '@type': 'Organization',
      name: 'Digitech Web',
      url: 'https://www.digitechweb.online',
      foundingDate: '2022',
    },
    url: 'https://www.digitechweb.online/a-propos',
    image: 'https://www.digitechweb.online/images/founder.jpg',
    sameAs: ['https://www.instagram.com/digitech_web1/'],
  };

  // FAQPage schema auto-généré depuis les H3s de la section Questions fréquentes
  const faqJsonLd =
    post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Barre de progression de lecture */}
      <ReadingProgressBar />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {(post.category === 'Portrait' || post.author === 'Yembit Saïmon') && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Draft banner in dev */}
      {post.status === 'draft' && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            borderBottom: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            padding: '0.75rem var(--grid-gutter)',
            paddingTop: '6rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          ⚠️ Mode Brouillon — Cet article est visible uniquement en développement local.
        </div>
      )}

      <article
        style={{
          paddingTop: post.status === 'draft' ? '2rem' : 'clamp(7.5rem, 12vw, 11rem)',
          paddingBottom: 'var(--section-md)',
          paddingInline: 'var(--grid-gutter)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          {/* Fil d'Ariane visible */}
          <nav
            aria-label="Fil d'Ariane"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.825rem',
              color: 'var(--color-cream-muted, #737373)',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/"
              style={{
                color: 'var(--color-cream-dim, #a3a3a3)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              className="hover:text-[var(--color-cream)]"
            >
              Accueil
            </Link>
            <span>›</span>
            <Link
              href="/blog"
              style={{
                color: 'var(--color-cream-dim, #a3a3a3)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              className="hover:text-[var(--color-cream)]"
            >
              Blog
            </Link>
            <span>›</span>
            <span
              style={{
                color: 'var(--color-cream, #f5f5f0)',
                maxWidth: '30ch',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {post.title}
            </span>
          </nav>

          {/* En-tête de l'article */}
          <header style={{ maxWidth: '820px', marginBottom: '3rem' }}>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(200, 240, 74, 0.1)',
                border: '1px solid rgba(200, 240, 74, 0.25)',
                color: 'var(--color-accent, #C8F04A)',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem',
              }}
            >
              {post.category}
            </div>

            <h1
              className="type-display"
              style={{
                color: 'var(--color-cream, #f5f5f0)',
                fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
                lineHeight: 1.15,
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}
            >
              {post.title}
            </h1>

            {/* Méta de l'article */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.25rem',
                fontSize: '0.85rem',
                color: 'var(--color-cream-dim, #9A9590)',
                borderTop: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)',
                paddingBlock: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-cream-muted)' }}>Par</span>
                <span style={{ color: 'var(--color-cream)', fontWeight: 500 }}>
                  {post.author}
                </span>
              </div>

              <span>•</span>

              <div>
                <span>Publié le {formatDate(post.date)}</span>
                {post.updated && post.updated !== post.date && (
                  <span style={{ marginLeft: '0.5rem', color: 'var(--color-cream-muted)' }}>
                    (mis à jour le {formatDate(post.updated)})
                  </span>
                )}
              </div>

              <span>•</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{post.readingTime} min de lecture</span>
              </div>
            </div>
          </header>

          {/* Image de couverture */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1000px',
              aspectRatio: '16 / 9',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '3.5rem',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <Image
              src={post.coverImage}
              alt={post.coverAlt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Grille principale : Sommaire + Contenu */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Sommaire Desktop (colonne latérale sticky) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28">
              <TableOfContents headings={post.headings} />

              <div style={{ marginTop: '2rem', paddingLeft: '0.5rem' }}>
                <ShareButtons url={articleUrl} title={post.title} />
              </div>
            </aside>

            {/* Corps du texte */}
            <div className="lg:col-span-8" style={{ maxWidth: '68ch' }}>
              {/* Sommaire Mobile (repliable en haut) */}
              <div className="block lg:hidden mb-8">
                <TableOfContents headings={post.headings} />
              </div>

              {/* Rendu Markdown HTML */}
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              />

              {/* Partage en fin d'article */}
              <div
                style={{
                  marginTop: '3.5rem',
                  paddingTop: '1.75rem',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <ShareButtons url={articleUrl} title={post.title} />
              </div>

              {/* Bloc Auteur */}
              <div
                style={{
                  marginTop: '3rem',
                  padding: '2rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-surface, #141414)',
                  border: '1px solid var(--color-border, #262626)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
                className="sm:flex-row sm:items-center"
              >
                <div
                  style={{
                    position: 'relative',
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid var(--color-accent, #C8F04A)',
                  }}
                >
                  <Image
                    src="/images/founder.jpg"
                    alt="Yembit Saïmon, fondateur de Digitech Web"
                    fill
                    sizes="76px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: 'var(--color-cream)',
                    }}
                  >
                    Yembit Saïmon
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-accent, #C8F04A)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Fondateur de Digitech Web
                  </div>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.55,
                      color: 'var(--color-cream-dim)',
                      margin: 0,
                    }}
                  >
                    Développeur web et entrepreneur basé à Casablanca. Conçoit et développe des sites,
                    plateformes et logiciels métiers sur mesure.
                  </p>
                  <Link
                    href="/a-propos"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.85rem',
                      color: 'var(--color-cream)',
                      textDecoration: 'none',
                      marginTop: '0.75rem',
                      fontWeight: 500,
                    }}
                    className="hover:text-[var(--color-accent)]"
                  >
                    En savoir plus sur son parcours →
                  </Link>
                </div>
              </div>

              {/* Bloc CTA : Contact + WhatsApp */}
              <div
                style={{
                  marginTop: '3.5rem',
                  padding: '2.5rem 2rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(200, 240, 74, 0.05)',
                  border: '1px solid rgba(200, 240, 74, 0.2)',
                  textAlign: 'center',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                    fontWeight: 600,
                    color: 'var(--color-cream)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Un projet web en tête ?
                </h2>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-cream-dim)',
                    maxWidth: '46ch',
                    margin: '0 auto 2rem auto',
                    lineHeight: 1.6,
                  }}
                >
                  Discutons de vos besoins et construisons ensemble une solution sur mesure, rapide et efficace.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  <Link
                    href="/contact"
                    className="btn-primary"
                    style={{ padding: '0.85rem 2rem', fontSize: '0.875rem' }}
                  >
                    Démarrer un projet
                  </Link>

                  <a
                    href="https://wa.me/212770742458"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{
                      padding: '0.85rem 1.75rem',
                      fontSize: '0.875rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>Échanger sur WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Articles similaires */}
          {relatedPosts.length > 0 && (
            <section
              style={{
                marginTop: '5rem',
                paddingTop: '3.5rem',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--color-cream)',
                  marginBottom: '2rem',
                }}
              >
                Articles recommandés
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block"
                    style={{
                      textDecoration: 'none',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      transition: 'border-color 0.25s ease',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: 'var(--color-accent)',
                        letterSpacing: '0.08em',
                        display: 'block',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {related.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--color-cream)',
                        marginBottom: '0.5rem',
                        transition: 'color 0.2s ease',
                      }}
                      className="group-hover:text-[var(--color-accent)]"
                    >
                      {related.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-cream-dim)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
