'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { PROJECTS } from '@/lib/data';
import type { Project } from '@/types';

interface CaseStudyViewProps {
  project: Project;
}

export default function CaseStudyView({ project }: CaseStudyViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickySectionRef = useRef<HTMLElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Prochain projet pour la conclusion
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  // Regrouper la vidéo (si présente) et les images dans une liste unique de médias
  const mediaList: { type: 'video' | 'image'; src: string }[] = [];
  if (project.video) {
    mediaList.push({ type: 'video', src: project.video });
  }
  if (project.images) {
    project.images.forEach((img) => mediaList.push({ type: 'image', src: img }));
  }

  const totalMedia = mediaList.length;

  useEffect(() => {
    if (typeof window === 'undefined' || totalMedia <= 1) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const mediaItems = gsap.utils.toArray<HTMLElement>('.cs-media-item');

      // DESKTOP (Inchangé à 100%)
      mm.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickySectionRef.current,
            start: 'top top',
            end: `+=${totalMedia * 100}%`,
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              const idx = Math.min(
                Math.floor(self.progress * totalMedia),
                totalMedia - 1
              );
              setActiveIndex(idx);
            },
          },
        });

        mediaItems.forEach((item, i) => {
          if (i === 0) {
            gsap.set(item, { opacity: 1, scale: 1, y: '0%' });
          } else {
            gsap.set(item, { opacity: 0, scale: 0.96, y: '3%' });

            tl.to(
              mediaItems[i - 1],
              {
                opacity: 0,
                scale: 0.97,
                y: '-2%',
                duration: 1,
                ease: 'power2.inOut',
              },
              i - 0.2
            ).to(
              item,
              {
                opacity: 1,
                scale: 1,
                y: '0%',
                duration: 1,
                ease: 'power2.inOut',
              },
              i - 0.2
            );
          }
        });
      });

      // MOBILE (Sticky adapté au geste tactile — 1 média à la fois)
      mm.add('(max-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickySectionRef.current,
            start: 'top top+=60px',
            end: `+=${totalMedia * 65}%`,
            pin: true,
            scrub: 0.4,
            onUpdate: (self) => {
              const idx = Math.min(
                Math.floor(self.progress * totalMedia),
                totalMedia - 1
              );
              setActiveIndex(idx);
            },
          },
        });

        mediaItems.forEach((item, i) => {
          if (i === 0) {
            gsap.set(item, { opacity: 1, scale: 1, y: '0%' });
          } else {
            gsap.set(item, { opacity: 0, scale: 0.98, y: '2%' });

            tl.to(
              mediaItems[i - 1],
              {
                opacity: 0,
                scale: 0.98,
                y: '-1%',
                duration: 1,
                ease: 'power1.inOut',
              },
              i - 0.15
            ).to(
              item,
              {
                opacity: 1,
                scale: 1,
                y: '0%',
                duration: 1,
                ease: 'power1.inOut',
              },
              i - 0.15
            );
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [totalMedia, project.slug]);

  return (
    <div ref={containerRef} className="case-study-page">
      {/* ------------------------------------------------------------
         1. HERO DE LA CASE STUDY — ÉLÉGANT & AÉRÉ
         ------------------------------------------------------------ */}
      <section
        style={{
          paddingTop: 'clamp(7rem, 12vw, 11rem)',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
          paddingInline: 'var(--grid-gutter)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <Link
            href="/realisations"
            className="btn-link"
            style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center' }}
          >
            <span aria-hidden="true" style={{ marginRight: '0.5rem' }}>←</span>
            Retour aux réalisations
          </Link>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'var(--grid-gutter)',
              alignItems: 'end',
              marginTop: '1rem',
            }}
            className="cs-hero-grid"
          >
            <div style={{ gridColumn: 'span 7' }} className="cs-hero-left">
              <span className="type-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                {project.category} — {project.number}
              </span>
              <h1
                className="type-display"
                style={{
                  color: 'var(--color-cream)',
                  textTransform: 'uppercase',
                  fontSize: 'clamp(2.25rem, 5vw, 4.25rem)',
                  lineHeight: 1.05,
                }}
              >
                {project.title}
              </h1>
            </div>

            <div style={{ gridColumn: '8 / span 5' }} className="cs-hero-right">
              <p className="type-lead" style={{ color: 'var(--color-cream-dim)', fontSize: 'var(--text-body-lg)' }}>
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------
         2. ZONE MÉDIA UNIQUE — UN SEUL VISUEL À LA FOIS (SCROLL STORYTELLING)
         ------------------------------------------------------------ */}
      {totalMedia > 0 && (
        <section
          ref={stickySectionRef}
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingInline: 'var(--grid-gutter)',
            paddingBlock: '2rem',
            overflow: 'hidden',
          }}
          className="cs-sticky-section"
        >
          {/* Conteneur de taille maîtrisée avec espace négatif généreux */}
          <div
            style={{
              width: '100%',
              maxWidth: '1120px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Header de la zone média : indicateur de progression minimaliste */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingInline: '0.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-caption)',
                  color: 'var(--color-cream-muted)',
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                }}
              >
                Storytelling Visuel
              </span>

              {/* Compteur 01 / 05 sobre */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-caption)',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    letterSpacing: 'var(--tracking-wider)',
                  }}
                >
                  0{activeIndex + 1} / 0{totalMedia}
                </span>
                <div
                  style={{
                    width: 32,
                    height: 2,
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${((activeIndex + 1) / totalMedia) * 100}%`,
                      height: '100%',
                      backgroundColor: 'var(--color-accent)',
                      transition: 'width 0.35s ease-out',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* LE CONTENEUR VISUEL UNIQUE (Un seul média visible à la fois) */}
            <div
              ref={mediaContainerRef}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/10',
                maxHeight: '68vh',
                backgroundColor: 'var(--color-surface-elevated)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
              }}
              className="cs-media-frame"
            >
              {mediaList.map((media, index) => (
                <div
                  key={media.src}
                  className="cs-media-item"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    backgroundColor: 'var(--color-surface-elevated)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                  }}
                >
                  {media.type === 'video' ? (
                    <video
                      src={media.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: 'var(--radius-md)',
                      }}
                    />
                  ) : (
                    <img
                      src={media.src}
                      alt={`${project.title} — Visuel ${index + 1}`}
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: 'var(--radius-md)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Note d'interaction au scroll */}
            <div style={{ textAlign: 'center', marginTop: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-caption)',
                  color: 'var(--color-cream-muted)',
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                }}
              >
                Défiler pour explorer
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------
         3. CONCLUSION & PROJET SUIVANT
         ------------------------------------------------------------ */}
      <section
        style={{
          borderTop: '1px solid var(--color-border)',
          paddingBlock: 'var(--section-lg)',
          paddingInline: 'var(--grid-gutter)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--container)',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          <span className="type-label">Projet suivant</span>
          <h2
            className="type-display"
            style={{
              color: 'var(--color-cream)',
              textTransform: 'uppercase',
              maxWidth: '14ch',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            {nextProject.title}
          </h2>
          <p className="type-body" style={{ color: 'var(--color-cream-dim)', maxWidth: '42ch' }}>
            {nextProject.description}
          </p>

          <Link
            href={`/realisations/${nextProject.slug}`}
            className="btn-primary"
            style={{ marginTop: '1rem' }}
          >
            Découvrir ce projet
            <span aria-hidden="true" style={{ marginLeft: '0.5rem' }}>→</span>
          </Link>
        </div>
      </section>

      {/* Styles responsive pour mobile */}
      <style>{`
        @media (max-width: 768px) {
          .cs-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .cs-hero-left,
          .cs-hero-right {
            grid-column: span 12 !important;
          }
          .cs-sticky-section {
            min-height: auto !important;
            padding-block: 3rem !important;
          }
          .cs-media-frame {
            max-height: 50vh !important;
            aspect-ratio: 4/3 !important;
          }
          .cs-media-item {
            padding: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}
