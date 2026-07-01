// Tipos del dominio de pagos.

/** Estados internos del pago (fuente de verdad en la DB). */
export type PaymentStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'IN_PROCESS'
  | 'REFUNDED';

/** Plan cobrable. El precio proviene SIEMPRE de la base, nunca del frontend. */
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  active: boolean;
}

/** Registro de un intento de pago. */
export interface Payment {
  id: string;
  businessId: string;
  memberId: string;
  planId: string;
  provider: string;
  providerPaymentId: string | null;
  externalReference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
  approvedAt: string | null;
}

/** Resultado de crear una preferencia (lo que consume el frontend). */
export interface PreferenceResult {
  paymentId: string;
  externalReference: string;
  preferenceId: string;
  initPoint: string;
}

/** Entrada para crear una preferencia: solo identificadores internos. */
export interface CreatePreferenceInput {
  memberId: string;
  planId: string;
}

/** Resultado de aplicar una notificación (idempotente). */
export type ApplyOutcome =
  | 'not_found'
  | 'amount_mismatch'
  | 'already_approved'
  | 'approved'
  | 'updated'
  | 'ignored';
