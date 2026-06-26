import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  /** Ícono opcional de Material Symbols a la izquierda. */
  icon?: string;
  /** Acción opcional alineada a la derecha (ej. un enlace "Ver todo"). */
  action?: React.ReactNode;
  className?: string;
}

/** Encabezado de sección consistente con la tipografía de la marca. */
export default function SectionTitle({
  children,
  icon,
  action,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`flex items-center justify-between gap-3 mb-3 ${className}`}>
      <h2 className="flex items-center gap-2 font-headline-md text-[18px] md:text-[20px] font-bold text-white uppercase tracking-tight">
        {icon && (
          <span
            className="material-symbols-outlined text-primary-fixed text-[22px]"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        {children}
      </h2>
      {action}
    </div>
  );
}
