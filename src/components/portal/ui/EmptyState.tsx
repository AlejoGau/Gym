import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  /** Acción opcional (ej. un botón o enlace). */
  action?: React.ReactNode;
  className?: string;
}

/** Estado vacío reutilizable con ícono, título y descripción. */
export default function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 py-12 rounded-xl border border-dashed border-outline-variant ${className}`}
    >
      <span
        className="material-symbols-outlined text-on-surface-variant/60 text-[40px] mb-3"
        aria-hidden="true"
      >
        {icon}
      </span>
      <p className="font-headline-md text-[18px] font-bold text-white">{title}</p>
      {description && (
        <p className="text-body-md text-on-surface-variant mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
