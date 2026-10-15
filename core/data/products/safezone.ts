import type { Product } from "./types";

export const safezone: Product = {
  id: "safezone",
  name: "SafeZone",
  tagline: "Segurança pública com dados reais",
  category: "Segurança · Mapa",
  description:
    "App que mapeia áreas de risco com denúncias anônimas verificadas. Denuncie sem login e, com e-mail confirmado, veja os detalhes de cada área. Moderação comunitária: segurança de verdade, não achismo.",
  status: "coming-soon",
  platforms: ["ios", "android"],
  highlights: [
    "Denúncias anônimas e verificadas",
    "Denuncie sem login, veja detalhes com e-mail",
    "Verificação rigorosa e moderação comunitária",
  ],
  accentColor: "bg-palm-green",
  tone: "dark",
  // Sem logo ainda — o painel mostra "Em breve" até a imagem chegar.
  featured: false,
  landingPage: "/produtos/safezone",
};
