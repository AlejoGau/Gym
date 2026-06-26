import { Suspense } from 'react';
import ActiveWorkoutPage from '@/features/workouts/pages/ActiveWorkoutPage';
import Skeleton from '@/components/portal/ui/Skeleton';

function Fallback() {
  return (
    <div aria-busy="true" aria-label="Cargando entrenamiento">
      <Skeleton className="h-12 w-full mb-4" />
      <Skeleton className="h-40 w-full rounded-xl mb-4" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}

export default function Page() {
  // useSearchParams (en ActiveWorkoutPage) requiere un límite de Suspense.
  return (
    <Suspense fallback={<Fallback />}>
      <ActiveWorkoutPage />
    </Suspense>
  );
}
