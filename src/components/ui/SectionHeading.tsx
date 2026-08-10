'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  /** Animate on scroll */
  animate?: boolean;
}

/**
 * SectionHeading — Titre de section normalisé avec label optionnel.
 * Inclut l'animation reveal au scroll.
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
  titleClassName = '',
  animate = true,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!animate || typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          0
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' },
          labelRef.current ? 0.1 : 0
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          0.3
        );
      }
    }, container);

    return () => ctx.revert();
  }, [animate]);

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <div ref={containerRef} className={`${alignClass} ${className}`}>
      {label && (
        <span
          ref={labelRef}
          className="type-label"
          style={{ display: 'block', marginBottom: '1rem' }}
        >
          {label}
        </span>
      )}
      <h2
        ref={titleRef}
        className={`type-h2 ${titleClassName}`}
        style={{ color: 'var(--color-cream)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          ref={subtitleRef}
          className="type-lead"
          style={{ marginTop: '1.25rem', maxWidth: '52ch' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
