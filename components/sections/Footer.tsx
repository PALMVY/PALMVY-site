import type { ReactNode } from "react";
import { CtaLink } from "@/components/ui/CtaLink";
import {
  CONTACT_EMAIL,
  CONTACT_LINK,
  getSocialLinks,
} from "@/core/data/contact";
import { products } from "@/core/data/products";

const SOCIAL_LINKS = getSocialLinks();

const PRODUCT_LINKS = products.map(({ name, landingPage }) => ({
  label: name,
  href: landingPage ?? "/#produtos",
}));

// min-h-11: alvo de toque de 44px no celular (ARCHITECTURE.md §7).
const LINK_STYLES =
  "inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-cloud motion-reduce:transition-none";

function FooterLink({
  href,
  isExternal = false,
  children,
}: {
  href: string;
  isExternal?: boolean;
  children: ReactNode;
}) {
  return (
    <CtaLink href={href} isExternal={isExternal} className={LINK_STYLES}>
      {children}
    </CtaLink>
  );
}

type FooterProps = {
  /** Páginas com barra fixa de CTA no celular reservam espaço para ela. */
  reserveStickyCtaSpace?: boolean;
};

export function Footer({ reserveStickyCtaSpace = false }: FooterProps) {
  const bottomSpace = reserveStickyCtaSpace
    ? "pb-36 md:pb-16"
    : "pb-12 sm:pb-16";

  return (
    <footer
      className={`border-t border-cloud/10 bg-pacific-deep px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 ${bottomSpace}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="font-display text-lg font-semibold text-cloud mb-4">PALMVY</p>
            <p className="text-sm text-muted">
              Apps e sites feitos com calma, sem enrolação e sem vender
              “experiência”.
            </p>
          </div>

          <div>
            <h2 className="text-sm text-cloud mb-2 font-medium">Produtos</h2>
            <ul>
              {PRODUCT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm text-cloud mb-2 font-medium">Empresa</h2>
            <ul>
              <li>
                <FooterLink href="/#sob-medida">Sob medida</FooterLink>
              </li>
              <li>
                <FooterLink href="/#como-trabalhamos">Como funciona</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm text-cloud mb-2 font-medium">Contato</h2>
            <ul>
              <li>
                <FooterLink href={`mailto:${CONTACT_EMAIL}`}>Email</FooterLink>
              </li>
              {CONTACT_LINK.isExternal && (
                <li>
                  <FooterLink href={CONTACT_LINK.href} isExternal>
                    WhatsApp
                  </FooterLink>
                </li>
              )}
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <FooterLink href={href} isExternal>
                    {label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cloud/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <p className="text-sm text-muted">
            © 2026 PALMVY. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <FooterLink href="/privacidade">Privacidade</FooterLink>
            <FooterLink href="/termos">Termos</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
