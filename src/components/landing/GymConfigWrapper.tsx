'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getGymConfig } from '@/lib/config';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Benefits from '@/components/landing/Benefits';
import Activities from '@/components/landing/Activities';
import Plans from '@/components/landing/Plans';
import Schedule from '@/components/landing/Schedule';
import Testimonials from '@/components/landing/Testimonials';
import Location from '@/components/landing/Location';
import ContactCTA from '@/components/landing/ContactCTA';
import Footer from '@/components/landing/Footer';
import Background3D from '@/components/ui/Background3D';


// Helper to parse hex colors to rgb for use in transparency gradients
function hexToRgb(hex: string): string | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

export default function GymConfigWrapper() {
  const searchParams = useSearchParams();
  const config = getGymConfig(searchParams);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', config.primary);
      root.style.setProperty('--color-secondary', config.secondary);
      root.style.setProperty('--color-accent', config.accent);

      // Register RGB variables for dynamic transparency glows
      const primaryRgb = hexToRgb(config.primary) || '202, 243, 0';
      const secondaryRgb = hexToRgb(config.secondary) || '255, 87, 26';
      const accentRgb = hexToRgb(config.accent) || '23, 30, 0';

      root.style.setProperty('--color-primary-rgb', primaryRgb);
      root.style.setProperty('--color-secondary-rgb', secondaryRgb);
      root.style.setProperty('--color-accent-rgb', accentRgb);
    }
  }, [config.primary, config.secondary, config.accent]);

  return (
    <div className="w-full relative min-h-screen bg-background text-on-background overflow-hidden">
      {/* 3D scrolling parallax background grid and elements */}
      <Background3D />

      {/* 3D ambient light background blobs */}
      <div className="absolute top-[10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-primary-fixed/5 blur-[120px] pointer-events-none animate-float-slow z-0"></div>
      <div className="absolute top-[50%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-secondary-container/5 blur-[150px] pointer-events-none animate-float-reverse z-0"></div>
      <div className="absolute top-[80%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-primary-fixed/3 blur-[120px] pointer-events-none animate-float-slow z-0"></div>

      <Navbar config={config} />
      <main className="relative z-10">
        <Hero config={config} />
        <Benefits config={config} />
        <Activities config={config} />
        <Plans config={config} />
        <Schedule config={config} />
        <Testimonials config={config} />
        <Location config={config} />
        <ContactCTA config={config} />
      </main>
      <Footer config={config} />
    </div>
  );
}
