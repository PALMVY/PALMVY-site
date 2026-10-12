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

const FALLBACK_LINK: ContactLink = {
  href: '/#como-trabalhamos',
  isExternal: false,
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

export const getProductContactLink = (
  product: Pick<Product, 'name' | 'status'>,
  phone: string | undefined = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
): ContactLink => buildContactLink(phone, buildProductMessage(product));

export const getSocialLinks = (
  links: SocialLink[] = SOCIAL_LINKS,
): { label: string; href: string }[] =>
  links.flatMap(({ label, href }) =>
    href && href.startsWith('https://') ? [{ label, href }] : [],
  );
