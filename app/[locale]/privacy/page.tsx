'use client';

import LegalPage from '@/components/legal/legalpage';
import { Shield } from 'lucide-react';

export default function Privacy() {
  return <LegalPage titleKey="privacy_title" contentKey="privacy_content" lastUpdateKey="privacy_date" icon={Shield} />;
}