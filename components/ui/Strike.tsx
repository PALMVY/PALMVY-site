import type { CSSProperties } from 'react';

type StrikeProps = {
  children: string;
  className?: string;
  /**
   * Posição na sequência em que o risco é desenhado ao abrir a página.
   * Sem ela, o termo já aparece riscado (o padrão fora do hero).
   */
  drawOrder?: number;
};

/** Termo riscado em laranja: o jargão que a PALMVY não vende. */
export function Strike({ children, className = '', drawOrder }: StrikeProps) {
  if (drawOrder === undefined) {
    return (
      <s
        className={`text-muted decoration-sunset decoration-2 sm:decoration-[3px] ${className}`}
      >
        {children}
      </s>
    );
  }

  // A linha é desenhada por CSS (globals.css, .strike-draw); o <s> mantém a semântica.
  const style = { '--strike-order': drawOrder } as CSSProperties;

  return (
    <s className={`strike-draw whitespace-nowrap ${className}`} style={style}>
      {children}
    </s>
  );
}
