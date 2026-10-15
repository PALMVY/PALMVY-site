import { QuotePicker, type QuoteOption } from "@/components/ui/QuotePicker";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SURFACE } from "@/components/ui/surfaceStyles";
import { CONTACT_EMAIL, getQuoteContactLink } from "@/core/data/contact";
import { PRICE_TIERS, formatPrice } from "@/core/data/pricing";

// Os links são montados no servidor: o componente do navegador só recebe dados prontos.
const QUOTE_OPTIONS: QuoteOption[] = [
  ...PRICE_TIERS.map((tier) => ({
    id: tier.kind,
    label: tier.name,
    estimate: { name: tier.name, price: formatPrice(tier.startingPrice) },
    link: getQuoteContactLink(tier),
  })),
  {
    id: "unsure",
    label: "Ainda não sei",
    estimate: null,
    link: getQuoteContactLink(undefined),
  },
];

export function Contact() {
  return (
    <section
      id="contato"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionLabel className="mb-4">Novo projeto</SectionLabel>
          <h2 className="text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tighter text-cloud sm:text-6xl">
            Quer começar? Manda o que você precisa.
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
            Quem responde é quem vai construir. Você recebe escopo, prazo e
            preço fechado, por escrito.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-9 inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-widest text-soft-gray transition-colors hover:text-sunset"
          >
            → {CONTACT_EMAIL}
          </a>
        </div>

        <div className={`rounded-3xl p-6 sm:p-10 ${SURFACE}`}>
          <QuotePicker options={QUOTE_OPTIONS} />
        </div>
      </div>
    </section>
  );
}
