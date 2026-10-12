import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProductLanding } from '@/components/sections/ProductLanding';
import { products } from '@/core/data/products';

const renderLanding = (productId: string): string => {
  const product = products.find(({ id }) => id === productId);
  if (!product) throw new Error(`Produto ${productId} não encontrado`);

  return renderToStaticMarkup(<ProductLanding product={product} />);
};

const countMatches = (html: string, pattern: RegExp): number =>
  (html.match(pattern) ?? []).length;

describe('ProductLanding com conteúdo completo (Sossegue)', () => {
  const html = renderLanding('sossegue');
  const sossegue = products.find(({ id }) => id === 'sossegue');

  it('tem um único título principal', () => {
    expect(countMatches(html, /<h1[\s>]/g)).toBe(1);
  });

  it('mostra as seções de uso, ritmo e perguntas', () => {
    expect(html).toContain('Como funciona');
    expect(html).toContain(sossegue?.spotlight?.title);
    expect(html).toContain('Perguntas frequentes');
  });

  it('lista os passos em ordem', () => {
    const titles = sossegue?.steps?.map(({ title }) => title) ?? [];
    const positions = titles.map((title) => html.indexOf(title));

    expect(titles.length).toBeGreaterThan(0);
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it('usa um bloco recolhível para cada pergunta', () => {
    expect(countMatches(html, /<details[\s>]/g)).toBe(sossegue?.faq?.length);
  });

  it('dá texto alternativo a todas as imagens', () => {
    const images = html.match(/<img\b[^>]*>/g) ?? [];

    expect(images.length).toBeGreaterThan(0);
    for (const image of images) {
      expect(image).toMatch(/\balt="[^"]+"/);
    }
  });
});

describe('ProductLanding sem conteúdo extra (TuneLab)', () => {
  const html = renderLanding('tunelab');

  it('mantém abertura, destaques e contato', () => {
    expect(html).toContain('TuneLab');
    expect(html).toContain('Destaques');
    expect(html).toContain('Quer acompanhar o TuneLab?');
  });

  it('não cria seções vazias', () => {
    expect(html).not.toContain('Como funciona');
    expect(html).not.toContain('Perguntas frequentes');
    expect(html).not.toContain('<details');
  });
});
