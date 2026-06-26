interface SkeletonProps {
  className?: string;
}

/**
 * Bloque de carga simulado. La animación es un pulso suave para respetar la
 * pauta de "evitar animaciones excesivas".
 */
export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-surface-container-highest/60 ${className}`}
    />
  );
}
