import { Suspense } from 'react';
import GymConfigWrapper from '@/components/landing/GymConfigWrapper';

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center text-[#e5e2e1] font-sans">
          <div className="flex items-center gap-3 mb-4 animate-pulse">
            <span className="material-symbols-outlined text-[#caf300] text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
            <span className="font-bold text-[28px] tracking-tighter uppercase italic text-white">
              Cargando...
            </span>
          </div>
        </div>
      }
    >
      <GymConfigWrapper />
    </Suspense>
  );
}
