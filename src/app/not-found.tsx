import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '80svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingInline: 'var(--grid-gutter)',
      }}
    >
      <div style={{ maxWidth: '400px' }} className="flex flex-col gap-6 items-center">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 15vw, 10rem)',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--color-border-strong)',
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          404
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h3)',
            fontWeight: 600,
            color: 'var(--color-cream)',
          }}
        >
          Cette page {"n'existe"} pas.
        </h1>
        <p style={{ color: 'var(--color-cream-dim)', fontSize: 'var(--text-body)', marginBottom: '1rem' }}>
          La ressource que vous recherchez a pu être déplacée ou n'est plus disponible.
        </p>
        <Link href="/" className="btn-primary" id="not-found-home-link">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
