import crypto from 'node:crypto';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { getPaymentsConfig } from '@/features/payments/config';
import type { Plan } from '@/features/payments/types';

/** Crea el cliente del SDK oficial a partir del Access Token (nunca logueado). */
function getClient(): MercadoPagoConfig {
  const { mpAccessToken } = getPaymentsConfig();
  return new MercadoPagoConfig({ accessToken: mpAccessToken });
}

export interface MpPaymentInfo {
  id: string;
  status: string;
  externalReference: string | null;
  amount: number | null;
  currency: string | null;
}

/**
 * Crea una preferencia de Checkout Pro. El precio y la moneda vienen del plan
 * (base de datos), no del frontend.
 */
export async function createCheckoutPreference(params: {
  plan: Plan;
  externalReference: string;
  internalPaymentId: string;
}): Promise<{ preferenceId: string; initPoint: string }> {
  const { plan, externalReference, internalPaymentId } = params;
  const { frontendUrl, webhookUrl } = getPaymentsConfig();

  const base = frontendUrl.replace(/\/$/, '');
  const backBase = `${base}/membresia`;
  const back = (path: string) =>
    `${backBase}/${path}?pid=${encodeURIComponent(internalPaymentId)}`;

  // Mercado Pago rechaza `auto_return` si las back_urls no son https públicas
  // (p. ej. http://localhost). En ese caso se omite y se vuelve con el botón.
  const supportsAutoReturn = base.startsWith('https://');

  const preference = new Preference(getClient());
  const response = await preference.create({
    body: {
      items: [
        {
          id: plan.id,
          title: plan.name,
          description: plan.description || plan.name,
          quantity: 1,
          unit_price: plan.price,
          currency_id: plan.currency,
        },
      ],
      external_reference: externalReference,
      back_urls: {
        success: back('exito'),
        pending: back('pendiente'),
        failure: back('error'),
      },
      ...(supportsAutoReturn ? { auto_return: 'approved' } : {}),
      ...(webhookUrl ? { notification_url: webhookUrl } : {}),
      metadata: { internal_payment_id: internalPaymentId },
    },
  });

  const initPoint = response.init_point ?? response.sandbox_init_point;
  if (!response.id || !initPoint) {
    throw new Error('Mercado Pago no devolvió id/init_point de la preferencia');
  }
  return { preferenceId: response.id, initPoint };
}

/**
 * Consulta un pago directamente en Mercado Pago (fuente de verdad).
 * Devuelve null si no existe.
 */
export async function getMercadoPagoPayment(paymentId: string): Promise<MpPaymentInfo | null> {
  const payment = new Payment(getClient());
  const res = await payment.get({ id: paymentId });
  if (!res || !res.id) return null;
  return {
    id: String(res.id),
    status: res.status ?? 'unknown',
    externalReference: res.external_reference ?? null,
    amount: typeof res.transaction_amount === 'number' ? res.transaction_amount : null,
    currency: res.currency_id ?? null,
  };
}

/**
 * Valida la firma del webhook (header `x-signature`) según la documentación
 * oficial. Solo se aplica si hay `MERCADO_PAGO_WEBHOOK_SECRET` configurado.
 * Manifest: `id:<data.id>;request-id:<x-request-id>;ts:<ts>;`
 */
export function isWebhookSignatureValid(params: {
  dataId: string | null;
  xSignature: string | null;
  xRequestId: string | null;
}): boolean {
  const { webhookSecret } = getPaymentsConfig();
  if (!webhookSecret) return true; // sin secreto configurado, no se exige

  const { dataId, xSignature, xRequestId } = params;
  if (!xSignature || !dataId) return false;

  // x-signature: "ts=1699999999,v1=hexhmac"
  const parts = Object.fromEntries(
    xSignature.split(',').map((kv) => {
      const [k, v] = kv.split('=');
      return [k?.trim(), v?.trim()];
    }),
  );
  const ts = parts['ts'];
  const v1 = parts['v1'];
  if (!ts || !v1) return false;

  const manifest = `id:${dataId};request-id:${xRequestId ?? ''};ts:${ts};`;
  const hmac = crypto.createHmac('sha256', webhookSecret).update(manifest).digest('hex');

  try {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(v1));
  } catch {
    return false;
  }
}
