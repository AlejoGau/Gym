'use client';

import React, { useState } from 'react';
import { GymConfig } from '@/lib/config';

interface ContactCTAProps {
  config: GymConfig;
}

export default function ContactCTA({ config }: ContactCTAProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('Ganancia Muscular');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct pre-filled message including user inputs and gym details
    const message = `Hola, quiero consultar por los planes de ${config.name}.\n\nMis datos:\n- Nombre: ${name}\n- WhatsApp/Teléfono: ${phone}\n- Objetivo: ${goal}`;
    
    const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
    
    // Open in a new tab
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <section className="py-20 relative overflow-hidden" id="contacto">
      {/* Dynamic skewed color block background */}
      <div className="absolute inset-0 bg-primary-fixed -skew-y-3 translate-y-32 z-0"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-container-margin-mobile">
        <div className="bg-surface-container-highest p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="font-headline-lg text-[32px] text-white mb-2 font-bold uppercase tracking-tight">
              ¿LISTO PARA EMPEZAR?
            </h2>
            <p className="text-on-surface-variant italic">
              Dejanos tus datos y te contactamos en menos de 1 hora.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary-fixed uppercase tracking-wider ml-1">
                Nombre Completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full bg-background border border-outline-variant text-white rounded-lg p-4 focus:ring-2 focus:ring-primary-fixed focus:border-primary-fixed outline-none transition-all"
              />
            </div>
            
            {/* Phone/WhatsApp Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary-fixed uppercase tracking-wider ml-1">
                WhatsApp / Teléfono
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej: 5491123456789"
                className="w-full bg-background border border-outline-variant text-white rounded-lg p-4 focus:ring-2 focus:ring-primary-fixed focus:border-primary-fixed outline-none transition-all"
              />
            </div>
            
            {/* Goal Selector */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-primary-fixed uppercase tracking-wider ml-1">
                Objetivo Personal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-background border border-outline-variant text-white rounded-lg p-4 focus:ring-2 focus:ring-primary-fixed focus:border-primary-fixed outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="Ganancia Muscular">Ganancia Muscular</option>
                <option value="Pérdida de Peso">Pérdida de Peso</option>
                <option value="Resistencia HIIT">Resistencia HIIT</option>
                <option value="Flexibilidad y Yoga">Flexibilidad y Yoga</option>
              </select>
            </div>
            
            {/* Submit CTA */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full py-5 bg-primary-fixed text-on-primary-fixed font-black text-lg rounded-lg uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_20px_rgba(var(--color-primary),0.2)] hover:brightness-110 cursor-pointer"
              >
                QUIERO EMPEZAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
