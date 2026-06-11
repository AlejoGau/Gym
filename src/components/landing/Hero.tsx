'use client';

import { GymConfig } from '@/lib/config';

interface HeroProps {
  config: GymConfig;
}

export default function Hero({ config }: HeroProps) {
  // Generate WhatsApp redirection link
  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Hola, quiero consultar por los planes de ${config.name}`
  )}`;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background image & gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt={`Hero for ${config.name}`}
          className="w-full h-full object-cover opacity-40 grayscale"
          src={config.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-container-margin-mobile md:px-12 flex flex-col items-start">
        {/* Dynamic Promotion & Trust Badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="bg-surface-variant/50 border border-primary-fixed/30 px-4 py-1.5 rounded-full text-primary-fixed text-label-md font-label-md flex items-center gap-1.5 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[16px]">check_circle</span> 
            {config.trial}
          </span>
          <span className="bg-surface-variant/50 border border-primary-fixed/30 px-4 py-1.5 rounded-full text-primary-fixed text-label-md font-label-md flex items-center gap-1.5 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[16px]">verified</span> 
            Sin Contrato
          </span>
        </div>

        {/* Dynamic Slogan & Title */}
        <h1 className="font-display-lg-mobile md:font-display-lg text-[40px] md:text-[80px] leading-[0.9] mb-6 text-white italic uppercase font-black tracking-tight">
          {/* If the slogan contains spaces, we can italicize the first part and keep the rest as solid highlight */}
          {config.slogan}
        </h1>

        {/* Custom City and Subtitle */}
        <p className="font-body-lg text-[18px] md:text-[20px] text-on-surface-variant max-w-xl mb-8 leading-relaxed">
          Elevá tu rendimiento con equipamiento de élite y coaching personalizado en el corazón de <span className="text-white font-semibold">{config.city}</span>. Tu mejor versión empieza acá.
        </p>

        {/* Dynamic Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            className="bg-primary-fixed text-on-primary-fixed px-10 py-4 rounded-lg font-bold uppercase text-center flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 hover:brightness-110"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp <span className="material-symbols-outlined text-[18px]">send</span>
          </a>
          <a
            className="border-2 border-primary-fixed text-primary-fixed px-10 py-4 rounded-lg font-bold uppercase text-center transition-all hover:bg-primary-fixed hover:text-on-primary-fixed"
            href="#planes"
          >
            Ver Planes
          </a>
        </div>
      </div>
    </section>
  );
}
