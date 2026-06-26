// Tipos del dominio de alimentación. Datos 100% mock, valores aproximados.

export type MealType = 'Desayuno' | 'Almuerzo' | 'Merienda' | 'Cena' | 'Snack';

/** Un ingrediente con su cantidad y aporte nutricional aproximado. */
export interface Ingredient {
  id: string;
  name: string;
  /** Cantidad legible, ej. "150 g" o "1 unidad". */
  quantity: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

/** Una comida del plan, compuesta por ingredientes. */
export interface Meal {
  id: string;
  name: string;
  type: MealType;
  /** Horario sugerido, ej. "08:00". */
  time: string;
  /** Ícono de Material Symbols. */
  icon: string;
  ingredients: Ingredient[];
}

/** Totales nutricionales (objetivo diario o suma de una comida). */
export interface MacroTotals {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

/** Plan de un día con su objetivo y sus comidas. */
export interface DayPlan {
  id: string;
  /** Nombre completo del día, ej. "Lunes". */
  label: string;
  /** Abreviatura para el selector, ej. "Lun". */
  short: string;
  isToday: boolean;
  /** Objetivo diario aproximado. */
  targets: MacroTotals;
  meals: Meal[];
}

/** Plan alimentario completo (varios días). */
export interface NutritionPlan {
  id: string;
  name: string;
  days: DayPlan[];
}
