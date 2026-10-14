import type { Product, ProductScreenshot } from "./types";

// Todas as telas têm o mesmo tamanho (ver public/images/products/tunelab-app).
const APP_SCREEN_SIZE = { width: 720, height: 1512 } as const;

const IMAGES_BASE = "/images/products/tunelab-app";

const screens = {
  escaneie: {
    src: `${IMAGES_BASE}/escaneie.webp`,
    alt: "Tela Escaneie seu veículo do TuneLab com quatro fotos para capturar (frente, lateral, traseira e motor), campo opcional para o modelo do carro e campo para dizer o que você busca.",
    ...APP_SCREEN_SIZE,
  },
  garagem: {
    src: `${IMAGES_BASE}/garagem.webp`,
    alt: "Tela inicial do TuneLab com a garagem Meus carros, o saldo de créditos e sugestões de modificações para você.",
    ...APP_SCREEN_SIZE,
  },
} satisfies Record<string, ProductScreenshot>;

export const tunelab: Product = {
  id: "tunelab",
  name: "TuneLab",
  tagline: "IA que entende seu carro",
  category: "IA · Carros",
  description:
    "App mobile para entusiastas de carros. Analisa o veículo por fotos e texto e sugere tunagens de aparência e performance de forma educativa.",
  status: "coming-soon",
  platforms: ["ios", "android"],
  highlights: [
    "Analisa o veículo por fotos e texto",
    "Sugere tunagens de aparência e performance",
    "Apresenta tudo de forma educativa",
  ],
  accentColor: "bg-gold",
  tone: "light",
  logoBg: "bg-pacific-night",
  image: `${IMAGES_BASE}/tunelab.png`,
  featured: false,
  landingPage: "/produtos/tunelab",
  heroScreenshots: [screens.escaneie, screens.garagem],
  steps: [
    {
      title: "Fotografe seu carro",
      description:
        "Tire fotos da frente, da lateral, da traseira e do motor. Se quiser, informe marca, modelo e ano e conte o que você busca: mais potência, um visual mais agressivo ou os dois.",
      screenshot: screens.escaneie,
    },
    {
      title: "Guarde seus projetos na garagem",
      description:
        "A Mia, a IA do TuneLab, analisa o seu carro e traz sugestões de modificações. Seus carros e projetos ficam na garagem do app, para você voltar quando quiser.",
      screenshot: screens.garagem,
    },
  ],
  faq: [
    {
      topic: "O app",
      question: "O que é o TuneLab?",
      answer:
        "Um app mobile para entusiastas de carros. Você fotografa o veículo e a Mia, a IA do TuneLab, sugere modificações de aparência e performance de forma educativa.",
    },
    {
      topic: "O app",
      question: "Para quem é o TuneLab?",
      answer:
        "Para entusiastas de carros em geral, de quem está começando a pensar em um projeto a quem já tem o carro modificado.",
    },
    {
      topic: "O app",
      question: "Como a análise funciona?",
      answer:
        "Você tira fotos da frente, da lateral, da traseira e do motor e conta o que busca. A Mia usa isso para montar as sugestões para o seu carro.",
    },
    {
      topic: "O app",
      question: "Preciso informar o modelo do carro?",
      answer:
        "Não, é opcional. Mas informar marca, modelo e ano deixa as peças sugeridas muito mais precisas.",
    },
    {
      topic: "Limites e lançamento",
      question: "Os valores e os ganhos de potência são garantidos?",
      answer:
        "Não. São estimativas com objetivo educativo. Custos e resultados variam conforme o carro, as peças e a oficina, então confirme tudo com um profissional antes de qualquer modificação.",
    },
    {
      topic: "Limites e lançamento",
      question: "As modificações sugeridas são legais?",
      answer:
        "Cada modificação precisa respeitar a legislação de trânsito em vigor. Antes de instalar qualquer peça, consulte um profissional e confirme as regras que valem para o seu carro.",
    },
    {
      topic: "Limites e lançamento",
      question: "O TuneLab substitui a oficina ou o preparador?",
      answer:
        "Não. Ele ajuda você a entender as possibilidades e a chegar mais preparado à conversa com o profissional que vai fazer o trabalho.",
    },
    {
      topic: "Limites e lançamento",
      question: "Quando o TuneLab chega?",
      answer:
        "Em breve. Se quiser ser avisado quando ele sair, chame a gente no WhatsApp.",
    },
  ],
};
