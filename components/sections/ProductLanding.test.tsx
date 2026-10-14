import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProductLanding } from '@/components/sections/ProductLanding';
import { getProductContactLink } from '@/core/data/contact';
import { products } from '@/core/data/products';
import { groupFaqByTopic } from '@/components/sections/ProductFaq';

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

describe('ProductLanding sem conteúdo extra (SafeZone)', () => {
  const html = renderLanding('safezone');

  it('mantém abertura, destaques e contato', () => {
    expect(html).toContain('SafeZone');
    expect(html).toContain('Destaques');
    expect(html).toContain('Quer acompanhar o SafeZone?');
  });

  it('não cria seções vazias', () => {
    expect(html).not.toContain('Como funciona');
    expect(html).not.toContain('Perguntas frequentes');
    expect(html).not.toContain('<details');
  });
});

describe('ProductLanding do TuneLab', () => {
  const html = renderLanding('tunelab');
  const tunelab = products.find(({ id }) => id === 'tunelab');

  it('mostra os passos e as perguntas, sem a seção de ritmo', () => {
    expect(html).toContain('Como funciona');
    expect(html).toContain('Perguntas frequentes');
    expect(countMatches(html, /<details[\s>]/g)).toBe(tunelab?.faq?.length);
  });

  it('dá texto alternativo a todas as imagens', () => {
    const images = html.match(/<img\b[^>]*>/g) ?? [];

    expect(images.length).toBeGreaterThan(0);
    for (const image of images) {
      expect(image).toMatch(/\balt="[^"]+"/);
    }
  });
});

describe('ProductLanding: perguntas agrupadas', () => {
  it('junta perguntas seguidas do mesmo tópico, na ordem dos dados', () => {
    const groups = groupFaqByTopic([
      { topic: 'A', question: '1', answer: '' },
      { topic: 'A', question: '2', answer: '' },
      { topic: 'B', question: '3', answer: '' },
      { question: '4', answer: '' },
    ]);

    expect(groups.map(({ topic, items }) => [topic, items.length])).toEqual([
      ['A', 2],
      ['B', 1],
      [undefined, 1],
    ]);
  });

  it('mostra cada tópico do Sossegue com no máximo quatro perguntas', () => {
    const html = renderLanding('sossegue');
    const sossegue = products.find(({ id }) => id === 'sossegue');
    const groups = groupFaqByTopic(sossegue?.faq ?? []);

    expect(groups.length).toBeGreaterThan(1);
    for (const { topic, items } of groups) {
      expect(html).toContain(`>${topic}</h3>`);
      expect(items.length).toBeLessThanOrEqual(4);
    }
  });
});

describe('ProductLanding: texto de contato', () => {
  it('não promete WhatsApp quando o botão leva para outro canal', () => {
    for (const product of products) {
      const html = renderToStaticMarkup(<ProductLanding product={product} />);
      const href = getProductContactLink(product).href;
      const promisesWhatsApp = html.includes('acontece no WhatsApp');

      expect(promisesWhatsApp).toBe(href.startsWith('https://wa.me/'));
      expect(href.startsWith('/')).toBe(false);
    }
  });
});
