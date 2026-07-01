'use client';

import { useState } from 'react';
import Card from '@/components/portal/ui/Card';
import Button from '@/components/portal/ui/Button';

export interface CheckoutPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}

interface MembershipCheckoutProps {
  plans: CheckoutPlan[];
  memberId: string;
}

function formatPrice(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency }).format(amount);
  } catch {
    return `$${amount}`;
  }
}

/** Selección de plan + botón "Pagar cuota" (redirige a Checkout Pro). */
export default function MembershipCheckout({ plans, memberId }: MembershipCheckoutProps) {
  const [selectedId, setSelectedId] = useState(plans[0]?.id ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    if (!selectedId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/payments/mercadopago/preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, planId: selectedId }),
      });
      const data = await res.json();
      if (!res.ok || !data.initPoint) {
        throw new Error(data.error || 'No se pudo iniciar el pago');
      }
      // Redirección a Checkout Pro.
      window.location.href = data.initPoint as string;
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  if (plans.length === 0) {
    return (
      <Card className="p-5">
        <p className="text-on-surface-variant">
          No hay planes disponibles. Verificá la configuración de Supabase y la tabla de planes.
        </p>
      </Card>
    );
  }

  return (
    <div>
      <fieldset className="space-y-3" aria-label="Elegí tu plan mensual">
        {plans.map((plan) => {
          const selected = plan.id === selectedId;
          return (
            <label
              key={plan.id}
              className={`glass-card-3d flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-colors ${
                selected ? 'border-primary-fixed/50' : ''
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={selected}
                onChange={() => setSelectedId(plan.id)}
                className="h-4 w-4 accent-primary-fixed"
              />
              <span className="flex-1">
                <span className="block font-headline-md text-[17px] font-bold text-white">
                  {plan.name}
                </span>
                <span className="block text-label-md text-on-surface-variant">
                  {plan.description}
                </span>
              </span>
              <span className="font-headline-md text-[18px] font-bold text-primary-fixed">
                {formatPrice(plan.price, plan.currency)}
                <span className="text-[12px] text-on-surface-variant font-normal">/mes</span>
              </span>
            </label>
          );
        })}
      </fieldset>

      {error && (
        <p role="alert" className="mt-4 text-label-md text-secondary-container">
          {error}
        </p>
      )}

      <div className="mt-5">
        <Button onClick={handlePay} disabled={loading} icon={loading ? undefined : 'lock'} size="lg" className="w-full">
          {loading ? 'Redirigiendo a Mercado Pago…' : 'Pagar cuota'}
        </Button>
      </div>

      <p className="mt-3 text-[12px] text-on-surface-variant/70">
        Vas a completar el pago en el entorno seguro de Mercado Pago (Checkout Pro).
      </p>
    </div>
  );
}
