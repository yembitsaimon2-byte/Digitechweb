'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const PRINCIPLES = [
  {
    number: '01',
    title: 'Sur mesure',
    description: 'Aucune solution standard lorsque votre projet mérite une réponse pensée pour lui.',
  },
  {
    number: '02',
    title: 'Design & Technologie',
    description: 'Nous pensons la direction artistique et l\'ingénierie comme une seule expérience.',
  },
  {
    number: '03',
    title: 'Performance',
    description: 'Des produits rapides, accessibles et conçus pour évoluer.',
  },
  {
    number: '04',
    title: 'Vision business',
    description: 'Chaque décision digitale doit servir un objectif concret.',
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
        }
      );

      if (listRef.current) {
        const items = listRef.current.querySelectorAll('[data-why-item]');
        tl.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.6'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pourquoi"
      aria-label="Pourquoi nous choisir"
      style={{
        paddingBlock: 'var(--section-lg)',
        paddingInline: 'var(--grid-gutter)',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-black)',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-[var(--grid-gutter)] items-start">
          
          {/* Titre de section */}
          <div ref={headingRef} className="col-span-12 md:col-span-5" style={{ opacity: 0 }}>
            <span className="type-label" style={{ display: 'block', marginBottom: '1.5rem' }}>
              Philosophie
            </span>
            <h2 className="type-h1" style={{ color: 'var(--color-cream)', maxWidth: '16ch' }}>
              Plus qu'un prestataire.{' '}
              <span style={{ color: 'var(--color-cream-dim)' }}>Un partenaire digital.</span>
            </h2>
          </div>

          {/* Liste des principes */}
          <div
            ref={listRef}
            className="col-span-12 md:col-span-6 md:col-start-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10"
          >
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                data-why-item
                style={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-caption)',
                      color: 'var(--color-accent)',
                      border: '1px solid rgba(200, 240, 74, 0.2)',
                      padding: '0.125rem 0.375rem',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {principle.number}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-body-lg)',
                      fontWeight: 600,
                      color: 'var(--color-cream)',
                    }}
                  >
                    {principle.title}
                  </h3>
                </div>
                <p
                  className="type-body"
                  style={{
                    color: 'var(--color-cream-dim)',
                    lineHeight: 1.6,
                  }}
                >
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
