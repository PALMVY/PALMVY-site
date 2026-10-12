import { readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  LANDING_ROUTE_BASE,
  findProductByLandingSlug,
  getLandingSlugs,
  products,
  type Product,
  type ProductScreenshot,
} from '@/core/data/products';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Confere letra por letra (maiúsculas incluídas) porque o Windows ignora a
// diferença, mas o servidor da Vercel (Linux) não.
const existsInPublic = (src: string): boolean => {
  let current = PUBLIC_DIR;

  for (const segment of src.split('/').filter(Boolean)) {
    if (!readdirSync(current).includes(segment)) return false;
    current = path.join(current, segment);
  }

  return true;
};

const getScreenshots = (product: Product): ProductScreenshot[] => [
  ...(product.heroScreenshots ?? []),
  ...(product.steps?.map(({ screenshot }) => screenshot) ?? []),
  ...(product.spotlight?.screenshots ?? []),
];

const getImageSources = (product: Product): string[] => [
  ...(product.image ? [product.image] : []),
  ...getScreenshots(product).map(({ src }) => src),
];

describe('products', () => {
  it('tem ids únicos', () => {
    const ids = products.map((product) => product.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('tem no máximo um produto em destaque', () => {
    const featured = products.filter((product) => product.featured);

    expect(featured.length).toBeLessThanOrEqual(1);
  });

  it('tem ao menos um destaque por produto', () => {
    for (const product of products) {
      expect(product.highlights.length, product.name).toBeGreaterThan(0);
    }
  });

  it('usa rotas internas, únicas e no padrão /produtos/<slug>', () => {
    const landingPages = products.flatMap((product) =>
      product.landingPage ? [product.landingPage] : [],
    );

    for (const route of landingPages) {
      expect(route).toMatch(new RegExp(`^${LANDING_ROUTE_BASE}/[a-z0-9-]+$`));
    }
    expect(new Set(landingPages).size).toBe(landingPages.length);
  });
});

describe('imagens dos produtos', () => {
  it.each(products.map((product) => [product.name, product] as const))(
    '%s só aponta para arquivos que existem em public/',
    (_name, product) => {
      for (const src of getImageSources(product)) {
        expect(src, src).toMatch(/^\/images\//);
        expect(existsInPublic(src), `${src} não existe em public/`).toBe(true);
      }
    },
  );

  it('descreve cada tela com texto alternativo e tamanho válidos', () => {
    for (const product of products) {
      for (const screenshot of getScreenshots(product)) {
        expect(screenshot.alt.trim().length, screenshot.src).toBeGreaterThan(20);
        expect(screenshot.width, screenshot.src).toBeGreaterThan(0);
        expect(screenshot.height, screenshot.src).toBeGreaterThan(0);
      }
    }
  });

  it('mostra no máximo duas telas na abertura e no bloco de destaque', () => {
    for (const product of products) {
      expect(product.heroScreenshots?.length ?? 0, product.name).toBeLessThanOrEqual(2);
      expect(product.spotlight?.screenshots.length ?? 0, product.name).toBeLessThanOrEqual(2);
    }
  });
});

describe('conteúdo das landing pages', () => {
  it('não deixa seções opcionais vazias ou com texto em branco', () => {
    for (const product of products) {
      const { steps, spotlight, faq } = product;

      if (steps) expect(steps.length, product.name).toBeGreaterThan(0);
      if (faq) expect(faq.length, product.name).toBeGreaterThan(0);
      if (spotlight) expect(spotlight.points.length, product.name).toBeGreaterThan(0);

      const texts = [
        ...(steps?.flatMap(({ title, description }) => [title, description]) ?? []),
        ...(faq?.flatMap(({ question, answer }) => [question, answer]) ?? []),
        ...(spotlight ? [spotlight.title, spotlight.description, ...spotlight.points] : []),
      ];

      for (const text of texts) {
        expect(text.trim(), `${product.name}: texto vazio`).not.toBe('');
      }
    }
  });

  it('usa perguntas únicas em cada produto', () => {
    for (const product of products) {
      const questions = product.faq?.map(({ question }) => question) ?? [];

      expect(new Set(questions).size, product.name).toBe(questions.length);
    }
  });
});

describe('landing pages', () => {
  it('gera um slug para cada produto com landing page', () => {
    const expected = products.filter((product) => product.landingPage);

    expect(getLandingSlugs()).toHaveLength(expected.length);
  });

  it('encontra o produto pelo slug e ignora slugs desconhecidos', () => {
    for (const slug of getLandingSlugs()) {
      expect(findProductByLandingSlug(slug)?.landingPage).toBe(
        `${LANDING_ROUTE_BASE}/${slug}`,
      );
    }
    expect(findProductByLandingSlug('nao-existe')).toBeUndefined();
    expect(findProductByLandingSlug('../etc')).toBeUndefined();
  });
});
