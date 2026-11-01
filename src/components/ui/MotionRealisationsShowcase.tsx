'use client';

import { useState } from 'react';
import { MOTION_VIDEOS } from '@/lib/data';
import MotionLightbox from '@/components/ui/MotionLightbox';

export default function MotionRealisationsShowcase() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id="motion-design"
      aria-label="Projets Motion Design"
      style={{
        paddingBlock: 'clamp(2.5rem, 6vw, 4.5rem)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ marginBottom: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
        <span className="type-label" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--color-accent, #22c55e)' }}>
          Motion design
        </span>
        <h2 className="type-h2" style={{ color: 'var(--color-cream)', marginBottom: '0.75rem', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
          Animations & formats vidéo
        </h2>
        <p className="type-body" style={{ color: 'var(--color-cream-dim)', maxWidth: '52ch', fontSize: 'clamp(0.9375rem, 2.5vw, 1.0625rem)' }}>
          Des créations en mouvement pensées pour dynamiser l’image de marque et illustrer clairement les fonctionnalités clés.
        </p>
      </div>

      <div className="realisations-motion-grid">
        {MOTION_VIDEOS.map((video, index) => (
          <div
            key={video.id}
            role="button"
            tabIndex={0}
            aria-label={`Regarder la vidéo motion design ${video.title}`}
            onClick={() => setActiveLightboxIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveLightboxIndex(index);
              }
            }}
            className="realisation-motion-card"
          >
            {/* Poster fallback */}
            <picture>
              <source srcSet={video.posterAvif} type="image/avif" />
              <source srcSet={video.posterWebp} type="image/webp" />
              <img
                src={video.posterJpg}
                alt={`Aperçu vidéo ${video.title}`}
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

            {/* Video preview on hover */}
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

            {/* Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 3,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />

            {/* Play icon hint */}
            <div
              className="realisation-play-icon"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 4,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                transition: 'transform 0.25s ease, background 0.25s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateX(2px)' }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>

            {/* Card Info: Client Name + "Motion design" ONLY */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 'clamp(1rem, 3vw, 1.35rem)',
                zIndex: 4,
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-accent, #22c55e)',
                  fontWeight: 600,
                  marginBottom: '0.25rem',
                }}
              >
                Motion design
              </span>
              <h3
                style={{
                  fontSize: 'clamp(1rem, 3vw, 1.15rem)',
                  fontWeight: 700,
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
        .realisations-motion-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .realisation-motion-card {
          position: relative;
          aspect-ratio: 9 / 16;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid var(--color-border);
          background-color: #121316;
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.6);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          touch-action: pan-x pan-y;
          -webkit-tap-highlight-color: transparent;
        }

        @media (min-width: 768px) {
          .realisation-motion-card:hover {
            transform: translateY(-6px);
            border-color: rgba(34, 197, 94, 0.4) !important;
            box-shadow: 0 20px 40px -10px rgba(34, 197, 94, 0.15), 0 15px 30px -10px rgba(0, 0, 0, 0.8) !important;
          }
          .realisation-motion-card:hover .realisation-play-icon {
            transform: translate(-50%, -50%) scale(1.1);
            background: var(--color-accent, #22c55e);
            color: #000;
          }
        }

        @media (max-width: 767px) {
          .realisations-motion-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            gap: 1.15rem !important;
            padding: 0.5rem 0.25rem 1rem 0.25rem !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }

          .realisations-motion-grid::-webkit-scrollbar {
            display: none !important;
          }

          .realisation-motion-card {
            flex: 0 0 clamp(210px, 64vw, 260px) !important;
            scroll-snap-align: start !important;
          }

          .realisation-motion-card:active {
            transform: scale(0.97) !important;
          }
        }
      `}</style>
    </section>
  );
}
