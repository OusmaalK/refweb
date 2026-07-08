'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const { t, locale } = useTranslation();
  const isRTL = locale === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subscribe: false, // Nouvel état pour la newsletter
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Envoi du message de contact (Logique existante)
    console.log('Message envoyé:', formData);

    // 2. Si inscrit à la newsletter, on appelle l'API d'abonnement
    if (formData.subscribe) {
      try {
        await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          body: JSON.stringify({ email: formData.email }),
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        console.error("Erreur inscription newsletter");
      }
    }

    setFormStatus('success');
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({ name: '', email: '', phone: '', message: '', subscribe: false });
    }, 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-12 md:py-16 bg-linear-to-br from-[#0a1628] to-[#0f1a2e] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">{t.contact?.title || 'Contactez-nous'}</h2>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Champs texte (Nom, Email, etc.) - Gardés identiques */}
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nom complet" className="w-full bg-[#0a1628] border border-gray-600 rounded-lg px-4 py-2" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full bg-[#0a1628] border border-gray-600 rounded-lg px-4 py-2" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone" className="w-full bg-[#0a1628] border border-gray-600 rounded-lg px-4 py-2" />
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder="Message" className="w-full bg-[#0a1628] border border-gray-600 rounded-lg px-4 py-2" />

              {/* Case à cocher Newsletter */}
              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  name="subscribe"
                  id="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-600 text-[#eab308] focus:ring-[#eab308]"
                />
                <label htmlFor="subscribe" className="text-sm text-gray-300 cursor-pointer">
                  S'inscrire à la newsletter pour recevoir nos actualités.
                </label>
              </div>

              <button type="submit" className="w-full bg-[#ffffff] text-[#0a1628] font-bold py-3 rounded-lg hover:scale-105 transition">
                {formStatus === 'success' ? 'Message envoyé !' : 'Envoyer le message'}
              </button>
            </form>
          </div>
          {/* ... Colonne droite identique ... */}
        </div>
      </div>
    </section>
  );
}
