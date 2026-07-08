"use client";

import { useState, useEffect } from 'react';
import { BarChart, Users, FileText, Mail } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardData {
  stats: {
    subscribers: number;
    articles: number;
    newsletters: number;
    views: number;
  };
  graphData: { name: string; abonnés: number }[];
}

export default function DashboardHome() {
  const [data, setData] = useState<DashboardData>({ 
    stats: { subscribers: 0, articles: 0, newsletters: 0, views: 0 }, 
    graphData: [] 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/dashboard');
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}`);
        }
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        console.error("Erreur chargement données:", err);
        setError("Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div 
        className="p-10 text-center text-gray-500"
        suppressHydrationWarning  // ✅ AJOUTÉ
      >
        Chargement de vos données réelles...
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="p-10 text-center"
        suppressHydrationWarning  // ✅ AJOUTÉ
      >
        <p className="text-red-500">{error}</p>
        <p className="text-gray-400 text-sm mt-2">Affichage des données par défaut</p>
      </div>
    );
  }

  return (
    <div 
      className="space-y-8 p-6"
      suppressHydrationWarning  // ✅ AJOUTÉ
    >
      <h1 
        className="text-3xl font-bold text-[#0a1628]"
        suppressHydrationWarning  // ✅ AJOUTÉ
      >
        Tableau de bord
      </h1>

      {/* Cartes Stats avec données réelles */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        suppressHydrationWarning  // ✅ AJOUTÉ
      >
        <StatCard 
          title="Abonnés" 
          value={data.stats?.subscribers ?? 0} 
          icon={<Users className="text-[#eab308]" />} 
        />
        <StatCard 
          title="Articles" 
          value={data.stats?.articles ?? 0} 
          icon={<FileText className="text-[#eab308]" />} 
        />
        <StatCard 
          title="Newsletter" 
          value={data.stats?.newsletters ?? 0} 
          icon={<Mail className="text-[#eab308]" />} 
        />
        <StatCard 
          title="Vues Site" 
          value={data.stats?.views ?? 0} 
          icon={<BarChart className="text-[#eab308]" />} 
        />
      </div>

      {/* Graphique avec données réelles */}
      <div 
        className="bg-white p-6 rounded-xl shadow border border-gray-100"
        suppressHydrationWarning  // ✅ AJOUTÉ
      >
        <h2 
          className="font-bold text-lg mb-6"
          suppressHydrationWarning  // ✅ AJOUTÉ
        >
          Évolution des inscriptions
        </h2>
        
        <div 
          className="w-full h-72"
          suppressHydrationWarning  // ✅ AJOUTÉ
        >
          {data.graphData && data.graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data.graphData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a1628', color: '#fff', borderRadius: '8px' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="abonnés" 
                  stroke="#0a1628" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#0a1628' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div 
              className="flex items-center justify-center h-full text-gray-400"
              suppressHydrationWarning  // ✅ AJOUTÉ
            >
              Aucune donnée disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div 
      className="bg-white p-6 rounded-xl shadow border border-gray-100 flex items-center justify-between"
      suppressHydrationWarning  // ✅ AJOUTÉ
    >
      <div suppressHydrationWarning>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-3 bg-yellow-50 rounded-lg">{icon}</div>
    </div>
  );
}