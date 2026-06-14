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
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez envoyer les données à votre API
    console.log('Form submitted:', formData);
    setFormStatus('success');
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    { icon: MapPin, label: 'Adresse', value: '21, Rue Claud Debussy, Alger, Algérie' },
    { icon: Phone, label: 'Téléphone', value: '+213.555.573.964' },
    { icon: Mail, label: 'Email', value: 'contact@rfc-assurance.dz' },
    { icon: Clock, label: 'Horaires', value: 'Dimanche - Jeudi : 8h30 - 17h30' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-12 md:py-16 bg-linear-to-br from-[#0a1628] to-[#0f1a2e] text-white">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* En-tête */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-[#eab308] text-[#0a1628] px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-3">
            {t.contact?.tag || 'Contact'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            {t.contact?.title || 'Contactez-nous'}
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            {t.contact?.subtitle || 'Une équipe d\'experts à votre écoute pour répondre à toutes vos questions.'}
          </p>
        </div>

        {/* Grille principale */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 ${isRTL ? 'rtl' : 'ltr'}`}>
          
          {/* Colonne gauche : Formulaire */}
          <div className="bg-[#1e293b] p-6 md:p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              {t.contact?.form_title || 'Envoyez-nous un message'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t.contact?.form_name || 'Nom complet'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0a1628] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#eab308] transition"
                  placeholder={t.contact?.form_name_placeholder || 'Votre nom'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t.contact?.form_email || 'Email'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0a1628] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#eab308] transition"
                  placeholder={t.contact?.form_email_placeholder || 'votre@email.com'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t.contact?.form_phone || 'Téléphone'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#0a1628] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#eab308] transition"
                  placeholder={t.contact?.form_phone_placeholder || 'Votre numéro'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t.contact?.form_message || 'Message'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-[#0a1628] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#eab308] transition"
                  placeholder={t.contact?.form_message_placeholder || 'Votre message...'}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#eab308] hover:bg-yellow-500 text-[#0a1628] font-bold px-6 py-3 rounded-lg transition transform hover:scale-105"
              >
                {formStatus === 'success' ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle size={18} />
                    {t.contact?.form_success || 'Message envoyé !'}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={18} />
                    {t.contact?.form_submit || 'Envoyer le message'}
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Colonne droite : Informations */}
          <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-[#1e293b] p-4 rounded-xl"
              >
                <item.icon className="w-6 h-6 text-[#eab308] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-400 uppercase">{item.label}</p>
                  <p className="text-sm md:text-base font-medium text-white">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* CTA final */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-gray-400 text-sm">
            {t.contact?.footer || 'Nous sommes disponibles pour vous accompagner dans vos projets.'}
          </p>
        </div>

      </div>
    </section>
  );
}