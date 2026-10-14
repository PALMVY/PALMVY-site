type SectionLabelProps = {
  children: string;
  className?: string;
};

/** Rótulo editorial das seções, no formato "[ PRODUTOS ]". */
export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-widest text-sunset sm:text-sm ${className}`}
    >
      [ {children} ]
    </p>
  );
}
