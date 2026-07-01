import { randomUUID } from 'node:crypto';
import * as repo from '@/features/payments/repository/payments-repository';
import {
  createCheckoutPreference,
  getMercadoPagoPayment,
} from '@/features/payments/services/mercadopago';
import { getPaymentsConfig } from '@/features/payments/config';
import { NotFoundError, ValidationError } from '@/features/payments/lib/errors';
import type {
  CreatePreferenceInput,
  PreferenceResult,
  Payment,
  ApplyOutcome,
} from '@/features/payments/types';

/**
 * Crea el intento de pago interno y la preferencia de Checkout Pro.
 * El precio/moneda se obtienen del plan en la base (nunca del frontend).
 */
export async function createPaymentPreference(
  input: CreatePreferenceInput,
): Promise<PreferenceResult> {
  const { businessId } = getPaymentsConfig();

  const plan = await repo.getPlanById(input.planId);
  if (!plan || !plan.active) {
    throw new NotFoundError('Plan no encontrado o inactivo');
  }
  if (plan.price <= 0) {
    throw new ValidationError('El plan no tiene un precio válido');
  }

  const externalReference = randomUUID();
  const payment = await repo.createPaymentIntent({
    businessId,
    memberId: input.memberId,
    planId: plan.id,
    externalReference,
    amount: plan.price,
    currency: plan.currency,
  });

  const { preferenceId, initPoint } = await createCheckoutPreference({
    plan,
    externalReference,
    internalPaymentId: payment.id,
  });

  return {
    paymentId: payment.id,
    externalReference,
    preferenceId,
    initPoint,
  };
}

/**
 * Procesa una notificación consultando el pago EN Mercado Pago (fuente de
 * verdad) y aplicándolo de forma idempotente. Devuelve el resultado.
 */
export async function processPaymentNotification(
  mpPaymentId: string,
): Promise<ApplyOutcome> {
  const mp = await getMercadoPagoPayment(mpPaymentId);
  if (!mp) return 'not_found';
  if (!mp.externalReference || mp.amount === null || !mp.currency) {
    // Sin datos suficientes para validar; no se aplica.
    return 'ignored';
  }

  return repo.applyMercadoPagoPayment({
    externalReference: mp.externalReference,
    providerPaymentId: mp.id,
    mpStatus: mp.status,
    amount: mp.amount,
    currency: mp.currency,
    raw: mp,
  });
}

/** DTO público del estado de un pago (sin datos sensibles). */
export interface PaymentStatusDTO {
  id: string;
  status: Payment['status'];
  amount: number;
  currency: string;
  planId: string;
  approvedAt: string | null;
}

function toDTO(p: Payment): PaymentStatusDTO {
  return {
    id: p.id,
    status: p.status,
    amount: p.amount,
    currency: p.currency,
    planId: p.planId,
    approvedAt: p.approvedAt,
  };
}

/**
 * Devuelve el estado real del pago desde la base (fuente de verdad).
 * Si se pasa `mpPaymentId` y el pago aún no está aprobado, primero re-verifica
 * contra Mercado Pago (útil en desarrollo, sin webhook público). El estado NO
 * se deriva de la URL: siempre se consulta el pago en MP.
 */
export async function getPaymentStatus(
  paymentId: string,
  opts?: { mpPaymentId?: string | null },
): Promise<PaymentStatusDTO | null> {
  let payment = await repo.getPaymentById(paymentId);
  if (!payment) return null;

  const mpPaymentId = opts?.mpPaymentId;
  if (mpPaymentId && payment.status !== 'APPROVED') {
    // Re-verifica con MP; el RPC valida que el external_reference coincida.
    await processPaymentNotification(mpPaymentId);
    payment = (await repo.getPaymentById(paymentId)) ?? payment;
  }

  return toDTO(payment);
}
