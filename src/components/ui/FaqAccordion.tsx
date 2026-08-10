'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Quels types de projets confier à Digitech Web ?',
    answer: 'Nous concevons et développons des solutions numériques complexes et sur mesure : logiciels métiers, applications web et mobiles, plateformes applicatives, ainsi que des sites internet vitrines et e-commerce de prestige.',
  },
  {
    question: 'Comment est gérée la propriété intellectuelle du code ?',
    answer: 'Les droits de propriété intellectuelle, le transfert du code source et la cession des livrables sont définis et régis de façon claire par contrat spécifique, établi individuellement selon la nature de chaque projet.',
  },
  {
    question: 'Quelles technologies utilisez-vous pour les projets ?',
    answer: 'Nous sélectionnons nos technologies en fonction des contraintes de votre projet, et non l\'inverse. Nos architectures s\'appuient sur des outils modernes et scalables tels que Next.js, React, Node.js, Supabase, PostgreSQL et Three.js.',
  },
  {
    question: 'Comment se déroule la collaboration et le suivi de projet ?',
    answer: 'Nous assurons un accompagnement complet depuis la stratégie initiale, le design de l\'expérience utilisateur (UX/UI), le développement, jusqu\'au déploiement et à l\'optimisation de votre produit digital, avec des revues régulières.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            style={{
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: '1rem',
            }}
          >
            <button
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBlock: '1rem',
                textAlign: 'left',
                color: 'var(--color-cream)',
                fontSize: 'var(--text-body-lg)',
                fontWeight: 500,
                fontFamily: 'var(--font-display)',
                letterSpacing: 'var(--tracking-tight)',
              }}
            >
              <span>{item.question}</span>
              <span
                style={{
                  color: isOpen ? 'var(--color-accent)' : 'var(--color-cream-muted)',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  fontSize: '1.25rem',
                  lineHeight: 1,
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? '200px' : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <p
                style={{
                  color: 'var(--color-cream-dim)',
                  fontSize: 'var(--text-body)',
                  lineHeight: 1.6,
                  paddingBottom: '1rem',
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
