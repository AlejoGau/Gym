import type { Ingredient, Meal, MacroTotals } from '@/features/nutrition/types';

const EMPTY: MacroTotals = { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 };

/** Suma los macros de una lista de ingredientes. */
export function sumIngredients(ingredients: Ingredient[]): MacroTotals {
  return ingredients.reduce<MacroTotals>(
    (acc, i) => ({
      calories: acc.calories + i.calories,
      proteinG: acc.proteinG + i.proteinG,
      carbsG: acc.carbsG + i.carbsG,
      fatG: acc.fatG + i.fatG,
    }),
    { ...EMPTY },
  );
}

/** Totales nutricionales de una comida. */
export function mealTotals(meal: Meal): MacroTotals {
  return sumIngredients(meal.ingredients);
}

/** Suma los totales de varias comidas (ej. las marcadas como realizadas). */
export function sumMeals(meals: Meal[]): MacroTotals {
  return meals.reduce<MacroTotals>(
    (acc, meal) => {
      const t = mealTotals(meal);
      return {
        calories: acc.calories + t.calories,
        proteinG: acc.proteinG + t.proteinG,
        carbsG: acc.carbsG + t.carbsG,
        fatG: acc.fatG + t.fatG,
      };
    },
    { ...EMPTY },
  );
}

/** Porcentaje (0-100) de un valor respecto a un objetivo, acotado. */
export function percentOf(value: number, target: number): number {
  if (target <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((value / target) * 100)));
}
