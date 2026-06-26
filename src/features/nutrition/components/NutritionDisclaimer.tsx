/** Aviso discreto sobre el carácter aproximado de los valores nutricionales. */
export default function NutritionDisclaimer({ className = '' }: { className?: string }) {
  return (
    <p
      role="note"
      className={`flex items-start gap-2 rounded-lg border border-outline-variant/60 bg-surface-container-low/40 px-3 py-2.5 text-[12px] leading-snug text-on-surface-variant/80 ${className}`}
    >
      <span className="material-symbols-outlined text-[16px] mt-px shrink-0" aria-hidden="true">
        info
      </span>
      Los valores nutricionales son aproximados. Un plan personalizado debe ser revisado por un
      profesional de la salud.
    </p>
  );
}
