'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const EXPERTISES = [
  {
    category: 'Design',
    items: ['UX/UI', 'Direction artistique', 'Branding', 'Design systems'],
  },
  {
    category: 'Technologie',
    items: ['Web', 'Mobile', 'Logiciels sur mesure', 'SaaS', 'Architecture digitale'],
  },
  {
    category: 'Stratégie',
    items: ['Audit', 'Positionnement', 'Transformation digitale', 'Acquisition'],
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll('[data-expertise-col]');
        tl.fromTo(
          columns,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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
      id="expertise"
      aria-label="Notre expertise"
      style={{
        paddingBlock: 'var(--section-lg)',
        paddingInline: 'var(--grid-gutter)',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        
        {/* Header */}
        <div
          ref={headingRef}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', opacity: 0 }}
        >
          <span className="type-label" style={{ display: 'block', marginBottom: '1rem' }}>
            Compétences
          </span>
          <h2 className="type-h1" style={{ color: 'var(--color-cream)' }}>
            Domaines {"d'expertise"}.
          </h2>
        </div>

        {/* Grille expertise */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {EXPERTISES.map((exp, index) => (
            <div
              key={exp.category}
              data-expertise-col
              style={{
                opacity: 0,
                borderTop: '1px solid var(--color-border)',
                paddingTop: '2rem',
              }}
              className="flex flex-col gap-6"
            >
              <div className="flex justify-between items-baseline">
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 600,
                    letterSpacing: 'var(--tracking-tight)',
                    color: 'var(--color-cream)',
                  }}
                >
                  {exp.category}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-caption)',
                    color: 'var(--color-cream-muted)',
                  }}
                >
                  {`0${index + 1}`}
                </span>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {exp.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: 'var(--text-body)',
                      color: 'var(--color-cream-dim)',
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent)',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
