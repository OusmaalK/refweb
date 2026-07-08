"use client";
import { useState } from 'react';

export default function NewsletterEditor() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    try {
      const res = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content }),
      });
      if (res.ok) {
        alert("Newsletter envoyée avec succès !");
        setSubject('');
        setContent('');
      } else {
        alert("Erreur lors de l'envoi.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-[#0a1628] mb-6">Rédaction Newsletter</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Objet du mail</label>
          <input 
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-[#eab308] outline-none transition" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ex: Actualités Assurance - Juin 2026"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Contenu du message</label>
          <textarea 
            className="w-full border border-gray-300 rounded-lg p-4 h-80 text-gray-900 focus:ring-2 focus:ring-[#eab308] outline-none transition" 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            placeholder="Écrivez votre message ici... Vous pouvez utiliser du HTML simple pour la mise en forme."
          />
          <p className="text-xs text-gray-400 mt-2">Le contenu sera automatiquement intégré dans le modèle RFC Assurance.</p>
        </div>

        <button 
          onClick={handleSend}
          disabled={isSending || !subject || !content}
          className="w-full bg-[#0a1628] hover:bg-[#1e293b] text-white py-4 rounded-lg font-bold transition flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {isSending ? "Envoi en cours..." : "Envoyer la newsletter"}
        </button>
      </div>
    </div>
  );
}