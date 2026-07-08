"use client";
import { useState, useEffect } from 'react';

export default function ArticlesManager() {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: '', slug: '', subtitle: '', content: '', imagePath: '', author: '', category: '', lang: 'fr'
  });

  useEffect(() => { fetchArticles(); }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles');
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("Erreur chargement:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    // Réinitialiser le formulaire
    setFormData({ title: '', slug: '', subtitle: '', content: '', imagePath: '', author: '', category: '', lang: 'fr' });
    fetchArticles();
  };

  const deleteArticle = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
    
    await fetch(`/api/admin/articles?id=${id}`, { method: 'DELETE' });
    fetchArticles();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Formulaire de création */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
        <h3 className="text-2xl font-bold text-[#0a1628] border-b pb-4">Ajouter un article</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Titre</label>
            <input className="w-full border-gray-300 border rounded-lg p-3 focus:ring-2 focus:ring-[#eab308] outline-none transition" onChange={e => setFormData({...formData, title: e.target.value})} value={formData.title} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Slug (URL)</label>
            <input className="w-full border-gray-300 border rounded-lg p-3 focus:ring-2 focus:ring-[#eab308] outline-none transition" onChange={e => setFormData({...formData, slug: e.target.value})} value={formData.slug} required />
          </div>
          <div className="space-y-2 col-span-full">
            <label className="text-sm font-semibold text-gray-600">Sous-titre</label>
            <input className="w-full border-gray-300 border rounded-lg p-3 focus:ring-2 focus:ring-[#eab308] outline-none transition" onChange={e => setFormData({...formData, subtitle: e.target.value})} value={formData.subtitle} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Auteur</label>
            <input className="w-full border-gray-300 border rounded-lg p-3 focus:ring-2 focus:ring-[#eab308] outline-none transition" onChange={e => setFormData({...formData, author: e.target.value})} value={formData.author} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Catégorie</label>
            <input className="w-full border-gray-300 border rounded-lg p-3 focus:ring-2 focus:ring-[#eab308] outline-none transition" onChange={e => setFormData({...formData, category: e.target.value})} value={formData.category} />
          </div>
          <div className="space-y-2 col-span-full">
            <label className="text-sm font-semibold text-gray-600">Contenu</label>
            <textarea className="w-full border-gray-300 border rounded-lg p-3 h-40 focus:ring-2 focus:ring-[#eab308] outline-none transition" onChange={e => setFormData({...formData, content: e.target.value})} value={formData.content} required />
          </div>
        </div>
        
        <button type="submit" className="w-full bg-[#0a1628] text-white py-3 rounded-lg font-bold hover:bg-[#1a2d4a] transition-all transform hover:scale-[1.01]">
          Publier l'article
        </button>
      </form>

      {/* Liste des articles avec bouton de suppression */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-[#0a1628] mb-6">Articles publiés</h3>
        <div className="space-y-3">
          {articles.map((art: any) => (
            <div key={art.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:border-[#eab308] transition">
              <div>
                <p className="font-bold text-gray-800">{art.title}</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{art.category}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">{new Date(art.createdAt).toLocaleDateString('fr-FR')}</span>
                <button 
                  onClick={() => deleteArticle(art.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}