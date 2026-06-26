// Tipos del dominio de entrenamientos. Datos 100% mock, sin backend.

export type MuscleGroup =
  | 'Pecho'
  | 'Espalda'
  | 'Piernas'
  | 'Hombros'
  | 'Bíceps'
  | 'Tríceps'
  | 'Core'
  | 'Glúteos'
  | 'Cuerpo completo';

export type Weekday =
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado'
  | 'Domingo';

/** Un ejercicio dentro de una rutina, con sus parámetros prescriptos. */
export interface Exercise {
  id: string;
  name: string;
  /**
   * Frames locales del ejercicio (posición inicial y final). Con 2+ frames se
   * puede animar la demostración; con 0 se usa el fallback con ícono.
   */
  images: string[];
  /** Ícono de Material Symbols usado como fallback visual cuando no hay imagen. */
  icon: string;
  primaryMuscle: MuscleGroup;
  /** Cantidad de series prescriptas. */
  sets: number;
  /** Repeticiones objetivo por serie (ej. "8-12" o "12"). */
  reps: string;
  /** Descanso sugerido entre series, en segundos. */
  restSeconds: number;
  /** Peso usado la última vez (kg). null si nunca se registró. */
  previousWeightKg: number | null;
  /** Pasos para ejecutar la técnica correctamente. */
  technique: string[];
}

/** Una rutina completa de un día. */
export interface Workout {
  id: string;
  name: string;
  day: Weekday;
  /** Duración estimada en minutos. */
  estimatedMinutes: number;
  /** Grupo muscular principal del día. */
  focus: string;
  exercises: Exercise[];
}

export type SessionStatus = 'completada' | 'en-progreso' | 'pendiente';

/** Registro histórico de una sesión de entrenamiento. */
export interface WorkoutSession {
  id: string;
  workoutId: string;
  workoutName: string;
  /** Fecha en formato ISO (YYYY-MM-DD). */
  date: string;
  status: SessionStatus;
  completedExercises: number;
  totalExercises: number;
  durationMinutes: number;
}
