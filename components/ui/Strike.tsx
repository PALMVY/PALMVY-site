type StrikeProps = {
  children: string;
  className?: string;
};

/** Termo riscado em laranja: o jargão que a PALMVY não vende. */
export function Strike({ children, className = '' }: StrikeProps) {
  return (
    <s
      className={`text-muted decoration-sunset decoration-2 sm:decoration-[3px] ${className}`}
    >
      {children}
    </s>
  );
}
