import { Card } from "@/components/ui/Card";
import { CtaLink } from "@/components/ui/CtaLink";
import { ProductVisual } from "@/components/ui/ProductVisual";
import type { ContactLink } from "@/core/data/contact";
import type { Product } from "@/core/data/products";

type ProductClosingProps = {
  product: Product;
  contactLink: ContactLink;
  ctaLabel: string;
  title: string;
};

export function ProductClosing({
  product,
  contactLink,
  ctaLabel,
  title,
}: ProductClosingProps) {
  return (
    <section
      aria-labelledby="contato-titulo"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-soft-gray/10"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="overflow-hidden p-0">
          <div className="grid md:grid-cols-5">
            <div className="p-8 sm:p-12 md:col-span-3">
              <div className="max-w-xl">
                <h2
                  id="contato-titulo"
                  className="font-display text-2xl sm:text-3xl text-cloud mb-4"
                >
                  {title}
                </h2>
                <p className="text-soft-gray mb-8">
                  Fale direto com a gente pelo WhatsApp. Sem formulário e sem
                  cadastro.
                </p>
                <CtaLink
                  href={contactLink.href}
                  isExternal={contactLink.isExternal}
                  variant="primary"
                  size="lg"
                >
                  {ctaLabel}
                </CtaLink>
              </div>
            </div>

            {product.image && (
              <ProductVisual
                product={product}
                className="hidden min-h-64 md:col-span-2 md:flex"
              />
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
