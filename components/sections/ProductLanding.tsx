import { CtaLink } from "@/components/ui/CtaLink";
import { ProductClosing } from "@/components/sections/ProductClosing";
import { ProductFaq } from "@/components/sections/ProductFaq";
import { ProductHero } from "@/components/sections/ProductHero";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { ProductSpotlight } from "@/components/sections/ProductSpotlight";
import { ProductSteps } from "@/components/sections/ProductSteps";
import { getProductContactLink } from "@/core/data/contact";
import type { Product } from "@/core/data/products";

export function ProductLanding({ product }: { product: Product }) {
  const contactLink = getProductContactLink(product);
  const isLaunched = product.status === "launched";
  const ctaLabel = isLaunched
    ? `Falar sobre o ${product.name}`
    : "Quero ser avisado";
  const closingTitle = isLaunched
    ? `Quer conhecer o ${product.name}?`
    : `Quer acompanhar o ${product.name}?`;
  const { steps, spotlight, faq } = product;

  return (
    <>
      <ProductHero
        product={product}
        contactLink={contactLink}
        ctaLabel={ctaLabel}
      />
      <ProductHighlights highlights={product.highlights} />
      {steps && steps.length > 0 && <ProductSteps steps={steps} />}
      {spotlight && (
        <ProductSpotlight
          spotlight={spotlight}
          accentColor={product.accentColor}
          tone={product.tone}
        />
      )}
      {faq && faq.length > 0 && <ProductFaq faq={faq} />}
      <ProductClosing
        product={product}
        contactLink={contactLink}
        ctaLabel={ctaLabel}
        title={closingTitle}
      />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-soft-gray/10 bg-pacific-night/90 px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <CtaLink
          href={contactLink.href}
          isExternal={contactLink.isExternal}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {ctaLabel}
        </CtaLink>
      </div>
    </>
  );
}
