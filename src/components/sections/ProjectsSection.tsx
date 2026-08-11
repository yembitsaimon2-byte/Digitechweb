'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { PROJECTS } from '@/lib/data';

/**
 * ProjectsSection — Réalisations en format éditorial grand format.
 * Chaque projet occupe beaucoup d'espace.
 * Placeholders propres si pas de vrais projets.
 */
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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
      id="realisations"
      aria-label="Nos réalisations"
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
          style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: 0,
          }}
        >
          <span className="type-label" style={{ display: 'block', marginBottom: '1rem' }}>
            Réalisations
          </span>
          <h2 className="type-h1" style={{ color: 'var(--color-cream)', maxWidth: '14ch' }}>
            Des idées devenues{' '}
            <span style={{ color: 'var(--color-cream-dim)' }}>expériences.</span>
          </h2>
          <p className="type-lead" style={{ marginTop: '1.5rem', maxWidth: '50ch' }}>
            Une sélection de projets conçus et développés par Digitech Web.
          </p>
        </div>

        {/* Liste projets */}
        <div>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 5rem)', textAlign: 'center' }}>
          <Link href="/realisations" className="btn-ghost" id="projects-cta">
            Voir toutes les réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof PROJECTS)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 82%' },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;
  const hasMedia = Boolean(project.video || (project.images && project.images.length > 0));

  return (
    <div
      ref={cardRef}
      style={{
        borderTop: '1px solid var(--color-border)',
        paddingBlock: 'clamp(2.5rem, 5vw, 4rem)',
        opacity: 0,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--grid-gutter)',
          alignItems: 'center',
        }}
        className="project-card-grid"
      >
        {/* Infos projet */}
        <div
          style={{
            gridColumn: isEven ? 'span 5' : '7 / span 6',
            gridRow: 1,
          }}
          className="project-card-info"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                fontWeight: 700,
                color: 'var(--color-border-strong)',
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 1,
              }}
              className="project-number"
              aria-hidden="true"
            >
              {project.number}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-caption)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}
            >
              {project.category}
            </span>
          </div>

          <h3
            className="type-h2"
            style={{
              color: 'var(--color-cream)',
              marginBottom: '1rem',
            }}
          >
            {project.title}
          </h3>
          <p
            className="type-body"
            style={{
              color: 'var(--color-cream-dim)',
              marginBottom: '2rem',
              maxWidth: '40ch',
            }}
          >
            {project.description}
          </p>

          {hasMedia ? (
            <Link
              href={`/realisations/${project.slug}`}
              className="btn-link"
              data-cursor="project"
            >
              Voir le projet
              <span aria-hidden="true" style={{ marginLeft: '0.25rem' }}>→</span>
            </Link>
          ) : (
            <span
              style={{
                fontSize: 'var(--text-caption)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-cream-muted)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '0.375rem 1rem',
                display: 'inline-block',
              }}
            >
              Bientôt disponible
            </span>
          )}
        </div>

        {/* Visuel projet */}
        <div
          data-cursor="project"
          style={{
            gridColumn: isEven ? '7 / span 6' : 'span 5',
            gridRow: 1,
            aspectRatio: '4/3',
            backgroundColor: 'var(--color-surface-elevated)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
          }}
          className="project-card-visual"
        >
          <ProjectVisual project={project} />
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .project-card-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .project-card-info {
            grid-column: span 12 !important;
            grid-row: 1 !important;
          }
          .project-card-visual {
            grid-column: span 12 !important;
            grid-row: 2 !important;
            width: 100% !important;
          }
        }
        @media (max-width: 768px) {
          .project-number {
            font-size: clamp(2.5rem, 12vw, 4rem) !important;
          }
        }
      `}</style>
    </div>

  );
}

export function ProjectVisual({ number, project }: { number?: string; project?: any }) {
  const num = number || project?.number || '01';
  const video = project?.video;
  const images: string[] = project?.images || [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [video]);

  useEffect(() => {
    if (video || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [video, images.length]);

  // 1. Vidéo
  if (video) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--color-surface-elevated)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    );
  }

  // 2. Images Carrousel
  if (images.length > 0) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--color-surface-elevated)',
          overflow: 'hidden',
        }}
      >
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`${project?.title || 'Projet'} — Visuel ${index + 1}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          />
        ))}
      </div>
    );
  }

  // 3. Placeholder avec badge PROCHAINEMENT
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: 'var(--color-surface-elevated)',
      }}
    >
      {/* Grille décorative */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 12vw, 10rem)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.04)',
          letterSpacing: 'var(--tracking-tight)',
          lineHeight: 1,
          position: 'relative',
        }}
        aria-hidden="true"
      >
        {num}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-caption)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
          color: 'var(--color-cream-muted)',
          position: 'relative',
        }}
      >
        Prochainement
      </span>
    </div>
  );
}
