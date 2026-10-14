import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { CtaLink } from "@/components/ui/CtaLink";
import { HorizonLines } from "@/components/ui/HorizonLines";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Endereço que não existe ou produto sem landing (notFound() em /produtos/[slug]).
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-pacific-night">
      <Navbar />
      <main className="relative flex flex-1 items-center overflow-hidden px-4 pt-16 sm:px-6 lg:px-8">
        <HorizonLines className="absolute inset-x-0 bottom-0 h-48 w-full text-soft-gray/10 sm:h-64" />

        <section
          aria-labelledby="nao-encontrado-titulo"
          className="relative mx-auto w-full max-w-6xl py-24 sm:py-32"
        >
          <SectionLabel className="mb-6">404</SectionLabel>
          <h1
            id="nao-encontrado-titulo"
            className="max-w-2xl font-display text-5xl font-extrabold leading-[0.95] tracking-tighter text-cloud sm:text-6xl"
          >
            Essa página não existe.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            O link pode estar errado ou a página mudou de lugar. Os apps e os
            preços continuam na página inicial.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/" isExternal={false} variant="primary" size="xl">
              Voltar ao início <span aria-hidden="true">→</span>
            </CtaLink>
            <CtaLink href="/#produtos" isExternal={false} variant="secondary" size="xl">
              Ver produtos <span aria-hidden="true">→</span>
            </CtaLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
