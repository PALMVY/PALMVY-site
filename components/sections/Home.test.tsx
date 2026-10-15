import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Home from '@/app/page';
import { MANIFESTO } from '@/core/data/home';
import { PRICE_TIERS, formatPrice } from '@/core/data/pricing';
import { products } from '@/core/data/products';

const html = renderToStaticMarkup(<Home />);

const countMatches = (pattern: RegExp): number =>
  (html.match(pattern) ?? []).length;

const positionOf = (text: string): number => {
  const position = html.indexOf(text);
  expect(position, `"${text}" não aparece na home`).toBeGreaterThanOrEqual(0);
  return position;
};

describe('Home', () => {
  it('tem um único título principal', () => {
    expect(countMatches(/<h1[\s>]/g)).toBe(1);
  });

  it('mostra os produtos próprios antes do trabalho sob medida (80/20)', () => {
    expect(positionOf('id="produtos"')).toBeLessThan(
      positionOf('id="sob-medida"'),
    );
  });

  it('mostra o produto em destaque antes dos outros', () => {
    const featured = products.find((product) => product.featured);
    const others = products.filter((product) => !product.featured);
    if (!featured) return;

    for (const product of others) {
      expect(positionOf(`Conhecer o ${featured.name}`)).toBeLessThan(
        positionOf(`Conhecer o ${product.name}`),
      );
    }
  });

  it('leva cada produto para a própria landing page', () => {
    for (const { landingPage } of products) {
      if (landingPage) expect(html).toContain(`href="${landingPage}"`);
    }
  });

  it('também leva cada produto à landing pelo rodapé', () => {
    const footer = html.slice(html.indexOf('<footer'));
    for (const { landingPage } of products) {
      if (landingPage) expect(footer).toContain(`href="${landingPage}"`);
    }
  });

  // Sob medida pausado: preço anunciado vincula (CDC, art. 30), então some junto.
  it('avisa que o sob medida está pausado, sem mostrar preços', () => {
    expect(html).toContain('Projetos sob medida estão pausados.');
    for (const { startingPrice } of PRICE_TIERS) {
      expect(html).not.toContain(formatPrice(startingPrice));
    }
  });

  it('não leva ninguém para o WhatsApp', () => {
    expect(html).not.toContain('wa.me');
    expect(html).not.toContain('Vamos conversar?');
  });

  it('risca cada termo do manifesto', () => {
    for (const { struck } of MANIFESTO) {
      expect(html).toContain(`>${struck}</s>`);
    }
  });
});
