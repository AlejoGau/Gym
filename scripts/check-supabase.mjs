// Verifica la conexión a Supabase y que la migración de pagos esté aplicada.
// Uso:  node --env-file=.env.local scripts/check-supabase.mjs
// No imprime credenciales.

import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

function fail(msg) {
  console.error('❌ ' + msg);
  process.exit(1);
}

if (!url || url.includes('TU-PROYECTO')) fail('SUPABASE_URL no está configurada en .env.local');
if (!key || key.includes('PEGAR_')) fail('SUPABASE_SERVICE_ROLE_KEY no está configurada en .env.local');

const supabase = createClient(url, key, { auth: { persistSession: false } });

console.log('→ Conectando a Supabase…');

// 1) Tabla plans + seed
const { data: plans, error: plansErr } = await supabase
  .from('plans')
  .select('id, name, price, currency')
  .order('price', { ascending: true });

if (plansErr) {
  fail(`No se pudo leer la tabla "plans": ${plansErr.message}\n   ¿Corriste supabase/migrations/0001_payments.sql?`);
}
console.log(`✅ Conexión OK. Planes encontrados: ${plans.length}`);
for (const p of plans) console.log(`   • ${p.name} — ${p.price} ${p.currency}`);
if (plans.length === 0) console.log('   ⚠️  No hay planes: revisá el seed de la migración.');

// 2) Tabla payments accesible
const { error: payErr } = await supabase.from('payments').select('id').limit(1);
if (payErr) fail(`No se pudo leer la tabla "payments": ${payErr.message}`);
console.log('✅ Tabla "payments" accesible.');

// 3) Función RPC idempotente (llamada inocua: no matchea ninguna fila -> not_found)
const { data: rpc, error: rpcErr } = await supabase.rpc('mp_apply_payment', {
  p_external_reference: '__connection_test__',
  p_provider_payment_id: null,
  p_mp_status: 'pending',
  p_amount: 0,
  p_currency: 'ARS',
  p_raw: {},
});
if (rpcErr) fail(`La función "mp_apply_payment" no existe o falló: ${rpcErr.message}`);
console.log(`✅ RPC "mp_apply_payment" OK (respuesta: ${rpc}).`);

console.log('\n🎉 Supabase está conectado y la migración está aplicada.');
