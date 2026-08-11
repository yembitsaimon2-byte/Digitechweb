'use client';

import { useState, useRef, useEffect } from 'react';
import type { Metadata } from 'next';
import { gsap } from '@/lib/gsap';
import { CONTACT } from '@/lib/data';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

type FormState = 'idle' | 'loading' | 'success' | 'error';

type FormData = {
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  typeProjet: string;
  budget: string;
  message: string;
};

const TYPES_PROJET = [
  'Site web',
  'Logiciel sur mesure',
  'Application mobile',
  'E-commerce',
  'Identité visuelle',
  'Stratégie digitale',
  'Référencement',
  'Autre',
];

const BUDGETS = [
  'Moins de 1 500 €',
  '1 500 € — 3 000 €',
  '3 000 € — 7 500 €',
  '7 500 € — 15 000 €',
  '15 000 € — 30 000 €',
  'Plus de 30 000 €',
  'À définir',
];

const EMPTY_FORM: FormData = {
  nom: '',
  entreprise: '',
  email: '',
  telephone: '',
  typeProjet: '',
  budget: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<FormState>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      headingRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.nom.trim()) newErrors.nom = 'Ce champ est requis.';
    if (!form.email.trim()) {
      newErrors.email = 'Ce champ est requis.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Adresse e-mail invalide.';
    }
    if (!form.message.trim()) newErrors.message = 'Décrivez brièvement votre projet.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error('Erreur d’envoi formulaire:', err);
      setStatus('error');
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: 'clamp(8rem, 14vw, 14rem)',
          paddingBottom: 'var(--section-md)',
          paddingInline: 'var(--grid-gutter)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div ref={headingRef} style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <span
            className="type-label"
            style={{ display: 'block', marginBottom: '1.5rem', opacity: 0 }}
          >
            Contact
          </span>
          <h1
            className="type-display"
            style={{ color: 'var(--color-cream)', maxWidth: '14ch', opacity: 0 }}
          >
            Parlons de votre projet.
          </h1>
          <p
            className="type-lead"
            style={{ marginTop: '1.5rem', maxWidth: '52ch', opacity: 0 }}
          >
            Une idée, un besoin ou un projet en préparation ? Échangeons autour de ce que
            nous pouvons construire ensemble.
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section
        style={{
          paddingBlock: 'var(--section-lg)',
          paddingInline: 'var(--grid-gutter)',
        }}
      >
        <div className="contact-grid">
          {/* Infos latérales */}
          <div className="contact-info-col">
            <div className="contact-sticky-info">
              <h2 className="type-h3" style={{ color: 'var(--color-cream)', marginBottom: '1.5rem' }}>
                Digitech Web
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <p className="type-caption" style={{ marginBottom: '0.25rem' }}>E-mail</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    style={{ color: 'var(--color-cream-dim)', fontSize: 'var(--text-body)', textDecoration: 'none', transition: 'color 0.25s', wordBreak: 'break-word' }}
                    className="contact-link"
                  >
                    {CONTACT.email}
                  </a>
                </div>
                <div>
                  <p className="type-caption" style={{ marginBottom: '0.25rem' }}>Téléphone</p>
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    style={{ color: 'var(--color-cream-dim)', fontSize: 'var(--text-body)', textDecoration: 'none', transition: 'color 0.25s' }}
                    className="contact-link"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
                <div>
                  <p className="type-caption" style={{ marginBottom: '0.25rem' }}>Instagram</p>
                  <a
                    href={CONTACT.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-cream-dim)', fontSize: 'var(--text-body)', textDecoration: 'none', transition: 'color 0.25s' }}
                    className="contact-link"
                  >
                    @digitech_web1
                  </a>
                </div>
                <div>
                  <p className="type-caption" style={{ marginBottom: '0.25rem' }}>Réponse</p>
                  <p style={{ color: 'var(--color-cream-dim)', fontSize: 'var(--text-body)' }}>
                    Sous 24 à 48h ouvrées
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire principal */}
          <div className="contact-form-col">
            {status === 'success' ? (
              <div
                style={{
                  padding: '3rem',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="type-h3" style={{ color: 'var(--color-cream)', marginBottom: '1rem' }}>
                  Message envoyé.
                </h2>
                <p className="type-body" style={{ color: 'var(--color-cream-dim)', marginBottom: '2rem' }}>
                  Merci pour votre message. Nous vous répondrons dans les meilleurs délais.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-ghost"
                  id="contact-reset"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Formulaire de contact Digitech Web"
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Ligne 1 : Nom + Entreprise */}
                  <div className="form-row-two-cols">
                    <Field
                      id="contact-nom"
                      name="nom"
                      label="Nom *"
                      type="text"
                      value={form.nom}
                      error={errors.nom}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    <Field
                      id="contact-entreprise"
                      name="entreprise"
                      label="Entreprise"
                      type="text"
                      value={form.entreprise}
                      onChange={handleChange}
                      autoComplete="organization"
                    />
                  </div>

                  {/* Ligne 2 : Email + Téléphone */}
                  <div className="form-row-two-cols">
                    <Field
                      id="contact-email"
                      name="email"
                      label="Adresse e-mail *"
                      type="email"
                      value={form.email}
                      error={errors.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                    <Field
                      id="contact-telephone"
                      name="telephone"
                      label="Téléphone"
                      type="tel"
                      value={form.telephone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>

                  {/* Ligne 3 : Type de projet + Budget */}
                  <div className="form-row-two-cols">
                    <SelectField
                      id="contact-type-projet"
                      name="typeProjet"
                      label="Type de projet"
                      options={TYPES_PROJET}
                      value={form.typeProjet}
                      onChange={handleChange}
                    />
                    <SelectField
                      id="contact-budget"
                      name="budget"
                      label="Budget indicatif"
                      options={BUDGETS}
                      value={form.budget}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Message */}
                  <TextareaField
                    id="contact-message"
                    name="message"
                    label="Message *"
                    value={form.message}
                    error={errors.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet, vos objectifs et vos contraintes..."
                  />

                  {/* Error global */}
                  {status === 'error' && (
                    <p
                      role="alert"
                      style={{
                        color: '#F87171',
                        fontSize: 'var(--text-small)',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(248,113,113,0.1)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(248,113,113,0.3)',
                      }}
                    >
                      Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par e-mail.
                    </p>
                  )}

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary"
                      id="contact-submit"
                      aria-busy={status === 'loading'}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {status === 'loading' ? (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}
                            aria-hidden="true"
                          >
                            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                            <path d="M12 2a10 10 0 0 1 10 10" />
                          </svg>
                          Envoi en cours…
                        </>
                      ) : (
                        'Envoyer ma demande'
                      )}
                    </button>
                    <p className="type-small" style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                      Vos données sont traitées de façon confidentielle.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Bouton WhatsApp Flottant */}
      <WhatsAppButton />

      {/* Styles responsive isolés pour la page Contact (Desktop 100% inchangé) */}
      <style>{`
        .contact-grid {
          max-width: var(--container);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: var(--grid-gutter);
        }
        .contact-info-col {
          grid-column: span 4;
        }
        .contact-sticky-info {
          position: sticky;
          top: 8rem;
        }
        .contact-form-col {
          grid-column: 6 / span 7;
        }
        .form-row-two-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .contact-link:hover {
          color: var(--color-cream) !important;
        }

        /* Responsive Mobile & Tablette (≤768px) */
        @media (max-width: 768px) {
          .contact-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 2.5rem !important;
          }
          .contact-info-col,
          .contact-form-col {
            grid-column: span 12 !important;
            width: 100% !important;
          }
          .contact-sticky-info {
            position: static !important;
          }
          .form-row-two-cols {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </>
  );
}

/* ---- Composants formulaire ---- */

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder?: string;
}

function Field({ id, name, label, type, value, error, onChange, autoComplete, placeholder }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label htmlFor={id} className="type-small" style={{ color: error ? '#F87171' : 'var(--color-cream-dim)' }}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          backgroundColor: 'var(--color-surface)',
          border: `1px solid ${error ? '#F87171' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          color: 'var(--color-cream)',
          fontSize: 'var(--text-body)',
          outline: 'none',
          transition: 'border-color 0.25s ease',
          width: '100%',
        }}
        className="form-input"
      />
      {error && (
        <p id={`${id}-error`} role="alert" style={{ fontSize: 'var(--text-caption)', color: '#F87171', marginTop: '0.125rem' }}>
          {error}
        </p>
      )}
      <style>{`.form-input:focus { border-color: var(--color-accent) !important; }`}</style>
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectField({ id, name, label, options, value, onChange }: SelectFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label htmlFor={id} className="type-small" style={{ color: 'var(--color-cream-dim)' }}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          color: value ? 'var(--color-cream)' : 'var(--color-cream-muted)',
          fontSize: 'var(--text-body)',
          outline: 'none',
          transition: 'border-color 0.25s ease',
          width: '100%',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239A9590' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center',
        }}
        className="form-input"
      >
        <option value="" style={{ color: 'var(--color-cream-muted)' }}>Sélectionner…</option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ color: 'var(--color-cream)', backgroundColor: 'var(--color-surface)' }}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextareaFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

function TextareaField({ id, name, label, value, error, onChange, placeholder }: TextareaFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label htmlFor={id} className="type-small" style={{ color: error ? '#F87171' : 'var(--color-cream-dim)' }}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={6}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          backgroundColor: 'var(--color-surface)',
          border: `1px solid ${error ? '#F87171' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          color: 'var(--color-cream)',
          fontSize: 'var(--text-body)',
          outline: 'none',
          transition: 'border-color 0.25s ease',
          width: '100%',
          resize: 'vertical',
          minHeight: 140,
          fontFamily: 'var(--font-body)',
        }}
        className="form-input"
      />
      {error && (
        <p id={`${id}-error`} role="alert" style={{ fontSize: 'var(--text-caption)', color: '#F87171', marginTop: '0.125rem' }}>
          {error}
        </p>
      )}
    </div>
  );
}
