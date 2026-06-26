import Skeleton from '@/components/portal/ui/Skeleton';

/** Skeleton de carga simulado para la pantalla de entrenamientos. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando entrenamientos">
      <Skeleton className="h-64 rounded-xl mb-8" />
      <Skeleton className="h-6 w-32 mb-3" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
