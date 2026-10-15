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

// Lançamento (MVP): conversa dentro do app, só texto, só Android. Fora do
// site até existirem no app: Fôlego de Caixa, notificações, níveis de
// acolhimento, envio automático de cobrança e áudio (aparece como "em breve").
// PRINTS PENDENTES: painel, histórico e perfil ainda mostram o que saiu.
export const sossegue: Product = {
  id: "sossegue",
  name: "Sossegue",
  tagline: "Pare de carregar o negócio de cabeça.",
  category: "Finanças · MEI",
  description:
    "Conte o que aconteceu do jeito que você fala. O Sossegue anota, lembra quem está atrasado e mostra quanto entrou e quanto falta receber.",
  status: "coming-soon",
  platforms: ["android"],
  painPoints: {
    title: "Seu negócio não deveria morar na sua cabeça.",
    items: [
      "Cliente pagou e ninguém lembra de dar baixa.",
      "Caderninho, planilha e cobranças perdidas no meio do WhatsApp.",
      "Domingo à noite pensando em quanto falta receber.",
    ],
  },
  highlights: [
    "Painel calmo: quanto entrou, quem está em dia e quem precisa de cobrança.",
    "Conversa natural por texto, sem aprender sistema. Áudio em breve.",
    "Mensagem de cobrança pronta para você copiar e enviar.",
  ],
  accentColor: "bg-pacific-blue",
  tone: "dark",
  logoBg: "bg-cloud",
  image: `${IMAGES_BASE}/logo.png`,
  imageSize: { width: 391, height: 118 },
  featured: true,
  landingPage: "/produtos/sossegue",
  // Conversa na frente: o painel ainda mostra o Fôlego (print novo pendente).
  heroScreenshots: [screens.conversa, screens.painel],
  steps: [
    {
      title: "Conte o que aconteceu",
      description:
        "Escreva do jeito que fala. Por exemplo: “Atendi a Juliana hoje, R$ 180, ela paga na sexta.”",
      screenshot: screens.conversa,
    },
    {
      title: "Confirme em um toque",
      description:
        "O Sossegue repete o que entendeu. Você confirma ou corrige. Se não mexer em 45 segundos, ele registra sozinho.",
      screenshot: screens.historico,
    },
    {
      title: "Veja o mês com clareza",
      description:
        "O painel mostra quanto entrou, quanto falta receber e quem está atrasado.",
      screenshot: screens.painel,
    },
  ],
  spotlight: {
    title: "No seu ritmo, sem pressão.",
    description:
      "Você conversa do seu jeito e o painel organiza o resto. Nada de planilha nem de sistema complicado.",
    points: [
      "Painel do mês com o que entrou e o que falta receber",
      "Clientes com status: em dia ou em atraso",
      "Histórico de todos os registros",
      "Mensagem de cobrança pronta para copiar",
    ],
    screenshots: [screens.perfil, screens.boasVindas],
  },
  faq: [
    {
      topic: "O app",
      question: "O que é o Sossegue?",
      answer:
        "É um painel calmo para o seu negócio. Você conta o que aconteceu, e ele organiza clientes, valores a receber e o que entrou no mês, sem planilha.",
    },
    {
      topic: "O app",
      question: "Para quem é?",
      answer:
        "Para MEIs e autônomos que sabem fazer o trabalho, mas carregam a ansiedade de não saber se o negócio está bem.",
    },
    {
      topic: "O app",
      question: "É mais um controle financeiro?",
      answer:
        "Não. O Sossegue não é para gastos pessoais. Ele cuida do seu negócio: clientes, valores a receber e a sensação de estar no controle.",
    },
    {
      topic: "O app",
      question: "Preciso entender de tecnologia?",
      answer:
        "Não. Você conversa do jeito que fala, por texto, e o painel devolve tudo de forma clara.",
    },
    {
      topic: "No dia a dia",
      question: "Como funciona a conversa?",
      answer:
        "Você fala do jeito que fala no dia a dia, por exemplo: “Atendi a Carla hoje, R$ 180, ela vai pagar na sexta”, “Recebi os 180 da Juliana” ou “O Pedro tá devendo faz tempo”. O Sossegue organiza e atualiza o painel.",
    },
    {
      topic: "No dia a dia",
      question: "O que aparece no painel?",
      answer:
        "Quanto entrou no mês, quanto falta receber, quem está em dia e quem precisa de cobrança.",
    },
    {
      topic: "No dia a dia",
      question: "Vai funcionar pelo WhatsApp?",
      answer:
        "Não. O Sossegue é um app, e a conversa acontece dentro dele. Quando quiser cobrar alguém, você copia a mensagem pronta e cola no WhatsApp.",
    },
    {
      topic: "No dia a dia",
      question: "O Sossegue emite nota fiscal?",
      answer:
        "No começo, não. O foco é tirar o peso da cabeça: visão do negócio, clientes e cobranças. Emissão de nota e integrações mais pesadas ficam para depois.",
    },
    {
      topic: "Lançamento",
      question: "Quando vai ficar pronto?",
      answer:
        "Ainda não tem data definida. Quem deixar o interesse será avisado assim que liberarmos.",
    },
    {
      topic: "Lançamento",
      question: "Tem custo?",
      answer:
        "Ainda estamos definindo. Quem deixar o interesse será avisado com antecedência.",
    },
    {
      // PENDENTE (bloqueia o lançamento do app): a "Política de Privacidade"
      // daqui é a do Sossegue, que ainda não existe; a do site não cobre o app.
      topic: "Privacidade",
      question: "Meus dados ficam seguros?",
      answer:
        "Seus dados são tratados conforme a LGPD e não são vendidos. Os detalhes estão na Política de Privacidade.",
    },
  ],
};
