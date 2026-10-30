import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data';
import { ProjectVisual } from '@/components/sections/ProjectsSection';
import CtaSection from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Réalisations — Digitech Web',
  description:
    'Découvrez les projets conçus et développés par Digitech Web : sites web, logiciels, applications et expériences digitales.',
  alternates: { canonical: 'https://www.digitechweb.online/realisations' },
};

export default function RealisationsPage() {
  return (
    <>
      {/* Hero page */}
      <section
        style={{
          paddingTop: 'clamp(8rem, 14vw, 14rem)',
          paddingBottom: 'var(--section-md)',
          paddingInline: 'var(--grid-gutter)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <span className="type-label" style={{ display: 'block', marginBottom: '1.5rem' }}>
            Portfolio
          </span>
          <h1 className="type-display" style={{ color: 'var(--color-cream)', maxWidth: '12ch' }}>
            Réalisations
          </h1>
          <p className="type-lead" style={{ marginTop: '1.5rem', maxWidth: '52ch' }}>
            Des idées devenues expériences. Une sélection de projets conçus et développés
            par Digitech Web.
          </p>
        </div>
      </section>

      {/* Grille projets */}
      <section
        aria-label="Liste des projets"
        style={{
          paddingBlock: 'var(--section-md)',
          paddingInline: 'var(--grid-gutter)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          {PROJECTS.filter((p) => p.status !== 'draft').map((project, i) => (
            <article
              key={project.id}
              style={{
                borderTop: '1px solid var(--color-border)',
                paddingBlock: 'clamp(2.5rem, 5vw, 4rem)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-[var(--grid-gutter)] items-center">
                {/* Visuel (en premier sur mobile) */}
                <div
                  data-cursor="project"
                  className={`col-span-12 md:col-span-6 order-first project-image-container ${
                    i % 2 === 0 ? 'md:col-start-7 md:order-last' : 'md:col-start-1'
                  }`}
                  style={{
                    aspectRatio: '4/3',
                    backgroundColor: 'var(--color-surface-elevated)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div className="project-image-inner" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                    <ProjectVisual project={project} />
                  </div>
                </div>

                {/* Infos */}
                <div
                  className={`col-span-12 md:col-span-5 ${
                    i % 2 === 0 ? 'md:col-start-1' : 'md:col-start-7 md:col-span-6'
                  }`}
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
                        fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                        fontWeight: 700,
                        color: 'var(--color-border-strong)',
                        letterSpacing: 'var(--tracking-tight)',
                        lineHeight: 1,
                      }}
                      aria-hidden="true"
                    >
                      {project.number}
                    </span>
                    <span className="type-label">{project.category}</span>
                  </div>
                  <h2 className="type-h2" style={{ color: 'var(--color-cream)', marginBottom: '1rem' }}>
                    {project.title}
                  </h2>
                  <p className="type-body" style={{ color: 'var(--color-cream-dim)', marginBottom: '2rem', maxWidth: '40ch' }}>
                    {project.description}
                  </p>
                  {project.video || (project.images && project.images.length > 0) ? (
                    <Link href={`/realisations/${project.slug}`} className="btn-link" data-cursor="project">
                      Voir le projet <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <span style={{ fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--color-cream-muted)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '0.375rem 1rem', display: 'inline-block' }}>
                      Bientôt disponible
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}

          <div style={{ borderTop: '1px solid var(--color-border)' }} />
        </div>
      </section>

      {/* CTA Final Premium */}
      <CtaSection />
    </>
  );
}
