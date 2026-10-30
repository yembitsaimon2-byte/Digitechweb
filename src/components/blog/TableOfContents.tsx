'use client';

import { useState, useEffect } from 'react';
import type { HeadingItem } from '@/lib/blog';

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-80px 0% -65% 0%',
        threshold: 0,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const navOffset = 90;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  return (
    <nav
      aria-label="Table des matières"
      style={{
        backgroundColor: 'var(--color-surface, #141414)',
        border: '1px solid var(--color-border, #262626)',
        borderRadius: '8px',
        padding: '1.25rem 1.5rem',
      }}
    >
      {/* Mobile toggle header */}
      <div
        className="flex items-center justify-between cursor-pointer md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent, #39e58c)',
            }}
          />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-cream, #f5f5f0)',
              margin: 0,
            }}
          >
            Sommaire
          </h2>
        </div>

        {/* Toggle chevron (visible on mobile) */}
        <span
          className="md:hidden text-xs text-neutral-400"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.25s ease',
          }}
        >
          ▼
        </span>
      </div>

      {/* Heading list */}
      <ul
        className={`${isOpen ? 'block' : 'hidden'} md:block`}
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '1rem 0 0 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          borderTop: '1px solid var(--color-border, #262626)',
          paddingTop: '0.85rem',
        }}
      >
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.level === 3;

          return (
            <li
              key={heading.id}
              style={{
                paddingLeft: isH3 ? '1rem' : '0',
                fontSize: isH3 ? '0.85rem' : '0.9rem',
                lineHeight: 1.4,
              }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => scrollToHeading(e, heading.id)}
                style={{
                  color: isActive
                    ? 'var(--color-accent, #39e58c)'
                    : 'var(--color-cream-dim, #a3a3a3)',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  fontWeight: isActive ? 500 : 400,
                }}
                className="hover:text-[var(--color-cream)] hover:translate-x-0.5"
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
