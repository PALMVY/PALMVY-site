import { SectionLabel } from '@/components/ui/SectionLabel';

type SectionHeaderProps = {
  label: string;
  title: string;
  /** Texto curto que acompanha o título, à direita no desktop. */
  aside?: string;
  /** Id do h2, para a seção usar em `aria-labelledby`. */
  titleId?: string;
};

export function SectionHeader({ label, title, aside, titleId }: SectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 border-b border-cloud/10 pb-7 md:flex-row md:items-end md:justify-between">
      <div>
        <SectionLabel className="mb-4">{label}</SectionLabel>
        <h2
          id={titleId}
          className="text-balance font-display text-4xl font-bold leading-none tracking-tight text-cloud sm:text-5xl lg:text-6xl"
        >
          {title}
        </h2>
      </div>
      {aside && (
        <p className="max-w-sm text-base leading-relaxed text-muted sm:text-lg">
          {aside}
        </p>
      )}
    </div>
  );
}
