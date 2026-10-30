import Link from 'next/link';
import { NAV_LINKS, CONTACT } from '@/lib/data';
import Logo from '@/components/ui/Logo';

const FOOTER_SERVICES = [
  { label: 'Sites web',         href: '/services#sites-web' },
  { label: 'Logiciels',         href: '/services#logiciels' },
  { label: 'Applications',      href: '/services#applications' },
  { label: 'E-commerce',        href: '/services#ecommerce' },
  { label: 'Branding',          href: '/services#branding' },
  { label: 'Stratégie digitale',href: '/services#strategie' },
  { label: 'Référencement',     href: '/services#referencement' },
];

/**
 * Footer Digitech Web.
 * Server Component — pas d'animations (performances).
 */
export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Top section */}
      <div
        style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: 'var(--section-md) var(--grid-gutter)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--grid-gutter)',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: 'span 4' }} className="footer-col">
            <Link
              href="/"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                marginBottom: '1rem',
              }}
              aria-label="Digitech Web — Accueil"
            >
              <Logo height={32} />
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-small)',
                letterSpacing: 'var(--tracking-wider)',
                textTransform: 'uppercase',
                color: 'var(--color-cream-muted)',
              }}
            >
              Créer. Construire. Transformer.
            </p>

            {/* Contact info */}
            <div style={{ marginTop: '2rem' }}>
              {CONTACT.email && (
                <a
                  href={`mailto:${CONTACT.email}`}
                  style={{
                    display: 'block',
                    color: 'var(--color-cream-dim)',
                    fontSize: 'var(--text-small)',
                    textDecoration: 'none',
                    marginBottom: '0.5rem',
                    transition: 'color 0.25s ease',
                  }}
                  className="footer-link"
                >
                  {CONTACT.email}
                </a>
              )}
              {CONTACT.phone && (
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  style={{
                    display: 'block',
                    color: 'var(--color-cream-dim)',
                    fontSize: 'var(--text-small)',
                    textDecoration: 'none',
                    marginBottom: '0.5rem',
                    transition: 'color 0.25s ease',
                  }}
                  className="footer-link"
                >
                  {CONTACT.phone}
                </a>
              )}
              {CONTACT.social.instagram && (
                <a
                  href={CONTACT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    color: 'var(--color-cream-dim)',
                    fontSize: 'var(--text-small)',
                    textDecoration: 'none',
                    transition: 'color 0.25s ease',
                  }}
                  className="footer-link"
                >
                  Instagram : @digitech_web1
                </a>
              )}
            </div>
          </div>

          {/* Spacer */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col footer-spacer" />

          {/* Navigation column */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-caption)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-cream-muted)',
                marginBottom: '1.25rem',
              }}
            >
              Navigation
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[...NAV_LINKS, { label: 'Contact', href: '/contact' }].map((link) => (
                <li key={link.href} style={{ marginBottom: '0.625rem' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'var(--color-cream-dim)',
                      fontSize: 'var(--text-small)',
                      textDecoration: 'none',
                      transition: 'color 0.25s ease',
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div style={{ gridColumn: 'span 4' }} className="footer-col">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-caption)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-cream-muted)',
                marginBottom: '1.25rem',
              }}
            >
              Services
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {FOOTER_SERVICES.map((service) => (
                <li key={service.href} style={{ marginBottom: '0.625rem' }}>
                  <Link
                    href={service.href}
                    style={{
                      color: 'var(--color-cream-dim)',
                      fontSize: 'var(--text-small)',
                      textDecoration: 'none',
                      transition: 'color 0.25s ease',
                    }}
                    className="footer-link"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--color-border)',
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '1.5rem var(--grid-gutter)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p
          style={{
            color: 'var(--color-cream-muted)',
            fontSize: 'var(--text-caption)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          © 2026 Digitech Web. Tous droits réservés.
        </p>
        <p
          style={{
            color: 'var(--color-cream-muted)',
            fontSize: 'var(--text-caption)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          Fondé par Yembit Saïmon
        </p>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--color-cream) !important;
        }

        /* Mobile : chaque colonne footer prend toute la largeur */
        @media (max-width: 768px) {
          .footer-col {
            grid-column: span 12 !important;
          }
          .footer-spacer {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
