import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Aviso no lugar das seções Sob medida, Como funciona e Contato enquanto o
 * trabalho sob medida está pausado. Mantém o id `sob-medida` para links
 * antigos caírem aqui. Para reabrir, troque este bloco por CustomWork,
 * HowWeWork e Contact em app/page.tsx (os componentes seguem no projeto).
 */
export function CustomWorkPaused() {
  return (
    <section
      id="sob-medida"
      aria-labelledby="sob-medida-titulo"
      className="border-t border-cloud/10 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionLabel className="mb-4">Sob medida</SectionLabel>
        <h2
          id="sob-medida-titulo"
          className="text-balance font-display text-3xl font-bold leading-tight tracking-tight text-cloud sm:text-4xl"
        >
          Projetos sob medida estão pausados.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          No momento não estamos aceitando projetos de sites e apps sob medida.
          O foco agora são os nossos apps.
        </p>
      </div>
    </section>
  );
}
