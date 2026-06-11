'use client';

import { GymConfig } from '@/lib/config';

interface LocationProps {
  config: GymConfig;
}

export default function Location({ config }: LocationProps) {
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${config.name} ${config.city}`
  )}`;

  return (
    <section className="py-20 bg-surface-container-low" id="sedes">
      <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-12 flex flex-col md:flex-row gap-16 items-center">
        {/* Left Address Column */}
        <div className="w-full md:w-1/2">
          <h2 className="font-headline-lg text-[32px] text-white mb-8 uppercase italic font-black">
            ENTRENÁ EN <span className="text-primary-fixed not-italic">{config.city}</span>
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary-fixed mt-1">location_on</span>
              <div>
                <p className="font-bold text-white text-[16px]">Av. Principal 1234, {config.city}</p>
                <p className="text-on-surface-variant">Buenos Aires, Argentina.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary-fixed mt-1">schedule</span>
              <div>
                <p className="font-bold text-white text-[16px]">Lunes a Viernes: 06:00 a 23:00</p>
                <p className="text-on-surface-variant">Sábados: 09:00 a 18:00</p>
              </div>
            </div>
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-background px-8 py-3 rounded-lg font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors transition-transform active:scale-95"
            >
              CÓMO LLEGAR <span className="material-symbols-outlined text-[18px]">directions</span>
            </a>
          </div>
        </div>

        {/* Right Stylized Map Preview */}
        <div className="w-full md:w-1/2 h-[400px] bg-surface-container rounded-xl overflow-hidden grayscale contrast-125 border border-white/10 group relative">
          <div className="w-full h-full relative">
            <img
              alt={`Map Location in ${config.city}`}
              className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMp42WutbDw4ziKBxvUH9sq18onncDfYOjDJz-0BmaS1dpn_stVbB_pbjQiHi-XeLT6_vrwhabW5YSC6U77VFDrO9d90nRCKFrHYyQ2XJ1fxctKFSiY1_70MjWeTV4X1H-Mw_kc2bDaV_H9DBiwqDH4nB5l1VcgkjyRORD8UfVM9V7Ut0yw3auvhcakYVsO3RbI7ZXt3soH-N-otZ4TYE28FyFw9SNxB-BYFi2M31xMG-qgF9A4PtGSTsSPJfhX0xfgi2TpuRyoyw"
            />
            {/* Animated Pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center animate-pulse shadow-[0_0_20px_var(--color-primary)] transition-transform hover:scale-110"
              >
                <span className="material-symbols-outlined text-on-primary-fixed font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
              </a>
            </div>
            {/* Sede Detail Tag */}
            <div className="absolute bottom-4 left-4 right-4 p-4 glass-card rounded-lg flex justify-between items-center">
              <span className="text-sm font-bold text-white uppercase tracking-wider">SEDE {config.city}</span>
              <span className="text-xs text-primary-fixed font-bold tracking-widest">ABIERTO AHORA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
