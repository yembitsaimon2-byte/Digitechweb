'use client';

import { useEffect, useRef, useState } from 'react';
import { useCursor } from '@/hooks/useCursor';
import { gsap } from '@/lib/gsap';

/**
 * Curseur personnalisé desktop ultra-optimisé.
 * Utilise GSAP quickTo / ticker direct (0 re-render React au déplacement).
 * Désactivé sur mobile (pointer: coarse).
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { posRef, state, isVisible } = useCursor();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setMounted(true);
      document.body.classList.add('custom-cursor-active');
      return () => document.body.classList.remove('custom-cursor-active');
    }
  }, []);

  // Initialisation des animateurs GSAP rapides uniquement quand monté sur desktop
  useEffect(() => {
    if (!mounted || !dotRef.current || !ringRef.current) return;

    const setDotX = gsap.quickSetter(dotRef.current, 'x', 'px');
    const setDotY = gsap.quickSetter(dotRef.current, 'y', 'px');

    const quickRingX = gsap.quickTo(ringRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
    const quickRingY = gsap.quickTo(ringRef.current, 'y', { duration: 0.35, ease: 'power3.out' });

    const updateCursorPosition = () => {
      setDotX(posRef.current.x);
      setDotY(posRef.current.y);
      quickRingX(posRef.current.x);
      quickRingY(posRef.current.y);
    };

    gsap.ticker.add(updateCursorPosition);

    return () => {
      gsap.ticker.remove(updateCursorPosition);
    };
  }, [mounted, posRef]);

  if (!mounted) return null;

  // Style selon l'état (hover)
  const ringScale = {
    default: 1,
    link: 1.6,
    project: 2.5,
    image: 2,
    button: 1.8,
  }[state];

  const ringBorder = state === 'project' ? 'var(--color-accent)' : 'rgba(245,240,235,0.6)';
  const ringBg = state === 'project' ? 'rgba(200,240,74,0.08)' : 'transparent';

  return (
    <>
      {/* Dot central */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: state === 'project' ? 'var(--color-accent)' : 'var(--color-cream)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s, background-color 0.3s',
          mixBlendMode: 'difference',
        }}
      />

      {/* Ring avec inertie */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: `1px solid ${ringBorder}`,
          backgroundColor: ringBg,
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          pointerEvents: 'none',
          zIndex: 'calc(var(--z-cursor) - 1)',
          opacity: isVisible ? 0.7 : 0,
          transition: 'opacity 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, background-color 0.3s',
        }}
      />
    </>
  );
}

