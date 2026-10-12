import { PhoneStage } from "@/components/ui/PhoneStage";
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
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-soft-gray/10"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <PhoneStage
          screenshots={spotlight.screenshots}
          accentColor={accentColor}
          tone={tone}
        />

        <div>
          <h2
            id="spotlight-titulo"
            className="font-display text-3xl sm:text-4xl text-cloud mb-4"
          >
            {spotlight.title}
          </h2>
          <p className="text-base text-soft-gray leading-relaxed mb-8 max-w-md">
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
