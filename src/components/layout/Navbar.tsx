'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { NAV_LINKS } from '@/lib/data';
import Logo from '@/components/ui/Logo';

/**
 * Navbar principale Digitech Web.
 * - Légère et fixe en haut
 * - Devient légèrement flottante au scroll (backdrop blur + border)
 * - Logo à gauche, navigation au centre, CTA à droite
 * - Menu mobile avec animation
 */
export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Entry animation
  useEffect(() => {
    if (!navRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <>
      <header
        ref={navRef}
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-nav)',
          padding: scrolled ? '0.75rem var(--grid-gutter)' : '1.5rem var(--grid-gutter)',
          backgroundColor: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          transition: 'padding 0.4s ease, background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--container)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
            }}
            aria-label="Digitech Web — Accueil"
          >
            <Logo height={32} />
          </Link>

          {/* Navigation desktop */}
          <nav
            aria-label="Navigation principale"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-small)',
                    fontWeight: 500,
                    letterSpacing: 'var(--tracking-wide)',
                    color: isActive ? 'var(--color-cream)' : 'var(--color-cream-dim)',
                    textDecoration: 'none',
                    transition: 'color 0.25s ease',
                    position: 'relative',
                    paddingBottom: '2px',
                  }}
                  className="nav-link"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'var(--color-accent)',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Burger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link
              href="/contact"
              className="btn-primary desktop-cta"
              style={{ fontSize: '0.75rem', padding: '0.625rem 1.5rem' }}
              id="nav-cta"
            >
              Démarrer un projet
            </Link>

            {/* Burger mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="burger-btn"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 1.5,
                  backgroundColor: 'var(--color-cream)',
                  transition: 'transform 0.35s ease, opacity 0.35s ease',
                  transform: menuOpen ? 'translateY(3.75px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 1.5,
                  backgroundColor: 'var(--color-cream)',
                  transition: 'transform 0.35s ease, opacity 0.35s ease',
                  transform: menuOpen ? 'translateY(-3.75px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile overlay */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 'calc(var(--z-nav) - 1)',
          backgroundColor: 'var(--color-black)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 var(--grid-gutter)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <nav aria-label="Navigation mobile">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: menuOpen ? 1 : 0,
                  transition: `transform 0.4s ease ${i * 0.07}s, opacity 0.4s ease ${i * 0.07}s`,
                }}
              >
                <Link
                  href={link.href}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                    fontWeight: 700,
                    color: 'var(--color-cream)',
                    textDecoration: 'none',
                    padding: '0.75rem 0',
                    letterSpacing: 'var(--tracking-tight)',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li
              style={{
                paddingTop: '2rem',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.4s ease ${NAV_LINKS.length * 0.07}s, opacity 0.4s ease ${NAV_LINKS.length * 0.07}s`,
              }}
            >
              <Link href="/contact" className="btn-primary" id="mobile-nav-cta">
                Démarrer un projet
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Styles desktop/mobile */}
      <style>{`
        .desktop-nav { display: flex !important; }
        .desktop-cta { display: inline-flex !important; }
        .burger-btn  { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .burger-btn  { display: flex !important; }
        }

        .nav-link:hover {
          color: var(--color-cream) !important;
        }
      `}</style>
    </>
  );
}
