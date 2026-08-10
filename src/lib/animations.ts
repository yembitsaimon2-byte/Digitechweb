/**
 * DIGITECH WEB — Animations utilitaires GSAP
 */

import { gsap, ScrollTrigger } from './gsap';

/**
 * Reveal text lignes par lignes (wraps lines in .reveal-wrapper)
 */
export function revealLines(
  targets: HTMLElement | HTMLElement[] | string,
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) {
  const {
    delay = 0,
    stagger = 0.08,
    duration = 0.9,
    scrollTrigger,
  } = options ?? {};

  return gsap.fromTo(
    targets,
    { y: '105%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: 'power4.out',
      scrollTrigger,
    }
  );
}

/**
 * Fade in simple avec translate Y
 */
export function fadeUp(
  targets: HTMLElement | HTMLElement[] | string,
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
    y?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) {
  const {
    delay = 0,
    stagger = 0.1,
    duration = 0.8,
    y = 30,
    scrollTrigger,
  } = options ?? {};

  return gsap.fromTo(
    targets,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger,
    }
  );
}

/**
 * Reveal depuis la gauche (ligne décorative)
 */
export function revealFromLeft(
  target: HTMLElement | string,
  options?: { delay?: number; duration?: number; scrollTrigger?: ScrollTrigger.Vars }
) {
  const { delay = 0, duration = 1, scrollTrigger } = options ?? {};

  return gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration,
      delay,
      ease: 'power4.inOut',
      scrollTrigger,
    }
  );
}

/**
 * Magnetic button effect
 * Retourne les handlers à attacher à l'élément
 */
export function createMagneticEffect(
  element: HTMLElement,
  strength = 0.3,
  radius = 80
) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      gsap.to(element, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}
