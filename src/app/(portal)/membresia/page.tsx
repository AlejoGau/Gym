import MembershipCheckout, {
  type CheckoutPlan,
} from '@/features/payments/components/MembershipCheckout';
import Card from '@/components/portal/ui/Card';
import { getActivePlans } from '@/features/payments/repository/payments-repository';
import { currentUser } from '@/features/dashboard/data/user';

export const dynamic = 'force-dynamic';

export default async function Page() {
  let plans: CheckoutPlan[] = [];
  let loadError = false;
  try {
    plans = (await getActivePlans()).map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      currency: p.currency,
    }));
  } catch {
    // Env de Supabase ausente o error de conexión: se muestra un aviso.
    loadError = true;
  }

  return (
    <div>
      <header className="mb-5">
        <h1 className="font-display-lg-mobile text-white uppercase tracking-tight">Membresía</h1>
        <p className="text-on-surface-variant text-body-md">
          Pagá tu cuota mensual de forma segura con Mercado Pago.
        </p>
      </header>

      {loadError ? (
        <Card className="p-5">
          <p className="text-on-surface-variant">
            No se pudieron cargar los planes. Configurá las variables de entorno de Supabase en
            <code className="mx-1 rounded bg-surface-container-highest px-1">.env.local</code>y
            corré la migración <code>supabase/migrations/0001_payments.sql</code>.
          </p>
        </Card>
      ) : (
        <MembershipCheckout plans={plans} memberId={currentUser.id} />
      )}
    </div>
  );
}
