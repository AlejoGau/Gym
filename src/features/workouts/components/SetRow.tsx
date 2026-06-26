'use client';

import type { SetEntry } from '@/features/workouts/types/session';

interface SetRowProps {
  exerciseId: string;
  index: number;
  entry: SetEntry;
  /** Reps objetivo (placeholder de ayuda). */
  targetReps: string;
  onChange: (patch: Partial<SetEntry>) => void;
  onToggle: () => void;
}

/** Fila de una serie: registrar peso, repeticiones y marcarla como completada. */
export default function SetRow({
  exerciseId,
  index,
  entry,
  targetReps,
  onChange,
  onToggle,
}: SetRowProps) {
  const weightId = `set-${exerciseId}-${index}-weight`;
  const repsId = `set-${exerciseId}-${index}-reps`;

  return (
    <div
      className={`grid grid-cols-[auto_1fr_1fr_auto] items-end gap-3 rounded-lg p-3 transition-colors ${
        entry.completed ? 'bg-primary-fixed/10' : 'bg-surface-container-low/60'
      }`}
    >
      {/* Número de serie */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] text-on-surface-variant uppercase">Serie</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-highest text-white font-bold text-[14px]">
          {index + 1}
        </span>
      </div>

      {/* Peso */}
      <div className="flex flex-col gap-1">
        <label htmlFor={weightId} className="text-[11px] text-on-surface-variant uppercase">
          Peso (kg)
        </label>
        <input
          id={weightId}
          type="number"
          inputMode="decimal"
          min={0}
          step="0.5"
          value={entry.weightKg}
          onChange={(e) => onChange({ weightKg: e.target.value })}
          placeholder="0"
          className="w-full rounded-lg bg-surface-container-lowest border border-outline-variant px-2.5 py-2 text-on-surface text-center text-[16px] focus:border-primary-fixed focus:outline-none"
        />
      </div>

      {/* Repeticiones */}
      <div className="flex flex-col gap-1">
        <label htmlFor={repsId} className="text-[11px] text-on-surface-variant uppercase">
          Reps
        </label>
        <input
          id={repsId}
          type="number"
          inputMode="numeric"
          min={0}
          step="1"
          value={entry.reps}
          onChange={(e) => onChange({ reps: e.target.value })}
          placeholder={targetReps}
          className="w-full rounded-lg bg-surface-container-lowest border border-outline-variant px-2.5 py-2 text-on-surface text-center text-[16px] focus:border-primary-fixed focus:outline-none"
        />
      </div>

      {/* Completar */}
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={entry.completed}
        aria-label={entry.completed ? `Serie ${index + 1} completada` : `Marcar serie ${index + 1} como completada`}
        className={`flex h-11 w-11 items-center justify-center rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed ${
          entry.completed
            ? 'bg-primary-fixed text-on-primary-fixed'
            : 'border border-outline-variant text-on-surface-variant hover:border-primary-fixed hover:text-primary-fixed'
        }`}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          {entry.completed ? 'check' : 'radio_button_unchecked'}
        </span>
      </button>
    </div>
  );
}
