import { CtaLink } from "@/components/ui/CtaLink";
import { PhoneStage } from "@/components/ui/PhoneStage";
import { ProductArtTransition } from "@/components/ui/ProductArtTransition";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { INTERACTIVE_SURFACE } from "@/components/ui/surfaceStyles";
import { PLATFORM_LABELS, type Product } from "@/core/data/products";

type ProductCardProps = {
  product: Product;
  /** Posição na vitrine, exibida como "01", "02"... */
  position: number;
  featured?: boolean;
};

const formatPosition = (position: number): string =>
  String(position).padStart(2, "0");

const formatPlatforms = (product: Product): string =>
  product.platforms.map((platform) => PLATFORM_LABELS[platform]).join(" · ");

function ProductArt({
  product,
  featured,
}: {
  product: Product;
  featured: boolean;
}) {
  const screenshots = product.heroScreenshots ?? [];

  if (screenshots.length > 0) {
    return (
      <PhoneStage
        screenshots={screenshots}
        accentColor={product.accentColor}
        tone={product.tone}
        shape={featured ? "fill" : "wide"}
        preload={featured}
      />
    );
  }

  return (
    <ProductVisual
      product={product}
      className={featured ? "aspect-square md:aspect-auto md:h-full" : "aspect-video"}
    />
  );
}

export function ProductCard({
  product,
  position,
  featured = false,
}: ProductCardProps) {
  const layout = featured
    ? "grid md:grid-cols-2"
    : "flex flex-col";
  const contentPadding = featured ? "p-7 sm:p-10 lg:p-12" : "p-7 sm:p-9";
  const nameSize = featured
    ? "text-5xl lg:text-6xl"
    : "text-4xl";

  return (
    <article
      className={`group overflow-hidden rounded-3xl ${INTERACTIVE_SURFACE} ${layout}`}
    >
      {/* No destaque, a arte fica à direita no desktop e no topo no mobile. */}
      <div className={featured ? "md:order-2" : ""} aria-hidden="true">
        <ProductArtTransition productId={product.id}>
          <ProductArt product={product} featured={featured} />
        </ProductArtTransition>
      </div>

      <div className={`flex flex-1 flex-col gap-6 ${contentPadding}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm tracking-widest text-sunset">
            {formatPosition(position)}
          </span>
          <StatusBadge status={product.status} />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {product.category}
          </span>
        </div>

        <div>
          <h3
            className={`mb-3 font-display font-extrabold leading-none tracking-tight text-cloud ${nameSize}`}
          >
            {product.name}
          </h3>
          <p className="text-balance text-lg font-medium text-cloud sm:text-xl">
            {product.tagline}
          </p>
        </div>

        <p className="max-w-md leading-relaxed text-muted">
          {product.description}
        </p>

        {featured && (
          <ul className="flex flex-col gap-3 text-soft-gray">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-2 h-2 w-2 shrink-0 rounded-full ${product.accentColor}`}
                />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-cloud/10 pt-5">
          <span className="font-mono text-xs tracking-widest text-muted">
            {formatPlatforms(product)}
          </span>
          {product.landingPage && (
            <CtaLink
              href={product.landingPage}
              isExternal={false}
              className={
                featured
                  ? "inline-flex h-12 items-center gap-3 rounded-md bg-cloud px-5 font-mono text-xs uppercase tracking-widest text-pacific-night transition-colors hover:bg-soft-gray"
                  : "inline-flex h-11 items-center gap-3 font-mono text-xs uppercase tracking-widest text-cloud transition-colors hover:text-sunset"
              }
            >
              Conhecer o {product.name}
              <span aria-hidden="true">→</span>
            </CtaLink>
          )}
        </div>
      </div>
    </article>
  );
}
