import Link from 'next/link';
import SectionTitle from '@/components/portal/ui/SectionTitle';

interface QuickAction {
  href: string;
  label: string;
  icon: string;
}

const actions: QuickAction[] = [
  { href: '/entrenamientos/actual', label: 'Entrenar ahora', icon: 'play_circle' },
  { href: '/entrenamientos', label: 'Mis rutinas', icon: 'fitness_center' },
  { href: '/alimentacion', label: 'Mi alimentación', icon: 'restaurant' },
  { href: '/perfil', label: 'Mi perfil', icon: 'person' },
];

/** Grilla de accesos rápidos de la pantalla de inicio. */
export default function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-title">
      <SectionTitle icon="bolt">
        <span id="quick-actions-title">Accesos rápidos</span>
      </SectionTitle>
      <ul className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <li key={a.href}>
            <Link
              href={a.href}
              className="glass-card-3d flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-primary-fixed/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
            >
              <span className="material-symbols-outlined text-primary-fixed text-[26px]" aria-hidden="true">
                {a.icon}
              </span>
              <span className="font-label-md text-on-surface text-[13px] leading-tight">
                {a.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
