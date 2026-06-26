'use client';

import Modal from '@/components/portal/ui/Modal';
import ExerciseImage from './ExerciseImage';
import { formatRest } from '@/features/workouts/utils/format';
import type { Exercise } from '@/features/workouts/types';

interface ExerciseDetailProps {
  exercise: Exercise;
  open: boolean;
  onClose: () => void;
}

/** Diálogo accesible con la técnica del ejercicio. */
export default function ExerciseDetail({ exercise, open, onClose }: ExerciseDetailProps) {
  const titleId = `exercise-detail-${exercise.id}`;

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-white/10 bg-surface-container/95 p-5 backdrop-blur-xl">
        <h2 id={titleId} className="font-headline-md text-[20px] font-bold text-white">
          {exercise.name}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary-fixed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            close
          </span>
        </button>
      </div>

      <div className="p-5">
        <ExerciseImage exercise={exercise} animated className="mb-4 h-44 w-full rounded-xl" />

        <div className="mb-4 flex flex-wrap gap-2 text-label-md">
          <span className="rounded-full bg-surface-container-highest px-3 py-1 text-on-surface-variant">
            {exercise.primaryMuscle}
          </span>
          <span className="rounded-full bg-surface-container-highest px-3 py-1 text-on-surface-variant">
            {exercise.sets} series × {exercise.reps}
          </span>
          <span className="rounded-full bg-surface-container-highest px-3 py-1 text-on-surface-variant">
            Descanso {formatRest(exercise.restSeconds)}
          </span>
        </div>

        <h3 className="mb-2 font-headline-md text-[16px] font-bold text-white">Técnica</h3>
        <ol className="space-y-2.5">
          {exercise.technique.map((step, i) => (
            <li key={i} className="flex gap-3 text-body-md text-on-surface-variant">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-[12px] font-bold text-on-primary-fixed">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </Modal>
  );
}
