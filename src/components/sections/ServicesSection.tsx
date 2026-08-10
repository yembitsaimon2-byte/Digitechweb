'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { SERVICES } from '@/lib/data';

/**
 * ServicesSection — Présentation éditoriale en liste interactive.
 * Chaque service : numéro + titre + expand au hover.
 * Pas de cards génériques — design éditorial.
 */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Nos services"
      style={{
        paddingBlock: 'var(--section-lg)',
        paddingInline: 'var(--grid-gutter)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={headingRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--grid-gutter)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: 0,
          }}
          className="services-header-grid"
        >
          <div style={{ gridColumn: 'span 5' }} className="services-header-left">
            <span className="type-label" style={{ display: 'block', marginBottom: '1rem' }}>
              Ce que nous construisons
            </span>
            <h2 className="type-h1" style={{ color: 'var(--color-cream)' }}>
              Services
            </h2>
          </div>
          <div style={{ gridColumn: '7 / span 5', display: 'flex', alignItems: 'flex-end' }} className="services-header-right">
            <p className="type-lead">
              Des solutions digitales conçues autour de vos objectifs, de vos utilisateurs
              et de votre activité.
            </p>
          </div>
        </div>

        {/* Liste services */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {SERVICES.map((service, i) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={i}
              isActive={activeService === service.id}
              onHover={(id) => setActiveService(id)}
              onLeave={() => setActiveService(null)}
              onToggle={(id) => setActiveService(activeService === id ? null : id)}
            />
          ))}
        </ul>

        {/* CTA */}
        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center' }}>
          <Link href="/services" className="btn-ghost" id="services-cta">
            Voir tous nos services
          </Link>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .services-header-grid {
            grid-template-columns: 1fr !important;
          }
          .services-header-left,
          .services-header-right {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}

interface ServiceItemProps {
  service: (typeof SERVICES)[0];
  index: number;
  isActive: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  onToggle: (id: string) => void;
}

function ServiceItem({ service, index, isActive, onHover, onLeave, onToggle }: ServiceItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: itemRef.current, start: 'top 88%' },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <li
      ref={itemRef}
      style={{
        borderTop: '1px solid var(--color-border)',
        opacity: 0,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        onMouseEnter={() => onHover(service.id)}
        onMouseLeave={onLeave}
        onClick={() => onToggle(service.id)}
        onFocus={() => onHover(service.id)}
        onBlur={onLeave}
        onKeyDown={(e) => e.key === 'Enter' && onToggle(service.id)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: '2rem',
          alignItems: 'center',
          padding: 'clamp(1.25rem, 2.5vw, 2rem) 0',
          cursor: 'pointer',
        }}
        className="service-item-row"
      >
        {/* Numéro */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-small)',
            fontWeight: 600,
            color: isActive ? 'var(--color-accent)' : 'var(--color-cream-muted)',
            letterSpacing: 'var(--tracking-wide)',
            transition: 'color 0.3s ease',
            minWidth: '2rem',
          }}
        >
          {service.number}
        </span>

        {/* Titre + description expand */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-tight)',
              color: isActive ? 'var(--color-cream)' : 'var(--color-cream-dim)',
              transition: 'color 0.3s ease',
              marginBottom: isActive ? '0.75rem' : 0,
              transition2: 'margin 0.3s ease',
            } as React.CSSProperties}
          >
            {service.title}
          </h3>

          {/* Description — visible quand actif */}
          <div
            ref={contentRef}
            style={{
              overflow: 'hidden',
              maxHeight: isActive ? '200px' : 0,
              transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <p
              className="type-body"
              style={{
                color: 'var(--color-cream-dim)',
                marginBottom: '0.75rem',
                maxWidth: '60ch',
              }}
            >
              {service.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {service.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: 'var(--text-caption)',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    color: 'var(--color-cream-muted)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.25rem 0.75rem',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Flèche */}
        <span
          style={{
            color: isActive ? 'var(--color-accent)' : 'var(--color-cream-muted)',
            transition: 'color 0.3s ease, transform 0.3s ease',
            transform: isActive ? 'rotate(-45deg)' : 'rotate(0deg)',
            fontSize: '1.25rem',
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          →
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .service-item-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </li>
  );
}
