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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
        }}
      >
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
            style={{
              position: 'relative',
              aspectRatio: '9 / 16',
              borderRadius: '14px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid var(--color-border)',
              backgroundColor: '#121316',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
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
                padding: '1rem',
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
                  fontSize: '1rem',
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
        .service-motion-card:hover {
          transform: translateY(-4px);
          border-color: rgba(34, 197, 94, 0.4) !important;
        }
      `}</style>
    </div>
  );
}
