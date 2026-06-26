'use client';

import Card from '@/components/portal/ui/Card';
import Button from '@/components/portal/ui/Button';
import { formatDuration } from '@/features/workouts/utils/format';
import type { Workout } from '@/features/workouts/types';
import type { ActiveWorkoutState } from '@/features/workouts/types/session';

interface WorkoutSummaryProps {
  workout: Workout;
  state: ActiveWorkoutState;
  onRestart: () => void;
}

function Stat({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-surface-container-low/60 py-4">
      <span className="material-symbols-outlined text-primary-fixed text-[26px]" aria-hidden="true">
        {icon}
      </span>
      <span className="text-white font-bold text-[20px]">{value}</span>
      <span className="text-[11px] text-on-surface-variant uppercase tracking-wide">{label}</span>
    </div>
  );
}

/** Resumen final del entrenamiento completado. */
export default function WorkoutSummary({ workout, state, onRestart }: WorkoutSummaryProps) {
  // startedAt y finishedAt se sellan en los handlers; el resumen no usa Date.now en render.
  const start = state.startedAt || state.finishedAt || 0;
  const end = state.finishedAt ?? start;
  const durationMin = Math.max(1, Math.round((end - start) / 60000));

  let completedSets = 0;
  let totalVolume = 0;
  for (const ex of workout.exercises) {
    for (const s of state.entries[ex.id] ?? []) {
      if (s.completed) {
        completedSets += 1;
        const w = parseFloat(s.weightKg) || 0;
        const r = parseInt(s.reps, 10) || 0;
        totalVolume += w * r;
      }
    }
  }
  const completedExercises = workout.exercises.filter((ex) =>
    (state.entries[ex.id] ?? []).some((s) => s.completed),
  ).length;

  return (
    <div>
      <div className="flex flex-col items-center text-center mb-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed/15 mb-3">
          <span
            className="material-symbols-outlined text-primary-fixed text-[40px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            trophy
          </span>
        </span>
        <h1 className="font-display-lg-mobile text-white uppercase tracking-tight">
          ¡Entrenamiento completo!
        </h1>
        <p className="text-on-surface-variant text-body-md">{workout.name}</p>
      </div>

      <Card highlight className="p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat icon="schedule" value={formatDuration(durationMin)} label="Duración" />
          <Stat
            icon="fitness_center"
            value={`${completedExercises}/${workout.exercises.length}`}
            label="Ejercicios"
          />
          <Stat icon="repeat" value={`${completedSets}`} label="Series" />
          <Stat icon="monitoring" value={`${Math.round(totalVolume)} kg`} label="Volumen" />
        </div>
      </Card>

      <div className="mt-4 space-y-2">
        {workout.exercises.map((ex) => {
          const sets = state.entries[ex.id] ?? [];
          const done = sets.filter((s) => s.completed).length;
          return (
            <div
              key={ex.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-surface-container-low/50 px-4 py-3"
            >
              <span className="text-on-surface text-body-md truncate">{ex.name}</span>
              <span className="shrink-0 text-label-md text-on-surface-variant">
                {done}/{sets.length} series
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button href="/inicio" icon="home" className="flex-1">
          Volver al inicio
        </Button>
        <Button onClick={onRestart} variant="secondary" icon="restart_alt" className="flex-1">
          Hacer de nuevo
        </Button>
      </div>
    </div>
  );
}
