// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PriceOdometer } from '@/components/ui/PriceOdometer';

afterEach(cleanup);

const getStrips = (container: HTMLElement) =>
  [...container.querySelectorAll<HTMLElement>('.odometer-strip')];

describe('PriceOdometer', () => {
  it('lê o preço por extenso e esconde os dígitos animados de leitores de tela', () => {
    const { container } = render(<PriceOdometer price="R$ 20.000" />);

    expect(screen.getByText('R$ 20.000').className).toContain('sr-only');
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('cria uma coluna por algarismo, apontando para o dígito certo', () => {
    const { container } = render(<PriceOdometer price="R$ 2.900" />);

    const digits = getStrips(container).map((strip) =>
      strip.style.getPropertyValue('--digit'),
    );

    expect(digits).toEqual(['2', '9', '0', '0']);
  });

  it('mantém as casas da direita no lugar quando o preço ganha um dígito', () => {
    const { container, rerender } = render(<PriceOdometer price="R$ 2.900" />);
    const unitsBefore = getStrips(container).at(-1);

    rerender(<PriceOdometer price="R$ 20.000" />);

    expect(getStrips(container)).toHaveLength(5);
    expect(getStrips(container).at(-1)).toBe(unitsBefore);
  });
});
