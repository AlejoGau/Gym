'use client';

import { GymConfig } from '@/lib/config';

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

  return (
    <section className="py-20 bg-background" id="planes">
      <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-[32px] text-white mb-4 font-bold tracking-tight uppercase">
            MEMBRESÍAS
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Seleccioná el plan que mejor se adapte a tus objetivos. Sin costos ocultos, sin contratos a largo plazo.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const waLink = getPlanLink(plan.name);
            return (
              <div
                key={idx}
                className={`glass-card p-8 rounded-xl flex flex-col items-center text-center relative ${
                  plan.featured
                    ? 'border-2 border-primary-fixed transform md:scale-105 shadow-[0_0_40px_rgba(var(--color-primary),0.1)]'
                    : ''
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-4 bg-primary-fixed text-on-primary-fixed px-4 py-1.5 rounded-full text-label-md font-bold">
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
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 text-center rounded-lg font-bold transition-all block ${
                    plan.featured
                      ? 'bg-primary-fixed text-on-primary-fixed hover:brightness-110 active:scale-95'
                      : 'border border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-on-primary-fixed active:scale-95'
                  }`}
                >
                  {plan.ctaText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
