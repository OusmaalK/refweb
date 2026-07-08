"use client";
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react'; // Assurez-vous d'avoir installé lucide-react : npm install lucide-react

export default function NewsletterManager() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/admin/subscribers');
      const data = await res.json();
      setSubscribers(data);
    } catch (error) {
      console.error("Erreur chargement abonnés:", error);
    }
  };

  // Fonction pour supprimer un abonné
  const deleteSubscriber = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet abonné ?")) return;

    try {
      const res = await fetch(`/api/admin/newsletter/delete?id=${id}`, { 
        method: 'DELETE' 
      });
      
      if (res.ok) {
        // Rafraîchir la liste après suppression
        fetchSubscribers();
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Fonction pour déclencher le téléchargement via l'API d'export
  const handleExport = () => {
    window.location.href = '/api/admin/subscribers/export';
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-[#0a1628]">Abonnés Newsletter</h3>
          <p className="text-gray-500 text-sm">Gérez votre base de contacts marketing</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition flex items-center gap-2"
          >
            Télécharger CSV
          </button>
          
          <span className="bg-[#0a1628]/10 text-[#0a1628] px-4 py-2 rounded-lg font-bold text-sm">
            {subscribers.length} inscrits
          </span>
        </div>
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 text-right">Date d'inscription</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscribers.length > 0 ? (
              subscribers.map((sub: any) => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{sub.email}</td>
                  <td className="px-6 py-4 text-gray-500 text-right">
                    {new Date(sub.subscribedAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => deleteSubscriber(sub.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Supprimer cet abonné"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-400">
                  Aucun abonné trouvé pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}