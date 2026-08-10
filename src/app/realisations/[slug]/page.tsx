import type { Metadata } from 'next';
import { PROJECTS } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.filter((p) => p.video || (p.images && p.images.length > 0)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Projet introuvable | Digitech Web' };
  }

  return {
    title: `${project.title} — Digitech Web`,
    description: project.description,
    alternates: { canonical: `https://digitech-web.fr/realisations/${slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find(
    (p) => p.slug === slug && (p.video || (p.images && p.images.length > 0))
  );

  if (!project) notFound();

  return (
    <article>
      {/* Hero */}
      <section
        style={{
          paddingTop: 'clamp(8rem, 14vw, 14rem)',
          paddingBottom: 'var(--section-md)',
          paddingInline: 'var(--grid-gutter)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <Link
            href="/realisations"
            className="btn-link"
            style={{ marginBottom: '2rem', display: 'inline-flex' }}
          >
            <span aria-hidden="true" style={{ marginRight: '0.25rem' }}>←</span>
            Retour aux réalisations
          </Link>
          <div style={{ marginTop: '2rem' }}>
            <span className="type-label" style={{ display: 'block', marginBottom: '1rem' }}>
              {project.category}
            </span>
            <h1 className="type-display" style={{ color: 'var(--color-cream)' }}>
              {project.title}
            </h1>
            <p className="type-lead" style={{ marginTop: '1.5rem', maxWidth: '52ch' }}>
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contenu case study — à compléter */}
      <section style={{ paddingBlock: 'var(--section-lg)', paddingInline: 'var(--grid-gutter)' }}>
        <div
          style={{
            maxWidth: 'var(--container)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: 'clamp(4rem, 8vw, 8rem)',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
          }}
        >
          <span className="type-label">Case study</span>
          <h2 className="type-h2" style={{ color: 'var(--color-cream-muted)' }}>
            Contenu à venir
          </h2>
          <p className="type-body" style={{ maxWidth: '40ch' }}>
            La présentation détaillée de ce projet sera disponible prochainement.
          </p>
        </div>
      </section>
    </article>
  );
}
