import { CtaLink } from "@/components/ui/CtaLink";
import { PhoneStage } from "@/components/ui/PhoneStage";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ContactLink } from "@/core/data/contact";
import { PLATFORM_LABELS, type Product } from "@/core/data/products";

type ProductHeroProps = {
  product: Product;
  contactLink: ContactLink;
  ctaLabel: string;
};

export function ProductHero({
  product,
  contactLink,
  ctaLabel,
}: ProductHeroProps) {
  const { heroScreenshots } = product;

  return (
    <section
      aria-labelledby="produto-titulo"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <CtaLink
            href="/#produtos"
            isExternal={false}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-cloud transition-colors mb-8"
          >
            <span aria-hidden="true">←</span> Todos os produtos
          </CtaLink>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <StatusBadge status={product.status} />
            <ul className="flex flex-wrap gap-2" aria-label="Plataformas">
              {product.platforms.map((platform) => (
                <li
                  key={platform}
                  className="font-mono text-xs text-muted border border-soft-gray/20 rounded-full px-3 py-1"
                >
                  {PLATFORM_LABELS[platform]}
                </li>
              ))}
            </ul>
          </div>

          <h1
            id="produto-titulo"
            className="font-display text-5xl sm:text-6xl text-cloud mb-4 leading-[1.1]"
          >
            {product.name}
          </h1>
          <p className="text-xl text-soft-gray mb-6">{product.tagline}</p>
          <p className="text-base text-muted mb-10 max-w-xl leading-relaxed">
            {product.description}
          </p>

          <div className="hidden md:block">
            <CtaLink
              href={contactLink.href}
              isExternal={contactLink.isExternal}
              variant="primary"
              size="lg"
            >
              {ctaLabel}
            </CtaLink>
            <p className="text-sm text-muted mt-4">
              Sem cadastro: a conversa acontece no WhatsApp.
            </p>
          </div>
        </div>

        {heroScreenshots && heroScreenshots.length > 0 ? (
          <PhoneStage
            screenshots={heroScreenshots}
            accentColor={product.accentColor}
            tone={product.tone}
            preload
          />
        ) : (
          <div className="overflow-hidden rounded-md border border-soft-gray/10">
            <ProductVisual product={product} className="min-h-72 md:min-h-96" />
          </div>
        )}
      </div>
    </section>
  );
}
