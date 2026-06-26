import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import PortalHeader from './PortalHeader';
import { currentUser } from '@/features/dashboard/data/user';

interface PortalLayoutProps {
  children: React.ReactNode;
}

/**
 * Estructura del portal privado simulado:
 *  - Sidebar fijo en escritorio.
 *  - Bottom nav fijo en celular.
 *  - Header con usuario y accesos rápidos.
 * El usuario es mock (no hay autenticación real en esta etapa).
 */
export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Brillo ambiental sutil, coherente con la landing, sin animación intensa */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-fixed/[0.06] blur-[140px]"
      />

      <Sidebar />

      <div className="md:pl-64">
        <PortalHeader user={currentUser} />
        <main className="mx-auto w-full max-w-5xl px-5 md:px-10 py-6 pb-28 md:pb-12">
          {children}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
