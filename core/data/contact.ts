import { formatPrice, type PriceTier } from '@/core/data/pricing';
import type { Product } from '@/core/data/products';

export type ContactLink = {
  href: string;
  isExternal: boolean;
};

export const CONTACT_EMAIL = 'hello@palmvy.com.br';

export type SocialLink = {
  label: string;
  href: string | null;
};

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/palmvyco/' },
  { label: 'Twitter/X', href: 'https://x.com/palmvyco' },
  { label: 'Dev.to', href: 'https://dev.to/palmvyco' },
];

const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da PALMVY e gostaria de conversar sobre um projeto.';

const WHATSAPP_PHONE_PATTERN = /^\d{10,15}$/;

// Sem WhatsApp, o contato geral leva à seção de orçamento, que tem o próprio
// fallback por e-mail. Antes ia para "Como funciona", que não tem ação.
const FALLBACK_LINK: ContactLink = {
  href: '/#contato',
  isExternal: false,
};

const buildEmailLink = (subject: string, body: string): ContactLink => {
  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { href: `mailto:${CONTACT_EMAIL}?${query}`, isExternal: false };
};

export const buildContactLink = (
  phone: string | undefined,
  message: string = DEFAULT_WHATSAPP_MESSAGE,
): ContactLink => {
  if (!phone || !WHATSAPP_PHONE_PATTERN.test(phone)) {
    return FALLBACK_LINK;
  }

  return {
    href: `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    isExternal: true,
  };
};

export const CONTACT_LINK = buildContactLink(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
);

const buildProductMessage = ({
  name,
  status,
}: Pick<Product, 'name' | 'status'>): string =>
  status === 'launched'
    ? `Olá! Gostaria de saber mais sobre o ${name}.`
    : `Olá! Tenho interesse no ${name} e gostaria de ser avisado quando lançar.`;

/**
 * Contato de uma landing. Sem número válido, cai no e-mail com a mesma
 * mensagem: voltar para a home faria a pessoa perder o produto de vista.
 */
export const getProductContactLink = (
  product: Pick<Product, 'name' | 'status'>,
  phone: string | undefined = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
): ContactLink => {
  const message = buildProductMessage(product);
  const whatsappLink = buildContactLink(phone, message);
  if (whatsappLink.isExternal) return whatsappLink;

  const subject =
    product.status === 'launched'
      ? `Sobre o ${product.name}`
      : `${product.name}: aviso de lançamento`;

  return buildEmailLink(subject, message);
};

export type ContactChannel = 'whatsapp' | 'email' | 'page';

/** Para onde o link leva; o texto de apoio dos CTAs depende disso. */
export const getContactChannel = ({ href }: ContactLink): ContactChannel => {
  if (href.startsWith('https://wa.me/')) return 'whatsapp';
  if (href.startsWith('mailto:')) return 'email';
  return 'page';
};

export const buildQuoteMessage = (tier: PriceTier | undefined): string =>
  tier
    ? `Olá! Vim pelo site da PALMVY e quero um orçamento de ${tier.name} (a partir de ${formatPrice(tier.startingPrice)}).`
    : DEFAULT_WHATSAPP_MESSAGE;

/**
 * Link de orçamento sob medida. Vai para o WhatsApp com a mensagem pronta;
 * sem número válido, cai no e-mail (o fallback padrão levaria de volta à
 * própria página, o que não ajuda quem já está pedindo orçamento).
 */
export const getQuoteContactLink = (
  tier: PriceTier | undefined,
  phone: string | undefined = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
): ContactLink => {
  const message = buildQuoteMessage(tier);
  const whatsappLink = buildContactLink(phone, message);
  if (whatsappLink.isExternal) return whatsappLink;

  const subject = tier ? `Orçamento: ${tier.name}` : 'Orçamento';

  return buildEmailLink(subject, message);
};

export const getSocialLinks = (
  links: SocialLink[] = SOCIAL_LINKS,
): { label: string; href: string }[] =>
  links.flatMap(({ label, href }) =>
    href && href.startsWith('https://') ? [{ label, href }] : [],
  );
