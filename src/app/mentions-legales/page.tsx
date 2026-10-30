import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales — Digitech Web',
  description: 'Mentions légales de l\'agence digitale Digitech Web, fondée par YEMBIT Saimon.',
  alternates: { canonical: 'https://www.digitechweb.online/mentions-legales' },
};

export default function MentionsLegalesPage() {
  return (
    <article
      style={{
        paddingTop: 'clamp(8rem, 14vw, 14rem)',
        paddingBottom: 'var(--section-md)',
        paddingInline: 'var(--grid-gutter)',
        color: 'var(--color-cream-dim)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span className="type-label" style={{ display: 'block', marginBottom: '1.5rem' }}>
          Informations légales
        </span>
        <h1
          className="type-display"
          style={{
            color: 'var(--color-cream)',
            marginBottom: 'clamp(2rem, 4vw, 4rem)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          Mentions Légales
        </h1>

        <div className="flex flex-col gap-8 type-body">
          <section className="flex flex-col gap-4">
            <h2 className="type-h3" style={{ color: 'var(--color-cream)' }}>
              1. Édition du site
            </h2>
            <p>
              Le site internet accessible à l'adresse <strong>digitechweb.vercel.app</strong> est édité par :
            </p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }} className="flex flex-col gap-2">
              <li><strong>Éditeur & Fondateur :</strong> YEMBIT Saimon — Digitech Web</li>
              <li><strong>Statut de l'entreprise :</strong> En cours d'immatriculation</li>
              <li><strong>Directeur de la publication :</strong> YEMBIT Saimon</li>
              <li><strong>E-mail de contact :</strong> <a href="mailto:digitechweb98@gmail.com" style={{ color: 'var(--color-accent)' }}>digitechweb98@gmail.com</a></li>
              <li><strong>Téléphone / WhatsApp :</strong> <a href="https://wa.me/212770742458" style={{ color: 'var(--color-accent)' }}>+212 770 742 458</a></li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="type-h3" style={{ color: 'var(--color-cream)' }}>
              2. Hébergement
            </h2>
            <p>
              Le site est hébergé par la société <strong>Vercel Inc.</strong>, située au 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis (téléphone : +1 559-288-7063, site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>https://vercel.com</a>).
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="type-h3" style={{ color: 'var(--color-cream)' }}>
              3. Propriété intellectuelle et contrefaçons
            </h2>
            <p>
              YEMBIT Saimon est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de YEMBIT Saimon.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="type-h3" style={{ color: 'var(--color-cream)' }}>
              4. Limitations de responsabilité
            </h2>
            <p>
              YEMBIT Saimon ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de {"l'utilisateur"}, lors de {"l'accès"} au site https://www.digitechweb.online.
            </p>
            <p className="type-body" style={{ color: 'var(--color-cream-dim)' }}>
              Pour toute question ou demande d'information concernant le site, vous pouvez
              nous contacter par e-mail :{' '}
              <a href="mailto:digitechweb98@gmail.com" style={{ color: 'var(--color-accent)' }}>
                digitechweb98@gmail.com
              </a>.
            </p>
            <p>
              YEMBIT Saimon décline toute responsabilité quant à {"l'utilisation"} qui pourrait être faite des informations et contenus présents sur https://www.digitechweb.online.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
