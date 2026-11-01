'use client';

/**
 * DIGITECH WEB — GSAP initialization
 * Registre des plugins GSAP côté client immédiatement à l'import.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Configuration globale GSAP
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
  });

  // Rafraîchissement après chargement des polices / ressources
  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
}

export function initGSAP() {
  if (typeof window === 'undefined') return;
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
export default gsap;
