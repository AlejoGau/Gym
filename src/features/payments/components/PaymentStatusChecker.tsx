'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/portal/ui/Card';
import Button from '@/components/portal/ui/Button';

type UiState =
  | { kind: 'checking' }
  | { kind: 'result'; status: string }
  | { kind: 'error'; message: string };

const MAX_ATTEMPTS = 12;
const INTERVAL_MS = 2500;
const TERMINAL = new Set(['APPROVED', 'REJECTED', 'CANCELLED', 'REFUNDED']);

/**
 * Verifica el estado real del pago consultando al backend (fuente de verdad).
 * NO marca aprobado por haber vuelto a la URL de éxito: consulta la API y
 * reintenta mientras el pago esté pendiente.
 */
export default function PaymentStatusChecker() {
  const params = useSearchParams();
  const pid = params.get('pid');
  // Mercado Pago agrega payment_id a la back_url; se usa solo como id para
  // re-verificar contra MP en el backend (no para aprobar por la URL).
  const mpPaymentId = params.get('payment_id');

  const [state, setState] = useState<UiState>({ kind: 'checking' });

  useEffect(() => {
    if (!pid) return; // sin pid no se puede verificar; se maneja en el render.

    let cancelled = false;
    let attempts = 0;

    async function poll() {
      attempts += 1;
      try {
        const qs = mpPaymentId ? `?mpPaymentId=${encodeURIComponent(mpPaymentId)}` : '';
        const res = await fetch(`/api/payments/${encodeURIComponent(pid!)}${qs}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          if (!cancelled) setState({ kind: 'error', message: 'No se pudo verificar el pago.' });
          return;
        }
        const data = (await res.json()) as { status: string };
        if (cancelled) return;

        if (TERMINAL.has(data.status) || attempts >= MAX_ATTEMPTS) {
          setState({ kind: 'result', status: data.status });
          return;
        }
        setState({ kind: 'checking' });
        setTimeout(poll, INTERVAL_MS);
      } catch {
        if (!cancelled) setState({ kind: 'error', message: 'Error de red al verificar el pago.' });
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [pid, mpPaymentId]);

  // Si falta el identificador, se muestra el error sin tocar estado en el efecto.
  const effectiveState: UiState = pid
    ? state
    : { kind: 'error', message: 'Falta el identificador del pago.' };

  return (
    <Card className="p-6 text-center">
      <StatusBody state={effectiveState} />
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
        <Button href="/inicio" variant="secondary" icon="home">
          Ir al inicio
        </Button>
        <Link
          href="/membresia"
          className="inline-flex items-center justify-center text-label-md text-on-surface-variant hover:text-primary-fixed px-4 py-2"
        >
          Volver a planes
        </Link>
      </div>
    </Card>
  );
}

function StatusBody({ state }: { state: UiState }) {
  if (state.kind === 'checking') {
    return (
      <div aria-live="polite">
        <span
          className="material-symbols-outlined animate-spin text-primary-fixed text-[40px]"
          aria-hidden="true"
        >
          progress_activity
        </span>
        <h1 className="mt-3 font-headline-md text-[22px] font-bold text-white">
          Verificando tu pago…
        </h1>
        <p className="mt-1 text-on-surface-variant">
          Estamos confirmando el pago con Mercado Pago. No cierres esta página.
        </p>
      </div>
    );
  }

  if (state.kind === 'error') {
    return (
      <div aria-live="polite">
        <span className="material-symbols-outlined text-secondary-container text-[40px]" aria-hidden="true">
          error
        </span>
        <h1 className="mt-3 font-headline-md text-[22px] font-bold text-white">
          No pudimos verificar el pago
        </h1>
        <p className="mt-1 text-on-surface-variant">{state.message}</p>
      </div>
    );
  }

  const map: Record<string, { icon: string; title: string; text: string; color: string }> = {
    APPROVED: {
      icon: 'check_circle',
      title: '¡Pago aprobado!',
      text: 'Tu cuota fue registrada y tu membresía está activa.',
      color: 'text-primary-fixed',
    },
    IN_PROCESS: {
      icon: 'hourglass_top',
      title: 'Pago en proceso',
      text: 'Mercado Pago está procesando el pago. Te avisaremos cuando se acredite.',
      color: 'text-on-surface',
    },
    PENDING: {
      icon: 'schedule',
      title: 'Pago pendiente',
      text: 'El pago todavía está pendiente de acreditación.',
      color: 'text-on-surface',
    },
    REJECTED: {
      icon: 'cancel',
      title: 'Pago rechazado',
      text: 'El pago fue rechazado. Podés intentar con otro medio de pago.',
      color: 'text-secondary-container',
    },
    CANCELLED: {
      icon: 'block',
      title: 'Pago cancelado',
      text: 'El pago fue cancelado.',
      color: 'text-secondary-container',
    },
    REFUNDED: {
      icon: 'undo',
      title: 'Pago reintegrado',
      text: 'El pago fue reintegrado.',
      color: 'text-on-surface',
    },
  };
  const info = map[state.status] ?? {
    icon: 'help',
    title: `Estado: ${state.status}`,
    text: 'Consultá con el gimnasio si tenés dudas.',
    color: 'text-on-surface',
  };

  return (
    <div aria-live="polite">
      <span className={`material-symbols-outlined text-[44px] ${info.color}`} aria-hidden="true">
        {info.icon}
      </span>
      <h1 className="mt-3 font-headline-md text-[22px] font-bold text-white">{info.title}</h1>
      <p className="mt-1 text-on-surface-variant">{info.text}</p>
    </div>
  );
}
