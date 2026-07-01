import { ValidationError } from './errors';
import type { CreatePreferenceInput } from '@/features/payments/types';

/** Valida el body de creación de preferencia: solo identificadores internos. */
export function parseCreatePreferenceInput(body: unknown): CreatePreferenceInput {
  if (typeof body !== 'object' || body === null) {
    throw new ValidationError('Body inválido');
  }
  const { memberId, planId } = body as Record<string, unknown>;

  if (typeof memberId !== 'string' || memberId.trim() === '') {
    throw new ValidationError('memberId es requerido');
  }
  if (typeof planId !== 'string' || planId.trim() === '') {
    throw new ValidationError('planId es requerido');
  }
  return { memberId: memberId.trim(), planId: planId.trim() };
}
