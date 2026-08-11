'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { CursorState } from '@/types';

/**
 * Hook curseur personnalisé hautement optimisé.
 * Pas de re-render React au déplacement de la souris.
 */
export function useCursor() {
  const posRef = useRef({ x: -100, y: -100 });
  const [state, setState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);

  const updateState = useCallback((newState: CursorState) => {
    setState(newState);
  }, []);

  useEffect(() => {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

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
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return { posRef, state, isVisible, updateState };
}

