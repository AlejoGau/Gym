import Card from '@/components/portal/ui/Card';
import Button from '@/components/portal/ui/Button';
import WorkoutProgress from './WorkoutProgress';
import { formatDuration, getWorkoutProgress } from '@/features/workouts/utils/format';
import type { Workout } from '@/features/workouts/types';

interface WorkoutSummaryCardProps {
  workout: Workout;
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg bg-surface-container-low/60 py-3">
      <span className="material-symbols-outlined text-primary-fixed text-[22px]" aria-hidden="true">
        {icon}
      </span>
      <span className="text-white font-bold text-[15px]">{value}</span>
      <span className="text-[11px] text-on-surface-variant uppercase tracking-wide">{label}</span>
    </div>
  );
}

/** Encabezado de la rutina: nombre, día, duración, cantidad, progreso y CTA. */
export default function WorkoutSummaryCard({ workout }: WorkoutSummaryCardProps) {
  const progress = getWorkoutProgress(workout);

  return (
    <Card highlight className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-label-md text-primary-fixed uppercase font-semibold">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              calendar_today
            </span>
            {workout.day}
          </p>
          <h1 className="font-display-lg-mobile text-white uppercase tracking-tight mt-1">
            {workout.name}
          </h1>
          <p className="text-on-surface-variant text-body-md">{workout.focus}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat icon="schedule" label="Duración" value={formatDuration(workout.estimatedMinutes)} />
        <Stat icon="list" label="Ejercicios" value={`${workout.exercises.length}`} />
        <Stat icon="trending_up" label="Completado" value={`${progress.percent}%`} />
      </div>

      <WorkoutProgress
        completed={progress.completed}
        total={progress.total}
        percent={progress.percent}
        className="mt-5"
      />

      <div className="mt-5">
        <Button
          href={`/entrenamientos/actual?w=${workout.id}`}
          icon="play_arrow"
          size="lg"
          className="w-full"
        >
          Comenzar entrenamiento
        </Button>
      </div>
    </Card>
  );
}
