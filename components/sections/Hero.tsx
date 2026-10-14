import { CtaLink } from "@/components/ui/CtaLink";
import { HorizonLines } from "@/components/ui/HorizonLines";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Strike } from "@/components/ui/Strike";
import { SURFACE } from "@/components/ui/surfaceStyles";
import { MANIFESTO } from "@/core/data/home";
import { products, type Product, type ProductScreenshot } from "@/core/data/products";

type ShowcasePhone = {
  product: Product;
  screenshot: ProductScreenshot;
};

// Uma tela de cada app com prints: a principal do destaque e a de trás do segundo.
const getShowcasePhones = (): ShowcasePhone[] =>
  products
    .filter((product) => (product.heroScreenshots?.length ?? 0) > 0)
    .slice(0, 2)
    .map((product, index) => {
      const screenshots = product.heroScreenshots ?? [];
      const screenshot = screenshots[index] ?? screenshots[0];
      return { product, screenshot };
    });

function ShowcaseTag({ product, className }: { product: Product; className: string }) {
  return (
    <span
      className={`absolute flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-cloud ${SURFACE} ${className}`}
    >
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${product.accentColor}`} />
      {product.name}
    </span>
  );
}

function HeroShowcase() {
  const [front, back] = getShowcasePhones();
  if (!front) return null;

  return (
    // Decorativo: os mesmos apps aparecem, com texto, logo abaixo em Produtos.
    <div aria-hidden="true" className="relative mx-auto h-136 w-full max-w-md lg:h-152">
      {back && (
        <>
          <div className="absolute right-0 top-6 w-[52%] rotate-6 opacity-90">
            <PhoneFrame
              screenshot={back.screenshot}
              sizes="(min-width: 1024px) 250px, 45vw"
              preload
            />
          </div>
          <ShowcaseTag product={back.product} className="bottom-24 right-0" />
        </>
      )}
      <div className="absolute left-4 top-0 w-[58%] -rotate-3">
        <PhoneFrame
          screenshot={front.screenshot}
          sizes="(min-width: 1024px) 280px, 52vw"
          preload
        />
      </div>
      <ShowcaseTag product={front.product} className="bottom-8 left-0" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 sm:pt-20 sm:pb-32">
      <HorizonLines className="absolute inset-x-0 bottom-0 h-48 w-full text-soft-gray/10 sm:h-64" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionLabel className="mb-7">Estúdio de produto</SectionLabel>

          <h1 className="text-balance font-display text-6xl font-extrabold leading-[0.92] tracking-tighter text-cloud sm:text-7xl">
            Apps feitos com calma e <span className="text-sunset">propósito.</span>
          </h1>

          <ul
            aria-label="O que a PALMVY não faz"
            className="mt-9 flex flex-col gap-2.5 font-mono text-base text-cloud sm:text-lg"
          >
            {MANIFESTO.map(({ struck, after }) => (
              <li key={struck} className="flex items-baseline gap-4">
                <span aria-hidden="true" className="text-sunset">—</span>
                <span>
                  Sem <Strike>{struck}</Strike>
                  {after}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-soft-gray sm:text-xl">
            A gente cria os próprios apps e faz apps e sites sob medida.{" "}
            <strong className="font-semibold text-cloud">Com preço na mesa.</strong>
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="#produtos" isExternal={false} variant="primary" size="xl">
              Ver produtos <span aria-hidden="true">→</span>
            </CtaLink>
            <CtaLink href="#sob-medida" isExternal={false} variant="secondary" size="xl">
              Projeto sob medida <span aria-hidden="true">→</span>
            </CtaLink>
          </div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
