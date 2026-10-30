'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogListClientProps {
  initialPosts: BlogPostMeta[];
}

const ALL_CATEGORIES = ['Tous', 'Portrait', 'Services', 'Études de cas', 'Conseils'] as const;

export default function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  // N'affiche que les catégories qui ont au moins un article (plus "Tous")
  const activeCategories = useMemo(() => {
    const presentCategories = new Set(initialPosts.map((p) => p.category));
    return ALL_CATEGORIES.filter((cat) => cat === 'Tous' || presentCategories.has(cat));
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'Tous') return initialPosts;
    return initialPosts.filter((p) => p.category === selectedCategory);
  }, [initialPosts, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div>
      {/* Category filters */}
      {activeCategories.length > 1 && (
        <div
          role="tablist"
          aria-label="Filtrer par catégorie"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '3rem',
          }}
        >
          {activeCategories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  padding: '0.5rem 1.15rem',
                  borderRadius: '9999px',
                  backgroundColor: isSelected ? 'var(--color-cream, #f5f5f0)' : 'var(--color-surface, #141414)',
                  color: isSelected ? 'var(--color-black, #0a0a0a)' : 'var(--color-cream-dim, #a3a3a3)',
                  border: isSelected
                    ? '1px solid var(--color-cream, #f5f5f0)'
                    : '1px solid var(--color-border, #262626)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      {/* Featured post (À la une) */}
      {featuredPost && (
        <div style={{ marginBottom: '4rem' }}>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block"
            style={{
              textDecoration: 'none',
              backgroundColor: 'var(--color-surface, #141414)',
              border: '1px solid var(--color-border, #262626)',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'border-color 0.3s ease, transform 0.3s ease',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image container */}
              <div
                className="lg:col-span-7 relative overflow-hidden"
                style={{
                  minHeight: '280px',
                  maxHeight: '440px',
                  backgroundColor: 'var(--color-surface-hover, #1a1a1a)',
                }}
              >
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.coverAlt || featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="group-hover:scale-105"
                />
                {featuredPost.status === 'draft' && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.9)',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px',
                      zIndex: 2,
                    }}
                  >
                    Brouillon
                  </span>
                )}
              </div>

              {/* Text content */}
              <div
                className="lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--color-accent, #39e58c)',
                      }}
                    >
                      {featuredPost.category}
                    </span>
                    <span style={{ color: 'var(--color-cream-muted)', fontSize: '0.75rem' }}>•</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        color: 'var(--color-cream-muted, #737373)',
                      }}
                    >
                      À la une
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.35rem, 2vw, 1.85rem)',
                      fontWeight: 600,
                      lineHeight: 1.25,
                      color: 'var(--color-cream, #f5f5f0)',
                      marginBottom: '1rem',
                      transition: 'color 0.2s ease',
                    }}
                    className="group-hover:text-[var(--color-accent)]"
                  >
                    {featuredPost.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      color: 'var(--color-cream-dim, #a3a3a3)',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {featuredPost.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '2rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--color-border, #262626)',
                    fontSize: '0.8rem',
                    color: 'var(--color-cream-muted, #737373)',
                  }}
                >
                  <span>{formatDate(featuredPost.date)}</span>
                  <span>{featuredPost.readingTime} min de lecture</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid of other posts */}
      {gridPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--color-surface, #141414)',
                border: '1px solid var(--color-border, #262626)',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-surface-hover, #1a1a1a)',
                }}
              >
                <Image
                  src={post.coverImage}
                  alt={post.coverAlt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="group-hover:scale-105"
                />
                {post.status === 'draft' && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.9)',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    Brouillon
                  </span>
                )}
              </div>

              {/* Body */}
              <div
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--color-accent, #39e58c)',
                      display: 'block',
                      marginBottom: '0.6rem',
                    }}
                  >
                    {post.category}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      lineHeight: 1.35,
                      color: 'var(--color-cream, #f5f5f0)',
                      marginBottom: '0.75rem',
                      transition: 'color 0.2s ease',
                    }}
                    className="group-hover:text-[var(--color-accent)]"
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      lineHeight: 1.55,
                      color: 'var(--color-cream-dim, #a3a3a3)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border, #262626)',
                    fontSize: '0.75rem',
                    color: 'var(--color-cream-muted, #737373)',
                  }}
                >
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readingTime} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div
          style={{
            padding: '4rem 1rem',
            textAlign: 'center',
            color: 'var(--color-cream-dim, #a3a3a3)',
          }}
        >
          <p>
            {selectedCategory === 'Tous'
              ? 'Aucun article pour le moment. Revenez bientôt.'
              : 'Aucun article trouvé dans cette catégorie pour le moment.'}
          </p>
        </div>
      )}
    </div>
  );
}
