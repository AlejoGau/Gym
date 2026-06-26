import React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-bold uppercase tracking-tight transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-primary-fixed text-on-primary-fixed hover:brightness-110',
  secondary:
    'border border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-on-primary-fixed',
  ghost: 'text-on-surface-variant hover:text-primary-fixed',
};

// `lg` está pensado para el uso durante el entrenamiento (botones grandes).
const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-label-md',
  lg: 'px-6 py-4 text-body-md',
};

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  icon?: string;
  className?: string;
  children: React.ReactNode;
  /** Si se pasa, el botón se renderiza como un `<Link>`. */
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

/** Botón unificado del portal. Renderiza un `<Link>` cuando recibe `href`. */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  href,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {icon && (
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
