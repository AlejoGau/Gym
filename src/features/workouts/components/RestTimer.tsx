'use client';

import { useEffect, useRef, useState } from 'react';

interface RestTimerProps {
  /** Descanso sugerido en segundos para el ejercicio actual. */
  defaultSeconds: number;
}

function mmss(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Cronómetro de descanso entre series. */
export default function RestTimer({ defaultSeconds }: RestTimerProps) {
  const [remaining, setRemaining] = useState(defaultSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // El reinicio al cambiar de ejercicio se logra remontando el componente
  // (`key` en el padre), así no hace falta sincronizar estado en un efecto.
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const finished = remaining === 0;
  const percent = defaultSeconds === 0 ? 0 : (remaining / defaultSeconds) * 100;

  const start = () => {
    if (finished) setRemaining(defaultSeconds);
    setRunning(true);
  };
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRemaining(defaultSeconds);
  };
  const addTime = () => setRemaining((r) => r + 15);

  return (
    <section
      aria-label="Cronómetro de descanso"
      className="glass-card-3d rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="flex items-center gap-1.5 text-label-md text-on-surface-variant uppercase">
          <span className="material-symbols-outlined text-[18px] text-primary-fixed" aria-hidden="true">
            timer
          </span>
          Descanso
        </p>
        <p
          className={`font-display-lg-mobile tabular-nums ${
            finished ? 'text-primary-fixed' : 'text-white'
          }`}
          aria-live="polite"
        >
          {finished ? '¡Listo!' : mmss(remaining)}
        </p>
      </div>

      <div
        className="h-1.5 w-full rounded-full bg-surface-container-highest overflow-hidden mb-4"
        role="progressbar"
        aria-label="Tiempo de descanso restante"
        aria-valuenow={remaining}
        aria-valuemin={0}
        aria-valuemax={defaultSeconds}
      >
        <div
          className="h-full rounded-full bg-primary-fixed transition-[width] duration-1000 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {running ? (
          <button
            type="button"
            onClick={pause}
            className="col-span-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary-fixed text-primary-fixed py-2.5 text-label-md font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">pause</span>
            Pausar
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            className="col-span-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed py-2.5 text-label-md font-bold uppercase hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">play_arrow</span>
            {finished ? 'Reiniciar' : 'Iniciar'}
          </button>
        )}
        <button
          type="button"
          onClick={addTime}
          className="inline-flex items-center justify-center gap-1 rounded-lg border border-outline-variant text-on-surface-variant py-2.5 text-label-md hover:text-primary-fixed hover:border-primary-fixed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
        >
          +15s
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Reiniciar cronómetro"
          className="inline-flex items-center justify-center gap-1 rounded-lg border border-outline-variant text-on-surface-variant py-2.5 text-label-md hover:text-primary-fixed hover:border-primary-fixed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">restart_alt</span>
        </button>
      </div>
    </section>
  );
}
