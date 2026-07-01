import { NextResponse } from 'next/server';
import { parseCreatePreferenceInput } from '@/features/payments/lib/validation';
import { createPaymentPreference } from '@/features/payments/services/payment-service';
import { NotFoundError, ValidationError } from '@/features/payments/lib/errors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** POST /api/payments/mercadopago/preference  — crea la preferencia de Checkout Pro. */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const input = parseCreatePreferenceInput(body);
    const result = await createPaymentPreference(input);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    console.error('[payments] error creando preferencia:', (error as Error).message);
    return NextResponse.json({ error: 'No se pudo crear la preferencia' }, { status: 500 });
  }
}
