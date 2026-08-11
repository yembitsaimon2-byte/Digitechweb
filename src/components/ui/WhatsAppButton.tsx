'use client';

import React from 'react';

/**
 * WhatsAppButton — Bouton WhatsApp flottant discret bas-gauche.
 * Conçu pour s'intégrer harmonieusement à la direction artistique de Digitech Web.
 */
export default function WhatsAppButton() {
  const whatsappUrl =
    'https://wa.me/212770742458?text=' +
    encodeURIComponent('Bonjour Digitech Web, je souhaite discuter d’un projet.');

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter Digitech Web sur WhatsApp"
        className="wa-floating-btn"
        id="wa-floating-link"
      >
        <span className="wa-icon-wrapper" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="wa-icon"
          >
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
          </svg>
        </span>
        <span className="wa-label-text">Parlons de votre projet</span>
      </a>

      <style>{`
        .wa-floating-btn {
          position: fixed;
          bottom: clamp(1.25rem, 2vw, 2rem);
          left: clamp(1.25rem, 2vw, 2rem);
          z-index: 45;
          display: inline-flex;
          align-items: center;
          height: 48px;
          min-width: 48px;
          padding: 0 14px;
          background-color: var(--color-surface-elevated, #161616);
          border: 1px solid var(--color-border, rgba(255, 255, 255, 0.12));
          border-radius: 9999px;
          color: var(--color-cream, #f5f0eb);
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          transition: 
            background-color 0.35s var(--ease-smooth, ease),
            border-color 0.35s var(--ease-smooth, ease),
            box-shadow 0.35s var(--ease-smooth, ease),
            transform 0.35s var(--ease-elastic, ease);
        }

        .wa-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .wa-icon {
          color: var(--color-cream, #f5f0eb);
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .wa-label-text {
          font-family: var(--font-body, sans-serif);
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--color-cream, #f5f0eb);
          white-space: nowrap;
          max-width: 0;
          opacity: 0;
          margin-left: 0;
          transition: 
            max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.3s ease,
            margin-left 0.3s ease;
        }

        /* Hover desktop (pointer fine) */
        @media (hover: hover) and (pointer: fine) {
          .wa-floating-btn:hover {
            border-color: rgba(200, 240, 74, 0.4);
            box-shadow: 0 0 20px rgba(200, 240, 74, 0.15), 0 8px 24px rgba(0, 0, 0, 0.6);
            transform: translateY(-2px);
          }

          .wa-floating-btn:hover .wa-icon {
            color: var(--color-accent, #c8f04a);
          }

          .wa-floating-btn:hover .wa-label-text {
            max-width: 180px;
            opacity: 1;
            margin-left: 10px;
          }
        }

        .wa-floating-btn:focus-visible {
          outline: 2px solid var(--color-accent, #c8f04a);
          outline-offset: 3px;
        }

        /* Adjustments mobile (touch) */
        @media (max-width: 768px) {
          .wa-floating-btn {
            bottom: 1.25rem;
            left: 1.25rem;
            height: 44px;
            min-width: 44px;
            padding: 0;
            justify-content: center;
          }
          .wa-label-text {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wa-floating-btn,
          .wa-icon,
          .wa-label-text {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
