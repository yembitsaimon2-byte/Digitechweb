'use client';

import { useState } from 'react';
import { MOTION_VIDEOS } from '@/lib/data';
import MotionLightbox from '@/components/ui/MotionLightbox';

export default function MotionServiceShowcase() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  return (
    <div style={{ marginTop: '2.5rem' }}>
      <p
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.8125rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--color-cream-muted)',
          marginBottom: '1.25rem',
        }}
      >
        Exemples de réalisations
      </p>

      <div className="service-motion-grid">
        {MOTION_VIDEOS.map((video, index) => (
          <div
            key={video.id}
            role="button"
            tabIndex={0}
            aria-label={`Lire la vidéo ${video.title} — Motion design`}
            onClick={() => setActiveLightboxIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveLightboxIndex(index);
              }
            }}
            className="service-motion-card"
          >
            {/* Poster fallback */}
            <picture>
              <source srcSet={video.posterAvif} type="image/avif" />
              <source srcSet={video.posterWebp} type="image/webp" />
              <img
                src={video.posterJpg}
                alt={`Aperçu ${video.title}`}
                loading="lazy"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1,
                }}
              />
            </picture>

            {/* Video preview on hover / mobile */}
            <video
              muted
              loop
              playsInline
              preload="none"
              poster={video.posterJpg}
              onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 2,
              }}
            >
              <source src={video.teaserWebm} type="video/webm" />
              <source src={video.teaserMp4} type="video/mp4" />
            </video>

            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 3,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />

            {/* Play icon */}
            <div
              className="service-play-icon"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 4,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                transition: 'transform 0.25s ease, background 0.25s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateX(1px)' }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>

            {/* Client name + "Motion design" ONLY */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 'clamp(0.75rem, 2.5vw, 1.125rem)',
                zIndex: 4,
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-accent, #22c55e)',
                  fontWeight: 600,
                  marginBottom: '0.2rem',
                }}
              >
                Motion design
              </span>
              <h3
                style={{
                  fontSize: 'clamp(0.9375rem, 2.5vw, 1.0625rem)',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                {video.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <MotionLightbox
        videos={MOTION_VIDEOS}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onSelectIndex={(idx) => setActiveLightboxIndex(idx)}
      />

      <style>{`
        .service-motion-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .service-motion-card {
          position: relative;
          aspect-ratio: 9 / 16;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid var(--color-border);
          background-color: #121316;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease, border-color 0.3s ease;
          touch-action: pan-x pan-y;
          -webkit-tap-highlight-color: transparent;
        }

        @media (min-width: 768px) {
          .service-motion-card:hover {
            transform: translateY(-4px);
            border-color: rgba(34, 197, 94, 0.4) !important;
          }
          .service-motion-card:hover .service-play-icon {
            transform: translate(-50%, -50%) scale(1.1);
            background: var(--color-accent, #22c55e) !important;
            color: #000 !important;
          }
        }

        @media (max-width: 767px) {
          .service-motion-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            gap: 1rem !important;
            padding: 0.5rem 0.25rem 1rem 0.25rem !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }

          .service-motion-grid::-webkit-scrollbar {
            display: none !important;
          }

          .service-motion-card {
            flex: 0 0 clamp(190px, 58vw, 240px) !important;
            scroll-snap-align: start !important;
          }

          .service-motion-card:active {
            transform: scale(0.97) !important;
          }
        }
      `}</style>
    </div>
  );
}
