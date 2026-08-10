/**
 * TestimonialsSection — Structure vide prête pour vrais témoignages.
 * Aucun faux témoignage. La section sera visible uniquement quand
 * de vrais témoignages seront disponibles.
 * 
 * Pour ajouter un témoignage, ajouter une entrée dans `src/lib/data.ts`
 * dans un tableau `TESTIMONIALS` et décommenter l'affichage ci-dessous.
 */

// Décommenter quand des témoignages réels sont disponibles :
// import { TESTIMONIALS } from '@/lib/data';

const TESTIMONIALS: Array<{
  name: string;
  role: string;
  company: string;
  text: string;
}> = [];
// ^^ Remplacer par import depuis data.ts quand disponible

export default function TestimonialsSection() {
  // Ne pas afficher si aucun témoignage
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      id="temoignages"
      aria-label="Témoignages clients"
      style={{
        paddingBlock: 'var(--section-lg)',
        paddingInline: 'var(--grid-gutter)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <span className="type-label" style={{ display: 'block', marginBottom: '1rem' }}>
            Témoignages
          </span>
          <h2 className="type-h1" style={{ color: 'var(--color-cream)' }}>
            Ils nous ont fait confiance.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(360px, 100%), 1fr))',
            gap: 'var(--grid-gutter)',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
              }}
            >
              <blockquote>
                <p
                  className="type-body-lg"
                  style={{ color: 'var(--color-cream)', fontStyle: 'italic', marginBottom: '1.5rem' }}
                >
                  «&nbsp;{t.text}&nbsp;»
                </p>
              </blockquote>
              <figcaption>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 600,
                    color: 'var(--color-cream)',
                  }}
                >
                  {t.name}
                </p>
                <p className="type-small">
                  {t.role}, {t.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
