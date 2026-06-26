import Card from '@/components/portal/ui/Card';
import ProgressBar from '@/components/portal/ui/ProgressBar';
import { percentOf } from '@/features/nutrition/utils/macros';
import type { MacroTotals } from '@/features/nutrition/types';

interface MacroSummaryProps {
  targets: MacroTotals;
  consumed: MacroTotals;
  mealsDone: number;
  mealsTotal: number;
}

function MacroRow({
  label,
  consumed,
  target,
  unit,
}: {
  label: string;
  consumed: number;
  target: number;
  unit: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-label-md">
        <span className="text-on-surface-variant">{label}</span>
        <span className="text-on-surface font-semibold">
          {consumed}
          <span className="text-on-surface-variant font-normal"> / {target} {unit}</span>
        </span>
      </div>
      <ProgressBar value={percentOf(consumed, target)} label={`${label}: ${consumed} de ${target} ${unit}`} />
    </div>
  );
}

/** Resumen del objetivo diario aproximado y el progreso de comidas. */
export default function MacroSummary({ targets, consumed, mealsDone, mealsTotal }: MacroSummaryProps) {
  return (
    <Card highlight className="p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-headline-md text-[18px] font-bold text-white uppercase tracking-tight">
          Objetivo diario
        </h2>
        <span className="flex items-center gap-1.5 text-label-md text-primary-fixed font-semibold">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            restaurant_menu
          </span>
          {mealsDone}/{mealsTotal} comidas
        </span>
      </div>

      <div className="mb-4">
        <p className="text-on-surface-variant text-body-md">
          <span className="text-white font-bold text-[28px]">{consumed.calories}</span>
          <span className="text-[18px]"> / {targets.calories} kcal</span>
        </p>
        <ProgressBar
          value={percentOf(consumed.calories, targets.calories)}
          label={`Calorías: ${consumed.calories} de ${targets.calories}`}
          className="mt-2"
        />
      </div>

      <div className="space-y-3">
        <MacroRow label="Proteínas" consumed={consumed.proteinG} target={targets.proteinG} unit="g" />
        <MacroRow label="Carbohidratos" consumed={consumed.carbsG} target={targets.carbsG} unit="g" />
        <MacroRow label="Grasas" consumed={consumed.fatG} target={targets.fatG} unit="g" />
      </div>
    </Card>
  );
}
