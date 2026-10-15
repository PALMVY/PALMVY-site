import { CtaLink } from "@/components/ui/CtaLink";
import { CONTACT_EMAIL } from "@/core/data/contact";
import type { LegalDocument } from "@/core/data/legal/types";

const formatDate = (isoDate: string): string =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));

// O e-mail aparece como texto nos documentos; aqui ele vira link clicável.
function LegalParagraph({ text }: { text: string }) {
  const parts = text.split(CONTACT_EMAIL);

  return (
    <p>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-cloud underline decoration-sunset underline-offset-4 transition-colors hover:text-sunset motion-reduce:transition-none"
            >
              {CONTACT_EMAIL}
            </a>
          )}
        </span>
      ))}
    </p>
  );
}

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <section
      aria-labelledby="legal-titulo"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <article className="max-w-3xl mx-auto">
        <CtaLink
          href="/"
          isExternal={false}
          className="mb-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-cloud motion-reduce:transition-none"
        >
          <span aria-hidden="true">←</span> Voltar ao início
        </CtaLink>

        <h1
          id="legal-titulo"
          className="mb-4 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tighter text-cloud sm:text-6xl"
        >
          {document.title}
        </h1>
        <p className="text-sm text-muted mb-8">
          Última atualização: {formatDate(document.updatedAt)}
        </p>

        {document.isDraft && (
          <p
            role="note"
            className="mb-10 rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold"
          >
            Versão em revisão: este texto ainda pode mudar.
          </p>
        )}

        <div className="space-y-10">
          {document.sections.map(({ heading, paragraphs }) => (
            <section key={heading}>
              <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-cloud">
                {heading}
              </h2>
              <div className="max-w-lg space-y-4 text-base text-soft-gray leading-relaxed">
                {paragraphs.map((paragraph) => (
                  <LegalParagraph key={paragraph} text={paragraph} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
