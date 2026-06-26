import type { Meal } from '@/features/nutrition/types';

/**
 * Catálogo mock de comidas con sus ingredientes. Los valores nutricionales son
 * aproximados y de ejemplo, no constituyen un plan profesional.
 */
export const meals: Meal[] = [
  {
    id: 'meal-desayuno',
    name: 'Avena con frutas y huevos',
    type: 'Desayuno',
    time: '08:00',
    icon: 'breakfast_dining',
    ingredients: [
      { id: 'i-avena', name: 'Avena', quantity: '60 g', calories: 228, proteinG: 8, carbsG: 40, fatG: 4 },
      { id: 'i-banana', name: 'Banana', quantity: '1 unidad', calories: 105, proteinG: 1, carbsG: 27, fatG: 0 },
      { id: 'i-huevos', name: 'Huevos', quantity: '2 unidades', calories: 156, proteinG: 13, carbsG: 1, fatG: 11 },
      { id: 'i-leche', name: 'Leche descremada', quantity: '200 ml', calories: 70, proteinG: 7, carbsG: 10, fatG: 0 },
    ],
  },
  {
    id: 'meal-almuerzo',
    name: 'Pollo con arroz y ensalada',
    type: 'Almuerzo',
    time: '13:00',
    icon: 'lunch_dining',
    ingredients: [
      { id: 'i-pollo', name: 'Pechuga de pollo', quantity: '180 g', calories: 297, proteinG: 56, carbsG: 0, fatG: 6 },
      { id: 'i-arroz', name: 'Arroz integral', quantity: '150 g cocido', calories: 165, proteinG: 4, carbsG: 34, fatG: 1 },
      { id: 'i-ensalada', name: 'Ensalada mixta', quantity: '1 plato', calories: 60, proteinG: 2, carbsG: 8, fatG: 2 },
      { id: 'i-aceite', name: 'Aceite de oliva', quantity: '1 cda', calories: 120, proteinG: 0, carbsG: 0, fatG: 14 },
    ],
  },
  {
    id: 'meal-merienda',
    name: 'Yogur con frutos secos',
    type: 'Merienda',
    time: '17:00',
    icon: 'bakery_dining',
    ingredients: [
      { id: 'i-yogur', name: 'Yogur natural', quantity: '200 g', calories: 130, proteinG: 12, carbsG: 16, fatG: 3 },
      { id: 'i-nueces', name: 'Nueces', quantity: '20 g', calories: 131, proteinG: 3, carbsG: 3, fatG: 13 },
      { id: 'i-miel', name: 'Miel', quantity: '1 cdta', calories: 21, proteinG: 0, carbsG: 6, fatG: 0 },
    ],
  },
  {
    id: 'meal-cena',
    name: 'Salmón con boniato',
    type: 'Cena',
    time: '21:00',
    icon: 'dinner_dining',
    ingredients: [
      { id: 'i-salmon', name: 'Salmón', quantity: '150 g', calories: 280, proteinG: 34, carbsG: 0, fatG: 16 },
      { id: 'i-boniato', name: 'Boniato', quantity: '150 g', calories: 135, proteinG: 2, carbsG: 31, fatG: 0 },
      { id: 'i-brocoli', name: 'Brócoli', quantity: '100 g', calories: 34, proteinG: 3, carbsG: 7, fatG: 0 },
    ],
  },
];
