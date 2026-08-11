'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { METHOD_STEPS } from '@/lib/data';

/**
 * MethodSection — 4 étapes méthode avec progression scroll-linked.
 * La ligne de progression avance selon le scroll.
 */
export default function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setActiveStep(METHOD_STEPS.length - 1);
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP (Inchangé à 100%)
      mm.add('(min-width: 769px)', () => {
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

        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                end: 'bottom 60%',
                scrub: 1,
                onUpdate: (self) => {
                  const step = Math.floor(self.progress * METHOD_STEPS.length);
                  setActiveStep(Math.min(step, METHOD_STEPS.length - 1));
                },
              },
            }
          );
        }
      });

      // MOBILE (Déclenchement robuste + Fallback de visibilité)
      mm.add('(max-width: 768px)', () => {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );

        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                end: 'bottom 75%',
                scrub: 0.5,
                onUpdate: (self) => {
                  const step = Math.floor(self.progress * METHOD_STEPS.length);
                  setActiveStep(Math.min(step, METHOD_STEPS.length - 1));
                },
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="methode"
      aria-label="Notre méthode"
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
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', opacity: 0 }}
        >
          <span className="type-label" style={{ display: 'block', marginBottom: '1rem' }}>
            Notre méthode
          </span>
          <h2 className="type-h1" style={{ color: 'var(--color-cream)', maxWidth: '14ch' }}>
            Une méthode simple.{' '}
            <span style={{ color: 'var(--color-cream-dim)' }}>
              Une exécution exigeante.
            </span>
          </h2>
        </div>

        {/* Steps layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--grid-gutter)',
          }}
        >
          {/* Ligne de progression verticale */}
          <div
            style={{
              gridColumn: '1',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '1.5rem',
                bottom: '1.5rem',
                width: 1,
                backgroundColor: 'var(--color-border)',
              }}
            />
            <div
              ref={lineRef}
              style={{
                position: 'absolute',
                top: '1.5rem',
                bottom: '1.5rem',
                width: 1,
                backgroundColor: 'var(--color-accent)',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Étapes */}
          <div
            style={{
              gridColumn: '2 / span 11',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            {METHOD_STEPS.map((step, i) => (
              <MethodStep
                key={step.number}
                step={step}
                index={i}
                isActive={i <= activeStep}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface MethodStepProps {
  step: (typeof METHOD_STEPS)[0];
  index: number;
  isActive: boolean;
}

function MethodStep({ step, index, isActive }: MethodStepProps) {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP (100% inchangé)
      mm.add('(min-width: 769px)', () => {
        gsap.fromTo(
          stepRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: stepRef.current, start: 'top 85%' },
          }
        );
      });

      // MOBILE (Déclenchement 01 -> 04 garanti avec fallback)
      mm.add('(max-width: 768px)', () => {
        gsap.fromTo(
          stepRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, stepRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stepRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '2rem',
        alignItems: 'start',
        opacity: 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Dot */}
      <div
        aria-hidden="true"
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-surface-high)',
          border: `2px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
          marginTop: '0.3rem',
          transition: 'background-color 0.4s ease, border-color 0.4s ease',
          flexShrink: 0,
        }}
      />

      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.625rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-caption)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: isActive ? 'var(--color-accent)' : 'var(--color-cream-muted)',
              transition: 'color 0.4s ease',
            }}
          >
            {step.number}
          </span>
        </div>
        <h3
          className="type-h2"
          style={{
            color: isActive ? 'var(--color-cream)' : 'var(--color-cream-muted)',
            marginBottom: '0.75rem',
            transition: 'color 0.4s ease',
          }}
        >
          {step.title}
        </h3>
        <p
          className="type-body-lg"
          style={{
            color: isActive ? 'var(--color-cream-dim)' : 'var(--color-cream-muted)',
            maxWidth: '55ch',
            transition: 'color 0.4s ease',
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}
