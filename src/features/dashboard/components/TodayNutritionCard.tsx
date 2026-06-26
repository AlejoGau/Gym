import Card from '@/components/portal/ui/Card';
import SectionTitle from '@/components/portal/ui/SectionTitle';
import ProgressBar from '@/components/portal/ui/ProgressBar';
import Button from '@/components/portal/ui/Button';
import type { TodayNutritionSummary } from '@/features/dashboard/types';

interface TodayNutritionCardProps {
  nutrition: TodayNutritionSummary;
}

function Macro({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-surface-container-low/60 py-2">
      <span className="text-white font-bold text-[16px]">
        {value}
        <span className="text-[11px] text-on-surface-variant font-normal">{unit}</span>
      </span>
      <span className="text-[11px] text-on-surface-variant uppercase tracking-wide">{label}</span>
    </div>
  );
}

/** Tarjeta resumen del plan alimentario de hoy. */
export default function TodayNutritionCard({ nutrition }: TodayNutritionCardProps) {
  const { caloriesConsumed, caloriesTarget, proteinG, carbsG, fatG, mealsDone, mealsTotal } =
    nutrition;
  const percent = caloriesTarget === 0 ? 0 : (caloriesConsumed / caloriesTarget) * 100;

  return (
    <Card className="p-5">
      <SectionTitle
        icon="restaurant"
        action={
          <span className="text-label-md text-on-surface-variant">
            {mealsDone}/{mealsTotal} comidas
          </span>
        }
      >
        Plan de hoy
      </SectionTitle>

      <div className="flex items-end justify-between mb-2">
        <p className="text-on-surface-variant text-body-md">
          <span className="text-white font-bold text-[22px]">{caloriesConsumed}</span> /{' '}
          {caloriesTarget} kcal
        </p>
      </div>
      <ProgressBar value={percent} label="Calorías consumidas respecto al objetivo" />

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Macro label="Proteínas" value={proteinG} unit="g" />
        <Macro label="Carbos" value={carbsG} unit="g" />
        <Macro label="Grasas" value={fatG} unit="g" />
      </div>

      <p className="mt-3 text-[11px] text-on-surface-variant/70 leading-snug">
        Valores aproximados. Un plan personalizado debe ser revisado por un profesional.
      </p>

      <div className="mt-4">
        <Button href="/alimentacion" variant="secondary" className="w-full">
          Ver alimentación
        </Button>
      </div>
    </Card>
  );
}
