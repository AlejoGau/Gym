'use client';

import { useState } from 'react';
import Link from 'next/link';
import ExerciseImage from './ExerciseImage';
import ExerciseDetail from './ExerciseDetail';
import { formatRest } from '@/features/workouts/utils/format';
import type { Exercise } from '@/features/workouts/types';

interface ExerciseCardProps {
  exercise: Exercise;
  /** Posición en la lista (para numeración visible). */
  index: number;
  /** Rutina a la que pertenece (para arrancar la sesión correcta). */
  workoutId?: string;
}

function Meta({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="flex items-center gap-1 text-[11px] text-on-surface-variant uppercase tracking-wide">
        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
          {icon}
        </span>
        {label}
      </span>
      <span className="text-on-surface font-semibold text-[14px]">{value}</span>
    </div>
  );
}

/** Tarjeta de un ejercicio dentro del listado de la rutina. */
export default function ExerciseCard({ exercise, index, workoutId }: ExerciseCardProps) {
  const [detailOpen, setDetailOpen] = useState(false);
  const startHref = workoutId
    ? `/entrenamientos/actual?w=${workoutId}`
    : '/entrenamientos/actual';

  return (
    <article className="glass-card-3d rounded-xl p-4">
      <div className="flex gap-4">
        <ExerciseImage
          exercise={exercise}
          className="h-20 w-20 shrink-0 rounded-lg"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-on-surface-variant font-semibold">
            Ejercicio {index + 1}
          </p>
          <h3 className="font-headline-md text-[17px] font-bold text-white leading-tight">
            {exercise.name}
          </h3>
          <p className="mt-0.5 inline-flex items-center gap-1 text-label-md text-primary-fixed">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              exercise
            </span>
            {exercise.primaryMuscle}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Meta icon="repeat" label="Series" value={`${exercise.sets}`} />
        <Meta icon="tag" label="Reps" value={exercise.reps} />
        <Meta icon="timer" label="Descanso" value={formatRest(exercise.restSeconds)} />
        <Meta
          icon="scale"
          label="Peso anterior"
          value={exercise.previousWeightKg != null ? `${exercise.previousWeightKg} kg` : '—'}
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setDetailOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant px-3 py-2 text-label-md text-on-surface-variant hover:text-primary-fixed hover:border-primary-fixed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
          aria-haspopup="dialog"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            menu_book
          </span>
          Ver técnica
        </button>
        <Link
          href={startHref}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed px-3 py-2 text-label-md font-bold uppercase hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            play_arrow
          </span>
          Comenzar
        </Link>
      </div>

      <ExerciseDetail
        exercise={exercise}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </article>
  );
}
