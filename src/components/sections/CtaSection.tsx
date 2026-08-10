'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * CtaSection — Section finale avec titre immense.
 * Animation de révélation au scroll très impactante.
 */
export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Titre — révélation par lines
      const titleWords = titleRef.current?.querySelectorAll('[data-word]');
      if (titleWords) {
        gsap.fromTo(
          titleWords,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1.1,
            stagger: 0.08,
            ease: 'power4.out',
            scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
          }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' },
          delay: 0.4,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="demarrer"
      aria-label="Démarrer un projet avec Digitech Web"
      style={{
        paddingBlock: 'var(--section-lg)',
        paddingInline: 'var(--grid-gutter)',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fond accent subtle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,240,74,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', position: 'relative' }}>
        {/* Titre géant */}
        <h2
          ref={titleRef}
          aria-label="Votre prochaine idée mérite une vraie expérience digitale."
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-giant)',
            fontWeight: 700,
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 0.95,
            color: 'var(--color-cream)',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            overflow: 'hidden',
          }}
        >
          {['Votre', 'prochaine', 'idée', 'mérite', 'une vraie', 'expérience', 'digitale.'].map(
            (word, i) => (
              <span
                key={i}
                style={{ display: 'block', overflow: 'hidden' }}
              >
                <span
                  data-word
                  style={{
                    display: 'block',
                    color: word === 'digitale.' ? 'var(--color-accent)' : 'var(--color-cream)',
                  }}
                >
                  {word}
                </span>
              </span>
            )
          )}
        </h2>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <Link
            href="/contact"
            className="btn-primary"
            id="final-cta"
            magnetic-button="true"
            style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              padding: 'clamp(0.875rem, 2vw, 1.25rem) clamp(2rem, 4vw, 3rem)',
            }}
          >
            Démarrer un projet
          </Link>
        </div>
      </div>
    </section>
  );
}
