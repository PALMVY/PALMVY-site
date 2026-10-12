// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MobileMenu } from '@/components/sections/MobileMenu';
import type { ContactLink } from '@/core/data/contact';
import type { NavLink } from '@/core/data/navigation';

type MediaChangeListener = (event: { matches: boolean }) => void;

const LINKS: readonly NavLink[] = [
  { href: '/#produtos', label: 'Produtos' },
  { href: '/#filosofia', label: 'Filosofia' },
];
const CONTACT_LINK: ContactLink = { href: '/#contato', isExternal: false };

const mediaChangeListeners = new Set<MediaChangeListener>();

const stubMatchMedia = () => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    addEventListener: (_type: string, listener: MediaChangeListener) =>
      mediaChangeListeners.add(listener),
    removeEventListener: (_type: string, listener: MediaChangeListener) =>
      mediaChangeListeners.delete(listener),
  }));
};

const renderMenu = () =>
  render(<MobileMenu links={LINKS} contactLink={CONTACT_LINK} />);

const getToggleButton = () =>
  screen.getByRole('button', { name: /(abrir|fechar) menu/i });

const openMenu = () => fireEvent.click(getToggleButton());

const emitMediaChange = (matches: boolean) =>
  act(() => {
    mediaChangeListeners.forEach((listener) => listener({ matches }));
  });

describe('MobileMenu', () => {
  beforeEach(stubMatchMedia);

  afterEach(() => {
    cleanup();
    mediaChangeListeners.clear();
    vi.unstubAllGlobals();
  });

  it('começa fechado e o botão aponta para o painel do menu', () => {
    const { container } = renderMenu();
    const button = getToggleButton();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-label')).toBe('Abrir menu');
    expect(
      container.querySelector(`#${button.getAttribute('aria-controls')}`),
    ).not.toBeNull();
  });

  it('abre e fecha ao clicar no botão', () => {
    renderMenu();

    openMenu();
    expect(getToggleButton().getAttribute('aria-expanded')).toBe('true');
    expect(getToggleButton().getAttribute('aria-label')).toBe('Fechar menu');

    fireEvent.click(getToggleButton());
    expect(getToggleButton().getAttribute('aria-expanded')).toBe('false');
  });

  it('fecha com Escape e devolve o foco ao botão', () => {
    renderMenu();
    openMenu();

    fireEvent.keyDown(document, { key: 'Escape' });

    const button = getToggleButton();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
  });

  it('ignora outras teclas', () => {
    renderMenu();
    openMenu();

    fireEvent.keyDown(document, { key: 'Enter' });

    expect(getToggleButton().getAttribute('aria-expanded')).toBe('true');
  });

  it('fecha ao clicar em um link de navegação', () => {
    renderMenu();
    openMenu();

    fireEvent.click(screen.getByRole('link', { name: 'Filosofia' }));

    expect(getToggleButton().getAttribute('aria-expanded')).toBe('false');
  });

  it('fecha ao clicar no botão de contato', () => {
    renderMenu();
    openMenu();

    fireEvent.click(screen.getByRole('link', { name: 'Vamos conversar?' }));

    expect(getToggleButton().getAttribute('aria-expanded')).toBe('false');
  });

  it('fecha ao clicar fora do painel (camada escura)', () => {
    const { container } = renderMenu();
    openMenu();

    const scrim = container.querySelector('div[aria-hidden="true"]');
    if (!scrim) throw new Error('Camada escura do menu não encontrada');
    fireEvent.click(scrim);

    expect(getToggleButton().getAttribute('aria-expanded')).toBe('false');
  });

  it('fecha quando a tela passa a ter largura de desktop', () => {
    renderMenu();
    openMenu();

    emitMediaChange(true);

    expect(getToggleButton().getAttribute('aria-expanded')).toBe('false');
  });

  it('continua aberto se a mudança de tela não chegar a desktop', () => {
    renderMenu();
    openMenu();

    emitMediaChange(false);

    expect(getToggleButton().getAttribute('aria-expanded')).toBe('true');
  });

  it('renderiza os links recebidos com seus destinos', () => {
    renderMenu();

    LINKS.forEach(({ href, label }) => {
      expect(screen.getByRole('link', { name: label }).getAttribute('href')).toBe(
        href,
      );
    });
  });
});
