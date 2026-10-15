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
import { PACOTES_TUNELAB } from '@/core/data/products/tunelab';
import { formatCents } from '@/core/data/pricing';

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

describe('preço dos produtos', () => {
  const withPricing = products.filter(({ pricing }) => pricing);

  it('o TuneLab mostra os pacotes de análise', () => {
    expect(products.find(({ id }) => id === 'tunelab')?.pricing).toBeDefined();
  });

  it('cada pacote tem créditos e preço inteiros e positivos', () => {
    for (const { id, pricing } of withPricing) {
      for (const { credits, priceInCents } of pricing?.packs ?? []) {
        expect(Number.isInteger(credits) && credits > 0, id).toBe(true);
        expect(Number.isInteger(priceInCents) && priceInCents > 0, id).toBe(true);
      }
    }
  });

  // Pacote maior que sai mais caro por crédito seria erro de digitação.
  it('pacotes maiores nunca saem mais caros por crédito', () => {
    for (const { id, pricing } of withPricing) {
      const packs = pricing?.packs ?? [];
      const perCredit = packs.map(({ credits, priceInCents }) => priceInCents / credits);

      expect(packs.map(({ credits }) => credits), id).toEqual(
        [...packs.map(({ credits }) => credits)].sort((a, b) => a - b),
      );
      expect(perCredit, id).toEqual([...perCredit].sort((a, b) => b - a));
    }
  });
});

describe('TuneLab', () => {
  const tunelab = products.find(({ id }) => id === 'tunelab');
  const faq = tunelab?.faq ?? [];
  const priceAnswer = faq.find(({ question }) => question === 'O TuneLab é pago?')?.answer ?? '';

  it('sai primeiro no Android: não anuncia iOS como disponível', () => {
    expect(tunelab?.platforms).toEqual(['android']);
  });

  it('a resposta de preço cita cada pacote, lida da mesma constante da seção', () => {
    expect(PACOTES_TUNELAB.length).toBeGreaterThan(0);
    expect(tunelab?.pricing?.packs).toBe(PACOTES_TUNELAB);
    for (const pack of PACOTES_TUNELAB) {
      expect(priceAnswer).toContain(formatCents(pack.priceInCents));
    }
  });

  it('responde sobre privacidade das fotos logo depois de explicar a análise', () => {
    const questions = faq.map(({ question }) => question);
    const privacy = questions.indexOf('Minhas fotos ficam públicas?');

    expect(privacy).toBe(questions.indexOf('Como a análise funciona?') + 1);
    expect(faq[privacy]?.topic).toBe('Privacidade');
  });

  it('avisa que a tela com valores de ganho é exemplo, na abertura e no passo 2', () => {
    const caption = 'Exemplo ilustrativo. Os valores são estimativas.';

    expect(tunelab?.heroScreenshots?.some((screen) => screen.caption === caption)).toBe(true);
    expect(tunelab?.steps?.[1]?.screenshot.caption).toBe(caption);
  });
});

describe('Sossegue', () => {
  const sossegue = products.find(({ id }) => id === 'sossegue');
  const texts = [
    sossegue?.tagline,
    sossegue?.description,
    ...(sossegue?.highlights ?? []),
    ...(sossegue?.painPoints?.items ?? []),
    ...(sossegue?.steps?.flatMap(({ title, description }) => [title, description]) ?? []),
    ...(sossegue?.spotlight ? [sossegue.spotlight.description, ...sossegue.spotlight.points] : []),
    ...(sossegue?.faq?.flatMap(({ question, answer }) => [question, answer]) ?? []),
  ].join(' ');

  it('sai primeiro no Android: não anuncia iOS como disponível', () => {
    expect(sossegue?.platforms).toEqual(['android']);
  });

  // Fora do lançamento: Fôlego de Caixa, notificações e níveis de acolhimento.
  it('não promete o que não existe no lançamento', () => {
    expect(texts).not.toMatch(/fôlego|notifica|acolhimento/i);
  });

  it('abre com a dor, em três frases', () => {
    expect(sossegue?.painPoints?.items).toHaveLength(3);
  });

  it('marca o áudio como "em breve"', () => {
    expect(texts).toMatch(/áudio em breve/i);
  });
});
