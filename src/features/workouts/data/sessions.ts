import type { WorkoutSession } from '@/features/workouts/types';

/** Historial mock de sesiones de entrenamiento. */
export const sessions: WorkoutSession[] = [
  {
    id: 'se-001',
    workoutId: 'wk-push-a',
    workoutName: 'Push A — Empuje',
    date: '2026-06-22',
    status: 'completada',
    completedExercises: 5,
    totalExercises: 5,
    durationMinutes: 58,
  },
  {
    id: 'se-002',
    workoutId: 'wk-pull-a',
    workoutName: 'Pull A — Tracción',
    date: '2026-06-24',
    status: 'completada',
    completedExercises: 6,
    totalExercises: 6,
    durationMinutes: 62,
  },
  {
    id: 'se-003',
    workoutId: 'wk-legs-a',
    workoutName: 'Legs A — Piernas',
    date: '2026-06-25',
    status: 'completada',
    completedExercises: 5,
    totalExercises: 6,
    durationMinutes: 49,
  },
];
