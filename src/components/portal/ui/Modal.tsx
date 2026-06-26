'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Id del elemento que titula el diálogo (para aria-labelledby). */
  labelledBy: string;
  children: React.ReactNode;
}

/**
 * Diálogo accesible renderizado mediante portal en `document.body`.
 *
 * El portal es necesario porque las tarjetas usan `perspective` y
 * `backdrop-filter` (`.glass-card-3d`), que convierten a ese ancestro en el
 * bloque contenedor de los elementos `position: fixed`. Sin el portal, el
 * overlay quedaría atrapado dentro de la tarjeta en lugar de cubrir la pantalla.
 *
 * Se cierra con Escape, con el botón o tocando el fondo; bloquea el scroll y
 * mueve el foco al panel al abrir.
 */
export default function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="glass-card relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-white/10 focus:outline-none sm:rounded-2xl"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
