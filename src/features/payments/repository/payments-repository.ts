import { getSupabaseAdmin } from '@/lib/supabase/server';
import type { Payment, Plan, PaymentStatus, ApplyOutcome } from '@/features/payments/types';

// ── Mapeo snake_case (DB) -> camelCase (dominio) ───────────────────────────
interface PaymentRow {
  id: string;
  business_id: string;
  member_id: string;
  plan_id: string;
  provider: string;
  provider_payment_id: string | null;
  external_reference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  created_at: string;
  approved_at: string | null;
}

function mapPayment(row: PaymentRow): Payment {
  return {
    id: row.id,
    businessId: row.business_id,
    memberId: row.member_id,
    planId: row.plan_id,
    provider: row.provider,
    providerPaymentId: row.provider_payment_id,
    externalReference: row.external_reference,
    amount: Number(row.amount),
    currency: row.currency,
    status: row.status,
    createdAt: row.created_at,
    approvedAt: row.approved_at,
  };
}

interface PlanRow {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  active: boolean;
}

function mapPlan(row: PlanRow): Plan {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    currency: row.currency,
    active: row.active,
  };
}

// ── Planes ─────────────────────────────────────────────────────────────────
export async function getPlanById(planId: string): Promise<Plan | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', planId)
    .maybeSingle();
  if (error) throw new Error(`Error consultando plan: ${error.message}`);
  return data ? mapPlan(data as PlanRow) : null;
}

export async function getActivePlans(): Promise<Plan[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('active', true)
    .order('price', { ascending: true });
  if (error) throw new Error(`Error listando planes: ${error.message}`);
  return (data as PlanRow[]).map(mapPlan);
}

// ── Pagos ────────────────────────────────────────────────────────────────
export async function createPaymentIntent(input: {
  businessId: string;
  memberId: string;
  planId: string;
  externalReference: string;
  amount: number;
  currency: string;
}): Promise<Payment> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('payments')
    .insert({
      business_id: input.businessId,
      member_id: input.memberId,
      plan_id: input.planId,
      external_reference: input.externalReference,
      amount: input.amount,
      currency: input.currency,
      status: 'PENDING',
    })
    .select('*')
    .single();
  if (error) throw new Error(`Error creando intento de pago: ${error.message}`);
  return mapPayment(data as PaymentRow);
}

export async function getPaymentById(id: string): Promise<Payment | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(`Error consultando pago: ${error.message}`);
  return data ? mapPayment(data as PaymentRow) : null;
}

/**
 * Aplica el estado de un pago de Mercado Pago de forma idempotente y
 * transaccional mediante la función `mp_apply_payment`. Solo la primera
 * transición a APPROVED activa/renueva la membresía.
 */
export async function applyMercadoPagoPayment(input: {
  externalReference: string;
  providerPaymentId: string;
  mpStatus: string;
  amount: number;
  currency: string;
  raw: unknown;
}): Promise<ApplyOutcome> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc('mp_apply_payment', {
    p_external_reference: input.externalReference,
    p_provider_payment_id: input.providerPaymentId,
    p_mp_status: input.mpStatus,
    p_amount: input.amount,
    p_currency: input.currency,
    p_raw: input.raw,
  });
  if (error) throw new Error(`Error aplicando pago: ${error.message}`);
  return (data as ApplyOutcome) ?? 'ignored';
}
