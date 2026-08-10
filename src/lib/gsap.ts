'use client';

/**
 * DIGITECH WEB — GSAP initialization
 * Registre des plugins GSAP côté client uniquement.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let initialized = false;

export function initGSAP() {
  if (initialized || typeof window === 'undefined') return;
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

  initialized = true;
}

export { gsap, ScrollTrigger };
