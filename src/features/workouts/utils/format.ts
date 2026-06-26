import type { Workout } from '@/features/workouts/types';
import { sessions } from '@/features/workouts/data/sessions';

/** Formatea una cantidad de segundos de descanso como "1:30" o "45s". */
export function formatRest(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m} min` : `${m}:${String(s).padStart(2, '0')}`;
}

/** Formatea una duración en minutos como "55 min" o "1 h 5 min". */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/**
 * Calcula el progreso (0-100) de una rutina a partir de las sesiones registradas.
 * Como todavía no hay sesión activa real, deriva un valor estable mock.
 */
export function getWorkoutProgress(workout: Workout): {
  completed: number;
  total: number;
  percent: number;
} {
  const total = workout.exercises.length;
  const session = sessions.find((s) => s.workoutId === workout.id);
  const completed = session ? Math.min(session.completedExercises, total) : 0;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent };
}
