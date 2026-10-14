import { SectionLabel } from "@/components/ui/SectionLabel";
import { Strike } from "@/components/ui/Strike";
import { BUZZWORDS, PROCESS_STEPS } from "@/core/data/home";

const formatStepNumber = (index: number): string =>
  String(index + 1).padStart(2, "0");

export function HowWeWork() {
  return (
    <section
      id="como-trabalhamos"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionLabel className="mb-4">Como funciona</SectionLabel>
        <h2 className="text-balance font-display text-4xl font-bold leading-none tracking-tight text-cloud sm:text-5xl lg:text-6xl">
          Três passos. Nenhum é reunião.
        </h2>
        <p className="mb-12 mt-5 font-mono text-sm leading-loose text-muted sm:text-base">
          {BUZZWORDS.map((buzzword) => (
            <span key={buzzword}>
              Sem <Strike>{buzzword}</Strike>.{" "}
            </span>
          ))}
          Só o trabalho.
        </p>

        <ol className="grid border-t border-cloud/10 md:grid-cols-3">
          {PROCESS_STEPS.map(({ title, description }, index) => (
            <li
              key={title}
              className="border-b border-cloud/10 pb-2 pt-8 md:pr-7"
            >
              <span className="mb-5 block font-mono text-sm tracking-widest text-sunset">
                {formatStepNumber(index)}
              </span>
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-cloud">
                {title}
              </h3>
              <p className="mb-7 max-w-xs leading-relaxed text-muted">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
