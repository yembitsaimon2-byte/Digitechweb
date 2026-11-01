'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MOTION_VIDEOS } from '@/lib/data';
import MotionLightbox from '@/components/ui/MotionLightbox';

export default function MotionSection() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver to pause all videos when section is offscreen
  useEffect(() => {
    if (!sectionRef.current) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) {
          videoRefs.current.forEach((vid) => {
            if (vid && !vid.paused) vid.pause();
          });
        } else {
          // If returning to screen on desktop, play or keep paused until hover
          // If on mobile, play the active card
          if (window.innerWidth < 1024) {
            const activeVid = videoRefs.current[activeMobileIndex];
            if (activeVid) activeVid.play().catch(() => {});
          }
        }
      },
      { threshold: 0.15 }
    );
    sectionObserver.observe(sectionRef.current);

    return () => sectionObserver.disconnect();
  }, [activeMobileIndex]);

  // Robust IntersectionObserver on mobile cards to detect active centered card
  useEffect(() => {
    if (!carouselRef.current || typeof window === 'undefined') return;

    // Only activate card observer on mobile/tablet viewports
    const mql = window.matchMedia('(max-width: 1023px)');
    let cardObserver: IntersectionObserver | null = null;

    const setupObserver = () => {
      if (cardObserver) cardObserver.disconnect();

      if (mql.matches) {
        cardObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const idx = Number(entry.target.getAttribute('data-index'));
                if (!isNaN(idx)) {
                  setActiveMobileIndex(idx);
                }
              }
            });
          },
          {
            root: carouselRef.current,
            threshold: 0.6,
          }
        );

        cardRefs.current.forEach((card) => {
          if (card) cardObserver?.observe(card);
        });
      }
    };

    setupObserver();
    mql.addEventListener('change', setupObserver);

    return () => {
      mql.removeEventListener('change', setupObserver);
      if (cardObserver) cardObserver.disconnect();
    };
  }, []);

  // Synchronize mobile video playback with active card
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 1024) return;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeMobileIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeMobileIndex]);

  const scrollToCard = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveMobileIndex(index);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="motion-design"
      aria-label="Réalisations en Motion Design"
      style={{
        backgroundColor: 'var(--color-bg, #080808)',
        padding: 'clamp(3.5rem, 8vw, 6.5rem) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container, 1280px)',
          margin: '0 auto',
          padding: '0 var(--grid-gutter, 1.5rem)',
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)', maxWidth: '720px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent, #22c55e)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-accent, #22c55e)',
                fontWeight: 600,
              }}
            >
              Motion design & Vidéo
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: 'clamp(1.85rem, 5.5vw, 3.25rem)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-tight, -0.02em)',
              color: 'var(--color-cream, #f5f5f5)',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Donnez du mouvement à votre marque.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: 'clamp(0.9375rem, 2.8vw, 1.125rem)',
              color: 'var(--color-cream-muted, #999999)',
              lineHeight: 1.6,
            }}
          >
            Des formats percutants pensés pour capter l’attention, valoriser vos interfaces et convertir.
          </p>
        </div>
      </div>

      {/* Cards Container: Full-width on mobile to allow seamless edge-to-edge peek swipe */}
      <div className="motion-section-carousel-wrapper">
        <div
          ref={carouselRef}
          className="motion-cards-container"
        >
          {MOTION_VIDEOS.map((video, index) => {
            const isMiddle = index === 1;
            const isCardActive = index === activeMobileIndex;

            return (
              <div
                key={video.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-index={index}
                role="button"
                tabIndex={0}
                aria-label={`Lire la vidéo de motion design ${video.title}`}
                onClick={() => setActiveLightboxIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveLightboxIndex(index);
                  }
                }}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024 && videoRefs.current[index]) {
                    videoRefs.current[index]?.play().catch(() => {});
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 1024 && videoRefs.current[index]) {
                    videoRefs.current[index]?.pause();
                  }
                }}
                className={`motion-card ${isMiddle ? 'motion-card-middle' : ''} ${
                  isCardActive ? 'motion-card-active' : 'motion-card-inactive'
                }`}
              >
                {/* Poster picture fallback */}
                <picture>
                  <source srcSet={video.posterAvif} type="image/avif" />
                  <source srcSet={video.posterWebp} type="image/webp" />
                  <img
                    src={video.posterJpg}
                    alt={`Aperçu ${video.title}`}
                    className="motion-card-media"
                    loading="lazy"
                  />
                </picture>

                {/* Looping Teaser Video */}
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={video.posterJpg}
                  className="motion-card-media motion-card-video"
                >
                  <source src={video.teaserWebm} type="video/webm" />
                  <source src={video.teaserMp4} type="video/mp4" />
                </video>

                {/* Gradient overlay for contrast */}
                <div className="motion-card-overlay" />

                {/* Play Button Icon */}
                <div className="motion-play-hint">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ transform: 'translateX(1.5px)' }}
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>

                {/* Card Footer: Client Name + "Motion design" ONLY */}
                <div className="motion-card-footer">
                  <span className="motion-card-tag">
                    Motion design
                  </span>
                  <h3 className="motion-card-title">
                    {video.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="motion-pagination-dots" role="tablist" aria-label="Sélectionner une vidéo">
          {MOTION_VIDEOS.map((v, i) => {
            const isActive = i === activeMobileIndex;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => scrollToCard(i)}
                aria-label={`Afficher la vidéo ${v.title} (${i + 1} sur ${MOTION_VIDEOS.length})`}
                className={`motion-dot-btn ${isActive ? 'motion-dot-active' : ''}`}
              >
                <span className="motion-dot-visual" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Modal Lightbox */}
      <MotionLightbox
        videos={MOTION_VIDEOS}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onSelectIndex={(index) => setActiveLightboxIndex(index)}
      />

      <style>{`
        .motion-section-carousel-wrapper {
          width: 100%;
          position: relative;
        }

        /* Card base structure */
        .motion-card {
          position: relative;
          aspect-ratio: 9 / 16;
          border-radius: 18px;
          overflow: hidden;
          background: #111214;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.6);
          touch-action: pan-x pan-y;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          -webkit-user-select: none;
        }

        .motion-card-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .motion-card-video {
          z-index: 2;
        }

        .motion-card-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.88) 0%,
            rgba(0, 0, 0, 0.3) 45%,
            transparent 75%
          );
          pointer-events: none;
        }

        .motion-play-hint {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 4;
          width: clamp(44px, 12vw, 54px);
          height: clamp(44px, 12vw, 54px);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: transform 0.25s ease, background 0.25s ease;
          pointer-events: none;
        }

        .motion-card-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: clamp(1rem, 3.5vw, 1.5rem);
          z-index: 4;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          pointer-events: none;
        }

        .motion-card-tag {
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.6875rem, 2.4vw, 0.75rem);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent, #22c55e);
        }

        .motion-card-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(1.125rem, 4vw, 1.35rem);
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: var(--tracking-tight, -0.01em);
        }

        /* Desktop view (>= 1024px) */
        @media (min-width: 1024px) {
          .motion-cards-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            align-items: center;
            max-width: var(--container, 1280px);
            margin: 0 auto;
            padding: 0 var(--grid-gutter, 1.5rem);
          }

          .motion-card {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
          }

          .motion-card-middle {
            transform: translateY(-20px);
          }

          .motion-card:hover {
            transform: scale(1.03) !important;
            border-color: rgba(34, 197, 94, 0.4) !important;
            box-shadow: 0 25px 50px -12px rgba(34, 197, 94, 0.18), 0 20px 40px -15px rgba(0, 0, 0, 0.8) !important;
          }

          .motion-card-middle:hover {
            transform: translateY(-20px) scale(1.03) !important;
          }

          .motion-card:hover .motion-play-hint {
            transform: translate(-50%, -50%) scale(1.15);
            background: var(--color-accent, #22c55e);
            color: #000000;
          }

          .motion-pagination-dots {
            display: none;
          }
        }

        /* Mobile & Tablet view (< 1024px) */
        @media (max-width: 1023px) {
          .motion-cards-container {
            --card-w: clamp(240px, 72vw, 310px);
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-padding-inline: calc((100vw - var(--card-w)) / 2);
            padding-inline: calc((100vw - var(--card-w)) / 2);
            gap: clamp(1rem, 3.5vw, 1.5rem);
            padding-block: 1rem;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-x: contain;
            scrollbar-width: none;
          }

          .motion-cards-container::-webkit-scrollbar {
            display: none;
          }

          .motion-card {
            flex: 0 0 var(--card-w);
            width: var(--card-w);
            max-width: var(--card-w);
            max-height: min(65svh, 520px);
            scroll-snap-align: center;
            scroll-snap-stop: always;
            transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          }

          .motion-card-active {
            transform: scale(1);
            opacity: 1;
            border-color: rgba(34, 197, 94, 0.35);
            box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 25px -8px rgba(34, 197, 94, 0.2);
          }

          .motion-card-inactive {
            transform: scale(0.92);
            opacity: 0.55;
            filter: brightness(0.85);
          }

          .motion-card:active {
            transform: scale(0.96) !important;
          }

          /* Mobile pagination dots */
          .motion-pagination-dots {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            margin-top: 1.25rem;
          }

          .motion-dot-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 8px 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-tap-highlight-color: transparent;
          }

          .motion-dot-visual {
            display: block;
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            background-color: rgba(255, 255, 255, 0.25);
            transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s ease;
          }

          .motion-dot-active .motion-dot-visual {
            width: 26px;
            background-color: var(--color-accent, #22c55e);
          }
        }
      `}</style>
    </section>
  );
}
