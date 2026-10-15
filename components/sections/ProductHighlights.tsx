import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Product } from "@/core/data/products";

const formatPosition = (index: number): string =>
  String(index + 1).padStart(2, "0");

/** Destaques em régua (como a tabela de preços da home), não em cards. */
export function ProductHighlights({
  name,
  highlights,
}: Pick<Product, "name" | "highlights">) {
  return (
    <section
      aria-labelledby="destaques-titulo"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Destaques"
          title={`O que o ${name} faz.`}
          titleId="destaques-titulo"
        />
        <ol>
          {highlights.map((highlight, index) => (
            <li
              key={highlight}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-cloud/10 py-6 sm:grid-cols-[5rem_1fr] sm:py-8"
            >
              <span className="font-mono text-sm tracking-widest text-sunset">
                {formatPosition(index)}
              </span>
              <p className="text-balance text-xl font-semibold leading-snug tracking-tight text-cloud sm:text-3xl">
                {highlight}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
