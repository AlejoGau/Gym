'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, isNavItemActive } from './nav-items';

/** Navegación lateral del portal (sólo escritorio). */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-white/10 bg-surface-container-lowest/80 backdrop-blur-xl">
      {/* Marca */}
      <Link
        href="/inicio"
        className="flex items-center gap-2 h-16 px-6 border-b border-white/10 group"
      >
        <span
          className="material-symbols-outlined text-primary-fixed text-[30px] transition-transform group-hover:rotate-12"
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          bolt
        </span>
        <span className="font-display-lg text-[20px] tracking-tighter text-primary-fixed uppercase italic font-black">
          FORGE
        </span>
      </Link>

      {/* Navegación principal */}
      <nav aria-label="Navegación principal" className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isNavItemActive(item.href, pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-label-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed ${
                    active
                      ? 'bg-surface-variant/50 text-primary-fixed'
                      : 'text-on-surface-variant hover:text-primary-fixed hover:bg-surface-container/60'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Pie: aviso de versión de demo */}
      <p className="px-6 py-4 text-[11px] text-on-surface-variant/60 border-t border-white/10">
        Portal de demostración · datos de ejemplo
      </p>
    </aside>
  );
}
