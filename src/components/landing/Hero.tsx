'use client';

import { GymConfig } from '@/lib/config';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import HeroCssBackground from './HeroCssBackground';

const Hero3DBackground = dynamic(() => import('./Hero3DBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#131313] z-0" />,
});

interface HeroProps {
  config: GymConfig;
}

export default function Hero({ config }: HeroProps) {
  // Generate WhatsApp redirection link
  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Hola, quiero consultar por los planes de ${config.name}`
  )}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 14 } as const,
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#131313]">
      {/* 3D WebGL Background with dynamic import and fallback */}
      <Hero3DBackground config={config} />

      {/* Hero Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-container-margin-mobile md:px-12 flex flex-col items-start"
      >
        {/* Dynamic Promotion & Trust Badges */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
          <span className="bg-surface-variant/50 border border-primary-fixed/30 px-4 py-1.5 rounded-full text-primary-fixed text-label-md font-label-md flex items-center gap-1.5 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
            <span className="material-symbols-outlined text-[16px] animate-pulse">check_circle</span> 
            {config.trial}
          </span>
          <span className="bg-surface-variant/50 border border-primary-fixed/30 px-4 py-1.5 rounded-full text-primary-fixed text-label-md font-label-md flex items-center gap-1.5 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
            <span className="material-symbols-outlined text-[16px]">verified</span> 
            Sin Contrato
          </span>
        </motion.div>

        {/* Dynamic Slogan & Title */}
        <motion.h1 
          variants={itemVariants} 
          className="font-display-lg-mobile md:font-display-lg text-[40px] md:text-[80px] leading-[0.9] mb-6 text-white italic uppercase font-black tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
        >
          {config.slogan}
        </motion.h1>

        {/* Custom City and Subtitle */}
        <motion.p 
          variants={itemVariants} 
          className="font-body-lg text-[18px] md:text-[20px] text-on-surface-variant max-w-xl mb-8 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          Elevá tu rendimiento con equipamiento de élite y coaching personalizado en el corazón de <span className="text-white font-semibold">{config.city}</span>. Tu mejor versión empieza acá.
        </motion.p>

        {/* Dynamic Actions */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-fixed text-on-primary-fixed px-10 py-4 rounded-lg font-bold uppercase text-center flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)] transition-shadow duration-300"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp <span className="material-symbols-outlined text-[18px]">send</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-primary-fixed text-primary-fixed px-10 py-4 rounded-lg font-bold uppercase text-center hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors"
            href="#planes"
          >
            Ver Planes
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
