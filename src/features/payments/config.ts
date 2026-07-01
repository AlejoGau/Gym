/**
 * Configuración de pagos leída de variables de entorno.
 * Se lee dentro de funciones (no en el top-level) para no romper el build
 * cuando las variables no están presentes.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}

export function getPaymentsConfig() {
  return {
    /** Access Token de Mercado Pago (SECRETO, solo backend). */
    mpAccessToken: required('MERCADO_PAGO_ACCESS_TOKEN'),
    /** URL pública del webhook (debe ser accesible por Mercado Pago). */
    webhookUrl: process.env.MERCADO_PAGO_WEBHOOK_URL || '',
    /** Base del frontend para las back_urls. */
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    /** Secreto opcional para validar la firma del webhook (x-signature). */
    webhookSecret: process.env.MERCADO_PAGO_WEBHOOK_SECRET || '',
    /** Identificador del negocio (multi-tenant simple). */
    businessId: process.env.BUSINESS_ID || 'default-business',
  };
}
