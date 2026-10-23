export interface ProjectCredit {
  role: string;
  name: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: 'Film & Documentary' | 'Motion & 3D' | 'Commercials';
  categoryLabel: string;
  role: string;
  summary: string;
  narrative: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  credits: ProjectCredit[];
  metrics: ProjectMetric[];
  accentColor: string;
  videoDuration: string;
  videoUrl?: string;
  imageUrl: string;
  galleryImages: {
    title: string;
    caption: string;
    gradient: string;
    imageUrl?: string;
  }[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface ArchiveStill {
  id: string;
  title: string;
  project: string;
  location: string;
  camera: string;
  lens: string;
  exif: string;
  year: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  gradient: string;
  imageUrl: string;
  description: string;
  backstory?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface InquiryFormData {
  disciplines: string[];
  timeline: string;
  name: string;
  email: string;
  organization: string;
  narrative: string;
  budgetRange: string;
}
