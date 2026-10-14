import { CtaLink } from "@/components/ui/CtaLink";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SURFACE } from "@/components/ui/surfaceStyles";
import type { ContactLink } from "@/core/data/contact";
import type { Product } from "@/core/data/products";

type ProductClosingProps = {
  product: Product;
  contactLink: ContactLink;
  ctaLabel: string;
  title: string;
  /** Frase que diz como a conversa acontece (WhatsApp ou e-mail). */
  contactNote: string;
};

export function ProductClosing({
  product,
  contactLink,
  ctaLabel,
  title,
  contactNote,
}: ProductClosingProps) {
  return (
    <section
      aria-labelledby="contato-titulo"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className={`mx-auto max-w-6xl overflow-hidden rounded-3xl ${SURFACE}`}>
        <div className="grid md:grid-cols-5">
          <div className="p-7 sm:p-12 md:col-span-3">
            <SectionLabel className="mb-4">Contato</SectionLabel>
            <h2
              id="contato-titulo"
              className="text-balance font-display text-4xl font-extrabold leading-[0.95] tracking-tighter text-cloud sm:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              {contactNote}
            </p>
            {/* No celular, o CTA já está na barra fixa da base. */}
            <div className="mt-8 hidden md:block">
              <CtaLink
                href={contactLink.href}
                isExternal={contactLink.isExternal}
                variant="primary"
                size="xl"
              >
                {ctaLabel} <span aria-hidden="true">→</span>
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
      </div>
    </section>
  );
}
