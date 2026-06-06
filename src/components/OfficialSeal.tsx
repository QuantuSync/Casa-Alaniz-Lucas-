import { ShieldCheck } from 'lucide-react';

// Emblema de acreditación: sello notarial en oro (doble aro + dentado fino del borde)
// con un escudo verificado al centro. Sobrio —solo la gama verde/oro del sitio, sin
// fondos llamativos ni glow— y coherente entre los bloques oficiales para que se
// reconozcan como sellos de acreditación.
//
// El dentado se calcula de forma determinista (mismas coordenadas en el pre-render SSG
// y en la hidratación), así que no provoca desajustes de hidratación.
const TICKS = Array.from({ length: 36 }, (_, i) => {
  const angle = (i / 36) * Math.PI * 2;
  const inner = 27;
  const outer = 30;
  return {
    x1: +(32 + inner * Math.cos(angle)).toFixed(2),
    y1: +(32 + inner * Math.sin(angle)).toFixed(2),
    x2: +(32 + outer * Math.cos(angle)).toFixed(2),
    y2: +(32 + outer * Math.sin(angle)).toFixed(2),
  };
});

export default function OfficialSeal({ className = '' }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex h-16 w-16 items-center justify-center text-alanizGold-600 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="32" cy="32" r="31" strokeWidth="1.25" />
        <circle cx="32" cy="32" r="24" strokeWidth="1" className="opacity-70" />
        <g strokeWidth="1" strokeLinecap="round" className="opacity-60">
          {TICKS.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
          ))}
        </g>
      </svg>
      <ShieldCheck className="relative h-6 w-6" strokeWidth={1.75} />
    </span>
  );
}
