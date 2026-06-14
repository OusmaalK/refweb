export interface NavItem {
    label: string;
    href: string;
    hasDropdown?: boolean;
    dropdownItems?: { label: string; href: string }[];
  }
  
  export interface FeatureItem {
    icon: React.ElementType;
    title: string;
    desc: string;
  }