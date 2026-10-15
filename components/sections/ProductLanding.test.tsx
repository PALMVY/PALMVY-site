import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProductLanding } from '@/components/sections/ProductLanding';
import { INSTAGRAM_URL } from '@/core/data/contact';
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

describe('ProductLanding: contato', () => {
  it('convida a acompanhar no Instagram, sem WhatsApp', () => {
    for (const product of products) {
      const html = renderToStaticMarkup(<ProductLanding product={product} />);

      expect(html).toContain(`href="${INSTAGRAM_URL}"`);
      expect(html).toContain('Acompanhar no Instagram');
      // O FAQ do Sossegue cita o WhatsApp de propósito; o CTA não pode.
      expect(html).not.toContain('wa.me');
      expect(html).not.toContain('acontece no WhatsApp');
    }
  });
});

describe('ProductLanding: barra fixa de contato no celular', () => {
  it('é um landmark rotulado, único em cada landing', () => {
    for (const product of products) {
      const html = renderToStaticMarkup(<ProductLanding product={product} />);

      expect(countMatches(html, /<aside aria-label="Contato rápido"/g)).toBe(1);
    }
  });

  // A barra fica visível o tempo todo; no fim do DOM, o leitor de tela e o
  // teclado só chegavam nela depois da página inteira.
  it('vem logo depois da abertura, antes dos destaques', () => {
    for (const product of products) {
      const html = renderToStaticMarkup(<ProductLanding product={product} />);
      const barPosition = html.indexOf('aria-label="Contato rápido"');

      expect(barPosition).toBeGreaterThan(html.indexOf('<h1'));
      expect(barPosition).toBeLessThan(html.indexOf('Destaques'));
    }
  });
});

describe('ProductLanding: preço', () => {
  // O Intl separa "R$" do número com um espaço especial.
  const brl = (value: string): RegExp => new RegExp(`R\\$\\s${value}`);

  it('mostra cada pacote do TuneLab com o preço por análise calculado', () => {
    const html = renderLanding('tunelab');

    expect(html).toContain('aria-labelledby="preco-titulo"');
    for (const value of ['6,90', '24,90', '59,90', '4,98', '3,99']) {
      expect(html).toMatch(brl(value));
    }
  });

  it('vem antes das perguntas', () => {
    const html = renderLanding('tunelab');
    const faqStart = html.indexOf('Perguntas frequentes');

    const pricingStart = html.indexOf('preco-titulo');

    expect(pricingStart).toBeGreaterThan(-1);
    expect(pricingStart).toBeLessThan(faqStart);
  });

  it('não aparece em produto sem pacotes', () => {
    for (const id of ['sossegue', 'safezone']) {
      expect(renderLanding(id)).not.toContain('preco-titulo');
    }
  });
});

describe('ProductLanding do TuneLab: avisos', () => {
  const html = renderLanding('tunelab');
  const caption = 'Exemplo ilustrativo. Os valores são estimativas.';

  it('mostra a legenda de exemplo na abertura e no passo 2', () => {
    expect(countMatches(html, new RegExp(caption.replace('.', '\.'), 'g'))).toBe(2);
  });

});

describe('ProductLanding sem legenda nas telas (Sossegue)', () => {
  it('não mostra legenda de exemplo', () => {
    expect(renderLanding('sossegue')).not.toContain('Exemplo ilustrativo');
  });
});

describe('ProductLanding: seção de dor', () => {
  it('aparece no Sossegue entre a abertura e os destaques', () => {
    const html = renderLanding('sossegue');
    const pain = html.indexOf('aria-labelledby="dor-titulo"');

    expect(pain).toBeGreaterThan(html.indexOf('<h1'));
    expect(pain).toBeLessThan(html.indexOf('Destaques'));
    expect(html).toContain('Seu negócio não deveria morar na sua cabeça.');
  });

  it('não aparece em produto sem dores cadastradas', () => {
    expect(renderLanding('tunelab')).not.toContain('dor-titulo');
  });
});
