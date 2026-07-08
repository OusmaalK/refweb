"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import pour la redirection
import ArticlesManager from './ArticlesManager';
import NewsletterManager from './NewsletterManager';
import NewsletterEditor from './NewsletterEditor';
import DashboardHome from './DashboardHome';

export default function AdminDashboardComponent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter(); // Initialisation du router

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      // Appel à votre API de déconnexion
      await fetch('/api/auth/logout', { method: 'POST' });
      
      // Redirection vers l'accueil après déconnexion
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar de navigation */}
      <aside className="w-64 bg-[#0a1628] text-white p-6 pt-24 fixed h-full"> 
        <h2 className="text-xl font-bold mb-8">RFC Admin</h2>
        <nav className="space-y-4">
            <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`block w-full text-left transition-colors font-medium ${activeTab === 'dashboard' ? 'text-[#eab308]' : 'hover:text-[#eab308]'}`}
            >
                Tableau de bord
            </button>
            <button 
                onClick={() => setActiveTab('articles')} 
                className={`block w-full text-left transition-colors font-medium ${activeTab === 'articles' ? 'text-[#eab308]' : 'hover:text-[#eab308]'}`}
            >
                Articles
            </button>
            <button 
                onClick={() => setActiveTab('newsletter')} 
                className={`block w-full text-left transition-colors font-medium ${activeTab === 'newsletter' ? 'text-[#eab308]' : 'hover:text-[#eab308]'}`}
            >
                Gestion Newsletter
            </button>
            <button 
                onClick={() => setActiveTab('newsletter-redaction')} 
                className={`block w-full text-left transition-colors font-medium ${activeTab === 'newsletter-redaction' ? 'text-[#eab308]' : 'hover:text-[#eab308]'}`}
            >
                Rédiger Newsletter
            </button>
            
            {/* Bouton de déconnexion mis à jour */}
            <button 
                onClick={handleLogout}
                className="block w-full text-left text-red-400 mt-10 hover:text-red-300 transition-colors"
            >
                Déconnexion
            </button>
        </nav>
      </aside>

      {/* Zone de contenu principal */}
      <main className="flex-1 p-8 pt-24 ml-64"> 
        {renderContent()}
      </main>
    </div>
  );
}