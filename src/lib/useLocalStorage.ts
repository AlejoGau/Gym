'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

/**
 * Estado sincronizado con localStorage mediante `useSyncExternalStore`.
 * - SSR-safe: en el servidor (y en el primer render del cliente) devuelve `initial`.
 * - `hydrated` indica si ya se leyó el valor real del navegador.
 *
 * `initial` debe ser una referencia estable (constante de módulo o `useMemo`).
 */

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', callback);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', callback);
    }
  };
}

/** Notifica a los suscriptores de la misma pestaña (storage event sólo cruza pestañas). */
function notify() {
  listeners.forEach((l) => l());
}

function getRaw(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parse<T>(raw: string | null, initial: T): T {
  if (raw == null) return initial;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return initial;
  }
}

export function useLocalStorage<T>(key: string, initial: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => getRaw(key),
    () => null,
  );

  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const value = useMemo<T>(() => parse(raw, initial), [raw, initial]);

  const setValue = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const prev = parse(getRaw(key), initial);
      const next =
        typeof updater === 'function' ? (updater as (p: T) => T)(prev) : updater;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* almacenamiento no disponible: se ignora */
      }
      notify();
    },
    [key, initial],
  );

  return [value, setValue, hydrated] as const;
}
