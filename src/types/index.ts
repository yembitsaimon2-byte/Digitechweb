/**
 * DIGITECH WEB — Types globaux
 */

export type ServiceId =
  | 'sites-web'
  | 'logiciels'
  | 'applications'
  | 'ecommerce'
  | 'branding'
  | 'strategie'
  | 'referencement';

export interface Service {
  id: ServiceId;
  number: string;
  title: string;
  description: string;
  items: string[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  slug: string;
  video?: string;
  images?: string[];
  placeholder?: boolean;
  status?: 'published' | 'draft';
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
}

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'infra';
}

export type CursorState = 'default' | 'link' | 'project' | 'image' | 'button';
