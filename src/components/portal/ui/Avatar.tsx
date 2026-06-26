interface AvatarProps {
  name: string;
  src?: string | null;
  /** Tamaño en px (cuadrado). */
  size?: number;
  className?: string;
}

/** Deriva hasta dos iniciales del nombre. */
function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Avatar del usuario. Si no hay imagen muestra las iniciales sobre el color de
 * acento, sin depender de servicios externos.
 */
export default function Avatar({ name, src, size = 40, className = '' }: AvatarProps) {
  const dimension = { width: size, height: size };
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        style={dimension}
        className={`rounded-full object-cover border border-white/10 ${className}`}
      />
    );
  }
  return (
    <span
      style={{ ...dimension, fontSize: size * 0.4 }}
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-full bg-primary-fixed text-on-primary-fixed font-bold select-none ${className}`}
    >
      {getInitials(name)}
    </span>
  );
}
