// Tipos del usuario y del resumen de la pantalla de inicio. Datos mock.

import type { Workout } from '@/features/workouts/types';

/** Usuario simulado del portal. No representa autenticación real. */
export interface User {
  id: string;
  name: string;
  /** Imagen de avatar opcional; si es null se muestran las iniciales. */
  avatarUrl: string | null;
  /** Objetivo declarado del usuario (texto libre). */
  goal: string;
  /** Fecha de alta en formato ISO. */
  memberSince: string;
}

/** Estado de un día dentro del progreso semanal. */
export interface WeeklyDay {
  label: string; // "L", "M", "X"...
  done: boolean;
  /** Marca el día actual. */
  isToday: boolean;
}

/** Progreso de entrenamientos de la semana. */
export interface WeeklyProgress {
  completedSessions: number;
  targetSessions: number;
  /** Racha de días/semanas activos. */
  streakDays: number;
  days: WeeklyDay[];
}

/** Resumen nutricional simplificado para la tarjeta de inicio (detalle completo en Etapa 2). */
export interface TodayNutritionSummary {
  caloriesConsumed: number;
  caloriesTarget: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  mealsDone: number;
  mealsTotal: number;
}

export type ActivityType = 'entrenamiento' | 'clase' | 'evaluacion';

/** Próxima actividad agendada. */
export interface NextActivity {
  id: string;
  title: string;
  type: ActivityType;
  /** Etiqueta legible de fecha, ej. "Hoy" o "Mañana". */
  dateLabel: string;
  /** Horario legible, ej. "18:30". */
  time: string;
  location: string;
  icon: string;
}

/** Datos agregados que consume la pantalla de inicio. */
export interface DashboardSummary {
  user: User;
  todayWorkout: Workout | null;
  weeklyProgress: WeeklyProgress;
  todayNutrition: TodayNutritionSummary;
  nextActivity: NextActivity | null;
}
