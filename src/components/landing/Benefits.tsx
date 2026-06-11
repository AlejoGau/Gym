'use client';

import { GymConfig } from '@/lib/config';
import { motion } from 'framer-motion';
import Card3D from '@/components/ui/Card3D';

interface BenefitsProps {
  config: GymConfig;
}

export default function Benefits({ config }: BenefitsProps) {
  const benefits = [
    {
      icon: 'fitness_center',
      title: 'Coaches Profesionales',
      desc: 'Atletas certificados dedicados a optimizar cada uno de tus movimientos para resultados reales.',
    },
    {
      icon: 'precision_manufacturing',
      title: 'Equipamiento de Élite',
      desc: 'Maquinaria de última generación importada. La tecnología al servicio de tu fuerza y resistencia.',
    },
    {
      icon: 'groups',
      title: 'Comunidad',
      desc: 'Un entorno de alta energía donde la disciplina y el compañerismo forjan a los mejores.',
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
      transition: { type: 'spring', stiffness: 100, damping: 15 } as const,
    },
  };

  return (
    <section className="py-20 relative z-10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card3D className="h-full">
                <div className="glass-card-3d p-8 rounded-xl h-full flex flex-col items-start bg-surface-container/30 backdrop-blur-xl border border-white/5">
                  <span
                    className="material-symbols-outlined text-primary-fixed text-[48px] mb-6 block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {benefit.icon}
                  </span>
                  <h3 className="font-headline-md text-[24px] font-bold text-primary-fixed mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
