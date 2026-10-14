import { CtaLink } from "@/components/ui/CtaLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Strike } from "@/components/ui/Strike";
import { SURFACE } from "@/components/ui/surfaceStyles";
import { ALWAYS_INCLUDED, PRICE_TIERS, formatPrice } from "@/core/data/pricing";

export function CustomWork() {
  return (
    <section
      id="sob-medida"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionLabel className="mb-4">Sob medida</SectionLabel>
          <h2 className="text-balance font-display text-4xl font-bold leading-none tracking-tight text-cloud sm:text-5xl lg:text-6xl">
            Precisa de um site ou app? O preço está aqui.
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
            “A partir de” é o piso real, para o escopo descrito. Pediu mais, o
            escopo cresce e você vê o porquê, item por item, antes de fechar.
          </p>
          <p className="mt-7 flex flex-col gap-1 font-mono text-sm leading-relaxed">
            <Strike>Chama no direct para valores</Strike>
            <span className="text-gold">O piso está na tela. A conversa fecha o escopo.</span>
          </p>
        </div>

        <div className={`rounded-3xl p-6 sm:p-9 ${SURFACE}`}>
          <dl>
            {PRICE_TIERS.map(({ kind, name, scope, startingPrice }) => (
              <div
                key={kind}
                className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-cloud/10 py-6 first:pt-0"
              >
                <dt>
                  <span className="block text-xl font-bold text-cloud sm:text-2xl">{name}</span>
                  <span className="mt-1 block text-muted">{scope}</span>
                </dt>
                <dd className="ml-auto text-right">
                  <span className="block font-mono text-xs uppercase tracking-widest text-sunset">
                    A partir de
                  </span>
                  <span className="text-3xl font-extrabold tracking-tight text-cloud tabular-nums sm:text-4xl">
                    {formatPrice(startingPrice)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mb-4 mt-7 font-mono text-xs uppercase tracking-widest text-muted">
            Sempre incluso
          </p>
          <ul className="grid gap-x-5 gap-y-3 text-soft-gray sm:grid-cols-2">
            {ALWAYS_INCLUDED.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="font-mono text-sunset">+</span>
                {item}
              </li>
            ))}
          </ul>

          <CtaLink
            href="#contato"
            isExternal={false}
            variant="primary"
            size="xl"
            className="mt-8 w-full"
          >
            Começar projeto <span aria-hidden="true">→</span>
          </CtaLink>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Hospedagem, domínio, contas nas lojas (Apple/Google) e serviços de
            terceiros são pagos direto por você, sem margem nossa.
          </p>
        </div>
      </div>
    </section>
  );
}
