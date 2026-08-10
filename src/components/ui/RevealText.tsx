'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type TagName = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

interface RevealTextProps {
  children: React.ReactNode;
  as?: TagName;
  className?: string;
  delay?: number;
  duration?: number;
  /** Si true, l'animation se déclenche au scroll. Si false, immédiatement. */
  scroll?: boolean;
  threshold?: number;
}

/**
 * Composant RevealText — animation de révélation typographique.
 * Le texte entre par le bas depuis un conteneur clippé (overflow hidden).
 */
export default function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  duration = 0.9,
  scroll = true,
  threshold = 0.1,
}: RevealTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { y: '105%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration,
          delay,
          ease: 'power4.out',
          scrollTrigger: scroll
            ? {
                trigger: wrapper,
                start: `top ${Math.round((1 - threshold) * 100)}%`,
                toggleActions: 'play none none none',
              }
            : undefined,
        }
      );
    }, wrapper);

    return () => ctx.revert();
  }, [delay, duration, scroll, threshold]);

  const WrapperTag = Tag as React.ElementType;

  return (
    <WrapperTag
      ref={wrapperRef}
      className={className}
      style={{ overflow: 'hidden', display: 'block' }}
    >
      <span ref={innerRef} style={{ display: 'block' }}>
        {children}
      </span>
    </WrapperTag>
  );
}
