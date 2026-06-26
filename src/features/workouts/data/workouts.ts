import type { Workout } from '@/features/workouts/types';
import {
  pushExercises,
  pullExercises,
  legExercises,
  shouldersCoreExercises,
} from './exercises';

/** Rutinas de la semana (mock) con ejercicios reales por foco muscular. */
export const workouts: Workout[] = [
  {
    id: 'wk-push-a',
    name: 'Push A — Empuje',
    day: 'Lunes',
    estimatedMinutes: 55,
    focus: 'Pecho y tríceps',
    exercises: pushExercises,
  },
  {
    id: 'wk-pull-a',
    name: 'Pull A — Tracción',
    day: 'Miércoles',
    estimatedMinutes: 55,
    focus: 'Espalda y bíceps',
    exercises: pullExercises,
  },
  {
    id: 'wk-legs-a',
    name: 'Legs A — Piernas',
    day: 'Viernes',
    estimatedMinutes: 60,
    focus: 'Piernas y glúteos',
    exercises: legExercises,
  },
  {
    id: 'wk-shoulders-core',
    name: 'Hombros y Core',
    day: 'Sábado',
    estimatedMinutes: 45,
    focus: 'Hombros y abdomen',
    exercises: shouldersCoreExercises,
  },
];

/** Rutina del día destacada en el inicio. */
export const todayWorkout: Workout = workouts[0];

/** Devuelve una rutina por id (helper de acceso a datos mock). */
export function getWorkoutById(id: string): Workout | undefined {
  return workouts.find((w) => w.id === id);
}
