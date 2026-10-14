import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProductStep } from "@/core/data/products";

const formatPosition = (index: number): string =>
  String(index + 1).padStart(2, "0");

export function ProductSteps({ steps }: { steps: ProductStep[] }) {
  return (
    <section
      aria-labelledby="como-funciona-titulo"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Como funciona"
          title="Passo a passo."
          titleId="como-funciona-titulo"
        />

        <ol className="space-y-16 sm:space-y-24">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                <p className="mb-5 font-mono text-sm tracking-widest text-sunset">
                  {formatPosition(index)}
                </p>
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-cloud sm:text-3xl">
                  {step.title}
                </h3>
                <p className="max-w-md text-lg leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>

              <div className="relative h-96 overflow-hidden rounded-3xl border border-cloud/10 bg-pacific-deep">
                <div className="absolute inset-x-0 top-8 mx-auto w-52">
                  <PhoneFrame screenshot={step.screenshot} sizes="208px" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
