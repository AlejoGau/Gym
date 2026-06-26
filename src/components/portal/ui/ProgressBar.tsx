interface ProgressBarProps {
  /** Valor de progreso entre 0 y 100. */
  value: number;
  /** Etiqueta accesible de la barra. */
  label: string;
  className?: string;
}

/** Barra de progreso accesible con el color de acento de la marca. */
export default function ProgressBar({ value, label, className = '' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-2 w-full rounded-full bg-surface-container-highest overflow-hidden ${className}`}
    >
      <div
        className="h-full rounded-full bg-primary-fixed transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
