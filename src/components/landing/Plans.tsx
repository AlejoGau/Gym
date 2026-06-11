'use client';

import { GymConfig } from '@/lib/config';
import { motion } from 'framer-motion';
import Card3D from '@/components/ui/Card3D';

interface PlansProps {
  config: GymConfig;
}

export default function Plans({ config }: PlansProps) {
  // Helper to generate plan-specific WhatsApp links
  const getPlanLink = (planName: string) => {
    return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
      `Hola! Quiero consultar para inscribirme en el plan "${planName}" de ${config.name}.`
    )}`;
  };

  const plans = [
    {
      name: 'Pase 3 veces',
      price: '25.000',
      period: '/mes',
      features: [
        '3 sesiones semanales',
        'Acceso a vestuarios',
        'App de seguimiento',
      ],
      featured: false,
      ctaText: 'ELEGIR PLAN',
    },
    {
      name: 'Pase Libre',
      price: '38.000',
      period: '/mes',
      features: [
        'Acceso ilimitado',
        'Todas las disciplinas',
        'Plan nutricional básico',
        'Invitado gratis (1 x mes)',
      ],
      featured: true,
      ctaText: 'UNIRSE AHORA',
    },
    {
      name: 'Personalizado',
      price: '55.000',
      period: '/mes',
      features: [
        'Entrenador personal 1-a-1',
        'Evaluación bimensual',
        'Suplementación incluida',
      ],
      featured: false,
      ctaText: 'CONSULTAR',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 90, damping: 15 } as const,
    },
  };

  return (
    <section className="py-20 bg-background overflow-hidden" id="planes">
      <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline-lg text-[32px] text-white mb-4 font-bold tracking-tight uppercase">
            MEMBRESÍAS
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Seleccioná el plan que mejor se adapte a tus objetivos. Sin costos ocultos, sin contratos a largo plazo.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {plans.map((plan, idx) => {
            const waLink = getPlanLink(plan.name);
            return (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <Card3D className="h-full">
                  <div
                    className={`glass-card-3d p-8 rounded-xl flex flex-col items-center text-center relative h-full ${
                      plan.featured
                        ? 'border-2 border-primary-fixed transform md:scale-105 shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.15)]'
                        : ''
                    }`}
                  >
                    {plan.featured && (
                      <span className="absolute -top-4 bg-primary-fixed text-on-primary-fixed px-4 py-1.5 rounded-full text-label-md font-bold shadow-lg">
                        RECOMENDADO
                      </span>
                    )}
                    <h3 className="font-headline-md text-[24px] font-bold text-white mb-2 mt-2">
                      {plan.name}
                    </h3>
                    <div className="text-primary-fixed mb-8 mt-2 flex items-baseline justify-center">
                      <span className="text-body-md font-bold mr-1">$</span>
                      <span className="text-[48px] font-black leading-none tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-body-md font-medium ml-1">
                        {plan.period}
                      </span>
                    </div>
                    <ul className="space-y-4 mb-8 text-on-surface-variant text-left w-full flex-grow">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className={`flex items-start gap-2.5 ${plan.featured && fIdx === 0 ? 'font-bold text-white' : ''}`}>
                          <span className="material-symbols-outlined text-primary-fixed text-[20px] shrink-0">
                            check
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-4 text-center rounded-lg font-bold transition-all block ${
                        plan.featured
                          ? 'bg-primary-fixed text-on-primary-fixed hover:brightness-110 shadow-[0_4px_15px_rgba(var(--color-primary-rgb),0.2)]'
                          : 'border border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-on-primary-fixed'
                      }`}
                    >
                      {plan.ctaText}
                    </motion.a>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
