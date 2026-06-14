import { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'nav.home', href: '/' },
  {
    label: 'nav.about',
    href: '/about',
  },
  {
    label: 'nav.services',
    href: '/services',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Audit & Conseil', href: '/services/audit' },
      { label: 'Prévention des risques', href: '/services/prevention' },
      { label: 'Courtage d’assurance', href: '/services/courtage' },
    ],
  },
  { label: 'nav.sectors', href: '/sectors' },
  { label: 'nav.organization', href: '/organization' },
  { label: 'nav.contact', href: '/contact' },
];