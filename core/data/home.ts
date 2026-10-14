/**
 * Cada linha do manifesto: o termo riscado e o que vem depois dele.
 * Ex.: "Sem" + riscado("“soluções”") + " mágicas."
 */
export type ManifestoLine = {
  struck: string;
  after: string;
};

export const MANIFESTO: readonly ManifestoLine[] = [
  { struck: '“experiências”', after: '.' },
  { struck: '“soluções”', after: ' mágicas.' },
  { struck: '“manda DM”', after: ' pra saber o preço.' },
  { struck: 'chatbot de IA', after: ' te atendendo.' },
];

export type ProcessStep = {
  title: string;
  description: string;
};

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    title: 'Você conta',
    description:
      'O que precisa, do seu jeito. Pode ser resumido. Pode ser um áudio.',
  },
  {
    title: 'A gente fecha',
    description:
      'Escopo claro, prazo e preço fechado, por escrito. Sem letra miúda.',
  },
  {
    title: 'Fechou, começa',
    description: 'Você acompanha cada entrega. No fim, recebe funcionando.',
  },
];

/** Jargões que a seção "Como funciona" risca. */
export const BUZZWORDS: readonly string[] = [
  '“transformação digital”',
  '“vamos alinhar expectativas”',
];
