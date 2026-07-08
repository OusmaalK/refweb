"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticlesManager from './ArticlesManager';
import NewsletterManager from './NewsletterManager';
import NewsletterEditor from './NewsletterEditor';
import DashboardHome from './DashboardHome';

export default function AdminDashboardComponent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'articles':
        return <ArticlesManager />;
      case 'newsletter':
        return <NewsletterManager />;
      case 'newsletter-redaction':
        return <NewsletterEditor />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div 
      className="flex min-h-screen bg-gray-100"
      suppressHydrationWarning  // ✅ AJOUTÉ
    >
      {/* Sidebar de navigation */}
      <aside 
        className="w-64 bg-[#0a1628] text-white p-6 pt-24 fixed h-full"
        suppressHydrationWarning  // ✅ AJOUTÉ
      >
        <h2 
          className="text-xl font-bold mb-8"
          suppressHydrationWarning  // ✅ AJOUTÉ
        >
          RFC Admin
        </h2>
        <nav 
          className="space-y-4"
          suppressHydrationWarning  // ✅ AJOUTÉ
        >
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`block w-full text-left transition-colors font-medium ${
              activeTab === 'dashboard' ? 'text-[#eab308]' : 'hover:text-[#eab308]'
            }`}
            suppressHydrationWarning
          >
            Tableau de bord
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`block w-full text-left transition-colors font-medium ${
              activeTab === 'articles' ? 'text-[#eab308]' : 'hover:text-[#eab308]'
            }`}
            suppressHydrationWarning
          >
            Articles
          </button>
          <button
            onClick={() => setActiveTab('newsletter')}
            className={`block w-full text-left transition-colors font-medium ${
              activeTab === 'newsletter' ? 'text-[#eab308]' : 'hover:text-[#eab308]'
            }`}
            suppressHydrationWarning
          >
            Gestion Newsletter
          </button>
          <button
            onClick={() => setActiveTab('newsletter-redaction')}
            className={`block w-full text-left transition-colors font-medium ${
              activeTab === 'newsletter-redaction' ? 'text-[#eab308]' : 'hover:text-[#eab308]'
            }`}
            suppressHydrationWarning
          >
            Rédiger Newsletter
          </button>

          {/* Bouton de déconnexion */}
          <button
            onClick={handleLogout}
            className="block w-full text-left text-red-400 mt-10 hover:text-red-300 transition-colors"
            suppressHydrationWarning
          >
            Déconnexion
          </button>
        </nav>
      </aside>

      {/* Zone de contenu principal */}
      <main 
        className="flex-1 p-8 pt-24 ml-64"
        suppressHydrationWarning  // ✅ AJOUTÉ
      >
        {renderContent()}
      </main>
    </div>
  );
}