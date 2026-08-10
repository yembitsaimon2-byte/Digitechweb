'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { TECHNOLOGIES } from '@/lib/data';

/* ============================================================
   Constantes & helpers
   ============================================================ */

const CATEGORY_COLOR: Record<string, string> = {
  frontend: '#C8F04A',
  backend: '#60A5FA',
  design: '#F472B6',
  infra: '#A78BFA',
};

const CATEGORY_LABEL: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  design: 'Design',
  infra: 'Infra',
};

// Duplique la liste pour créer un défilement infini fluide
const LOOP_TECHS = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES];

/**
 * TechSection — Carrousel 3D interactif
 * Objets technologiques disposés dans un espace 3D, animés avec GSAP.
 * Interaction souris, scroll-entry, autoplay infini, mobile-first.
 */
export default function TechSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<gsap.core.Tween | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  // Largeur d'une carte + gap (calculé dynamiquement)
  const CARD_W = useRef(200);
  const GAP = 20;

  /* ---------- Autoplay infini ---------- */
  const startAutoplay = useCallback(() => {
    if (!trackRef.current) return;
    if (autoplayRef.current) autoplayRef.current.kill();

    const totalWidth =
      (CARD_W.current + GAP) * TECHNOLOGIES.length;

    autoplayRef.current = gsap.to(trackRef.current, {
      x: `-=${totalWidth}`,
      duration: TECHNOLOGIES.length * 4,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          return x % totalWidth;
        }),
      },
    });
  }, []);

  /* ---------- Tilt souris ---------- */
  const onMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouseXRef.current = (e.clientX / innerWidth - 0.5) * 2;
    mouseYRef.current = (e.clientY / innerHeight - 0.5) * 2;
  }, []);

  const animateTilt = useCallback(() => {
    if (!trackRef.current) return;
    const lerpFactor = 0.06;
    targetXRef.current += (mouseXRef.current - targetXRef.current) * lerpFactor;
    targetYRef.current += (mouseYRef.current - targetYRef.current) * lerpFactor;

    // Applique la rotation globale au conteneur
    gsap.set(trackRef.current, {
      rotateY: targetXRef.current * 4,
      rotateX: -targetYRef.current * 2,
    });

    rafRef.current = requestAnimationFrame(animateTilt);
  }, []);

  /* ---------- ScrollTrigger entry ---------- */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // — Heading entrance
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
        }
      );

      if (prefersReduced) {
        // Version statique pour reduced motion
        if (trackRef.current) {
          gsap.set(trackRef.current.querySelectorAll('[data-card]'), {
            opacity: 1,
          });
        }
        return;
      }

      // — Cards entrance
      if (trackRef.current) {
        const cards = trackRef.current.querySelectorAll('[data-card]');
        gsap.fromTo(
          cards,
          { opacity: 0, z: -120, rotateY: -20 },
          {
            opacity: 1,
            z: 0,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // — Autoplay
      // Compute real card width after render
      const firstCard = trackRef.current?.querySelector<HTMLElement>('[data-card]');
      if (firstCard) {
        CARD_W.current = firstCard.getBoundingClientRect().width;
      }
      startAutoplay();

      // — Mouse interaction (desktop only)
      const isTouchDevice = window.matchMedia('(hover: none)').matches;
      if (!isTouchDevice) {
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        rafRef.current = requestAnimationFrame(animateTilt);
      }

      // — Pause on hover
      const section = sectionRef.current;
      const handleMouseEnter = () => {
        if (autoplayRef.current) {
          gsap.to(autoplayRef.current, { timeScale: 0.15, duration: 0.8 });
          isPausedRef.current = true;
        }
      };
      const handleMouseLeave = () => {
        if (autoplayRef.current) {
          gsap.to(autoplayRef.current, { timeScale: 1, duration: 1.5 });
          isPausedRef.current = false;
        }
        // Reset tilt smoothly
        gsap.to(trackRef.current, { rotateY: 0, rotateX: 0, duration: 1.2, ease: 'power3.out' });
      };
      section?.addEventListener('mouseenter', handleMouseEnter);
      section?.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        section?.removeEventListener('mouseenter', handleMouseEnter);
        section?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
      autoplayRef.current?.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [startAutoplay, onMouseMove, animateTilt]);

  return (
    <section
      ref={sectionRef}
      id="technologies"
      aria-label="Technologies utilisées"
      style={{
        paddingBlock: 'var(--section-lg)',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        overflow: 'hidden',
      }}
    >
      {/* ——— Heading ——— */}
      <div style={{ paddingInline: 'var(--grid-gutter)', maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div
          ref={headingRef}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-[var(--grid-gutter)]"
        >
          <div className="col-span-1 md:col-span-5">
            <span className="type-label" style={{ display: 'block', marginBottom: '1rem' }}>
              Technologies
            </span>
            <h2 className="type-h1" style={{ color: 'var(--color-cream)' }}>
              La technologie au service{' '}
              <span style={{ color: 'var(--color-cream-dim)' }}>{"de l'idée."}</span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-5 md:col-start-7 flex flex-col justify-end gap-4">
            <p className="type-lead">
              Nous utilisons les technologies les plus adaptées à chaque projet pour
              construire des expériences rapides, fiables et évolutives.
            </p>
            <p
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-cream-muted)',
                fontStyle: 'italic',
              }}
            >
              Nous choisissons la technologie en fonction du projet, pas {"l'inverse"}.
            </p>
          </div>
        </div>
      </div>

      {/* ——— Carrousel 3D ——— */}
      <div
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          paddingBlock: 'clamp(2rem, 4vw, 3.5rem)',
          /* Masque les bords pour un fondu élégant */
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
        aria-hidden="false"
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: GAP,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            width: 'max-content',
          }}
        >
          {LOOP_TECHS.map((tech, i) => (
            <TechCard key={`${tech.name}-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      {/* Légende catégories */}
      <div
        style={{
          paddingInline: 'var(--grid-gutter)',
          maxWidth: 'var(--container)',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}
      >
        {Object.entries(CATEGORY_COLOR).map(([cat, color]) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: color,
                display: 'block',
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-caption)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-cream-muted)',
              }}
            >
              {CATEGORY_LABEL[cat]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   TechCard — carte 3D individuelle
   ============================================================ */
function TechCard({ tech }: { tech: (typeof TECHNOLOGIES)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const color = CATEGORY_COLOR[tech.category] ?? '#C8F04A';

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1.06,
      z: 40,
      rotateY: 6,
      rotateX: -3,
      boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 24px ${color}30`,
      borderColor: color,
      duration: 0.4,
      ease: 'power2.out',
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0.25, duration: 0.4 });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1,
      z: 0,
      rotateY: 0,
      rotateX: 0,
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      borderColor: 'rgba(255,255,255,0.07)',
      duration: 0.6,
      ease: 'power3.out',
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
    }
  };

  return (
    <div
      ref={cardRef}
      data-card
      role="listitem"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 'clamp(150px, 18vw, 200px)',
        padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
        backgroundColor: 'var(--color-surface-elevated)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        cursor: 'default',
        transformStyle: 'preserve-3d',
        opacity: 0,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'none', // GSAP gère tout
        userSelect: 'none',
      }}
    >
      {/* Glow overlay */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'var(--radius-lg)',
          background: `radial-gradient(circle at 50% 50%, ${color}40 0%, transparent 70%)`,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Dot catégorie */}
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: color,
          display: 'block',
          flexShrink: 0,
          boxShadow: `0 0 8px ${color}80`,
        }}
        aria-hidden="true"
      />

      {/* Nom */}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.875rem, 1.5vw, 1.0625rem)',
          fontWeight: 600,
          color: 'var(--color-cream)',
          letterSpacing: 'var(--tracking-normal)',
          lineHeight: 1.2,
        }}
      >
        {tech.name}
      </span>

      {/* Catégorie */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
          color: color,
          opacity: 0.7,
        }}
      >
        {tech.category}
      </span>
    </div>
  );
}
