'use client';

import { GymConfig } from '@/lib/config';
import { motion } from 'framer-motion';
import Card3D from '@/components/ui/Card3D';

interface TestimonialsProps {
  config: GymConfig;
}

export default function Testimonials({ config }: TestimonialsProps) {
  const reviews = [
    {
      name: 'Martina G.',
      discipline: 'Atleta HIIT',
      quote: `La energía en ${config.name} es de otro nivel. Los profes te exigen pero te cuidan. En 3 meses vi cambios que no logré en años.`,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJiMOvHJMiV28Ea1Rfi2SBcgXfyHl_ajUfuWf2DaCVFUnOlvJebcdcH4kk-wv5vjnCdz7mmh-IXjgnWH1HwXFQoEah_49lmPIF5_5OlMYIYAOz3hv066qqHR_Li3S-Zojuw4BgW9tDpC58uyuwmv4tIaSwbQOyrQrQirsciBHNMl_yJXiFO0wzil3DhRKE_e10eKoDw9OyOVvMX54PHfcjk93uQeXEKE5bGWn1nSNjgX61xLLTddlhNszriTdN5eH7RMyxlF7iugE',
    },
    {
      name: 'Julián R.',
      discipline: 'Cross Training',
      quote: `El equipamiento es de primera. No hay otro gym en ${config.city} con esta infraestructura. Altamente recomendado.`,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-z1Xa-nh-GFYNMQMd0yph8Z3PTZ2x9m7MwexZXx7AT9TWV_OyDeCK6e3expx425RdlgXXdzPWKp6uXwFXifjk0p509OnIdD28xG7OJlb22bHsYeHku988iGD6q5_4cdfMYSx3gQYbK6dMWZYbyH9Tl1ohb0VvYx4NPnrAZf3CcwnaQiN1kRjkZtb9SbR8dwxs17tw5am2lIb-M3tE_1xnR9nk2McVvv_6x-F_YFWBMHreQzOwpYdrOybOYDUjo8HQxSiYt8akWpI',
    },
    {
      name: 'Sofía M.',
      discipline: 'Power Yoga',
      quote: 'Encontré un equilibrio perfecto. El ambiente es premium pero se siente como una comunidad. Forjé mi mejor versión acá.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhanEobTu3Lo9xizREtl5IH7-2ioKRvlFtkYOVl93eleT7CVmmQiw2kg4aQ4FUcjFJZcXeXEWUL1Y0edRQvybYuJuqruXcsvtVQwPFRrHi0Jvj1cAT0Wx82Fe-FxlHKdzl-uOOGy2X78yi47s5v5D8EdRdUh7S_8IpNA4jUQZZtbU4q1jDAJwKu_j4bH0usgJ-dwe_IOIjTOSqniHdyvtQAAvSp1qV942HamWzeI5VGcq_i7Hq6xsn_Euy1w1BxqkVFChMnVGn2uI',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 90, damping: 14 } as const,
    },
  };

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="font-headline-lg text-[32px] text-white mb-16 text-center font-bold tracking-tight uppercase"
        >
          LO QUE DICEN NUESTROS ATLETAS
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {reviews.map((review, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <Card3D className="h-full">
                <div className="glass-card-3d p-8 rounded-xl relative flex flex-col justify-between h-full bg-surface-container/20 backdrop-blur-xl border border-white/5 shadow-xl">
                  <span className="material-symbols-outlined text-primary-fixed/10 text-[64px] absolute top-4 right-4 select-none pointer-events-none">
                    format_quote
                  </span>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover grayscale border border-white/10"
                        src={review.image}
                      />
                      <div>
                        <p className="font-bold text-white text-[16px]">{review.name}</p>
                        <p className="text-[12px] font-bold text-primary-fixed uppercase tracking-wider">{review.discipline}</p>
                      </div>
                    </div>
                    <p className="italic text-on-surface-variant leading-relaxed">
                      "{review.quote}"
                    </p>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
