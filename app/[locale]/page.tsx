// app/[locale]/page.tsx
import Hero from '@/components/hero/Hero';
import Features from '@/components/features/Features';
import AboutSection from '@/components/about/AboutSection';
import ServicesSection from '@/components/service/ServiceSection';
import SectorsSection from '@/components/sectors/SectorsSection';
import OrganizationSection from '@/components/organization/OrganizationSection';
import TeamSection from '@/components/team/TeamSection';
import ApproachSection from '@/components/approach/ApproachSection';
import AmbitionsSection from '@/components/ambitions/AmbitionsSection';
import BridgeSection from '@/components/bridge/BridgeSection';
import ContactSection from '@/components/contact/ContactSection';
// Import de votre section Blog
import BlogSection from '@/components/blog/BlogSection';

export default function HomePage({ params }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen bg-[#0a1628]">
      <Hero />
      <Features />
      <AboutSection />
      <ServicesSection />
      <SectorsSection />
      <OrganizationSection />
      <TeamSection />
      <ApproachSection />
      <AmbitionsSection />
      <BridgeSection />
      
      <BlogSection />
      
      <ContactSection />
    </main>
  );
}