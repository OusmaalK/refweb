'use client';

import { Users, FileText, FolderOpen, BarChart3 } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface RFCAppFeaturesProps {
  t: any;
  locale: string;
}

const FEATURES = [
  { icon: Users, key: 'clients' },
  { icon: FileText, key: 'contracts' },
  { icon: FolderOpen, key: 'claims' },
  { icon: BarChart3, key: 'dashboard' },
];

export default function RFCAppFeatures({ t, locale }: RFCAppFeaturesProps) {
  const isRTL = locale === 'ar';
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-[#0a1628]">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-[#eab308] mb-3 group-hover:scale-110 transition" />
              <h3 className="text-xs md:text-sm font-bold text-white uppercase">
                {t.rfc_app?.features?.[feature.key]?.title || 'FONCTIONNALITÉ'}
              </h3>
              <p className="text-[10px] md:text-xs text-gray-400">
                {t.rfc_app?.features?.[feature.key]?.desc || 'Description'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
