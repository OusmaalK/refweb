// lib/blog-utils.ts
import fr from '@/data/translations/fr';
import en from '@/data/translations/en';
import ar from '@/data/translations/ar'; // Assurez-vous que le fichier s'appelle bien ar.ts

export async function getBlogData(lang: string) {
  switch (lang) {
    case 'en':
      return en;
    case 'ar':
      return ar;
    case 'fr':
    default:
      return fr;
  }
}