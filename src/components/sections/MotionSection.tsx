'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MOTION_VIDEOS } from '@/lib/data';
import MotionLightbox from '@/components/ui/MotionLightbox';

export default function MotionSection() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver to auto-play only when in viewport & handle mobile active card
  useEffect(() => {
    if (!sectionRef.current) return;

    // Observe entire section to pause all videos if scrolled past
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) {
          videoRefs.current.forEach((vid) => {
            if (vid && !vid.paused) vid.pause();
          });
        }
      },
      { threshold: 0.1 }
    );
    sectionObserver.observe(sectionRef.current);

    return () => sectionObserver.disconnect();
  }, []);

  // Mobile carousel scroll listener to determine center card & play its teaser
  const handleScroll = useCallback(() => {
    if (!carouselRef.current || !isMobile) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.offsetWidth * 0.75 + 16; // width + gap
    const newIndex = Math.min(
      MOTION_VIDEOS.length - 1,
      Math.max(0, Math.round(scrollLeft / itemWidth))
    );

    if (newIndex !== activeMobileIndex) {
      setActiveMobileIndex(newIndex);
    }
  }, [activeMobileIndex, isMobile]);

  // Synchronize playback based on active card (mobile) or viewport (desktop)
  useEffect(() => {
    if (isMobile) {
      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        if (index === activeMobileIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, [activeMobileIndex, isMobile]);

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="motion-design"
      aria-label="Réalisations en Motion Design"
      style={{
        backgroundColor: 'var(--color-bg, #080808)',
        padding: 'var(--section-lg, 6rem) 0',
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
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '720px' }}>
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
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
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
              fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
              color: 'var(--color-cream-muted, #999999)',
              lineHeight: 1.6,
            }}
          >
            Des formats percutants pensés pour capter l’attention, valoriser vos interfaces et convertir.
          </p>
        </div>

        {/* Desktop Grid & Mobile Carousel */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="motion-cards-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {MOTION_VIDEOS.map((video, index) => {
            const isMiddle = index === 1;
            const isCardActiveOnMobile = isMobile ? index === activeMobileIndex : true;

            return (
              <div
                key={video.id}
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
                  if (!isMobile && videoRefs.current[index]) {
                    videoRefs.current[index]?.play().catch(() => {});
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile && videoRefs.current[index]) {
                    videoRefs.current[index]?.pause();
                  }
                }}
                className={`motion-card ${isMiddle ? 'motion-card-middle' : ''}`}
                style={{
                  position: 'relative',
                  aspectRatio: '9 / 16',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: '#121316',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
                  transform: isMobile
                    ? isCardActiveOnMobile
                      ? 'scale(1)'
                      : 'scale(0.94)'
                    : isMiddle
                    ? 'translateY(-20px)'
                    : 'none',
                  opacity: isMobile ? (isCardActiveOnMobile ? 1 : 0.6) : 1,
                  transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  maxHeight: isMobile ? 'min(70svh, 540px)' : 'none',
                  scrollSnapAlign: isMobile ? 'center' : 'none',
                }}
              >
                {/* Poster picture fallback */}
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

                {/* Subtle gradient overlay for text readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 3,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 40%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Play Button Icon floating in center */}
                <div
                  className="motion-play-hint"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 4,
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    transition: 'transform 0.3s ease, background 0.3s ease',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ transform: 'translateX(2px)' }}
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>

                {/* Card Footer: Client Name + "Motion design" ONLY (per requirement) */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    zIndex: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--color-accent, #22c55e)',
                    }}
                  >
                    Motion design
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, sans-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: 0,
                      letterSpacing: 'var(--tracking-tight, -0.01em)',
                    }}
                  >
                    {video.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Pagination Dots */}
        {isMobile && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem',
            }}
          >
            {MOTION_VIDEOS.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => scrollToCard(i)}
                aria-label={`Afficher la vidéo ${v.title}`}
                style={{
                  width: i === activeMobileIndex ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor:
                    i === activeMobileIndex
                      ? 'var(--color-accent, #22c55e)'
                      : 'rgba(255, 255, 255, 0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <MotionLightbox
        videos={MOTION_VIDEOS}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onSelectIndex={(index) => setActiveLightboxIndex(index)}
      />

      <style>{`
        @media (min-width: 1024px) {
          .motion-card:hover {
            transform: scale(1.03) !important;
            border-color: rgba(34, 197, 94, 0.4) !important;
            box-shadow: 0 25px 50px -12px rgba(34, 197, 94, 0.15), 0 20px 40px -15px rgba(0, 0, 0, 0.8) !important;
          }
          .motion-card-middle:hover {
            transform: translateY(-20px) scale(1.03) !important;
          }
          .motion-card:hover .motion-play-hint {
            transform: translate(-50%, -50%) scale(1.15) !important;
            background: var(--color-accent, #22c55e) !important;
            color: #000000 !important;
          }
        }

        @media (max-width: 1023px) {
          .motion-cards-container {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            scroll-padding: 0 calc(50vw - 37.5vw) !important;
            gap: 1.25rem !important;
            padding: 1rem 12.5vw !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }
          .motion-cards-container::-webkit-scrollbar {
            display: none !important;
          }
          .motion-card {
            flex: 0 0 75vw !important;
            max-width: 320px !important;
          }
        }
      `}</style>
    </section>
  );
}
