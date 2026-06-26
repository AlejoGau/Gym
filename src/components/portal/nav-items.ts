/** Fuente única de los ítems de navegación del portal (sidebar y bottom nav). */
export interface NavItem {
  href: string;
  label: string;
  /** Ícono de Material Symbols. */
  icon: string;
}

export const navItems: NavItem[] = [
  { href: '/inicio', label: 'Inicio', icon: 'home' },
  { href: '/entrenamientos', label: 'Entrenar', icon: 'fitness_center' },
  { href: '/alimentacion', label: 'Alimentación', icon: 'restaurant' },
  { href: '/perfil', label: 'Perfil', icon: 'person' },
];

/**
 * Determina si un ítem está activo para el pathname dado.
 * Coincide la ruta exacta o cualquier subruta (ej. /entrenamientos/actual).
 */
export function isNavItemActive(href: string, pathname: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
