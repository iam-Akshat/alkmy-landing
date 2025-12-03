import { ReactNode } from 'react';

export interface CardNavLink {
  label: string;
  ariaLabel: string;
  href?: string;
}

export interface CardNavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
}

export interface CardNavProps {
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

declare const CardNav: React.FC<CardNavProps>;

export default CardNav;

