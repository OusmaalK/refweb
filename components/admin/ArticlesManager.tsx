"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Article {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  imagePath: string;
  author: string;
  category: string;
  lang: string;
  createdAt: string;
}

export default function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    category: '',
    lang: 'fr',
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📝 ArticlesManager: Fetching articles...');
      const res = await fetch('/api/admin/articles');
      
      console.log(`📝 Response status: ${res.status}`);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('❌ Erreur API:', errorData);
        setError(errorData.error || `Erreur ${res.status}`);
        setArticles([]);
        return;
      }
      
      const data = await res.json();
      console.log(`✅ ${data.length} articles chargés`);
      setArticles(Array.isArray(data) ? data : []);
      
    } catch (err) {
      console.error('❌ Erreur fetchArticles:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: formData.title.toLowerCase().replace(/\s/g, '-'),
          author: 'Admin',
          imagePath: '/images/default.jpg',
        }),
      });
      
      if (res.ok) {
        await fetchArticles();
        setIsCreating(false);
        setFormData({ title: '', subtitle: '', content: '', category: '', lang: 'fr' });
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Erreur création');
      }
    } catch (err) {
      console.error('Erreur création:', err);
      setError('Erreur lors de la création');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cet article ?')) return;
    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchArticles();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Erreur suppression');
      }
    } catch (err) {
      console.error('Erreur suppression:', err);
      setError('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500" suppressHydrationWarning>
        Chargement des articles...
      </div>
    );
  }

  return (
    <div className="p-6" suppressHydrationWarning>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#0a1628]">Gestion des Articles</h2>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 bg-[#eab308] text-white px-4 py-2 rounded-lg hover:bg-[#ca8a04] transition"
        >
          <Plus className="w-4 h-4" />
          Nouvel article
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">❌ Erreur: {error}</p>
          <button
            onClick={fetchArticles}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Réessayer
          </button>
        </div>
      )}

      {isCreating && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Créer un article</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Titre"
              className="w-full p-2 border rounded-lg text-black placeholder-gray-400"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Sous-titre"
              className="w-full p-2 border rounded-lg text-black placeholder-gray-400"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
            <textarea
              placeholder="Contenu"
              rows={4}
              className="w-full p-2 border rounded-lg text-black placeholder-gray-400"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Catégorie"
                className="flex-1 p-2 border rounded-lg text-black placeholder-gray-400"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
              <select
                className="p-2 border rounded-lg text-black"
                value={formData.lang}
                onChange={(e) => setFormData({ ...formData, lang: e.target.value })}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-[#eab308] text-white rounded-lg hover:bg-[#ca8a04]"
              >
                Publier
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-[#0a1628] mb-6">Articles publiés</h3>
        {articles.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            {error ? '⚠️ ' : '📝 '} Aucun article publié
          </p>
        ) : (
          <div className="space-y-3">
            {articles.map((art: Article) => (
              <div
                key={art.id}
                className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:border-[#eab308] transition"
              >
                <div>
                  <p className="font-bold text-gray-800">{art.title}</p>
                  <p className="text-sm text-gray-500">{art.subtitle}</p>
                  <span className="text-xs text-gray-400">
                    {art.category} • {new Date(art.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(art.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}