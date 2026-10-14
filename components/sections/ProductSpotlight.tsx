import { PhoneStage } from "@/components/ui/PhoneStage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Product, ProductSpotlight as Spotlight } from "@/core/data/products";

type ProductSpotlightProps = {
  spotlight: Spotlight;
  accentColor: Product["accentColor"];
  tone: Product["tone"];
};

export function ProductSpotlight({
  spotlight,
  accentColor,
  tone,
}: ProductSpotlightProps) {
  return (
    <section
      aria-labelledby="spotlight-titulo"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <PhoneStage
          screenshots={spotlight.screenshots}
          accentColor={accentColor}
          tone={tone}
        />

        <div>
          <SectionLabel className="mb-4">Em detalhe</SectionLabel>
          <h2
            id="spotlight-titulo"
            className="mb-6 text-balance font-display text-4xl font-bold leading-none tracking-tight text-cloud sm:text-5xl lg:text-6xl"
          >
            {spotlight.title}
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-muted">
            {spotlight.description}
          </p>
          <ul className="space-y-4">
            {spotlight.points.map((point) => (
              <li key={point} className="flex gap-3 text-base text-cloud">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-sunset"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
