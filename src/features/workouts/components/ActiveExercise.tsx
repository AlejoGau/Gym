'use client';

import { useState } from 'react';
import ExerciseImage from './ExerciseImage';
import ExerciseDetail from './ExerciseDetail';
import SetRow from './SetRow';
import RestTimer from './RestTimer';
import { formatRest } from '@/features/workouts/utils/format';
import type { Exercise } from '@/features/workouts/types';
import type { SetEntry } from '@/features/workouts/types/session';

interface ActiveExerciseProps {
  exercise: Exercise;
  sets: SetEntry[];
  onChangeSet: (setIndex: number, patch: Partial<SetEntry>) => void;
  onToggleSet: (setIndex: number) => void;
}

/** Vista del ejercicio en curso durante el entrenamiento. */
export default function ActiveExercise({
  exercise,
  sets,
  onChangeSet,
  onToggleSet,
}: ActiveExerciseProps) {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div>
      <div className="glass-card-3d rounded-xl overflow-hidden">
        <ExerciseImage exercise={exercise} animated className="h-40 w-full" />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-headline-md text-[22px] font-bold text-white leading-tight">
                {exercise.name}
              </h2>
              <p className="mt-1 inline-flex items-center gap-1 text-label-md text-primary-fixed">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  exercise
                </span>
                {exercise.primaryMuscle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDetailOpen(true)}
              aria-haspopup="dialog"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-outline-variant px-3 py-2 text-label-md text-on-surface-variant hover:text-primary-fixed hover:border-primary-fixed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                menu_book
              </span>
              Instrucciones
            </button>
          </div>

          <p className="mt-3 text-label-md text-on-surface-variant">
            Objetivo: {exercise.sets} series × {exercise.reps} reps · descanso{' '}
            {formatRest(exercise.restSeconds)}
            {exercise.previousWeightKg != null && (
              <> · última vez {exercise.previousWeightKg} kg</>
            )}
          </p>
        </div>
      </div>

      {/* Series */}
      <div className="mt-4 space-y-2">
        {sets.map((entry, i) => (
          <SetRow
            key={i}
            exerciseId={exercise.id}
            index={i}
            entry={entry}
            targetReps={exercise.reps}
            onChange={(patch) => onChangeSet(i, patch)}
            onToggle={() => onToggleSet(i)}
          />
        ))}
      </div>

      {/* Cronómetro de descanso (key por ejercicio: se reinicia al cambiar) */}
      <div className="mt-4">
        <RestTimer key={exercise.id} defaultSeconds={exercise.restSeconds} />
      </div>

      <ExerciseDetail exercise={exercise} open={detailOpen} onClose={() => setDetailOpen(false)} />
    </div>
  );
}
