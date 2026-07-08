'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, Settings, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (choice: 'accepted' | 'rejected' | 'customized') => {
    localStorage.setItem('cookieConsent', choice);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const closeWithoutChoice = () => {
    localStorage.setItem('cookieConsent', 'dismissed');
    setIsVisible(false);
  };

  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: -40 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 40, x: -40 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-6 left-6 z-9999 w-[90vw] sm:w-95"
        >
          <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="relative p-5">
              <button onClick={closeWithoutChoice} className="absolute right-3 top-3 text-slate-400 hover:text-white transition">
                <X size={18} />
              </button>

              {!showPreferences ? (
                /* ÉCRAN PRINCIPAL */
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-red-500/15 p-3 text-red-500"><Cookie size={20} /></div>
                    <div>
                      <h3 className="font-bold text-white">Gestion des cookies</h3>
                      <div className="mt-1 flex items-center gap-1 text-xs text-green-400">
                        <ShieldCheck size={14} /> Protection de votre confidentialité
                      </div>
                    </div>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-slate-300">
                    Nous utilisons des cookies pour améliorer votre expérience. Vous gardez le contrôle total de vos préférences.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => saveConsent('accepted')} className="w-full rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600">Accepter tout</button>
                    <button onClick={() => setShowPreferences(true)} className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-600 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-800">
                      <Settings size={16} /> Préférences
                    </button>
                  </div>
                </>
              ) : (
                /* ÉCRAN PRÉFÉRENCES */
                <>
                  <h3 className="font-bold text-white mb-4">Vos réglages</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm text-slate-300">
                      <span>Nécessaires</span>
                      <span className="text-xs text-green-400 font-bold">Activé</span>
                    </div>
                    <label className="flex justify-between items-center text-sm text-slate-300 cursor-pointer">
                      <span>Analytics</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </label>
                    <label className="flex justify-between items-center text-sm text-slate-300 cursor-pointer">
                      <span>Publicité</span>
                      <input type="checkbox" className="toggle" />
                    </label>
                  </div>
                  <button onClick={() => saveConsent('customized')} className="w-full rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white">
                    Sauvegarder mes choix
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
