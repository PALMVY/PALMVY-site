import type { Product } from "./types";

export const tunelab: Product = {
  id: "tunelab",
  name: "TuneLab",
  tagline: "IA que entende seu carro",
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
  image: "/images/products/tunelab.png",
  featured: false,
  landingPage: "/produtos/tunelab",
};
