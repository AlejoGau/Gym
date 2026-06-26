import type { Exercise } from '@/features/workouts/types';

interface ExerciseImageProps {
  exercise: Pick<Exercise, 'name' | 'images' | 'icon'>;
  /**
   * Si es true y hay 2+ frames estáticos, anima la demostración con crossfade.
   * Los GIFs ya están animados, así que no requieren este flag.
   */
  animated?: boolean;
  className?: string;
}

/**
 * Demostración del ejercicio. Muestra el GIF (maniquí) sobre un fondo claro que
 * se integra con el fondo blanco del GIF. Si hay 2+ imágenes estáticas y
 * `animated`, hace crossfade. Sin imágenes, usa un placeholder con ícono.
 */
export default function ExerciseImage({
  exercise,
  animated = false,
  className = '',
}: ExerciseImageProps) {
  const frames = exercise.images ?? [];
  const canAnimate = animated && frames.length >= 2;

  if (frames.length === 0) {
    return (
      <div
        role="img"
        aria-label={exercise.name}
        className={`flex items-center justify-center bg-surface-container-low ${className}`}
      >
        <span
          className="material-symbols-outlined text-[32px] text-on-surface-variant/50"
          aria-hidden="true"
        >
          {exercise.icon}
        </span>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={exercise.name}
      className={`relative overflow-hidden bg-white ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frames[0]}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain"
      />
      {canAnimate && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={frames[1]}
          alt=""
          aria-hidden="true"
          className="exercise-frame-anim absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  );
}
