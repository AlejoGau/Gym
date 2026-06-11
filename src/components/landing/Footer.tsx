'use client';

import { GymConfig } from '@/lib/config';

interface FooterProps {
  config: GymConfig;
}

export default function Footer({ config }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Hola, quiero consultar por los planes de ${config.name}`
  )}`;
  const instagramUrl = `https://instagram.com/${config.instagram}`;

  return (
    <footer className="bg-surface-container-lowest pt-16 pb-32 md:pb-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-container-margin-mobile flex flex-col items-center text-center gap-6">
        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-2">
          {config.logo && (config.logo.startsWith('http') || config.logo.startsWith('/') || config.logo.includes('.')) ? (
            <img src={config.logo} alt={config.name} className="h-8 max-w-[100px] object-contain" />
          ) : (
            <span className="material-symbols-outlined text-primary-fixed text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {config.logo || 'bolt'}
            </span>
          )}
          <span className="font-display-lg text-[22px] text-primary-fixed tracking-tighter uppercase italic font-black">
            {config.name}
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-4">
          <a className="text-on-surface-variant font-bold hover:text-primary-fixed transition-colors text-[14px]" href="#">
            Términos
          </a>
          <a className="text-on-surface-variant font-bold hover:text-primary-fixed transition-colors text-[14px]" href="#">
            Privacidad
          </a>
          <a className="text-on-surface-variant font-bold hover:text-primary-fixed transition-colors text-[14px]" href="#contacto">
            Contacto
          </a>
          <a
            className="text-on-surface-variant font-bold hover:text-primary-fixed transition-colors text-[14px]"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>

        {/* Social Badges */}
        <div className="flex gap-6 mb-4">
          <a
            className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center hover:bg-primary-fixed hover:text-on-primary-fixed transition-all"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <span className="material-symbols-outlined text-[20px]">brand_awareness</span>
          </a>
          <a
            className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center hover:bg-primary-fixed hover:text-on-primary-fixed transition-all"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </a>
          <a
            className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center hover:bg-primary-fixed hover:text-on-primary-fixed transition-all"
            href="#"
            title="Compartir"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </a>
        </div>

        {/* Copyright notice */}
        <p className="text-on-surface-variant opacity-60 text-xs max-w-md uppercase tracking-wider">
          © {currentYear} {config.name} {config.city.toUpperCase()}. ENTRENAMIENTO DE ÉLITE PARA MENTES Y CUERPOS EXCEPCIONALES.
        </p>
      </div>
    </footer>
  );
}
