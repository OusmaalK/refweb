"use client";
import { useState } from 'react';

export default function NewsletterSender() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = async () => {
    // Appel à votre route API d'envoi d'emails
    await fetch('/api/admin/newsletter/send', {
      method: 'POST',
      body: JSON.stringify({ subject, body })
    });
    alert("Newsletter envoyée !");
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border">
      <h3 className="text-xl font-bold mb-6">Rédiger la Newsletter</h3>
      <input 
        className="w-full border p-3 mb-4 rounded" 
        placeholder="Objet de l'email" 
        onChange={e => setSubject(e.target.value)} 
      />
      <textarea 
        className="w-full border p-3 mb-4 rounded h-64" 
        placeholder="Contenu de la newsletter..." 
        onChange={e => setBody(e.target.value)} 
      />
      <button 
        onClick={handleSend}
        className="bg-[#0a1628] text-white px-8 py-3 rounded-lg font-bold"
      >
        Envoyer à tous les abonnés
      </button>
    </div>
  );
}
