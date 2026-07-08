'use client';

// 1. Interface pour recevoir 't' et 'locale' depuis la page
interface StatsProps {
  t: any;
  locale: string;
}

export default function Stats({ t, locale }: StatsProps) {
  const isRTL = locale === 'ar';

  const stats = [
    { value: '300,000+', key: 'capacity' },
    { value: '3', key: 'ports' },
    { value: '20+', key: 'countries' },
    { value: '24h', key: 'response' },
  ];

  return (
    <section className="bg-[#0f172a] border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        
        {/* Gestion dynamique de divide-x et de la direction pour l'arabe */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 divide-gray-800/50 ${
            isRTL ? 'divide-x-reverse divide-x' : 'divide-x'
          }`}
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center px-4 ${
                isRTL 
                  ? 'md:items-end text-center md:text-right' 
                  : 'md:items-start text-center md:text-left'
              }`}
            >
              {/* Valeur Chiffrée */}
              <div className="flex items-center gap-3 mb-1">
                <div className="text-orange-500 text-4xl font-light tracking-tight">
                  {stat.value}
                </div>
              </div>
              
              {/* Intitulé traduit */}
              <p className="text-gray-400 text-sm font-medium leading-short">
                {t.stats?.[stat.key]}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
