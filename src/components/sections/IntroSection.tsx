'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const WORDS = ['Imaginer.', 'Construire.', 'Transformer.'];

/**
 * IntroSection — "Le digital, pensé autrement."
 * Reveal typographique progressif des 3 mots clés.
 */
export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Titre
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );

      // Texte
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
          delay: 0.2,
        }
      );

      // Mots — apparaissent l'un après l'autre au scroll
      wordRefs.current.forEach((word, i) => {
        if (!word) return;
        gsap.fromTo(
          word,
          { opacity: 0, y: '60%' },
          {
            opacity: 1,
            y: '0%',
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: word.parentElement,
              start: 'top 75%',
            },
            delay: i * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Notre approche"
      style={{
        paddingBlock: 'var(--section-lg)',
        paddingInline: 'var(--grid-gutter)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--grid-gutter)',
          alignItems: 'start',
        }}
        className="intro-grid"
      >
        {/* Titre gauche */}
        <div style={{ gridColumn: 'span 5' }} className="intro-left">
          <h2
            ref={titleRef}
            className="type-h1"
            style={{
              color: 'var(--color-cream)',
              opacity: 0,
            }}
          >
            Le digital,{' '}
            <span style={{ color: 'var(--color-cream-dim)' }}>pensé autrement.</span>
          </h2>
        </div>

        {/* Texte + mots clés droite */}
        <div
          style={{
            gridColumn: '7 / span 6',
            paddingTop: 'clamp(0.5rem, 2vw, 2rem)',
          }}
          className="intro-right"
        >
          <p
            ref={textRef}
            className="type-body-lg"
            style={{
              color: 'var(--color-cream-dim)',
              marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
              opacity: 0,
            }}
          >
            Nous combinons stratégie, design et technologie pour créer des expériences
            digitales qui ont du sens — pour les utilisateurs comme pour les entreprises.
          </p>

          {/* Mots clés reveal */}
          <div
            aria-label="Notre philosophie : Imaginer, Construire, Transformer"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
          >
            {WORDS.map((word, i) => (
              <div
                key={word}
                style={{ overflow: 'hidden', lineHeight: 1 }}
              >
                <span
                  ref={(el) => { wordRefs.current[i] = el; }}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.25rem, 8vw, 4.5rem)',
                    fontWeight: 700,
                    letterSpacing: 'var(--tracking-tight)',
                    color: i === WORDS.length - 1 ? 'var(--color-accent)' : 'var(--color-cream)',
                    opacity: 0,
                    paddingBottom: '0.1em',
                  }}
                  className="intro-word"
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .intro-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .intro-left,
          .intro-right {
            grid-column: span 12 !important;
            padding-top: 0 !important;
          }
          .intro-word {
            font-size: clamp(2rem, 9vw, 3.25rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
