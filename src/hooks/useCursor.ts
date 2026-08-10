'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CursorState } from '@/types';

/**
 * Hook curseur personnalisé.
 * Fournit position et état du curseur.
 */
export function useCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const updateState = useCallback((newState: CursorState) => {
    setState(newState);
  }, []);

  useEffect(() => {
    // Uniquement sur desktop (pointer fine = souris)
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseenter', () => setIsVisible(true));
    document.addEventListener('mouseleave', () => setIsVisible(false));

    // Délégation d'événements pour changer l'état du curseur
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="project"]')) setState('project');
      else if (target.closest('[data-cursor="image"]')) setState('image');
      else if (target.closest('[data-cursor="button"]')) setState('button');
      else if (target.closest('a, button')) setState('link');
      else setState('default');
    };

    document.addEventListener('mouseover', handleOver, { passive: true });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleOver);
    };
  }, [updatePosition]);

  return { position, state, isVisible, updateState };
}
