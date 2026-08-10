'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Hook Lenis smooth scroll.
 * À utiliser dans le root layout (une seule instance).
 */
export function useLenis() {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    lenisInstance = new Lenis({
      duration: prefersReduced ? 0 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: !prefersReduced,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
}
