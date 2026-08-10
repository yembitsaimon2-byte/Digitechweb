import type { Metadata } from 'next';
import { SERVICES } from '@/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nos Services — Digitech Web',
  description:
    'Sites web, logiciels sur mesure, applications mobiles, e-commerce, identité visuelle, stratégie digitale et référencement. Découvrez tous les services de Digitech Web.',
  alternates: { canonical: 'https://digitech-web.fr/services' },
};

export default function ServicesPage() {
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
            Ce que nous construisons
          </span>
          <h1 className="type-display" style={{ color: 'var(--color-cream)', maxWidth: '12ch' }}>
            Services
          </h1>
          <p className="type-lead" style={{ marginTop: '1.5rem', maxWidth: '52ch' }}>
            Des solutions digitales conçues autour de vos objectifs, de vos utilisateurs
            et de votre activité.
          </p>
        </div>
      </section>

      {/* Liste services complète */}
      <section
        aria-label="Détail de nos services"
        style={{ paddingInline: 'var(--grid-gutter)' }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          {SERVICES.map((service) => (
            <article
              key={service.id}
              id={service.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 'var(--grid-gutter)',
                paddingBlock: 'clamp(3rem, 6vw, 5rem)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {/* Numéro + titre */}
              <div style={{ gridColumn: 'span 5' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(4rem, 8vw, 7rem)',
                    fontWeight: 700,
                    color: 'var(--color-border-strong)',
                    letterSpacing: 'var(--tracking-tight)',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: '1rem',
                  }}
                  aria-hidden="true"
                >
                  {service.number}
                </span>
                <h2
                  className="type-h2"
                  style={{
                    color: 'var(--color-cream)',
                  }}
                >
                  {service.title}
                </h2>
              </div>

              {/* Description + items */}
              <div style={{ gridColumn: '7 / span 6' }}>
                <p
                  className="type-body-lg"
                  style={{ color: 'var(--color-cream-dim)', marginBottom: '2rem' }}
                >
                  {service.description}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {service.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: 'var(--text-body)',
                        color: 'var(--color-cream-dim)',
                      }}
                    >
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-accent)',
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          paddingBlock: 'var(--section-md)',
          paddingInline: 'var(--grid-gutter)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <p className="type-lead" style={{ marginBottom: '2rem' }}>
            Un projet en tête ? Discutons de la meilleure approche ensemble.
          </p>
          <Link href="/contact" className="btn-primary" id="services-page-cta">
            Démarrer un projet
          </Link>
        </div>
      </section>
    </>
  );
}
