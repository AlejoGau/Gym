import type { NutritionPlan, MacroTotals } from '@/features/nutrition/types';
import { meals } from './meals';

const targets: MacroTotals = {
  calories: 2400,
  proteinG: 180,
  carbsG: 250,
  fatG: 70,
};

/**
 * Plan alimentario mock. Para simplificar, todos los días comparten las mismas
 * comidas y objetivo; el día actual queda marcado con `isToday`.
 */
export const nutritionPlan: NutritionPlan = {
  id: 'plan-mock',
  name: 'Plan de volumen — ejemplo',
  days: [
    { id: 'day-lun', label: 'Lunes', short: 'Lun', isToday: false, targets, meals },
    { id: 'day-mar', label: 'Martes', short: 'Mar', isToday: false, targets, meals },
    { id: 'day-mie', label: 'Miércoles', short: 'Mié', isToday: false, targets, meals },
    { id: 'day-jue', label: 'Jueves', short: 'Jue', isToday: true, targets, meals },
    { id: 'day-vie', label: 'Viernes', short: 'Vie', isToday: false, targets, meals },
    { id: 'day-sab', label: 'Sábado', short: 'Sáb', isToday: false, targets, meals },
    { id: 'day-dom', label: 'Domingo', short: 'Dom', isToday: false, targets, meals },
  ],
};
