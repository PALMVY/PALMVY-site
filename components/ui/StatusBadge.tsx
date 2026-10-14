import type { Product } from "@/core/data/products";

const BASE_STYLES =
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider";

const STATUS_CONTENT: Record<
  Product["status"],
  { label: string; styles: string; dot: string }
> = {
  launched: {
    label: "Disponível",
    styles: "border-palm-green bg-palm-green/20 text-cloud",
    dot: "bg-cloud",
  },
  "coming-soon": {
    label: "Em breve",
    styles: "border-soft-gray/20 text-soft-gray",
    dot: "bg-gold",
  },
};

export function StatusBadge({ status }: { status: Product["status"] }) {
  const { label, styles, dot } = STATUS_CONTENT[status];

  return (
    <div className={`${BASE_STYLES} ${styles}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </div>
  );
}
