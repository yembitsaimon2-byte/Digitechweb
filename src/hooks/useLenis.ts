'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from '@/lib/gsap';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Hook Lenis smooth scroll.
 * Une seule boucle RAF synchronisée avec GSAP.
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

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

    // Synchronisation de Lenis avec la boucle ticker de GSAP
    const updateLenis = (time: number) => {
      lenisInstance?.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
}

