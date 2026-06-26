'use client';

import { useState } from 'react';
import WorkoutSummaryCard from '@/features/workouts/components/WorkoutSummaryCard';
import ExerciseCard from '@/features/workouts/components/ExerciseCard';
import SectionTitle from '@/components/portal/ui/SectionTitle';
import EmptyState from '@/components/portal/ui/EmptyState';
import Button from '@/components/portal/ui/Button';
import { workouts } from '@/features/workouts/data/workouts';

/** Pantalla "Mis entrenamientos" (/entrenamientos) con selector de rutina. */
export default function WorkoutsPage() {
  const [selectedId, setSelectedId] = useState(workouts[0]?.id);
  const workout = workouts.find((w) => w.id === selectedId) ?? workouts[0];

  if (!workout) {
    return (
      <div>
        <h1 className="font-display-lg-mobile text-white uppercase tracking-tight mb-6">
          Mis entrenamientos
        </h1>
        <EmptyState
          icon="fitness_center"
          title="No tenés rutinas asignadas"
          description="Cuando tu entrenador cargue una rutina, vas a verla acá."
          action={
            <Button href="/inicio" variant="secondary">
              Volver al inicio
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display-lg-mobile text-white uppercase tracking-tight mb-4">
        Mis entrenamientos
      </h1>

      {/* Selector de rutina */}
      <div
        role="tablist"
        aria-label="Seleccionar rutina"
        className="mb-5 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
      >
        {workouts.map((w) => {
          const selected = w.id === workout.id;
          return (
            <button
              key={w.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setSelectedId(w.id)}
              className={`flex shrink-0 flex-col items-start rounded-xl px-4 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed ${
                selected
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : 'bg-surface-container-low/70 text-on-surface-variant hover:text-primary-fixed'
              }`}
            >
              <span className="font-bold text-[14px] uppercase">{w.name}</span>
              <span
                className={`text-[11px] ${
                  selected ? 'text-on-primary-fixed/80' : 'text-on-surface-variant/70'
                }`}
              >
                {w.day} · {w.focus}
              </span>
            </button>
          );
        })}
      </div>

      <WorkoutSummaryCard workout={workout} />

      <div className="mt-8">
        <SectionTitle icon="list">Ejercicios</SectionTitle>
        {workout.exercises.length === 0 ? (
          <EmptyState icon="fitness_center" title="Esta rutina no tiene ejercicios cargados" />
        ) : (
          <ul className="space-y-3">
            {workout.exercises.map((exercise, index) => (
              <li key={exercise.id}>
                <ExerciseCard exercise={exercise} index={index} workoutId={workout.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
