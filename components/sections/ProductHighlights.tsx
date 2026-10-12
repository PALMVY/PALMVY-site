import { Card } from "@/components/ui/Card";
import type { Product } from "@/core/data/products";

export function ProductHighlights({ highlights }: Pick<Product, "highlights">) {
  return (
    <section
      aria-labelledby="destaques-titulo"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-soft-gray/10"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="destaques-titulo"
          className="font-display text-3xl sm:text-4xl text-cloud mb-10"
        >
          Destaques
        </h2>
        <ul className="grid md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <li key={highlight}>
              <Card className="p-6 h-full">
                <p className="font-mono text-sm text-sunset mb-3">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="text-base text-cloud">{highlight}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
