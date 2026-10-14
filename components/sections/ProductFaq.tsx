import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProductFaq as Faq } from "@/core/data/products";

type FaqGroup = {
  topic?: string;
  items: Faq[];
};

/** Junta perguntas seguidas do mesmo tópico, mantendo a ordem dos dados. */
export const groupFaqByTopic = (faq: Faq[]): FaqGroup[] =>
  faq.reduce<FaqGroup[]>((groups, item) => {
    const last = groups.at(-1);
    if (last && last.topic === item.topic) {
      last.items.push(item);
      return groups;
    }
    return [...groups, { topic: item.topic, items: [item] }];
  }, []);

function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-cloud/10 border-y border-cloud/10">
      {items.map(({ question, answer }) => (
        <details key={question} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-medium text-cloud transition-colors hover:text-sunset motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
            {question}
            <span
              aria-hidden="true"
              className="font-mono text-xl text-muted transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-6 pr-10 text-base leading-relaxed text-soft-gray">
            {answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function ProductFaq({ faq }: { faq: Faq[] }) {
  const groups = groupFaqByTopic(faq);

  return (
    <section
      aria-labelledby="faq-titulo"
      className="border-t border-cloud/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Dúvidas"
          title="Perguntas frequentes"
          titleId="faq-titulo"
        />

        <div className="flex flex-col gap-12">
          {groups.map(({ topic, items }, index) =>
            topic ? (
              <div
                key={`${topic}-${index}`}
                className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-10"
              >
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted md:pt-5">
                  {topic}
                </h3>
                <FaqList items={items} />
              </div>
            ) : (
              <FaqList key={items[0]?.question} items={items} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
