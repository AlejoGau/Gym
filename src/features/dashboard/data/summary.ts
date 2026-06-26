import type {
  DashboardSummary,
  WeeklyProgress,
  TodayNutritionSummary,
  NextActivity,
} from '@/features/dashboard/types';
import { currentUser } from './user';
import { todayWorkout } from '@/features/workouts/data/workouts';

const weeklyProgress: WeeklyProgress = {
  completedSessions: 3,
  targetSessions: 5,
  streakDays: 12,
  days: [
    { label: 'L', done: true, isToday: false },
    { label: 'M', done: true, isToday: false },
    { label: 'X', done: true, isToday: false },
    { label: 'J', done: false, isToday: true },
    { label: 'V', done: false, isToday: false },
    { label: 'S', done: false, isToday: false },
    { label: 'D', done: false, isToday: false },
  ],
};

const todayNutrition: TodayNutritionSummary = {
  caloriesConsumed: 1450,
  caloriesTarget: 2400,
  proteinG: 110,
  carbsG: 160,
  fatG: 48,
  mealsDone: 2,
  mealsTotal: 4,
};

const nextActivity: NextActivity = {
  id: 'act-001',
  title: 'Funcional HIIT',
  type: 'clase',
  dateLabel: 'Hoy',
  time: '18:30',
  location: 'Sala 2 — Palermo',
  icon: 'sprint',
};

/** Datos agregados que consume la pantalla de inicio. */
export const dashboardSummary: DashboardSummary = {
  user: currentUser,
  todayWorkout,
  weeklyProgress,
  todayNutrition,
  nextActivity,
};
