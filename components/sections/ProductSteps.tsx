import { HorizonLines } from "@/components/ui/HorizonLines";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Product, ProductStep } from "@/core/data/products";

type ProductStepsProps = {
  steps: ProductStep[];
  accentColor: Product["accentColor"];
  tone: Product["tone"];
};

const formatPosition = (index: number): string =>
  String(index + 1).padStart(2, "0");

// Classes estáticas: o Tailwind não enxerga nomes montados em tempo de execução.
const COLUMNS_BY_COUNT: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * O pico da landing: os celulares sobem de uma faixa só, na cor do produto.
 * A partir de `lg` a faixa é um fundo contínuo atrás das colunas. No tablet
 * (`md`) três colunas não cabem o aparelho, então cada passo vira uma linha
 * com painel e texto lado a lado. No celular, cada passo tem o próprio painel.
 */
export function ProductSteps({ steps, accentColor, tone }: ProductStepsProps) {
  const lineColor = tone === "light" ? "text-pacific-night/20" : "text-cloud/15";
  const columns = COLUMNS_BY_COUNT[steps.length] ?? "lg:grid-cols-3";
  const total = formatPosition(steps.length - 1);

  return (
    <section
      aria-labelledby="como-funciona-titulo"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Como funciona"
          title="Passo a passo."
          titleId="como-funciona-titulo"
        />

        <div className="relative">
          <div
            aria-hidden="true"
            className={`absolute inset-x-0 top-0 hidden h-112 overflow-hidden rounded-3xl lg:block ${accentColor}`}
          >
            <HorizonLines
              className={`absolute inset-x-0 bottom-0 h-1/2 w-full ${lineColor}`}
            />
          </div>

          <ol className={`relative grid gap-14 lg:gap-0 ${columns}`}>
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col md:grid md:grid-cols-2 md:items-center md:gap-10 lg:flex lg:items-stretch lg:gap-0"
              >
                <div
                  className={`relative h-96 overflow-hidden rounded-3xl lg:h-112 lg:rounded-none lg:bg-transparent ${accentColor}`}
                >
                  <HorizonLines
                    className={`absolute inset-x-0 bottom-0 h-1/2 w-full lg:hidden ${lineColor}`}
                  />
                  {/* Nasce do pé da faixa e divide o eixo esquerdo com o texto do passo. */}
                  <div className="absolute inset-x-0 top-10 mx-auto w-52 lg:right-auto lg:left-10 lg:top-12 lg:mx-0 lg:w-56">
                    <PhoneFrame screenshot={step.screenshot} sizes="224px" />
                  </div>
                </div>

                <div className="pt-7 md:pt-0 lg:px-10 lg:pt-10">
                  <p className="mb-4 font-mono text-sm tracking-widest text-sunset">
                    {formatPosition(index)}
                    <span className="text-muted"> / {total}</span>
                  </p>
                  <h3 className="mb-3 text-balance font-display text-3xl font-extrabold leading-none tracking-tight text-cloud sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="max-w-sm text-lg leading-relaxed text-muted">
                    {step.description}
                  </p>
                  {/* Fica com o texto: no painel colorido o contraste não fecha. */}
                  {step.screenshot.caption && (
                    <p className="mt-4 text-sm text-muted">
                      {step.screenshot.caption}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
