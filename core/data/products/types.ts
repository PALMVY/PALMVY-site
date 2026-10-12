export type ProductPlatform = "ios" | "android" | "web";

/** Print real do app. `src` aponta para um arquivo em /public. */
export type ProductScreenshot = {
  src: string;
  /** Descreve a tela para quem usa leitor de tela. */
  alt: string;
  width: number;
  height: number;
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

export type ProductFaq = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  name: string;
  tagline: string;
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
  /** Fundo do cartão que envolve a logo, quando ela não tem fundo transparente */
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
  /** Passos de uso, em ordem. A seção só aparece quando há passos. */
  steps?: ProductStep[];
  spotlight?: ProductSpotlight;
  /** Perguntas e respostas. A seção só aparece quando há perguntas. */
  faq?: ProductFaq[];
};
