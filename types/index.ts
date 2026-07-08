import { ElementType } from 'react';

// Interfaces existantes pour votre navigation et vos fonctionnalités
export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

export interface FeatureItem {
  icon: ElementType;
  title: string;
  desc: string;
}

// Nouvelles interfaces pour le Blog RFC
export interface BlogCategory {
  title: string;
}

export interface BlogPost {
  category: string; // Référence à la clé de la catégorie
  title: string;
  subtitle: string;
}

export interface BlogConfig {
  title: string;
  subtitle: string;
  categories: Record<string, BlogCategory>;
  posts: Record<string, BlogPost>;
}