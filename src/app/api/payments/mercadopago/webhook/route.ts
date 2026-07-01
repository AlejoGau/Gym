import { NextResponse } from 'next/server';
import { processPaymentNotification } from '@/features/payments/services/payment-service';
import { isWebhookSignatureValid } from '@/features/payments/services/mercadopago';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/payments/mercadopago/webhook
 *
 * Recibe la notificación de Mercado Pago. Extrae el id del pago, consulta el
 * pago EN Mercado Pago (fuente de verdad) y lo aplica de forma idempotente.
 * No confía en el estado que venga en la notificación ni en la URL.
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const body = (await request.json().catch(() => null)) as
    | { type?: string; action?: string; data?: { id?: string | number } }
    | null;

  // El tipo/id puede venir por body o por query, según el formato de MP.
  const type =
    body?.type ??
    body?.action?.split('.')[0] ??
    url.searchParams.get('type') ??
    url.searchParams.get('topic');
  const dataId =
    (body?.data?.id != null ? String(body.data.id) : null) ??
    url.searchParams.get('data.id') ??
    url.searchParams.get('id');

  // Validación opcional de firma (si hay secreto configurado).
  const signatureOk = isWebhookSignatureValid({
    dataId,
    xSignature: request.headers.get('x-signature'),
    xRequestId: request.headers.get('x-request-id'),
  });
  if (!signatureOk) {
    console.warn('[webhook] firma inválida');
    return NextResponse.json({ error: 'firma inválida' }, { status: 401 });
  }

  // Solo procesamos notificaciones de pago; el resto se ignora con 200.
  if (type !== 'payment' || !dataId) {
    return NextResponse.json({ received: true });
  }

  try {
    const outcome = await processPaymentNotification(dataId);
    // No se loguean datos sensibles, solo el resultado del procesamiento.
    console.info(`[webhook] pago ${dataId}: ${outcome}`);
    return NextResponse.json({ received: true, outcome });
  } catch (error) {
    // Error técnico: 500 para que MP reintente (el procesamiento es idempotente).
    console.error('[webhook] error procesando notificación:', (error as Error).message);
    return NextResponse.json({ error: 'error interno' }, { status: 500 });
  }
}
