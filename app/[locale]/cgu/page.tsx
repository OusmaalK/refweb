'use client';

import LegalPage from '@/components/legal/legalpage';
import { Cookie } from 'lucide-react';

export default function Cookies() {
  return <LegalPage titleKey="cookies_title" contentKey="cookies_content" lastUpdateKey="cookies_date" icon={Cookie} />;
}