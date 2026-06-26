import Card from '@/components/portal/ui/Card';
import SectionTitle from '@/components/portal/ui/SectionTitle';
import ProgressBar from '@/components/portal/ui/ProgressBar';
import type { WeeklyProgress } from '@/features/dashboard/types';

interface WeeklyProgressCardProps {
  progress: WeeklyProgress;
}

/** Tarjeta de progreso semanal de entrenamientos. */
export default function WeeklyProgressCard({ progress }: WeeklyProgressCardProps) {
  const { completedSessions, targetSessions, streakDays, days } = progress;
  const percent = targetSessions === 0 ? 0 : (completedSessions / targetSessions) * 100;

  return (
    <Card className="p-5">
      <SectionTitle icon="trending_up">Progreso semanal</SectionTitle>

      <div className="flex items-end justify-between mb-3">
        <p className="text-on-surface-variant text-body-md">
          <span className="text-white font-bold text-[22px]">{completedSessions}</span>
          {' '}/ {targetSessions} sesiones
        </p>
        <p className="flex items-center gap-1 text-label-md text-primary-fixed font-semibold">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            local_fire_department
          </span>
          {streakDays} días
        </p>
      </div>

      <ProgressBar
        value={percent}
        label={`${completedSessions} de ${targetSessions} sesiones completadas`}
      />

      <ul className="mt-4 flex justify-between" aria-label="Días de la semana">
        {days.map((d, i) => (
          <li key={i} className="flex flex-col items-center gap-1.5">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold ${
                d.done
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : d.isToday
                    ? 'border border-primary-fixed text-primary-fixed'
                    : 'bg-surface-container-highest text-on-surface-variant'
              }`}
            >
              {d.done ? (
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  check
                </span>
              ) : (
                d.label
              )}
            </span>
            {d.isToday && (
              <span className="text-[10px] text-primary-fixed font-semibold uppercase">Hoy</span>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
