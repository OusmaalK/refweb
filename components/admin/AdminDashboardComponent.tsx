"use client";

import { useRouter, usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminDashboardComponent() {
  const router = useRouter();
  const pathname = usePathname();

  const getHomePath = () => {
    if (pathname.startsWith('/admin')) {
      return '/admin/login';
    }
    return '/fr/admin/login';
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push(getHomePath());
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Articles</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Abonnés</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Messages</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>

        <div className="mt-8 bg-white/5 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Bienvenue dans l'espace admin</h2>
          <p className="text-gray-400">
            Vous êtes connecté en tant qu'administrateur.
          </p>
        </div>
      </div>
    </div>
  );
}