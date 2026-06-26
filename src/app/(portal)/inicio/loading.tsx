import Skeleton from '@/components/portal/ui/Skeleton';

/** Skeleton de carga simulado para la pantalla de inicio. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando inicio">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-9 w-48 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Skeleton className="h-52 lg:col-span-2 rounded-xl" />
        <Skeleton className="h-44 rounded-xl" />
        <Skeleton className="h-44 rounded-xl" />
        <Skeleton className="h-24 lg:col-span-2 rounded-xl" />
        <Skeleton className="h-32 lg:col-span-2 rounded-xl" />
      </div>
    </div>
  );
}
