import { PriceLedger, type PriceLedgerRow } from "@/components/ui/PriceLedger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SURFACE } from "@/components/ui/surfaceStyles";
import { formatCents, getPricePerCredit, type CreditPack } from "@/core/data/pricing";
import type { ProductPricing as Pricing } from "@/core/data/products";

const toLedgerRow = (pack: CreditPack): PriceLedgerRow => {
  const { credits, priceInCents } = pack;
  const isSingle = credits === 1;

  return {
    id: String(credits),
    name: isSingle ? "1 análise" : `${credits} análises`,
    detail: isSingle
      ? "Avulsa"
      : `${formatCents(getPricePerCredit(pack))} por análise`,
    label: "Pagamento único",
    price: formatCents(priceInCents),
  };
};

/** Pacotes de créditos em régua, no mesmo desenho do "Sob medida" da home. */
export function ProductPricing({ pricing }: { pricing: Pricing }) {
  const { title, description, packs, included, note } = pricing;

  return (
    <section
      aria-labelledby="preco-titulo"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionLabel className="mb-4">Preço</SectionLabel>
          <h2
            id="preco-titulo"
            className="text-balance font-display text-4xl font-bold leading-none tracking-tight text-cloud sm:text-5xl lg:text-6xl"
          >
            {title}
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
            {description}
          </p>
        </div>

        <div className={`rounded-3xl p-6 sm:p-9 ${SURFACE}`}>
          <PriceLedger rows={packs.map(toLedgerRow)} />

          <p className="mb-4 mt-7 font-mono text-xs uppercase tracking-widest text-muted">
            Em todo pacote
          </p>
          <ul className="grid gap-x-5 gap-y-3 text-soft-gray sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="font-mono text-sunset">+</span>
                {item}
              </li>
            ))}
          </ul>

          {note && (
            <p className="mt-7 text-sm leading-relaxed text-muted">{note}</p>
          )}
        </div>
      </div>
    </section>
  );
}
