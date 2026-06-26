import Card from '@/components/portal/ui/Card';
import SectionTitle from '@/components/portal/ui/SectionTitle';
import Button from '@/components/portal/ui/Button';
import EmptyState from '@/components/portal/ui/EmptyState';
import { formatDuration } from '@/features/workouts/utils/format';
import type { Workout } from '@/features/workouts/types';

interface TodayWorkoutCardProps {
  workout: Workout | null;
}

/** Tarjeta con el entrenamiento de hoy y acceso para comenzarlo. */
export default function TodayWorkoutCard({ workout }: TodayWorkoutCardProps) {
  if (!workout) {
    return (
      <Card className="p-5">
        <SectionTitle icon="fitness_center">Entrenamiento de hoy</SectionTitle>
        <EmptyState
          icon="self_improvement"
          title="Día de descanso"
          description="Hoy no tenés una rutina asignada. Aprovechá para recuperarte."
        />
      </Card>
    );
  }

  return (
    <Card highlight className="p-5">
      <SectionTitle icon="fitness_center">Entrenamiento de hoy</SectionTitle>

      <p className="font-headline-md text-[22px] font-bold text-white">{workout.name}</p>
      <p className="text-on-surface-variant text-body-md">{workout.focus}</p>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-label-md text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-primary-fixed" aria-hidden="true">
            schedule
          </span>
          {formatDuration(workout.estimatedMinutes)}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-primary-fixed" aria-hidden="true">
            list
          </span>
          {workout.exercises.length} ejercicios
        </span>
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-primary-fixed" aria-hidden="true">
            calendar_today
          </span>
          {workout.day}
        </span>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <Button href="/entrenamientos/actual" icon="play_arrow" className="flex-1">
          Comenzar
        </Button>
        <Button href="/entrenamientos" variant="secondary" className="flex-1">
          Ver rutina
        </Button>
      </div>
    </Card>
  );
}
