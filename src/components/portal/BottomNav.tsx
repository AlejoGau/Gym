'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, isNavItemActive } from './nav-items';

/** Navegación inferior del portal (sólo celular). Reutiliza el patrón de la landing. */
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-stretch border-t border-white/5 bg-surface-container/95 backdrop-blur-lg px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 md:hidden"
    >
      {navItems.map((item) => {
        const active = isNavItemActive(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed ${
              active ? 'text-primary-fixed' : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span className="font-label-md text-[11px]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
