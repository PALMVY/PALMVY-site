import type { CreditPack } from "../pricing";

export type ProductPlatform = "ios" | "android" | "web";

/** Print real do app. `src` aponta para um arquivo em /public. */
export type ProductScreenshot = {
  src: string;
  /** Descreve a tela para quem usa leitor de tela. */
  alt: string;
  width: number;
  height: number;
  /** Legenda visível abaixo da tela (ex.: aviso de que os valores são exemplo). */
  caption?: string;
};

export type ProductStep = {
  title: string;
  description: string;
  screenshot: ProductScreenshot;
};

/** Bloco de destaque com texto, pontos curtos e até duas telas. */
export type ProductSpotlight = {
  title: string;
  description: string;
  points: string[];
  screenshots: ProductScreenshot[];
};

/** A dor que o produto resolve, logo depois da abertura. */
export type ProductPainPoints = {
  title: string;
  items: string[];
};

/** Seção de preço da landing, para apps vendidos em pacotes de créditos. */
export type ProductPricing = {
  title: string;
  description: string;
  /** Do menor para o maior; o preço por crédito é calculado, nunca digitado. */
  packs: readonly CreditPack[];
  /** Regras que valem para qualquer pacote. */
  included: string[];
  /** Ressalva abaixo da régua (ex.: preço previsto antes do lançamento). */
  note?: string;
};

export type ProductFaq = {
  /**
   * Grupo da pergunta. Perguntas seguidas com o mesmo tópico aparecem juntas,
   * com o tópico como subtítulo. Use quando a lista passar de quatro itens.
   */
  topic?: string;
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  name: string;
  tagline: string;
  /** Área do produto, exibida no card da home (ex.: "Finanças · MEI"). */
  category: string;
  description: string;
  status: "launched" | "coming-soon";
  platforms: ProductPlatform[];
  /** Pontos de destaque exibidos na landing page (derivados da descrição do produto). */
  highlights: string[];
  downloadLinks?: {
    ios?: string;
    android?: string;
    web?: string;
  };
  /** Cor sólida de identidade do produto (classe Tailwind, ex: "bg-pacific-blue") */
  accentColor: string;
  /** Tom do fundo do painel: "light" pede texto/linhas escuras, "dark" pede claras */
  tone: "light" | "dark";
  /**
   * Fundo do cartão que envolve uma logo transparente. Sem ele, a própria
   * imagem é o cartão (logo que já vem com fundo, como a do TuneLab).
   */
  logoBg?: string;
  /** Logo do produto (arquivo em /public). */
  image?: string;
  /** Tamanho real do arquivo da logo; evita o salto de layout ao carregar. */
  imageSize?: { width: number; height: number };
  featured?: boolean;
  /** Rota da landing page do produto (ex.: "/produtos/sossegue"). Sem ela, o botão "Conhecer" não aparece. */
  landingPage?: string;
  /**
   * Telas da abertura da landing: a primeira é a principal (na frente) e a
   * segunda aparece atrás. Sem elas, a abertura mostra a logo do produto.
   */
  heroScreenshots?: ProductScreenshot[];
  /** Situações que o público reconhece. A seção só aparece quando existe. */
  painPoints?: ProductPainPoints;
  /** Passos de uso, em ordem. A seção só aparece quando há passos. */
  steps?: ProductStep[];
  spotlight?: ProductSpotlight;
  /** Pacotes e regras de preço. A seção só aparece quando existe. */
  pricing?: ProductPricing;
  /** Perguntas e respostas. A seção só aparece quando há perguntas. */
  faq?: ProductFaq[];
};
