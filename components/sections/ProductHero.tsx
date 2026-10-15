import { CtaLink } from "@/components/ui/CtaLink";
import { PhoneStage } from "@/components/ui/PhoneStage";
import { ProductArtTransition } from "@/components/ui/ProductArtTransition";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ContactLink } from "@/core/data/contact";
import { PLATFORM_LABELS, type Product } from "@/core/data/products";

type ProductHeroProps = {
  product: Product;
  contactLink: ContactLink;
  ctaLabel: string;
  /** Frase curta sob o CTA, que diz para onde a conversa vai. */
  contactNote: string;
};

export function ProductHero({
  product,
  contactLink,
  ctaLabel,
  contactNote,
}: ProductHeroProps) {
  const { heroScreenshots } = product;
  // As duas telas dividem um painel, então a legenda é uma só.
  const heroCaption = heroScreenshots?.find(({ caption }) => caption)?.caption;

  return (
    <section
      aria-labelledby="produto-titulo"
      className="relative px-4 pt-10 pb-24 sm:px-6 sm:pt-16 sm:pb-32 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-16">
        <div>
          <CtaLink
            href="/#produtos"
            isExternal={false}
            className="mb-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-cloud motion-reduce:transition-none"
          >
            <span aria-hidden="true">←</span> Todos os produtos
          </CtaLink>

          <SectionLabel className="mb-6">{product.category}</SectionLabel>

          <h1
            id="produto-titulo"
            className="text-balance font-display text-6xl font-extrabold leading-[0.92] tracking-tighter text-cloud sm:text-7xl"
          >
            {product.name}
          </h1>
          <p className="mt-5 text-balance text-xl font-medium text-cloud sm:text-2xl">
            {product.tagline}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StatusBadge status={product.status} />
            <ul className="flex flex-wrap gap-2" aria-label="Plataformas">
              {product.platforms.map((platform) => (
                <li
                  key={platform}
                  className="rounded-full border border-soft-gray/20 px-3 py-1 font-mono text-xs uppercase tracking-wider text-soft-gray"
                >
                  {PLATFORM_LABELS[platform]}
                </li>
              ))}
            </ul>
          </div>

          {/* No celular, o CTA fica na barra fixa da base (ProductLanding). */}
          <div className="mt-10 hidden md:block">
            <CtaLink
              href={contactLink.href}
              isExternal={contactLink.isExternal}
              variant="primary"
              size="xl"
            >
              {ctaLabel} <span aria-hidden="true">→</span>
            </CtaLink>
            <p className="mt-4 text-sm text-muted">{contactNote}</p>
          </div>
        </div>

        <div>
          {/* Mesmo painel do card na home: ele cresce até aqui na navegação. */}
          <ProductArtTransition productId={product.id}>
            {heroScreenshots && heroScreenshots.length > 0 ? (
              <PhoneStage
                screenshots={heroScreenshots}
                accentColor={product.accentColor}
                tone={product.tone}
                preload
              />
            ) : (
              <div className="overflow-hidden rounded-3xl border border-cloud/10">
                <ProductVisual product={product} className="aspect-square" />
              </div>
            )}
          </ProductArtTransition>
          {heroCaption && (
            <p className="mt-3 text-sm text-muted">{heroCaption}</p>
          )}
        </div>
      </div>
    </section>
  );
}
