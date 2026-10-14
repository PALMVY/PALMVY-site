import { CtaLink } from "@/components/ui/CtaLink";
import { ProductClosing } from "@/components/sections/ProductClosing";
import { ProductFaq } from "@/components/sections/ProductFaq";
import { ProductHero } from "@/components/sections/ProductHero";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { ProductSpotlight } from "@/components/sections/ProductSpotlight";
import { ProductSteps } from "@/components/sections/ProductSteps";
import {
  getContactChannel,
  getProductContactLink,
  type ContactChannel,
} from "@/core/data/contact";
import type { Product } from "@/core/data/products";

// O texto de apoio acompanha o destino real do botão: sem WhatsApp
// configurado, o link vira e-mail e a frase não pode prometer WhatsApp.
const CONTACT_NOTES: Record<ContactChannel, string> = {
  whatsapp: "Sem cadastro: a conversa acontece no WhatsApp.",
  email: "Sem cadastro: a conversa acontece por e-mail.",
  page: "Sem cadastro e sem formulário.",
};

export function ProductLanding({ product }: { product: Product }) {
  const contactLink = getProductContactLink(product);
  const contactNote = CONTACT_NOTES[getContactChannel(contactLink)];
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
        contactNote={contactNote}
      />
      <ProductHighlights name={product.name} highlights={product.highlights} />
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
        contactNote={contactNote}
      />

      {/* Barra flutuante: o único lugar da landing com blur (DESIGN.md). */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cloud/10 bg-pacific-night/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
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
      </div>
    </>
  );
}
