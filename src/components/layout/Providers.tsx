'use client';

import { useLenis } from '@/hooks/useLenis';
import { useEffect } from 'react';
import { initGSAP } from '@/lib/gsap';

/**
 * Provider client-side pour les effets globaux :
 * - Lenis smooth scroll
 * - GSAP initialization
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  useLenis();

  useEffect(() => {
    initGSAP();
  }, []);

  return <>{children}</>;
}
