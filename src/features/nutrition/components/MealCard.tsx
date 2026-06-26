'use client';

import { useState } from 'react';
import MealDetail from './MealDetail';
import { mealTotals } from '@/features/nutrition/utils/macros';
import type { Meal } from '@/features/nutrition/types';

interface MealCardProps {
  meal: Meal;
  done: boolean;
  onToggle: () => void;
}

/** Tarjeta de una comida dentro del plan del día. */
export default function MealCard({ meal, done, onToggle }: MealCardProps) {
  const [detailOpen, setDetailOpen] = useState(false);
  const totals = mealTotals(meal);
  const ingredientNames = meal.ingredients.map((i) => i.name).join(', ');

  return (
    <article
      className={`glass-card-3d rounded-xl p-4 transition-colors ${
        done ? 'border-primary-fixed/40' : ''
      }`}
    >
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-fixed/15">
          <span className="material-symbols-outlined text-primary-fixed text-[24px]" aria-hidden="true">
            {meal.icon}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-label-md text-on-surface-variant uppercase">
              {meal.type} · {meal.time}
            </p>
            {done && (
              <span className="flex items-center gap-1 text-[11px] text-primary-fixed font-semibold uppercase">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  check_circle
                </span>
                Realizada
              </span>
            )}
          </div>
          <h3 className="font-headline-md text-[17px] font-bold text-white leading-tight">
            {meal.name}
          </h3>
          <p className="text-[12px] text-on-surface-variant line-clamp-1 mt-0.5">{ingredientNames}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-label-md text-on-surface-variant">
        <span className="text-primary-fixed font-semibold">{totals.calories} kcal</span>
        <span>P {totals.proteinG}g</span>
        <span>C {totals.carbsG}g</span>
        <span>G {totals.fatG}g</span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setDetailOpen(true)}
          aria-haspopup="dialog"
          className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant px-3 py-2 text-label-md text-on-surface-variant hover:text-primary-fixed hover:border-primary-fixed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            visibility
          </span>
          Ver detalle
        </button>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={done}
          className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-label-md font-bold uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            done
              ? 'border border-primary-fixed text-primary-fixed'
              : 'bg-primary-fixed text-on-primary-fixed hover:brightness-110'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            {done ? 'undo' : 'check'}
          </span>
          {done ? 'Deshacer' : 'Marcar realizada'}
        </button>
      </div>

      <MealDetail meal={meal} open={detailOpen} onClose={() => setDetailOpen(false)} />
    </article>
  );
}
