'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ActiveExercise from '@/features/workouts/components/ActiveExercise';
import WorkoutSummary from '@/features/workouts/components/WorkoutSummary';
import WorkoutProgress from '@/features/workouts/components/WorkoutProgress';
import Skeleton from '@/components/portal/ui/Skeleton';
import EmptyState from '@/components/portal/ui/EmptyState';
import Button from '@/components/portal/ui/Button';
import { todayWorkout, getWorkoutById } from '@/features/workouts/data/workouts';
import { useActiveWorkout } from '@/features/workouts/hooks/useActiveWorkout';

/** Interfaz mobile-first para usar durante el entrenamiento (/entrenamientos/actual). */
export default function ActiveWorkoutPage() {
  const params = useSearchParams();
  const workout = getWorkoutById(params.get('w') ?? '') ?? todayWorkout;
  const {
    hydrated,
    state,
    currentExercise,
    currentIndex,
    totalExercises,
    isFinished,
    stats,
    updateSet,
    toggleSetCompleted,
    next,
    prev,
    finish,
    reset,
  } = useActiveWorkout(workout);

  // Skeleton mientras se recupera el estado desde localStorage.
  if (!hydrated) {
    return (
      <div aria-busy="true" aria-label="Cargando entrenamiento">
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-40 w-full rounded-xl mb-4" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    );
  }

  if (workout.exercises.length === 0 || !currentExercise) {
    return (
      <EmptyState
        icon="fitness_center"
        title="No hay ejercicios para entrenar"
        description="Esta rutina no tiene ejercicios cargados."
        action={
          <Button href="/entrenamientos" variant="secondary">
            Volver a entrenamientos
          </Button>
        }
      />
    );
  }

  if (isFinished) {
    return <WorkoutSummary workout={workout} state={state} onRestart={reset} />;
  }

  const isLast = currentIndex === totalExercises - 1;

  return (
    <div>
      {/* Encabezado de la sesión */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-label-md text-on-surface-variant uppercase">
            Ejercicio {currentIndex + 1} de {totalExercises}
          </p>
          <h1 className="font-headline-md text-[20px] font-bold text-white">{workout.name}</h1>
        </div>
        <Link
          href="/entrenamientos"
          className="inline-flex items-center gap-1 rounded-lg border border-outline-variant px-3 py-2 text-label-md text-on-surface-variant hover:text-primary-fixed hover:border-primary-fixed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
          Salir
        </Link>
      </div>

      <WorkoutProgress
        completed={stats.completedSets}
        total={stats.totalSets}
        percent={stats.percent}
        className="mb-5"
      />

      <ActiveExercise
        exercise={currentExercise}
        sets={state.entries[currentExercise.id] ?? []}
        onChangeSet={(setIndex, patch) => updateSet(currentExercise.id, setIndex, patch)}
        onToggleSet={(setIndex) => toggleSetCompleted(currentExercise.id, setIndex)}
      />

      {/* Navegación entre ejercicios */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={prev}
          disabled={currentIndex === 0}
          className="inline-flex items-center justify-center gap-1 rounded-lg border border-outline-variant px-4 py-4 text-label-md font-bold uppercase text-on-surface-variant hover:text-primary-fixed hover:border-primary-fixed transition-colors disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
        >
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          <span className="sr-only sm:not-sr-only">Anterior</span>
        </button>

        {isLast ? (
          <Button onClick={finish} size="lg" icon="flag" className="flex-1">
            Finalizar entrenamiento
          </Button>
        ) : (
          <Button onClick={next} size="lg" icon="arrow_forward" className="flex-1">
            Siguiente ejercicio
          </Button>
        )}
      </div>

      {/* Finalizar siempre disponible */}
      {!isLast && (
        <button
          type="button"
          onClick={finish}
          className="mt-3 w-full rounded-lg py-3 text-label-md font-semibold uppercase text-on-surface-variant hover:text-primary-fixed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
        >
          Finalizar entrenamiento
        </button>
      )}
    </div>
  );
}
