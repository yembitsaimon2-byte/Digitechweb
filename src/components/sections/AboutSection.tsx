'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

/**
 * AboutSection — Fondateur + Vision sur la page d'accueil.
 * Présentation éditoriale, pas une carte de profil.
 */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.15,
          ease: 'power4.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="a-propos"
      aria-label="À propos de Digitech Web"
      style={{
        paddingBlock: 'var(--section-lg)',
        paddingInline: 'var(--grid-gutter)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* En-tête de section */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <span className="type-label" style={{ display: 'block', marginBottom: '1rem' }}>
            Derrière l'agence
          </span>
          <h2 className="type-h1" style={{ color: 'var(--color-cream)', maxWidth: '16ch' }}>
            Derrière Digitech Web,{' '}
            <span style={{ color: 'var(--color-cream-dim)' }}>une vision.</span>
          </h2>
        </div>

        {/* Grille fondateur */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--grid-gutter)',
            alignItems: 'start',
          }}
          className="about-founder-grid"
        >
          {/* Portrait — emplacement identifiable */}
          <div
            ref={leftRef}
            style={{
              gridColumn: 'span 5',
              opacity: 0,
            }}
            className="about-portrait-col"
          >
            <div
              aria-label="Portrait de YEMBIT Saimon"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                backgroundColor: 'var(--color-surface-elevated)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem',
              }}
              className="about-portrait-frame"
            >
              <img
                src="https://i.ibb.co/VcZ2xZsk/SAIMONNNN.jpg"
                alt="YEMBIT Saimon — Fondateur de Digitech Web"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
              {/* Barre accent en bas */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  backgroundColor: 'var(--color-accent)',
                }}
              />
            </div>
          </div>

          {/* Texte fondateur */}
          <div
            ref={rightRef}
            style={{
              gridColumn: '7 / span 6',
              opacity: 0,
              paddingTop: 'clamp(0.5rem, 3vw, 3rem)',
            }}
            className="about-text-col"
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                fontWeight: 600,
                color: 'var(--color-cream)',
                letterSpacing: 'var(--tracking-normal)',
                marginBottom: '0.25rem',
              }}
            >
              YEMBIT Saimon
            </p>
            <p
              className="type-small"
              style={{ color: 'var(--color-accent)', marginBottom: '2rem' }}
            >
              Fondateur et directeur créatif
            </p>

            <p className="type-body-lg" style={{ color: 'var(--color-cream-dim)', marginBottom: '2rem' }}>
              Digitech Web est une agence digitale née d'une ambition simple : créer des
              expériences numériques qui combinent créativité, technologie et impact.
            </p>

            <p className="type-body" style={{ color: 'var(--color-cream-dim)', marginBottom: '3rem' }}>
              Passionné par le digital, le design et l'innovation, YEMBIT Saimon a fondé
              Digitech Web avec la volonté de réunir créativité, technologie et vision
              stratégique au sein d'un même studio.
            </p>

            {/* Citation */}
            <blockquote
              ref={quoteRef}
              style={{
                borderLeft: '2px solid var(--color-accent)',
                paddingLeft: '1.5rem',
                marginBottom: '3rem',
                opacity: 0,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  fontWeight: 500,
                  color: 'var(--color-cream)',
                  fontStyle: 'italic',
                  letterSpacing: 'var(--tracking-normal)',
                  lineHeight: 1.4,
                }}
              >
                «&nbsp;Le digital ne devrait pas seulement fonctionner.
                Il devrait laisser une impression.&nbsp;»
              </p>
            </blockquote>

            {/* Vision */}
            <div
              style={{
                borderTop: '1px solid var(--color-border)',
                paddingTop: '2rem',
              }}
            >
              <span className="type-label" style={{ display: 'block', marginBottom: '1rem' }}>
                Notre vision
              </span>
              <p className="type-body" style={{ color: 'var(--color-cream-dim)', marginBottom: '1.5rem' }}>
                Créer des expériences digitales qui ne se contentent pas d'exister, mais
                qui donnent aux marques les moyens de se démarquer, de grandir et d'évoluer.
              </p>
              <Link href="/a-propos" className="btn-link" id="about-link">
                En savoir plus
                <span aria-hidden="true" style={{ marginLeft: '0.25rem' }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .about-founder-grid {
            grid-template-columns: 1fr !important;
          }
          .about-portrait-col {
            grid-column: span 12 !important;
            grid-row: 1 !important;
          }
          .about-portrait-frame {
            max-height: 400px;
            aspect-ratio: auto !important;
          }
          .about-text-col {
            grid-column: span 12 !important;
            grid-row: 2 !important;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
