import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales — Digitech Web',
  description: 'Mentions légales de l\'agence digitale Digitech Web, fondée par YEMBIT Saimon.',
  alternates: { canonical: 'https://digitech-web.fr/mentions-legales' },
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
              En vertu de {"l'article"} 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans {"l'économie"} numérique, il est précisé aux utilisateurs du site internet <strong>https://digitech-web.fr</strong> {"l'identité"} des différents intervenants dans le cadre de sa réalisation et de son suivi :
            </p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }} className="flex flex-col gap-2">
              <li><strong>Propriétaire du site :</strong> YEMBIT Saimon — Digitech Web</li>
              <li><strong>Directeur de la publication :</strong> YEMBIT Saimon</li>
              <li><strong>Contact :</strong> contact@digitech-web.fr</li>
              <li><strong>Adresse de l'entreprise :</strong> [Adresse postale à compléter]</li>
              <li><strong>Numéro SIRET / Immatriculation :</strong> [Numéro SIRET / RCS à compléter]</li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="type-h3" style={{ color: 'var(--color-cream)' }}>
              2. Hébergement
            </h2>
            <p>
              Le site est hébergé par [Nom de l'hébergeur (ex: Vercel, Inc.)], situé à [Adresse de l'hébergeur], disponible au [Numéro de téléphone ou site de l'hébergeur].
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
              YEMBIT Saimon ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de {"l'utilisateur"}, lors de {"l'accès"} au site https://digitech-web.fr.
            </p>
            <p className="type-body" style={{ color: 'var(--color-cream-dim)' }}>
              Pour toute question ou demande d'information concernant le site, vous pouvez
              nous contacter par e-mail :{' '}
              <a href="mailto:digitechweb98@gmail.com" style={{ color: 'var(--color-accent)' }}>
                digitechweb98@gmail.com
              </a>.
            </p>
            <p>
              YEMBIT Saimon décline toute responsabilité quant à {"l'utilisation"} qui pourrait être faite des informations et contenus présents sur https://digitech-web.fr.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
