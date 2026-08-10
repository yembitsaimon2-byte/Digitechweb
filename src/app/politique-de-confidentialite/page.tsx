import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — Digitech Web',
  description: 'Politique de confidentialité et gestion des données personnelles de Digitech Web.',
  alternates: { canonical: 'https://digitech-web.fr/politique-de-confidentialite' },
};

export default function PolitiqueConfidentialitePage() {
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
          Protection des données
        </span>
        <h1
          className="type-display"
          style={{
            color: 'var(--color-cream)',
            marginBottom: 'clamp(2rem, 4vw, 4rem)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          Politique de Confidentialité
        </h1>

        <div className="flex flex-col gap-8 type-body">
          <section className="flex flex-col gap-4">
            <h2 className="type-h3" style={{ color: 'var(--color-cream)' }}>
              1. Collecte des données personnelles
            </h2>
            <p>
              Dans le cadre de {"l'utilisation"} du site https://digitech-web.fr, des données personnelles peuvent être collectées lorsque vous utilisez le formulaire de contact :
            </p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }} className="flex flex-col gap-2">
              <li>Nom / Prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone</li>
              <li>Nom de {"l'entreprise"}</li>
              <li>Toute information que vous choisissez d'inclure dans votre message.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="type-h3" style={{ color: 'var(--color-cream)' }}>
              2. Utilisation des données
            </h2>
            <p>
              Les données collectées via le formulaire de contact sont utilisées uniquement pour :
            </p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }} className="flex flex-col gap-2">
              <li>Répondre à vos demandes de renseignements et de devis ;</li>
              <li>Initier et gérer la relation commerciale qui pourrait en découler ;</li>
              <li>Améliorer nos services.</li>
            </ul>
            <p>
              Vos données ne sont jamais partagées, vendues ou louées à des tiers.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="type-h3" style={{ color: 'var(--color-cream)' }}>
              3. Conservation des données
            </h2>
            <p>
              Vos données personnelles sont conservées pendant la durée nécessaire à la gestion de votre demande commerciale ou pour une durée maximale de trois ans après le dernier contact de votre part.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="type-h3" style={{ color: 'var(--color-cream)' }}>
              4. Vos droits
            </h2>
            <p>
              Conformément à la réglementation RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données personnelles, ainsi qu'un droit de limitation et d'opposition au traitement de celles-ci.
            </p>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter directement par e-mail à l'adresse suivante : <strong>digitechweb98@gmail.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
