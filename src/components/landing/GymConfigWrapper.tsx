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


/**
 * GymConfigWrapper reads configuration query parameters dynamically,
 * registers style tokens on the DOM, and propagates config properties to all components.
 */
export default function GymConfigWrapper() {
  const searchParams = useSearchParams();
  
  // Breve comentario: Se lee la configuración dinámica utilizando la función getGymConfig
  const config = getGymConfig(searchParams);

  useEffect(() => {
    // Breve comentario: Se configuran las variables CSS globales para lograr la personalización de colores
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', config.primary);
      root.style.setProperty('--color-secondary', config.secondary);
      root.style.setProperty('--color-accent', config.accent);
    }
  }, [config.primary, config.secondary, config.accent]);

  return (
    <div className="w-full relative min-h-screen bg-background text-on-background">
      <Navbar config={config} />
      <main>
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
