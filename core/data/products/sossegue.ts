import type { Product, ProductScreenshot } from "./types";

// Todas as telas têm o mesmo tamanho (ver public/images/products/sossegue-app).
const APP_SCREEN_SIZE = { width: 720, height: 1403 } as const;

const IMAGES_BASE = "/images/products/sossegue-app";

const screens = {
  conversa: {
    src: `${IMAGES_BASE}/conversa.webp`,
    alt: "Conversa do Sossegue pedindo para você contar um atendimento, um recebimento ou um gasto do jeito que falaria.",
    ...APP_SCREEN_SIZE,
  },
  painel: {
    src: `${IMAGES_BASE}/painel.webp`,
    alt: "Painel do Sossegue com o mês sob controle: quanto entrou, quanto falta receber, quanto dá para retirar e 19 dias de fôlego de caixa.",
    ...APP_SCREEN_SIZE,
  },
  historico: {
    src: `${IMAGES_BASE}/historico.webp`,
    alt: "Histórico do Sossegue com entradas, gastos e valores a receber organizados por dia.",
    ...APP_SCREEN_SIZE,
  },
  perfil: {
    src: `${IMAGES_BASE}/perfil.webp`,
    alt: "Perfil do Sossegue com os ajustes de notificações, lembretes e cobranças.",
    ...APP_SCREEN_SIZE,
  },
  boasVindas: {
    src: `${IMAGES_BASE}/boas-vindas.webp`,
    alt: "Boas-vindas do Sossegue: vamos organizar seu negócio sem complicação, sem planilha e sem sistema chato.",
    ...APP_SCREEN_SIZE,
  },
} satisfies Record<string, ProductScreenshot>;

export const sossegue: Product = {
  id: "sossegue",
  name: "Sossegue",
  tagline: "Clareza e alívio para quem trabalha por conta",
  category: "Finanças · MEI",
  description:
    "Feito para MEIs e autônomos que sabem fazer o trabalho, mas carregam a ansiedade de não saber se o negócio está bem. O Sossegue mostra, de forma humana, o que importa, sem planilha e sem sistema chato.",
  status: "coming-soon",
  platforms: ["ios", "android"],
  highlights: [
    "Painel calmo que mostra se o seu mês está sob controle",
    "Conversa natural por texto ou áudio, sem aprender sistema",
    "Clientes, cobranças e fôlego do negócio em um só lugar",
  ],
  accentColor: "bg-pacific-blue",
  tone: "dark",
  logoBg: "bg-cloud",
  image: `${IMAGES_BASE}/logo.png`,
  imageSize: { width: 391, height: 118 },
  featured: true,
  landingPage: "/produtos/sossegue",
  heroScreenshots: [screens.painel, screens.conversa],
  steps: [
    {
      title: "Conte o que aconteceu",
      description:
        "Escreva ou grave um áudio do jeito que você falaria. Por exemplo: “Atendi a Juliana, 180, ela paga sexta”. Não tem formulário nem campo para preencher.",
      screenshot: screens.conversa,
    },
    {
      title: "Tudo fica registrado",
      description:
        "Cada entrada, gasto e valor a receber vai para o histórico, organizado por dia. Você acompanha o mês sem montar planilha.",
      screenshot: screens.historico,
    },
    {
      title: "Veja se o mês está sob controle",
      description:
        "O painel mostra quanto entrou, quanto falta receber e quanto você pode tirar. O Fôlego de Caixa conta por quantos dias o negócio se sustenta sem novas entradas.",
      screenshot: screens.painel,
    },
  ],
  spotlight: {
    title: "No seu ritmo, sem pressão",
    description:
      "O Sossegue se adapta a como você trabalha. Nada de aviso gritando na tela.",
    points: [
      "Avisos sem urgência, no seu ritmo",
      "Lembretes e cobranças com tom de voz gentil",
      "Você define o nível de acolhimento do app",
    ],
    screenshots: [screens.perfil, screens.boasVindas],
  },
  faq: [
    {
      topic: "O app",
      question: "O que é o Sossegue?",
      answer:
        "É o painel de paz do seu negócio. Ele mostra, de forma simples e humana, como está o seu mês, quem precisa de atenção e quantos dias de fôlego você ainda tem — sem planilha e sem você precisar virar administrador.",
    },
    {
      topic: "O app",
      question: "Para quem é o Sossegue?",
      answer:
        "Para MEIs, autônomos e prestadores de serviço que sabem fazer o trabalho, mas carregam a ansiedade de não saber se o negócio está bem.",
    },
    {
      topic: "O app",
      question: "É mais um controle financeiro?",
      answer:
        "Não. A maioria dos apps organiza gastos pessoais (iFood, Uber, contas da casa). O Sossegue existe para uma dor diferente: a clareza e o alívio em relação ao seu negócio (clientes, valores a receber e fôlego).",
    },
    {
      topic: "O app",
      question: "Preciso entender de tecnologia ou sistema?",
      answer:
        "Não. A ideia é exatamente o contrário. Você conversa naturalmente (por texto ou áudio) e o painel te devolve a informação de forma calma e clara.",
    },
    {
      topic: "No dia a dia",
      question: "Como funciona a conversa?",
      answer:
        "Você fala do jeito que fala no dia a dia, por exemplo: “Atendi a Carla hoje, R$180, ela vai pagar na sexta”, “Recebi os 180 da Juliana” ou “O Pedro tá devendo faz tempo”. O Sossegue organiza e atualiza o painel.",
    },
    {
      topic: "No dia a dia",
      question: "O que é o Fôlego de Caixa?",
      answer:
        "É o número de dias que o seu negócio se sustenta sem novas entradas. Você vê esse número no painel, junto com o que entrou no mês e o que ainda falta receber.",
    },
    {
      topic: "No dia a dia",
      question: "Vai funcionar pelo WhatsApp?",
      answer:
        "Na fase inicial a conversa pode acontecer pelo WhatsApp para facilitar. O coração do produto, porém, é o painel calmo — a experiência principal de clareza e alívio.",
    },
    {
      topic: "No dia a dia",
      question: "O Sossegue emite nota fiscal?",
      answer:
        "No começo não. O foco do MVP é tirar o peso da cabeça: visão do negócio, clientes, cobranças e fôlego. Emissão de nota e integrações mais pesadas ficam para depois.",
    },
    {
      topic: "Lançamento",
      question: "Quando vai ficar pronto?",
      answer:
        "Estamos construindo com calma e cuidado. Deixe seu interesse pelo botão “Quero ser avisado” que a gente te avisa assim que estiver disponível.",
    },
    {
      topic: "Lançamento",
      question: "Meus dados ficam seguros?",
      answer:
        "Tratamos seus dados com cuidado, não os vendemos e explicamos tudo na nossa Política de Privacidade.",
    },
    {
      topic: "Lançamento",
      question: "Tem custo?",
      answer:
        "Ainda estamos definindo. Quem entrar na lista de interessados será avisado com antecedência.",
    },
  ],
};
