import { ClassicTemplate } from './ClassicTemplate';
import { ModernMinimalTemplate } from './ModernMinimalTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { TechnicalTemplate } from './TechnicalTemplate';

export const TEMPLATES = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean typography, balanced spacing, and contemporary layout ideal for all industries.',
    component: ModernMinimalTemplate,
    category: 'Universal',
    defaultColor: '#4f46e5'
  },
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    description: 'Traditional, elegant layout suited for corporate, business, law, and finance roles.',
    component: ClassicTemplate,
    category: 'Corporate',
    defaultColor: '#1e3a8a'
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Distinctive sidebar layout with visual skill meters for designers and creators.',
    component: CreativeTemplate,
    category: 'Design & Creative',
    defaultColor: '#7c3aed'
  },
  {
    id: 'technical-resume',
    name: 'Technical Resume',
    description: 'Structured monospace accents emphasizing code stacks, architecture, and projects.',
    component: TechnicalTemplate,
    category: 'Engineering & Tech',
    defaultColor: '#0284c7'
  }
];

export const getTemplateById = (id) => {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
};
