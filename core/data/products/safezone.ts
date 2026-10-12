import type { Product } from "./types";

export const safezone: Product = {
  id: "safezone",
  name: "SafeZone",
  tagline: "Segurança pública com dados reais",
  description:
    "App que mapeia áreas de risco com denúncias anônimas verificadas. Duas camadas de acesso, verificação rigorosa e moderação comunitária — segurança de verdade, não achismo.",
  status: "coming-soon",
  platforms: ["ios", "android"],
  highlights: [
    "Denúncias anônimas e verificadas",
    "Duas camadas de acesso",
    "Verificação rigorosa e moderação comunitária",
  ],
  accentColor: "bg-palm-green",
  tone: "dark",
  // Sem logo ainda — o painel mostra "Em breve" até a imagem chegar.
  featured: false,
  landingPage: "/produtos/safezone",
};
