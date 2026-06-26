'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';

const STORAGE_KEY = 'forge:meal-progress';

type ProgressMap = Record<string, string[]>; // dayId -> mealIds realizadas

// Referencia estable para el valor inicial (requisito de useLocalStorage).
const EMPTY: ProgressMap = {};

/**
 * Registra qué comidas marcó el usuario como realizadas, por día, en
 * localStorage. No hay backend: es estado temporal del navegador.
 */
export function useMealProgress(dayId: string) {
  const [map, setMap, hydrated] = useLocalStorage<ProgressMap>(STORAGE_KEY, EMPTY);

  const doneIds = useMemo(() => map[dayId] ?? [], [map, dayId]);

  const isDone = useCallback((mealId: string) => doneIds.includes(mealId), [doneIds]);

  const toggleMeal = useCallback(
    (mealId: string) => {
      setMap((prev) => {
        const current = prev[dayId] ?? [];
        const next = current.includes(mealId)
          ? current.filter((id) => id !== mealId)
          : [...current, mealId];
        return { ...prev, [dayId]: next };
      });
    },
    [setMap, dayId],
  );

  return { hydrated, doneIds, isDone, toggleMeal };
}
