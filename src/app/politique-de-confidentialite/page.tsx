import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — Digitech Web',
  description: 'Politique de confidentialité et gestion des données personnelles de Digitech Web.',
  alternates: { canonical: 'https://www.digitechweb.online/politique-de-confidentialite' },
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
              Dans le cadre de {"l'utilisation"} du site https://www.digitechweb.online, des données personnelles peuvent être collectées lorsque vous utilisez le formulaire de contact :
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
              4. Conformité Loi 09-08 (CNDP) et RGPD
            </h2>
            <p>
              Conformément à la loi marocaine n° 09-08 promulguée par le Dahir 1-09-15 du 18 février 2009 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel ainsi qu'aux standards internationaux de protection des données (RGPD) :
            </p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }} className="flex flex-col gap-2">
              <li>Les données collectées font l'objet d'un traitement exclusivement destiné à la gestion des demandes formulées par les utilisateurs et aux échanges professionnels qui en découlent.</li>
              <li>Aucune donnée à caractère personnel n'est cédée, louée, échangée ou transférée à des tiers sans votre consentement préalable.</li>
              <li>Vous disposez d'un droit d'accès, d'information, de rectification et d'opposition concernant les données vous concernant.</li>
            </ul>
            <p>
              Pour exercer ces droits ou pour toute question relative au traitement de vos données, vous pouvez nous adresser une demande par e-mail à :{' '}
              <a href="mailto:digitechweb98@gmail.com" style={{ color: 'var(--color-accent)' }}>
                digitechweb98@gmail.com
              </a>{' '}
              ou par téléphone au{' '}
              <a href="https://wa.me/212770742458" style={{ color: 'var(--color-accent)' }}>
                +212 770 742 458
              </a>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
