// app/[locale]/page.tsx
'use client';

import Hero from '@/components/hero/Hero';
import Features from '@/components/features/Features';
import AboutSection from '@/components/about/AboutSection';
import ServicesSection from '@/components/service/ServiceSection';
import SectorsSection from '@/components/sectors/SectorsSection';
import OrganizationSection from '@/components/organization/OrganizationSection';
import TeamSection from '@/components/team/TeamSection';
import ReferencesSection from '@/components/references/ReferencesSection';
import ApproachSection from '@/components/approach/ApproachSection';
import AmbitionsSection from '@/components/ambitions/AmbitionsSection';
import BridgeSection from '@/components/bridge/BridgeSection';
import ContactSection from '@/components/contact/ContactSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a1628]">
      <Hero />
      <Features />
      <AboutSection />
      <ServicesSection />
      <SectorsSection />
      <OrganizationSection />
      <TeamSection />
      <ReferencesSection />
      <ApproachSection />
      <AmbitionsSection />
      <BridgeSection />
      <ContactSection />
    </main>
  );
}