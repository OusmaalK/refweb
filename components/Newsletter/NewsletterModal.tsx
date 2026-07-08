'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const hasTriggered = useRef(false);

  // ... (votre useEffect reste identique pour le déclenchement) ...

  const handleSubscribe = async () => {
    if (!email) return;
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        localStorage.setItem('newsletterSubscribed', 'true');
        setTimeout(() => setIsOpen(false), 2000); // Fermeture auto après 2s
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setStatus('idle');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div /* ... vos classes motion.div ... */>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-5 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition">
              <X size={18} />
            </button>

            {status === 'success' ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 size={48} className="text-green-500 mb-3" />
                <h3 className="font-bold text-gray-900">Bienvenue !</h3>
                <p className="text-sm text-gray-600">Vous êtes désormais inscrit.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-50 text-red-500 p-2 rounded-full"><Sparkles size={18} /></div>
                  <h3 className="text-sm font-bold text-gray-900">Restez informé !</h3>
                </div>
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                />

                <button
                  onClick={handleSubscribe}
                  disabled={status === 'loading'}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  {status === 'loading' ? 'En cours...' : "S'abonner"}
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
