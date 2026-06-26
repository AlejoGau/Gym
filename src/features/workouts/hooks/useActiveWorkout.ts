'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import type { Workout } from '@/features/workouts/types';
import type { ActiveWorkoutState, SetEntry } from '@/features/workouts/types/session';

const STORAGE_KEY = 'forge:active-workout';

/** Crea el estado inicial a partir de la rutina, prellenando el peso anterior. */
function createState(workout: Workout): ActiveWorkoutState {
  const entries: Record<string, SetEntry[]> = {};
  for (const ex of workout.exercises) {
    entries[ex.id] = Array.from({ length: ex.sets }, () => ({
      weightKg: ex.previousWeightKg != null ? String(ex.previousWeightKg) : '',
      reps: '',
      completed: false,
    }));
  }
  // startedAt se sella en el primer cambio (handlers), no en render, para no usar Date.now aquí.
  return { workoutId: workout.id, startedAt: 0, currentIndex: 0, entries, finishedAt: null };
}

/** Sella el inicio si todavía no estaba marcado. */
function stamp(prev: ActiveWorkoutState): ActiveWorkoutState {
  return prev.startedAt ? prev : { ...prev, startedAt: Date.now() };
}

/**
 * Maneja la sesión de entrenamiento activa, persistida en localStorage para no
 * perder el progreso al recargar. Sin backend.
 */
export function useActiveWorkout(workout: Workout) {
  const initial = useMemo(() => createState(workout), [workout]);
  const [stored, setState, hydrated] = useLocalStorage<ActiveWorkoutState>(STORAGE_KEY, initial);

  // Si lo guardado corresponde a otra rutina, se usa el estado inicial de esta.
  const state = stored.workoutId === workout.id ? stored : initial;

  const updateSet = useCallback(
    (exerciseId: string, setIndex: number, patch: Partial<SetEntry>) => {
      setState((prev) => {
        const base = prev.workoutId === workout.id ? prev : initial;
        const sets = base.entries[exerciseId]?.map((s, i) =>
          i === setIndex ? { ...s, ...patch } : s,
        );
        if (!sets) return base;
        return stamp({ ...base, entries: { ...base.entries, [exerciseId]: sets } });
      });
    },
    [setState, workout.id, initial],
  );

  const toggleSetCompleted = useCallback(
    (exerciseId: string, setIndex: number) => {
      setState((prev) => {
        const base = prev.workoutId === workout.id ? prev : initial;
        const sets = base.entries[exerciseId]?.map((s, i) =>
          i === setIndex ? { ...s, completed: !s.completed } : s,
        );
        if (!sets) return base;
        return stamp({ ...base, entries: { ...base.entries, [exerciseId]: sets } });
      });
    },
    [setState, workout.id, initial],
  );

  const next = useCallback(() => {
    setState((prev) => {
      const base = prev.workoutId === workout.id ? prev : initial;
      return stamp({
        ...base,
        currentIndex: Math.min(workout.exercises.length - 1, base.currentIndex + 1),
      });
    });
  }, [setState, workout.id, workout.exercises.length, initial]);

  const prev = useCallback(() => {
    setState((p) => {
      const base = p.workoutId === workout.id ? p : initial;
      return stamp({ ...base, currentIndex: Math.max(0, base.currentIndex - 1) });
    });
  }, [setState, workout.id, initial]);

  const finish = useCallback(() => {
    setState((p) => {
      const base = stamp(p.workoutId === workout.id ? p : initial);
      return { ...base, finishedAt: Date.now() };
    });
  }, [setState, workout.id, initial]);

  const reset = useCallback(() => {
    setState({ ...createState(workout), startedAt: Date.now() });
  }, [setState, workout]);

  // Métricas derivadas.
  const stats = useMemo(() => {
    let completedSets = 0;
    let totalSets = 0;
    let completedExercises = 0;
    for (const ex of workout.exercises) {
      const sets = state.entries[ex.id] ?? [];
      totalSets += sets.length;
      const done = sets.filter((s) => s.completed).length;
      completedSets += done;
      if (sets.length > 0 && done === sets.length) completedExercises += 1;
    }
    const percent = totalSets === 0 ? 0 : Math.round((completedSets / totalSets) * 100);
    return { completedSets, totalSets, percent, completedExercises };
  }, [state, workout]);

  const currentExercise = workout.exercises[state.currentIndex] ?? null;

  return {
    hydrated,
    state,
    currentExercise,
    currentIndex: state.currentIndex,
    totalExercises: workout.exercises.length,
    isFinished: state.finishedAt != null,
    stats,
    updateSet,
    toggleSetCompleted,
    next,
    prev,
    finish,
    reset,
  };
}
