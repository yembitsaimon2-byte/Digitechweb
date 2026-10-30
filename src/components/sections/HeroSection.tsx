'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

// Three.js canvas — chargé dynamiquement (no SSR)
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
});

/**
 * HeroSection — Section principale de la page d'accueil.
 * Titre immense, sous-titre, 2 CTAs, canvas WebGL en fond.
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Canvas Three.js : activé uniquement sur Desktop pour maximiser le score Lighthouse mobile
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDesktop = window.innerWidth >= 768;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isDesktop && !prefersReduced) {
        setShowCanvas(true);
      }
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0
      );
      tl.fromTo(
        line1Ref.current,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' },
        0.15
      );
      tl.fromTo(
        line2Ref.current,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' },
        0.3
      );
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.6
      );
      tl.fromTo(
        ctasRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        0.8
      );
      tl.fromTo(
        mediaRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        0.5
      );
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        1.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction Digitech Web"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(6rem, 10vw, 10rem)',
        paddingBottom: 'clamp(4rem, 6vw, 6rem)',
        paddingInline: 'var(--grid-gutter)',
        overflow: 'hidden',
      }}
    >
      {/* Canvas WebGL — chargé dynamiquement sur desktop, désactivé sur mobile */}
      {showCanvas && <HeroCanvas />}

      {/* Subtle grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: 'clamp(40px, 6vw, 80px) clamp(40px, 6vw, 80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Gradient overlay — fond vers le bas */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to bottom, transparent, var(--color-black))',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 'var(--container)',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--grid-gutter)',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Colonne gauche — Texte */}
          <div style={{ gridColumn: 'span 7' }} className="hero-left">
            {/* Label */}
            <span
              ref={labelRef}
              className="type-label"
              style={{ display: 'block', marginBottom: '2rem', opacity: 0 }}
            >
              Studio digital
            </span>

            {/* Titre principal — coupé en deux lignes fluides pour l'animation GSAP */}
            <h1
              className="type-display"
              style={{
                color: 'var(--color-cream)',
                fontSize: 'clamp(2.15rem, 3.8vw, 3.6rem)',
                lineHeight: 1.15,
                maxWidth: '44ch',
                marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              }}
            >
              <span
                style={{ display: 'block', overflow: 'hidden' }}
              >
                <span ref={line1Ref} style={{ display: 'block', opacity: 0 }}>
                  Nous digitalisons votre activité pour vous aider
                </span>
              </span>
              <span
                style={{ display: 'block', overflow: 'hidden' }}
              >
                <span ref={line2Ref} style={{ display: 'block', opacity: 0 }}>
                  à mieux{' '}
                  <em
                    style={{
                      fontStyle: 'normal',
                      color: 'var(--color-accent)',
                      display: 'inline',
                    }}
                  >
                    vendre
                  </em>
                  , mieux travailler et mieux grandir.
                </span>
              </span>
            </h1>

            {/* Sous-titre */}
            <p
              ref={subtitleRef}
              className="type-lead"
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.2rem)',
                lineHeight: 1.6,
                maxWidth: '52ch',
                marginBottom: 'clamp(2rem, 3.5vw, 2.75rem)',
                opacity: 0,
                color: 'var(--color-cream-dim)',
              }}
            >
              Sites web, applications, logiciels sur mesure et plateformes digitales : nous créons les outils dont votre entreprise a besoin pour atteindre ses objectifs, servir ses clients et accélérer sa croissance.
            </p>

            {/* CTAs */}
            <div
              ref={ctasRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                opacity: 0,
              }}
            >
              <Link href="/contact" className="btn-primary" id="hero-cta-primary">
                Démarrer un projet
              </Link>
              <Link href="/realisations" className="btn-ghost" id="hero-cta-secondary">
                Découvrir nos réalisations
              </Link>
            </div>
          </div>

          {/* Colonne droite — Aperçu vidéo projet */}
          <div
            ref={mediaRef}
            style={{
              gridColumn: '8 / span 5',
              opacity: 0,
            }}
            className="hero-right"
          >
            <div
              style={{
                backgroundColor: 'var(--color-surface-elevated)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  backgroundColor: 'var(--color-surface)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <video
                  ref={videoRef}
                  src="/videos/sushi-sensation.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: 'var(--color-surface)',
                  }}
                />
              </div>

              {/* Barre d'information sous la vidéo */}
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  borderTop: '1px solid var(--color-border)',
                  backgroundColor: 'rgba(22, 22, 22, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-body)',
                      fontWeight: 700,
                      color: 'var(--color-cream)',
                      letterSpacing: 'var(--tracking-wide)',
                      textTransform: 'uppercase',
                    }}
                  >
                    SUSHI SENSATION
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-caption)',
                      color: 'var(--color-accent)',
                      letterSpacing: 'var(--tracking-wider)',
                      textTransform: 'uppercase',
                      marginTop: '0.125rem',
                    }}
                  >
                    SITE WEB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Tablette : passe en colonne unique dès ≤ 1024px */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .hero-left, .hero-right {
            grid-column: span 12 !important;
          }
        }
        /* Mobile : réduit les paddings verticaux du Hero */
        @media (max-width: 768px) {
          .hero-grid {
            gap: 2rem !important;
          }
        }
      `}</style>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontSize: 'var(--text-caption)',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase',
            color: 'var(--color-cream-muted)',
          }}
        >
          Défiler
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            backgroundColor: 'var(--color-cream-muted)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.2; transform: scaleY(1); }
            50% { opacity: 0.8; transform: scaleY(0.6); }
          }
        `}</style>
      </div>
    </section>
  );
}
