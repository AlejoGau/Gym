import GreetingHeader from '@/features/dashboard/components/GreetingHeader';
import TodayWorkoutCard from '@/features/dashboard/components/TodayWorkoutCard';
import WeeklyProgressCard from '@/features/dashboard/components/WeeklyProgressCard';
import TodayNutritionCard from '@/features/dashboard/components/TodayNutritionCard';
import NextActivityCard from '@/features/dashboard/components/NextActivityCard';
import QuickActions from '@/features/dashboard/components/QuickActions';
import { dashboardSummary } from '@/features/dashboard/data/summary';

/** Pantalla de inicio del usuario (/inicio). Compone las tarjetas del dashboard. */
export default function InicioPage() {
  const { user, todayWorkout, weeklyProgress, todayNutrition, nextActivity } = dashboardSummary;

  return (
    <div>
      <GreetingHeader user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Columna principal */}
        <div className="lg:col-span-2">
          <TodayWorkoutCard workout={todayWorkout} />
        </div>

        <WeeklyProgressCard progress={weeklyProgress} />
        <TodayNutritionCard nutrition={todayNutrition} />

        <div className="lg:col-span-2">
          <NextActivityCard activity={nextActivity} />
        </div>

        <div className="lg:col-span-2">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
