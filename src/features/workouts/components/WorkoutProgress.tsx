import ProgressBar from '@/components/portal/ui/ProgressBar';

interface WorkoutProgressProps {
  completed: number;
  total: number;
  percent: number;
  className?: string;
}

/** Indicador reutilizable del progreso de una rutina. */
export default function WorkoutProgress({
  completed,
  total,
  percent,
  className = '',
}: WorkoutProgressProps) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between text-label-md">
        <span className="text-on-surface-variant">Progreso</span>
        <span className="text-primary-fixed font-semibold">
          {completed}/{total} · {percent}%
        </span>
      </div>
      <ProgressBar value={percent} label={`${completed} de ${total} ejercicios completados`} />
    </div>
  );
}
