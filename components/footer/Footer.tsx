'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { Mail, Phone, MessageCircle, MapPin, Facebook, Instagram, Linkedin, Twitter, Settings } from 'lucide-react';

export default function Footer() {
  const { t, locale } = useTranslation();
  const isRTL = locale === 'ar';

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/rfcassurance', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/rfcassurance', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/rfcassurance', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/rfcassurance', label: 'Twitter' },
  ];

  const quickLinks = [
    { label: 'Accueil', href: `/${locale}` },
    { label: 'À propos', href: `/${locale}/about` },
    { label: 'Prestations', href: `/${locale}/service` },
    { label: 'Secteurs', href: `/${locale}/sectors` },
    { label: 'Organisation', href: `/${locale}/organization` },
    { label: 'Contact', href: `/${locale}/#contact` },
  ];

  const legalLinks = [
    { label: t.footer?.legal?.mentions || 'Mentions légales', href: `/${locale}/legal` },
    { label: t.footer?.legal?.privacy || 'Politique de confidentialité', href: `/${locale}/privacy` },
    { label: t.footer?.legal?.terms || 'Conditions Générales', href: `/${locale}/terms` },
    { label: t.footer?.legal?.cgu || 'CGU', href: `/${locale}/cgu` },
    { label: t.footer?.legal?.cookies || 'Politique de cookies', href: `/${locale}/cookies` },
    { label: t.footer?.legal?.faq || 'FAQ', href: `/${locale}/faq` },
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@rfc-assurance.dz' },
    { icon: Phone, label: 'Téléphone', value: '+213 775 22 18 69' },
    { icon: MessageCircle, label: 'WhatsApp', value: '+213 775 22 18 69' },
    { icon: MapPin, label: 'Adresse', value: '21, Rue Claud Debussy, Alger, Algérie' },
  ];

  return (
    <footer className="bg-[#0a1628] text-white border-t border-white/10" suppressHydrationWarning>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12" suppressHydrationWarning>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 ${isRTL ? 'rtl' : 'ltr'}`} suppressHydrationWarning>
          
          {/* Colonne 1 : Logo + description */}
          <div className="space-y-8" suppressHydrationWarning>
            <Link href={`/${locale}`} className="inline-block" suppressHydrationWarning>
              <div 
                className="flex justify-center items-center bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm"
                suppressHydrationWarning
              >
                <Image
                  src="/static/logo.png"
                  alt="RFC Assurance"
                  width={640}
                  height={240}
                  className="h-20 w-auto object-contain"
                  priority
                  suppressHydrationWarning
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed" suppressHydrationWarning>
              {t.footer?.description || 'Votre partenaire de confiance pour la protection de vos actifs et la gestion de vos risques.'}
            </p>
            <div className="flex gap-3" suppressHydrationWarning>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-[#ffffff] p-2 rounded-full transition"
                  suppressHydrationWarning
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div className="space-y-4" suppressHydrationWarning>
            <h3 className="text-lg font-bold border-b border-[#ffffff] pb-2 inline-block" suppressHydrationWarning>
              {t.footer?.quick_links || 'Liens rapides'}
            </h3>
            <ul className="space-y-2" suppressHydrationWarning>
              {quickLinks.map((link, index) => (
                <li key={index} suppressHydrationWarning>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#ffffff] transition flex items-center gap-2"
                    suppressHydrationWarning
                  >
                    <span className="w-1.5 h-1.5 bg-[#ffffff] rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Informations de contact + MAP */}
          <div className="space-y-4" suppressHydrationWarning>
            <h3 className="text-lg font-bold border-b border-[#ffffff] pb-2 inline-block" suppressHydrationWarning>
              {t.footer?.contact_info || 'Informations de contact'}
            </h3>
            <ul className="space-y-3" suppressHydrationWarning>
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-2" suppressHydrationWarning>
                  <item.icon className="w-4 h-4 text-[#ffffff] mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">{item.value}</span>
                </li>
              ))}
            </ul>
            
            {/* Carte Google Maps */}
            <div className="mt-3" suppressHydrationWarning>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d51150.09067255737!2d3.0605311239709487!3d36.749435346471266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s21%2C%20Rue%20Claud%20Debussy%2C%20Alger!5e0!3m2!1sfr!2sdz!4v1781443959277!5m2!1sfr!2sdz"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Colonne 4 : Informations légales */}
          <div className="space-y-4" suppressHydrationWarning>
            <h3 className="text-lg font-bold border-b border-[#ffffff] pb-2 inline-block" suppressHydrationWarning>
              {t.footer?.legal_info || 'Informations légales'}
            </h3>
            <ul className="space-y-2" suppressHydrationWarning>
              {legalLinks.map((link, index) => (
                <li key={index} suppressHydrationWarning>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#ffffff] transition flex items-center gap-2"
                    suppressHydrationWarning
                  >
                    <span className="w-1.5 h-1.5 bg-[#ffffff] rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer bottom avec lien Admin discret */}
        <div className="border-t border-white/10 mt-8 md:mt-12 pt-4 text-center" suppressHydrationWarning>
          <p className="text-xs text-gray-500" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} RFC Assurance. {t.footer?.copyright || 'Tous droits réservés.'}
          </p>
          
          <Link 
            href={`/${locale}/admin/login`}
            className="text-white/10 hover:text-white/30 transition-colors duration-300 text-[10px] mt-2 inline-flex items-center gap-1"
            suppressHydrationWarning
          >
            <Settings className="w-3 h-3" />
            Administration
          </Link>
        </div>
      </div>
    </footer>
  );
}
