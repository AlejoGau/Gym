'use client';

import { GymConfig } from '@/lib/config';

interface BenefitsProps {
  config: GymConfig;
}

export default function Benefits({ config }: BenefitsProps) {
  return (
    <section className="py-20 relative z-10 bg-background">
      <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="glass-card p-8 rounded-xl transition-all hover:-translate-y-2">
            <span
              className="material-symbols-outlined text-primary-fixed text-[48px] mb-6 block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              fitness_center
            </span>
            <h3 className="font-headline-md text-[24px] font-bold text-primary-fixed mb-4">
              Coaches Profesionales
            </h3>
            <p className="text-on-surface-variant">
              Atletas certificados dedicados a optimizar cada uno de tus movimientos para resultados reales.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="glass-card p-8 rounded-xl transition-all hover:-translate-y-2">
            <span
              className="material-symbols-outlined text-primary-fixed text-[48px] mb-6 block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              precision_manufacturing
            </span>
            <h3 className="font-headline-md text-[24px] font-bold text-primary-fixed mb-4">
              Equipamiento de Élite
            </h3>
            <p className="text-on-surface-variant">
              Maquinaria de última generación importada. La tecnología al servicio de tu fuerza y resistencia.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="glass-card p-8 rounded-xl transition-all hover:-translate-y-2">
            <span
              className="material-symbols-outlined text-primary-fixed text-[48px] mb-6 block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              groups
            </span>
            <h3 className="font-headline-md text-[24px] font-bold text-primary-fixed mb-4">
              Comunidad
            </h3>
            <p className="text-on-surface-variant">
              Un entorno de alta energía donde la disciplina y el compañerismo forjan a los mejores.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
