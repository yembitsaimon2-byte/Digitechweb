import React from 'react';

interface LogoProps {
  className?: string;
  height?: number | string;
  variant?: 'light' | 'accent' | 'monochrome';
  style?: React.CSSProperties;
}

/**
 * Logo Officiel Digitech Web
 * Représentation géométrique exacte du monogramme 'D' entrelacé avec le symbole technologique 'W',
 * suivi du logotype typographique 'DIGITECH WEB' en Syne/Inter.
 */
export default function Logo({ className = '', height = 36, style }: LogoProps) {
  return (
    <img
      src="https://i.ibb.co/FL1X204H/digi-logo.png"
      alt="Digitech Web"
      className={className}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: 'auto',
        maxWidth: '100%',
        objectFit: 'contain',
        display: 'block',
        ...style,
      }}
    />
  );
}
