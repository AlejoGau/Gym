import Link from 'next/link';
import Avatar from './ui/Avatar';
import type { User } from '@/features/dashboard/types';

interface PortalHeaderProps {
  user: User;
}

/** Encabezado del portal: nombre + avatar y accesos rápidos a entrenar/alimentación. */
export default function PortalHeader({ user }: PortalHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 h-16 px-5 md:px-10">
        {/* Usuario */}
        <Link
          href="/perfil"
          className="flex items-center gap-3 rounded-lg -ml-1 pl-1 pr-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
        >
          <Avatar name={user.name} src={user.avatarUrl} size={38} />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[12px] text-on-surface-variant">Hola,</span>
            <span className="font-headline-md text-[15px] font-bold text-white">
              {user.name}
            </span>
          </span>
        </Link>

        {/* Accesos rápidos */}
        <div className="flex items-center gap-2">
          <Link
            href="/entrenamientos"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-fixed text-on-primary-fixed px-3.5 py-2 text-label-md font-bold uppercase hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              fitness_center
            </span>
            <span className="hidden sm:inline">Entrenar</span>
          </Link>
          <Link
            href="/alimentacion"
            aria-label="Ir a alimentación"
            className="inline-flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant w-10 h-10 hover:text-primary-fixed hover:border-primary-fixed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              restaurant
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
