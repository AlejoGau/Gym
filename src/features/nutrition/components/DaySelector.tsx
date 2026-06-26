'use client';

import type { DayPlan } from '@/features/nutrition/types';

interface DaySelectorProps {
  days: DayPlan[];
  selectedId: string;
  onSelect: (dayId: string) => void;
}

/** Selector horizontal de día del plan alimentario. */
export default function DaySelector({ days, selectedId, onSelect }: DaySelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="Seleccionar día"
      className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
    >
      {days.map((day) => {
        const selected = day.id === selectedId;
        return (
          <button
            key={day.id}
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect(day.id)}
            className={`flex shrink-0 flex-col items-center rounded-xl px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed ${
              selected
                ? 'bg-primary-fixed text-on-primary-fixed'
                : 'bg-surface-container-low/70 text-on-surface-variant hover:text-primary-fixed'
            }`}
          >
            <span className="font-bold text-[14px] uppercase">{day.short}</span>
            {day.isToday && (
              <span
                className={`text-[10px] font-semibold uppercase ${
                  selected ? 'text-on-primary-fixed/80' : 'text-primary-fixed'
                }`}
              >
                Hoy
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
