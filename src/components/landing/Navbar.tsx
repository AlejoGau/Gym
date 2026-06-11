import { useState } from 'react';
import { GymConfig } from '@/lib/config';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  config: GymConfig;
}

export default function Navbar({ config }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Header */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="flex justify-between items-center px-container-margin-mobile h-16 w-full max-w-7xl mx-auto md:px-12">
          {/* Logo & Gym Name */}
          <a href="#" className="flex items-center gap-2 group">
            {config.logo && (config.logo.startsWith('http') || config.logo.startsWith('/') || config.logo.includes('.') || config.logo.startsWith('data:image')) ? (
              <img src={config.logo} alt={config.name} className="h-10 max-w-[140px] object-contain transition-transform group-hover:scale-105" />
            ) : (
              <span className="material-symbols-outlined text-primary-fixed text-[36px] transition-transform group-hover:scale-110 group-hover:rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>
                {config.logo || 'bolt'}
              </span>
            )}
            <span className="font-display-lg text-[20px] md:text-[24px] tracking-tighter text-primary-fixed uppercase italic font-black">
              {config.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a className="text-primary-fixed font-label-md text-label-md hover:brightness-110 transition-all hover:scale-105" href="#">
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
              <span className="material-symbols-outlined text-[28px] transition-transform duration-300">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-primary-fixed text-on-primary-fixed px-6 py-2 rounded-lg font-bold uppercase hover:brightness-110" 
              href="#contacto"
            >
              UNIRSE
            </motion.a>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden w-full bg-background border-b border-white/10 px-6 py-4 space-y-4 overflow-hidden"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Bottom Navigation (Mobile Only) */}
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
        className="fixed bottom-0 left-0 w-full z-50 bg-surface-container/90 backdrop-blur-lg border-t border-white/5 flex justify-around items-center px-4 pb-4 pt-2 md:hidden"
      >
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
      </motion.nav>

      {/* FAB (Contextual Floating Join Button) */}
      <motion.a 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        className="fixed bottom-24 right-6 z-40 md:bottom-10 md:right-10 w-16 h-16 bg-primary-fixed text-on-primary-fixed rounded-full flex items-center justify-center shadow-2xl hover:brightness-110" 
        href="#contacto"
        aria-label="Join"
      >
        <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          add
        </span>
      </motion.a>
    </>
  );
}
