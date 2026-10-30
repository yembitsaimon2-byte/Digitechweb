import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Digitech Web',
  description:
    'Parlons de votre projet. Contactez Digitech Web pour démarrer votre projet digital : site web, logiciel, application ou identité visuelle.',
  alternates: { canonical: 'https://www.digitechweb.online/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
