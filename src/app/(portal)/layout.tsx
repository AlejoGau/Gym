import type { Metadata } from 'next';
import PortalLayout from '@/components/portal/PortalLayout';

export const metadata: Metadata = {
  title: 'Portal | FORGE FITNESS',
  description: 'Tu portal de entrenamiento y alimentación.',
};

/** Layout de las rutas privadas (/inicio, /entrenamientos, /alimentacion, /perfil). */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <PortalLayout>{children}</PortalLayout>;
}
