import type { CSSProperties } from 'react';

type PriceOdometerProps = {
  /** Preço já formatado, por exemplo "R$ 2.900". */
  price: string;
  className?: string;
};

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const isDigit = (char: string): boolean => char >= '0' && char <= '9';

/**
 * Preço em contador mecânico: cada algarismo é uma coluna de 0 a 9 que rola
 * até o dígito certo (CSS em globals.css, .odometer-strip).
 *
 * As colunas são identificadas pela posição a partir da direita. Assim, ao
 * trocar R$ 2.900 por R$ 20.000, as unidades continuam no lugar e a casa nova
 * nasce rolando do zero.
 */
export function PriceOdometer({ price, className = '' }: PriceOdometerProps) {
  const chars = [...price];
  // Ordem de cada algarismo, da esquerda para a direita, ignorando "R$", espaço e ponto.
  const digitOrder = chars.map((_, index) =>
    chars.slice(0, index).filter(isDigit).length,
  );

  return (
    <span className={className}>
      <span className="sr-only">{price}</span>
      <span aria-hidden="true" className="inline-flex tabular-nums">
        {chars.map((char, index) => {
          const fromEnd = chars.length - 1 - index;

          if (!isDigit(char)) {
            return (
              <span key={`char-${fromEnd}`} className="whitespace-pre">
                {char}
              </span>
            );
          }

          const style = {
            '--digit': Number(char),
            '--column': digitOrder[index],
          } as CSSProperties;

          return (
            <span
              key={`digit-${fromEnd}`}
              className="relative inline-block overflow-hidden"
            >
              {/* Define a largura e a altura de uma casa. */}
              <span className="invisible">0</span>
              <span className="odometer-strip absolute inset-x-0 top-0 flex flex-col" style={style}>
                {DIGITS.map((digit) => (
                  <span key={digit}>{digit}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
