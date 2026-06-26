'use client';

import Modal from '@/components/portal/ui/Modal';
import { mealTotals } from '@/features/nutrition/utils/macros';
import NutritionDisclaimer from './NutritionDisclaimer';
import type { Meal } from '@/features/nutrition/types';

interface MealDetailProps {
  meal: Meal;
  open: boolean;
  onClose: () => void;
}

/** Diálogo accesible con el detalle de una comida (ingredientes, cantidades y macros). */
export default function MealDetail({ meal, open, onClose }: MealDetailProps) {
  const totals = mealTotals(meal);
  const titleId = `meal-detail-${meal.id}`;

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-white/10 bg-surface-container/95 p-5 backdrop-blur-xl">
        <div>
          <p className="text-label-md uppercase text-primary-fixed">
            {meal.type} · {meal.time}
          </p>
          <h2 id={titleId} className="font-headline-md text-[20px] font-bold text-white">
            {meal.name}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary-fixed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            close
          </span>
        </button>
      </div>

      <div className="p-5">
        {/* Totales */}
        <div className="mb-5 grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'kcal', value: totals.calories },
            { label: 'Prot', value: `${totals.proteinG}g` },
            { label: 'Carb', value: `${totals.carbsG}g` },
            { label: 'Gras', value: `${totals.fatG}g` },
          ].map((m) => (
            <div key={m.label} className="rounded-lg bg-surface-container-low/60 py-2">
              <p className="text-[15px] font-bold text-white">{m.value}</p>
              <p className="text-[11px] uppercase text-on-surface-variant">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Ingredientes */}
        <h3 className="mb-2 font-headline-md text-[16px] font-bold text-white">Ingredientes</h3>
        <ul className="divide-y divide-white/5">
          {meal.ingredients.map((ing) => (
            <li key={ing.id} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-body-md text-on-surface">{ing.name}</p>
                <p className="text-[12px] text-on-surface-variant">{ing.quantity}</p>
              </div>
              <p className="shrink-0 text-right text-label-md text-on-surface-variant">
                <span className="font-semibold text-primary-fixed">{ing.calories} kcal</span>
                <br />P {ing.proteinG} · C {ing.carbsG} · G {ing.fatG}
              </p>
            </li>
          ))}
        </ul>

        <NutritionDisclaimer className="mt-5" />
      </div>
    </Modal>
  );
}
