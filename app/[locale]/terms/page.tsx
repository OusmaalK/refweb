'use client';

import LegalPage from '@/components/legal/legalpage';
import { Scale } from 'lucide-react';

export default function Terms() {
  return <LegalPage titleKey="terms_title" contentKey="terms_content" lastUpdateKey="terms_date" icon={Scale} />;
}