import { NextResponse } from 'next/server';
import { getPaymentStatus } from '@/features/payments/services/payment-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/payments/:paymentId  — estado real del pago (fuente de verdad: DB,
 * que se actualiza consultando Mercado Pago). Acepta `?mpPaymentId=` para
 * re-verificar contra MP en desarrollo (sin webhook público).
 */
export async function GET(
  request: Request,
  ctx: { params: Promise<{ paymentId: string }> },
) {
  try {
    const { paymentId } = await ctx.params;
    const mpPaymentId = new URL(request.url).searchParams.get('mpPaymentId');

    const dto = await getPaymentStatus(paymentId, { mpPaymentId });
    if (!dto) {
      return NextResponse.json({ error: 'Pago no encontrado' }, { status: 404 });
    }
    return NextResponse.json(dto);
  } catch (error) {
    console.error('[payments] error consultando pago:', (error as Error).message);
    return NextResponse.json({ error: 'No se pudo consultar el pago' }, { status: 500 });
  }
}
