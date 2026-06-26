import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Resalta la tarjeta con borde de acento (ej. acción principal). */
  highlight?: boolean;
  as?: 'div' | 'section' | 'article' | 'li';
}

/**
 * Tarjeta base del portal. Reutiliza el lenguaje glassmorphic de la landing
 * (`.glass-card-3d`) para mantener la identidad visual.
 */
export default function Card({
  children,
  className = '',
  highlight = false,
  as: Tag = 'div',
}: CardProps) {
  return (
    <Tag
      className={`glass-card-3d rounded-xl ${
        highlight ? 'border-primary-fixed/40' : ''
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
