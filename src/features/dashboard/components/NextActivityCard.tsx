import Card from '@/components/portal/ui/Card';
import SectionTitle from '@/components/portal/ui/SectionTitle';
import EmptyState from '@/components/portal/ui/EmptyState';
import type { NextActivity } from '@/features/dashboard/types';

interface NextActivityCardProps {
  activity: NextActivity | null;
}

/** Tarjeta con la próxima actividad agendada. */
export default function NextActivityCard({ activity }: NextActivityCardProps) {
  return (
    <Card className="p-5">
      <SectionTitle icon="event">Próxima actividad</SectionTitle>

      {activity ? (
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-fixed/15">
            <span className="material-symbols-outlined text-primary-fixed text-[26px]" aria-hidden="true">
              {activity.icon}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-headline-md text-[18px] font-bold text-white truncate">
              {activity.title}
            </p>
            <p className="text-on-surface-variant text-label-md flex flex-wrap gap-x-3">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  schedule
                </span>
                {activity.dateLabel} · {activity.time}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  location_on
                </span>
                {activity.location}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <EmptyState
          icon="event_available"
          title="Sin actividades próximas"
          description="Cuando reserves una clase o evaluación, aparecerá acá."
        />
      )}
    </Card>
  );
}
