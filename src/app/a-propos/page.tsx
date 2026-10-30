import type { Metadata } from 'next';
import Link from 'next/link';
import { TECHNOLOGIES } from '@/lib/data';

export const metadata: Metadata = {
  title: 'À propos — Digitech Web',
  description:
    'Découvrez Digitech Web, studio digital fondé par Yembit Saïmon. Notre vision, notre méthode et notre équipe au service de vos projets ambitieux.',
  alternates: { canonical: 'https://www.digitechweb.online/a-propos' },
};

export default function AProposPage() {
  return (
    <>
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
          <span className="type-label" style={{ display: 'block', marginBottom: '1.5rem' }}>
            Derrière l'agence
          </span>
          <h1 className="type-display" style={{ color: 'var(--color-cream)', maxWidth: '12ch' }}>
            À propos
          </h1>
          <p className="type-lead" style={{ marginTop: '1.5rem', maxWidth: '52ch' }}>
            Digitech Web est une agence digitale née d'une ambition simple : créer des
            expériences numériques qui combinent créativité, technologie et impact.
          </p>
        </div>
      </section>

      {/* Fondateur */}
      <section
        id="fondateur"
        aria-label="Fondateur"
        style={{
          paddingBlock: 'var(--section-lg)',
          paddingInline: 'var(--grid-gutter)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'var(--grid-gutter)',
              alignItems: 'start',
            }}
          >
            {/* Portrait fondateur */}
            <div style={{ gridColumn: 'span 4' }}>
              <div
                aria-label="Portrait de Yembit Saïmon"
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/images/founder.jpg"
                  alt="Yembit Saïmon — Fondateur de Digitech Web"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, backgroundColor: 'var(--color-accent)' }}
                />
              </div>
            </div>

            {/* Texte */}
            <div style={{ gridColumn: '5 / span 8', paddingTop: 'clamp(0.5rem, 3vw, 3rem)' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 700,
                  color: 'var(--color-cream)',
                  marginBottom: '0.25rem',
                }}
              >
                Yembit Saïmon
              </p>
              <p className="type-small" style={{ color: 'var(--color-accent)', marginBottom: '2.5rem' }}>
                Fondateur et directeur créatif
              </p>

              <p className="type-body-lg" style={{ color: 'var(--color-cream-dim)', marginBottom: '1.5rem' }}>
                Passionné par le digital, le design et l'innovation, Yembit Saïmon a fondé
                Digitech Web avec la volonté de réunir créativité, technologie et vision
                stratégique au sein d'un même studio.
              </p>
              <p className="type-body" style={{ color: 'var(--color-cream-dim)', marginBottom: '3rem' }}>
                Digitech Web intervient dans la conception de sites web, le développement de
                logiciels sur mesure, la création d'applications et la définition d'identités
                digitales pour des marques, entreprises et organisations exigeantes.
              </p>

              <blockquote
                style={{
                  borderLeft: '2px solid var(--color-accent)',
                  paddingLeft: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                    fontWeight: 500,
                    color: 'var(--color-cream)',
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                  }}
                >
                  «&nbsp;Le digital ne devrait pas seulement fonctionner.
                  Il devrait laisser une impression.&nbsp;»
                </p>
              </blockquote>

              <Link
                href="/blog/yembit-saimon-fondateur-digitech-web"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
                className="hover:underline"
              >
                <span>Lire le portrait de Yembit Saïmon</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section
        id="vision"
        aria-label="Notre vision"
        style={{
          paddingBlock: 'var(--section-lg)',
          paddingInline: 'var(--grid-gutter)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'var(--grid-gutter)',
              alignItems: 'center',
            }}
          >
            <div style={{ gridColumn: 'span 5' }}>
              <span className="type-label" style={{ display: 'block', marginBottom: '1rem' }}>
                Notre vision
              </span>
              <h2 className="type-h1" style={{ color: 'var(--color-cream)' }}>
                Créer.{' '}
                <span style={{ color: 'var(--color-accent)' }}>Durer.</span>
              </h2>
            </div>
            <div style={{ gridColumn: '7 / span 6' }}>
              <p className="type-body-lg" style={{ color: 'var(--color-cream-dim)' }}>
                Créer des expériences digitales qui ne se contentent pas d'exister, mais qui
                donnent aux marques les moyens de se démarquer, de grandir et d'évoluer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Indicateurs — champs modifiables, sans faux chiffres */}
      {/*
        Pour activer les indicateurs, décommenter cette section et ajouter
        les vraies valeurs dans src/lib/data.ts.
        
        Exemple :
        export const STATS = [
          { label: 'Projets réalisés',     value: '12' },
          { label: 'Clients accompagnés',  value: '8' },
          { label: 'Secteurs d\'activité', value: '5' },
          { label: 'Années d\'expérience', value: '3' },
        ];
      */}

      {/* Technologies */}
      <section
        id="technologies-about"
        aria-label="Technologies maîtrisées"
        style={{
          paddingBlock: 'var(--section-md)',
          paddingInline: 'var(--grid-gutter)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <span className="type-label" style={{ display: 'block', marginBottom: '1.5rem' }}>
            Technologies
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {TECHNOLOGIES.map((tech) => (
              <span
                key={tech.name}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-cream-dim)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.5rem 1.25rem',
                  transition: 'border-color 0.25s, color 0.25s',
                }}
                className="tech-pill"
              >
                {tech.name}
              </span>
            ))}
          </div>
          <style>{`.tech-pill:hover { border-color: var(--color-accent) !important; color: var(--color-cream) !important; }`}</style>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingBlock: 'var(--section-md)', paddingInline: 'var(--grid-gutter)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <h2 className="type-h2" style={{ color: 'var(--color-cream)', marginBottom: '1.5rem' }}>
            Travaillons ensemble.
          </h2>
          <Link href="/contact" className="btn-primary" id="about-cta">
            Démarrer un projet
          </Link>
        </div>
      </section>
    </>
  );
}
