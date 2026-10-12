import type { ProductFaq as Faq } from "@/core/data/products";

export function ProductFaq({ faq }: { faq: Faq[] }) {
  return (
    <section
      aria-labelledby="faq-titulo"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-soft-gray/10"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="faq-titulo"
          className="font-display text-3xl sm:text-4xl text-cloud mb-10"
        >
          Perguntas frequentes
        </h2>

        <div className="divide-y divide-soft-gray/10 border-y border-soft-gray/10">
          {faq.map(({ question, answer }) => (
            <details key={question} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base text-cloud [&::-webkit-details-marker]:hidden">
                {question}
                <span
                  aria-hidden="true"
                  className="font-mono text-xl text-muted transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 pr-10 text-base text-soft-gray leading-relaxed">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
