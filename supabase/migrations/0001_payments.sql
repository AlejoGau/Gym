-- Migración: pagos con Mercado Pago Checkout Pro (pago único).
-- Correr en Supabase (SQL Editor) o con la CLI: `supabase db push`.
--
-- Diseño clave:
--  * external_reference y provider_payment_id son ÚNICOS -> evitan duplicados.
--  * mp_apply_payment() aplica el estado de forma idempotente y transaccional:
--    solo la PRIMERA transición a APPROVED activa/renueva la membresía.
--  * RLS activado sin políticas: solo la service_role (backend) accede.
--    El frontend nunca toca estas tablas directamente.

create extension if not exists pgcrypto;

-- ── Planes (fuente de verdad del precio; el front NUNCA envía el precio) ────
create table if not exists public.plans (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  description text        not null default '',
  price       numeric(12,2) not null check (price >= 0),
  currency    text        not null default 'ARS',
  active      boolean     not null default true,
  created_at  timestamptz not null default now()
);

-- ── Pagos (un registro por intento de pago) ────────────────────────────────
create table if not exists public.payments (
  id                  uuid primary key default gen_random_uuid(),
  business_id         text        not null default 'default-business',
  member_id           text        not null,
  plan_id             uuid        not null references public.plans(id),
  provider            text        not null default 'mercadopago',
  provider_payment_id text        unique,               -- único cuando existe (multiples NULL permitidos)
  external_reference  text        not null unique,       -- id interno del intento
  amount              numeric(12,2) not null check (amount >= 0),
  currency            text        not null default 'ARS',
  status              text        not null default 'PENDING'
                        check (status in ('PENDING','APPROVED','REJECTED','CANCELLED','IN_PROCESS','REFUNDED')),
  created_at          timestamptz not null default now(),
  approved_at         timestamptz,
  raw_response        jsonb
);

create index if not exists payments_member_idx on public.payments(member_id);

-- ── Membresías (activación/renovación al aprobarse un pago) ─────────────────
create table if not exists public.memberships (
  id              uuid primary key default gen_random_uuid(),
  member_id       text        not null unique,
  plan_id         uuid        references public.plans(id),
  status          text        not null default 'active',
  starts_at       timestamptz not null default now(),
  expires_at      timestamptz,
  last_payment_id uuid        references public.payments(id),
  updated_at      timestamptz not null default now()
);

-- ── RLS: bloquear acceso público; solo la service_role (backend) opera ──────
alter table public.plans       enable row level security;
alter table public.payments    enable row level security;
alter table public.memberships enable row level security;

-- ── Función idempotente y transaccional para aplicar un pago de MP ──────────
-- Devuelve: 'not_found' | 'amount_mismatch' | 'already_approved' | 'approved' | 'updated'
create or replace function public.mp_apply_payment(
  p_external_reference  text,
  p_provider_payment_id text,
  p_mp_status           text,
  p_amount              numeric,
  p_currency            text,
  p_raw                 jsonb
) returns text
language plpgsql
as $$
declare
  rec            public.payments%rowtype;
  v_internal     text;
begin
  -- Bloquea la fila del intento para serializar webhooks concurrentes.
  select * into rec from public.payments
    where external_reference = p_external_reference
    for update;

  if not found then
    return 'not_found';
  end if;

  -- Mapea el estado de Mercado Pago al estado interno.
  v_internal := case lower(coalesce(p_mp_status, ''))
    when 'approved'    then 'APPROVED'
    when 'pending'     then 'PENDING'
    when 'in_process'  then 'IN_PROCESS'
    when 'authorized'  then 'IN_PROCESS'
    when 'rejected'    then 'REJECTED'
    when 'cancelled'   then 'CANCELLED'
    when 'refunded'    then 'REFUNDED'
    when 'charged_back' then 'REFUNDED'
    else 'PENDING'
  end;

  if v_internal = 'APPROVED' then
    -- Validar importe y moneda antes de aprobar (evita manipulación).
    if p_amount is distinct from rec.amount
       or upper(coalesce(p_currency,'')) <> upper(rec.currency) then
      return 'amount_mismatch';
    end if;

    -- Idempotencia: si ya estaba aprobado, NO se reactiva la membresía.
    if rec.status = 'APPROVED' then
      return 'already_approved';
    end if;

    update public.payments set
      status              = 'APPROVED',
      approved_at         = now(),
      provider_payment_id = coalesce(p_provider_payment_id, provider_payment_id),
      raw_response        = p_raw
    where id = rec.id;

    -- Activar o renovar la membresía (extiende un mes desde hoy o desde el vencimiento).
    insert into public.memberships (member_id, plan_id, status, starts_at, expires_at, last_payment_id, updated_at)
    values (rec.member_id, rec.plan_id, 'active', now(), now() + interval '1 month', rec.id, now())
    on conflict (member_id) do update set
      plan_id         = excluded.plan_id,
      status          = 'active',
      expires_at      = greatest(coalesce(public.memberships.expires_at, now()), now()) + interval '1 month',
      last_payment_id = excluded.last_payment_id,
      updated_at      = now();

    return 'approved';
  else
    -- Estados no aprobados: nunca "degradar" un pago ya aprobado.
    update public.payments set
      status              = v_internal,
      provider_payment_id = coalesce(p_provider_payment_id, provider_payment_id),
      raw_response        = p_raw
    where id = rec.id and status <> 'APPROVED';

    return 'updated';
  end if;
end;
$$;

-- ── Seed de planes del gimnasio (ids fijos para referencia estable) ─────────
insert into public.plans (id, name, description, price, currency, active) values
  ('11111111-1111-1111-1111-111111111111', 'Pase 3 veces', '3 sesiones semanales + app de seguimiento', 25000.00, 'ARS', true),
  ('22222222-2222-2222-2222-222222222222', 'Pase Libre',   'Acceso ilimitado a todas las disciplinas',   38000.00, 'ARS', true),
  ('33333333-3333-3333-3333-333333333333', 'Personalizado','Entrenador personal 1-a-1 + seguimiento',    55000.00, 'ARS', true)
on conflict (id) do nothing;
