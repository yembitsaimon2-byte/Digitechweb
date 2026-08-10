'use client';

import { useEffect, useRef } from 'react';
import { createMagneticEffect } from '@/lib/animations';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'link';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  magnetic?: boolean;
  className?: string;
  'data-cursor'?: string;
  target?: string;
  rel?: string;
  id?: string;
}

/**
 * Composant Button universel — primary, ghost, link.
 * Magnetic sur desktop si magnetic=true.
 */
export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  magnetic = false,
  className = '',
  id,
  target,
  rel,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!magnetic || !ref.current) return;
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;
    return createMagneticEffect(ref.current as HTMLElement);
  }, [magnetic]);

  const classes = `${variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : 'btn-link'} ${className}`.trim();

  const content = loading ? (
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <LoadingSpinner />
      {children}
    </span>
  ) : (
    children
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        data-cursor="button"
        target={target}
        rel={rel}
        id={id}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      data-cursor="button"
      id={id}
      aria-busy={loading}
      {...rest}
    >
      {content}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{
        animation: 'spin 0.8s linear infinite',
      }}
      aria-hidden="true"
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}
