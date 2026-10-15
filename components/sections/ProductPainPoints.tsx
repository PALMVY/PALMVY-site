import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProductPainPoints as PainPoints } from "@/core/data/products";

/**
 * A dor antes da solução. Fica quieta de propósito (régua, sem cor de
 * produto) para os destaques logo abaixo responderem a ela.
 */
export function ProductPainPoints({ painPoints }: { painPoints: PainPoints }) {
  return (
    <section
      aria-labelledby="dor-titulo"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="O problema"
          title={painPoints.title}
          titleId="dor-titulo"
        />
        <ul>
          {painPoints.items.map((item) => (
            <li
              key={item}
              className="border-b border-cloud/10 py-6 text-balance text-xl leading-snug text-soft-gray sm:py-8 sm:text-2xl"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
