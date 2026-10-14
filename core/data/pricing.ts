export type ProjectKind = 'landing' | 'site' | 'app';

export type PriceTier = {
  kind: ProjectKind;
  name: string;
  /** O que o preço inicial cobre. É isso que o "a partir de" promete. */
  scope: string;
  /** Valor inicial em reais, sem centavos. */
  startingPrice: number;
};

// Fonte única dos preços: a seção "Sob medida" e o seletor de orçamento leem daqui.
export const PRICE_TIERS: readonly PriceTier[] = [
  {
    kind: 'landing',
    name: 'Landing page',
    scope: 'Uma página, com foco em conversão',
    startingPrice: 2900,
  },
  {
    kind: 'site',
    name: 'Site institucional',
    scope: 'Até 5 páginas',
    startingPrice: 5000,
  },
  {
    kind: 'app',
    name: 'App mobile',
    scope: 'iOS e Android, com login e API',
    startingPrice: 20000,
  },
];

/** O que entra em qualquer projeto sob medida, independente do tipo. */
export const ALWAYS_INCLUDED: readonly string[] = [
  'Design do zero, sem template',
  'Rápido em qualquer tela',
  'Publicado no seu domínio ou nas lojas',
  'O código é seu',
];

const BRL_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number): string =>
  BRL_FORMATTER.format(value);

export const findPriceTier = (kind: ProjectKind): PriceTier | undefined =>
  PRICE_TIERS.find((tier) => tier.kind === kind);
