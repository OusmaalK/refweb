"use client";

import { useState, useEffect } from 'react';
import { BarChart, Users, FileText, Mail } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function DashboardHome() {
  const [data, setData] = useState({ 
    stats: { subscribers: 0, articles: 0, newsletters: 0, views: 0 }, 
    graphData: [] 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement données:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Chargement de vos données réelles...</div>;
  }

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-[#0a1628]">Tableau de bord</h1>

      {/* Cartes Stats avec données réelles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Abonnés" value={data.stats.subscribers} icon={<Users className="text-[#eab308]" />} />
        <StatCard title="Articles" value={data.stats.articles} icon={<FileText className="text-[#eab308]" />} />
        <StatCard title="Newsletter" value={data.stats.newsletters} icon={<Mail className="text-[#eab308]" />} />
        <StatCard title="Vues Site" value={data.stats.views} icon={<BarChart className="text-[#eab308]" />} />
      </div>

      {/* Graphique avec données réelles */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h2 className="font-bold text-lg mb-6">Évolution des inscriptions</h2>
        
        <div id="chart-wrapper" className="w-full h-75">
          <LineChart 
            width={800} 
            height={300} 
            data={data.graphData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            style={{ width: '100%' }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#6b7280'}} />
            <YAxis stroke="#6b7280" tick={{fill: '#6b7280'}} />
            <Tooltip contentStyle={{ backgroundColor: '#0a1628', color: '#fff' }} />
            <Line 
              type="monotone" 
              dataKey="abonnés" 
              stroke="#0a1628" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#0a1628' }} 
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-3 bg-yellow-50 rounded-lg">{icon}</div>
    </div>
  );
}