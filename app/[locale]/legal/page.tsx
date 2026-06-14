'use client';

import LegalPage from '@/components/legal/legalpage';
import { FileText } from 'lucide-react';

export default function Legal() {
  return <LegalPage titleKey="mentions_title" contentKey="mentions_content" lastUpdateKey="mentions_date" icon={FileText} />;
}