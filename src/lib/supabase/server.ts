import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Cliente Supabase con la **service_role key**. Uso EXCLUSIVO del backend
 * (Route Handlers / servicios). Nunca importar desde componentes de cliente:
 * la service key otorga acceso total y jamás debe llegar al navegador.
 */
let cached: SupabaseClient | null = null;

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;
  const url = required('SUPABASE_URL');
  const serviceKey = required('SUPABASE_SERVICE_ROLE_KEY');
  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
