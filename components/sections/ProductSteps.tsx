import { PhoneFrame } from "@/components/ui/PhoneFrame";
import type { ProductStep } from "@/core/data/products";

export function ProductSteps({ steps }: { steps: ProductStep[] }) {
  return (
    <section
      aria-labelledby="como-funciona-titulo"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-soft-gray/10"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="como-funciona-titulo"
          className="font-display text-3xl sm:text-4xl text-cloud mb-12 sm:mb-16"
        >
          Como funciona
        </h2>

        <ol className="space-y-16 sm:space-y-24">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                <p className="font-mono text-sm text-sunset mb-3">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl text-cloud mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-soft-gray leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>

              <div className="relative h-96 overflow-hidden rounded-md border border-soft-gray/10 bg-pacific-deep">
                <div className="absolute inset-x-0 top-8 mx-auto w-52">
                  <PhoneFrame
                    screenshot={step.screenshot}
                    sizes="208px"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
