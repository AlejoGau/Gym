'use client';

import { useState } from 'react';
import { GymConfig } from '@/lib/config';

interface NavbarProps {
  config: GymConfig;
}

export default function Navbar({ config }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Header */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex justify-between items-center px-container-margin-mobile h-16 w-full max-w-7xl mx-auto md:px-12">
          {/* Logo & Gym Name */}
          <a href="#" className="flex items-center gap-2">
            {config.logo ? (
              <img src={config.logo} alt={config.name} className="h-8 max-w-[120px] object-contain" />
            ) : (
              <span className="material-symbols-outlined text-primary-fixed text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
            )}
            <span className="font-display-lg text-[20px] md:text-[24px] tracking-tighter text-primary-fixed uppercase italic font-black">
              {config.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a className="text-primary-fixed font-label-md text-label-md hover:brightness-110 transition-colors" href="#">
              Inicio
            </a>
            <a className="text-on-background font-label-md text-label-md hover:text-primary-fixed transition-colors" href="#clases">
              Clases
            </a>
            <a className="text-on-background font-label-md text-label-md hover:text-primary-fixed transition-colors" href="#planes">
              Planes
            </a>
            <a className="text-on-background font-label-md text-label-md hover:text-primary-fixed transition-colors" href="#sedes">
              Sedes
            </a>
          </div>

          {/* Header Action Button / Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-on-background hover:text-primary-fixed transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[28px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <a 
              className="hidden md:block bg-primary-fixed text-on-primary-fixed px-6 py-2 rounded-lg font-bold uppercase transition-transform active:scale-95 hover:brightness-110" 
              href="#contacto"
            >
              UNIRSE
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full bg-background border-b border-white/10 px-6 py-4 space-y-4 animate-fadeIn">
            <a 
              className="block text-primary-fixed font-bold py-2" 
              href="#"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </a>
            <a 
              className="block text-on-background hover:text-primary-fixed py-2 transition-colors" 
              href="#clases"
              onClick={() => setMobileMenuOpen(false)}
            >
              Clases
            </a>
            <a 
              className="block text-on-background hover:text-primary-fixed py-2 transition-colors" 
              href="#planes"
              onClick={() => setMobileMenuOpen(false)}
            >
              Planes
            </a>
            <a 
              className="block text-on-background hover:text-primary-fixed py-2 transition-colors" 
              href="#sedes"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sedes
            </a>
            <a 
              className="block text-center bg-primary-fixed text-on-primary-fixed py-3 rounded-lg font-bold uppercase" 
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
            >
              UNIRSE AHORA
            </a>
          </div>
        )}
      </nav>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container/90 backdrop-blur-lg border-t border-white/5 flex justify-around items-center px-4 pb-4 pt-2 md:hidden">
        <a className="flex flex-col items-center justify-center text-primary-fixed bg-surface-variant/50 rounded-xl px-3 py-1.5 tap-highlight-none active:scale-95 transition-all" href="#">
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-label-md text-[11px] mt-0.5">Inicio</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary-fixed tap-highlight-none active:scale-95 transition-all" href="#clases">
          <span className="material-symbols-outlined text-[22px]">calendar_month</span>
          <span className="font-label-md text-[11px] mt-0.5">Clases</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary-fixed tap-highlight-none active:scale-95 transition-all" href="#planes">
          <span className="material-symbols-outlined text-[22px]">payments</span>
          <span className="font-label-md text-[11px] mt-0.5">Planes</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary-fixed tap-highlight-none active:scale-95 transition-all" href="#sedes">
          <span className="material-symbols-outlined text-[22px]">location_on</span>
          <span className="font-label-md text-[11px] mt-0.5">Sedes</span>
        </a>
      </nav>

      {/* FAB (Contextual Floating Join Button) */}
      <a 
        className="fixed bottom-24 right-6 z-40 md:bottom-10 md:right-10 w-16 h-16 bg-primary-fixed text-on-primary-fixed rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all hover:brightness-110" 
        href="#contacto"
        aria-label="Join"
      >
        <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          add
        </span>
      </a>
    </>
  );
}
