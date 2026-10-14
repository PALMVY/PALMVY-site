// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { QuotePicker, type QuoteOption } from '@/components/ui/QuotePicker';

const OPTIONS: QuoteOption[] = [
  {
    id: 'landing',
    label: 'Landing page',
    estimate: { name: 'Landing page', price: 'R$ 2.900' },
    link: { href: 'https://wa.me/5511999999999?text=landing', isExternal: true },
  },
  {
    id: 'app',
    label: 'App mobile',
    estimate: { name: 'App mobile', price: 'R$ 20.000' },
    link: { href: 'https://wa.me/5511999999999?text=app', isExternal: true },
  },
  {
    id: 'unsure',
    label: 'Ainda não sei',
    estimate: null,
    link: { href: 'mailto:hello@palmvy.com.br', isExternal: false },
  },
];

const getCta = () => screen.getByRole('link', { name: /whatsapp|e-mail/i });

afterEach(cleanup);

describe('QuotePicker', () => {
  it('começa em "Ainda não sei", sem sugerir um tipo que a pessoa não escolheu', () => {
    render(<QuotePicker options={OPTIONS} />);

    expect(
      screen.getByRole('radio', { name: 'Ainda não sei' }).matches(':checked'),
    ).toBe(true);
    expect(screen.queryByText('R$ 2.900')).toBeNull();
    expect(getCta().getAttribute('href')).toBe('mailto:hello@palmvy.com.br');
  });

  it('cai na primeira opção quando não há uma sem estimativa', () => {
    render(<QuotePicker options={OPTIONS.slice(0, 2)} />);

    expect(
      screen.getByRole('radio', { name: 'Landing page' }).matches(':checked'),
    ).toBe(true);
    expect(getCta().getAttribute('href')).toContain('text=landing');
  });

  it('troca a estimativa e o link ao escolher outro tipo', () => {
    render(<QuotePicker options={OPTIONS} />);

    fireEvent.click(screen.getByRole('radio', { name: 'App mobile' }));

    expect(screen.getByText('R$ 20.000')).toBeTruthy();
    expect(screen.queryByText('R$ 2.900')).toBeNull();
    expect(getCta().getAttribute('href')).toContain('text=app');
  });

  it('abre o WhatsApp em nova aba, com noopener', () => {
    render(<QuotePicker options={OPTIONS} />);

    fireEvent.click(screen.getByRole('radio', { name: 'Landing page' }));

    expect(getCta().getAttribute('target')).toBe('_blank');
    expect(getCta().getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('ajuda quem ainda não sabe e troca o botão para e-mail', () => {
    render(<QuotePicker options={OPTIONS} />);

    fireEvent.click(screen.getByRole('radio', { name: 'App mobile' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Ainda não sei' }));

    expect(screen.getByText(/te ajuda a decidir/)).toBeTruthy();
    expect(getCta().textContent).toContain('Enviar e-mail');
    expect(getCta().getAttribute('href')).toBe('mailto:hello@palmvy.com.br');
  });

  it('não renderiza nada sem opções', () => {
    const { container } = render(<QuotePicker options={[]} />);

    expect(container.innerHTML).toBe('');
  });
});
