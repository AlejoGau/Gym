'use client';

import { useMemo, useState } from 'react';
import DaySelector from '@/features/nutrition/components/DaySelector';
import MacroSummary from '@/features/nutrition/components/MacroSummary';
import MealCard from '@/features/nutrition/components/MealCard';
import NutritionDisclaimer from '@/features/nutrition/components/NutritionDisclaimer';
import SectionTitle from '@/components/portal/ui/SectionTitle';
import EmptyState from '@/components/portal/ui/EmptyState';
import { nutritionPlan } from '@/features/nutrition/data/plan';
import { sumMeals } from '@/features/nutrition/utils/macros';
import { useMealProgress } from '@/features/nutrition/hooks/useMealProgress';

/** Pantalla "Mi alimentación" (/alimentacion). */
export default function AlimentacionPage() {
  const { days } = nutritionPlan;
  const today = days.find((d) => d.isToday) ?? days[0];
  const [selectedId, setSelectedId] = useState(today.id);

  const selectedDay = days.find((d) => d.id === selectedId) ?? today;
  const { hydrated, isDone, toggleMeal } = useMealProgress(selectedDay.id);

  // Suma de macros de las comidas marcadas como realizadas.
  const consumed = useMemo(() => {
    const doneMeals = selectedDay.meals.filter((m) => isDone(m.id));
    return sumMeals(doneMeals);
  }, [selectedDay, isDone]);

  const mealsDone = selectedDay.meals.filter((m) => isDone(m.id)).length;

  return (
    <div>
      <header className="mb-5">
        <h1 className="font-display-lg-mobile text-white uppercase tracking-tight">
          Mi alimentación
        </h1>
        <p className="text-on-surface-variant text-body-md">{nutritionPlan.name}</p>
      </header>

      <DaySelector days={days} selectedId={selectedId} onSelect={setSelectedId} />

      <div className="mt-4">
        <MacroSummary
          targets={selectedDay.targets}
          consumed={consumed}
          mealsDone={mealsDone}
          mealsTotal={selectedDay.meals.length}
        />
      </div>

      <NutritionDisclaimer className="mt-3" />

      <section className="mt-6">
        <SectionTitle icon="restaurant">Comidas — {selectedDay.label}</SectionTitle>

        {selectedDay.meals.length === 0 ? (
          <EmptyState
            icon="no_meals"
            title="Sin comidas cargadas"
            description="Este día todavía no tiene un plan asignado."
          />
        ) : (
          <ul className="space-y-3">
            {selectedDay.meals.map((meal) => (
              <li key={meal.id}>
                {/* Mientras hidrata, se asume no realizada para evitar mismatch de SSR */}
                <MealCard
                  meal={meal}
                  done={hydrated && isDone(meal.id)}
                  onToggle={() => toggleMeal(meal.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
