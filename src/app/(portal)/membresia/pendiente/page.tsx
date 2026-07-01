import { Suspense } from 'react';
import PaymentStatusChecker from '@/features/payments/components/PaymentStatusChecker';
import Skeleton from '@/components/portal/ui/Skeleton';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full rounded-xl" />}>
      <PaymentStatusChecker />
    </Suspense>
  );
}
