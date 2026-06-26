// Tipos del estado de una sesión de entrenamiento activa (persistida en localStorage).

/** Una serie registrada durante el entrenamiento. */
export interface SetEntry {
  /** Peso ingresado (string para controlar el input; vacío = sin registrar). */
  weightKg: string;
  /** Repeticiones ingresadas. */
  reps: string;
  completed: boolean;
}

/** Estado completo de la sesión activa. */
export interface ActiveWorkoutState {
  workoutId: string;
  /** Timestamp de inicio (ms). */
  startedAt: number;
  /** Índice del ejercicio en curso. */
  currentIndex: number;
  /** Series por ejercicio, indexadas por id de ejercicio. */
  entries: Record<string, SetEntry[]>;
  /** Timestamp de finalización (ms) o null si sigue en curso. */
  finishedAt: number | null;
}
