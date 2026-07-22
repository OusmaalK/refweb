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
  
  // États pour la création
  const [isCreating, setIsCreating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    category: '',
    lang: 'fr',
  });

  // États pour l'édition (Modification)
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/articles');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || `Erreur ${res.status}`);
        setArticles([]);
        return;
      }
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // --- CRÉATION ---
  const handleCreate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('lang', formData.lang);
      formDataToSend.append('author', 'Admin');
      if (selectedFile) formDataToSend.append('image', selectedFile);

      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (res.ok) {
        await fetchArticles();
        setIsCreating(false);
        setSelectedFile(null);
        setFormData({ title: '', subtitle: '', content: '', category: '', lang: 'fr' });
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Erreur création');
      }
    } catch (err) {
      setError('Erreur lors de la création');
    }
  };

  // --- SUPPRESSION ---
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
      setError('Erreur lors de la suppression');
    }
  };

  // --- ÉDITION (MISE À JOUR) ---
  const startEdit = (article: Article) => {
    console.log('✏️ Modification de l\'article:', article.title); // Pour le débogage
    
    // 🔥 ÉTAPE CRUCIALE : Forcer la fermeture puis la réouverture
    setIsEditing(false); 
    setEditingArticle(null);

    // Ensuite on prépare les nouvelles données
    setEditingArticle(article);
    setFormData({
      title: article.title,
      subtitle: article.subtitle,
      content: article.content,
      category: article.category,
      lang: article.lang,
    });
    setEditFile(null);
    
    // Et on ré-ouvre le formulaire
    setIsEditing(true);
    setIsCreating(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingArticle(null);
    setFormData({ title: '', subtitle: '', content: '', category: '', lang: 'fr' });
    setEditFile(null);
  };

  const handleUpdate = async () => {
    if (!editingArticle) return;
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('lang', formData.lang);
      formDataToSend.append('author', 'Admin');
      formDataToSend.append('id', editingArticle.id.toString());
      if (editFile) formDataToSend.append('image', editFile);


      const res = await fetch(`/api/admin/articles?id=${editingArticle.id}`, {
        method: 'PUT',
        body: formDataToSend,
      });
      
      if (res.ok) {
        await fetchArticles();
        cancelEdit();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Erreur mise à jour');
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Chargement des articles...</div>;
  }

  return (
    <div className="p-6" suppressHydrationWarning>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#0a1628]">Gestion des Articles</h2>
        <button
          onClick={() => {
            setIsCreating(!isCreating);
            setIsEditing(false); // Fermer l'édition si ouverte
            setEditingArticle(null);
          }}
          className="flex items-center gap-2 bg-[#eab308] text-white px-4 py-2 rounded-lg hover:bg-[#ca8a04] transition"
        >
          <Plus className="w-4 h-4" />
          Nouvel article
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">❌ Erreur: {error}</p>
          <button onClick={fetchArticles} className="mt-2 text-sm text-blue-600 hover:underline">Réessayer</button>
        </div>
      )}

      {/* Formulaire de création */}
      {isCreating && !isEditing && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Créer un article</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Titre" className="w-full p-2 border rounded-lg text-black placeholder-gray-400" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <input type="text" placeholder="Sous-titre" className="w-full p-2 border rounded-lg text-black placeholder-gray-400" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
            <textarea placeholder="Contenu" rows={4} className="w-full p-2 border rounded-lg text-black placeholder-gray-400" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <input type="file" accept="image/*" className="w-full p-2 border rounded-lg text-black" onChange={(e) => { const file = e.target.files?.[0]; if (file) setSelectedFile(file); }} />
              {selectedFile && <span className="text-sm text-green-600 font-medium ml-2">✓ {selectedFile.name}</span>}
            </div>
            <div className="flex gap-4">
              <input type="text" placeholder="Catégorie" className="flex-1 p-2 border rounded-lg text-black placeholder-gray-400" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              <select className="p-2 border rounded-lg text-black" value={formData.lang} onChange={(e) => setFormData({ ...formData, lang: e.target.value })}>
                <option value="fr">Français</option><option value="en">English</option><option value="ar">العربية</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCreate} className="px-4 py-2 bg-[#eab308] text-white rounded-lg hover:bg-[#ca8a04]">Publier</button>
              <button onClick={() => setIsCreating(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Formulaire d'édition */}
      {isEditing && editingArticle && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Modifier l'article</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Titre" className="w-full p-2 border rounded-lg text-black placeholder-gray-400" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <input type="text" placeholder="Sous-titre" className="w-full p-2 border rounded-lg text-black placeholder-gray-400" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
            <textarea placeholder="Contenu" rows={4} className="w-full p-2 border rounded-lg text-black placeholder-gray-400" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nouvelle image (Optionnel)</label>
              <input type="file" accept="image/*" className="w-full p-2 border rounded-lg text-black" onChange={(e) => { const file = e.target.files?.[0]; if (file) setEditFile(file); }} />
              {editFile && <span className="text-sm text-green-600 font-medium ml-2">✓ {editFile.name}</span>}
              {!editFile && <p className="text-xs text-gray-400 mt-1">Laissez vide pour garder l'image actuelle: {editingArticle.imagePath}</p>}
            </div>
            <div className="flex gap-4">
              <input type="text" placeholder="Catégorie" className="flex-1 p-2 border rounded-lg text-black placeholder-gray-400" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              <select className="p-2 border rounded-lg text-black" value={formData.lang} onChange={(e) => setFormData({ ...formData, lang: e.target.value })}>
                <option value="fr">Français</option><option value="en">English</option><option value="ar">العربية</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={handleUpdate} className="px-4 py-2 bg-[#eab308] text-white rounded-lg hover:bg-[#ca8a04]">Enregistrer les modifications</button>
              <button onClick={cancelEdit} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des articles - AVEC LES CLÉS UNIQUES AJOUTÉES */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-[#0a1628] mb-6">Articles publiés</h3>
        {articles.length === 0 ? (
          <p className="text-gray-400 text-center py-8">{error ? '⚠️ ' : '📝 '} Aucun article publié</p>
        ) : (
          <div className="space-y-3">
            {articles.map((art) => (
              <div key={art.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:border-[#eab308] transition">
                <div>
                  <p className="font-bold text-gray-800">{art.title}</p>
                  <p className="text-sm text-gray-500">{art.subtitle}</p>
                  <span className="text-xs text-gray-400">{art.category} • {new Date(art.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  {/* ✅ SOLUTION: Ajout de la clé unique pour forcer React à reconnaître le bouton */}
                  <button 
                    key={`edit-${art.id}`} 
                    onClick={() => startEdit(art)} 
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  {/* ✅ Même chose pour la suppression */}
                  <button 
                    key={`delete-${art.id}`} 
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