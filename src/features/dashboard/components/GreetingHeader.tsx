import type { User } from '@/features/dashboard/types';

/** Devuelve un saludo según la hora del día. */
function getGreeting(date = new Date()): string {
  const h = date.getHours();
  if (h < 6) return 'Buenas noches';
  if (h < 13) return 'Buen día';
  if (h < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

interface GreetingHeaderProps {
  user: User;
}

/** Saludo personalizado al usuario en la pantalla de inicio. */
export default function GreetingHeader({ user }: GreetingHeaderProps) {
  const firstName = user.name.split(' ')[0];
  return (
    <div className="mb-6">
      <p className="text-body-md text-on-surface-variant">{getGreeting()},</p>
      <h1 className="font-display-lg-mobile md:font-display-lg text-white uppercase tracking-tight">
        {firstName}
      </h1>
      <p className="mt-1 flex items-center gap-1.5 text-label-md text-on-surface-variant">
        <span className="material-symbols-outlined text-[18px] text-primary-fixed" aria-hidden="true">
          target
        </span>
        Objetivo: {user.goal}
      </p>
    </div>
  );
}
