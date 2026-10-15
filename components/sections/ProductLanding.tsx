import { CtaLink } from "@/components/ui/CtaLink";
import { ProductClosing } from "@/components/sections/ProductClosing";
import { ProductFaq } from "@/components/sections/ProductFaq";
import { ProductHero } from "@/components/sections/ProductHero";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { ProductPainPoints } from "@/components/sections/ProductPainPoints";
import { ProductPricing } from "@/components/sections/ProductPricing";
import { ProductSpotlight } from "@/components/sections/ProductSpotlight";
import { ProductSteps } from "@/components/sections/ProductSteps";
import { PRODUCT_FOLLOW_LINK } from "@/core/data/contact";
import type { Product } from "@/core/data/products";

// Por ora, sem aviso de lançamento por WhatsApp ou e-mail: quem quiser
// acompanhar segue o Instagram. (getProductContactLink volta com a lista.)
const contactLink = PRODUCT_FOLLOW_LINK;
const ctaLabel = "Acompanhar no Instagram";
const contactNote = "Novidades e data de lançamento no Instagram da PALMVY.";

export function ProductLanding({ product }: { product: Product }) {
  const isLaunched = product.status === "launched";
  const closingTitle = isLaunched
    ? `Quer conhecer o ${product.name}?`
    : `Quer acompanhar o ${product.name}?`;
  const { painPoints, steps, spotlight, pricing, faq } = product;

  return (
    <>
      <ProductHero
        product={product}
        contactLink={contactLink}
        ctaLabel={ctaLabel}
        contactNote={contactNote}
      />

      {/*
        Barra flutuante: o único lugar da landing com blur (DESIGN.md).
        Fica logo depois da abertura no DOM porque está sempre visível: no fim
        da página, leitor de tela e teclado só chegavam nela por último.
        `data-sticky-cta` liga o scroll-padding do globals.css.
      */}
      <aside
        aria-label="Contato rápido"
        data-sticky-cta
        className="fixed inset-x-0 bottom-0 z-40 border-t border-cloud/10 bg-pacific-night/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
      >
        <CtaLink
          href={contactLink.href}
          isExternal={contactLink.isExternal}
          variant="primary"
          size="xl"
          className="w-full"
        >
          {ctaLabel} <span aria-hidden="true">→</span>
        </CtaLink>
        <p className="mt-2 text-center text-xs text-muted">{contactNote}</p>
      </aside>

      {painPoints && <ProductPainPoints painPoints={painPoints} />}
      <ProductHighlights name={product.name} highlights={product.highlights} />
      {steps && steps.length > 0 && (
        <ProductSteps
          steps={steps}
          accentColor={product.accentColor}
          tone={product.tone}
        />
      )}
      {spotlight && (
        <ProductSpotlight
          spotlight={spotlight}
          accentColor={product.accentColor}
          tone={product.tone}
        />
      )}
      {pricing && <ProductPricing pricing={pricing} />}
      {faq && faq.length > 0 && <ProductFaq faq={faq} />}
      <ProductClosing
        product={product}
        contactLink={contactLink}
        ctaLabel={ctaLabel}
        title={closingTitle}
        contactNote={contactNote}
      />
    </>
  );
}
