import { describe, expect, it } from 'vitest';
import {
  ALWAYS_INCLUDED,
  PRICE_TIERS,
  findPriceTier,
  formatPrice,
} from '@/core/data/pricing';

describe('formatPrice', () => {
  it('formata em reais, sem centavos', () => {
    // O Intl separa "R$" do número com um espaço especial; por isso o \s.
    expect(formatPrice(2900)).toMatch(/^R\$\s2\.900$/);
    expect(formatPrice(20000)).toMatch(/^R\$\s20\.000$/);
  });
});

describe('PRICE_TIERS', () => {
  it('tem um tipo por faixa, sem repetição', () => {
    const kinds = PRICE_TIERS.map(({ kind }) => kind);

    expect(new Set(kinds).size).toBe(kinds.length);
  });

  it('só tem valores inteiros e positivos', () => {
    for (const { name, startingPrice } of PRICE_TIERS) {
      expect(Number.isInteger(startingPrice), name).toBe(true);
      expect(startingPrice, name).toBeGreaterThan(0);
    }
  });

  it('mantém as faixas em ordem crescente de preço', () => {
    const prices = PRICE_TIERS.map(({ startingPrice }) => startingPrice);

    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('descreve o escopo de cada faixa, porque é ele que o preço promete', () => {
    for (const { name, scope } of PRICE_TIERS) {
      expect(scope.trim(), name).not.toBe('');
    }
  });

  it('lista o que vem incluso em todo projeto', () => {
    expect(ALWAYS_INCLUDED.length).toBeGreaterThan(0);
  });
});

describe('findPriceTier', () => {
  it('encontra a faixa pelo tipo', () => {
    expect(findPriceTier('app')?.startingPrice).toBe(20000);
  });
});
