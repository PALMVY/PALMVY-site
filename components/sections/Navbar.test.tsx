import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Navbar } from '@/components/sections/Navbar';

const countMatches = (html: string, pattern: RegExp): number =>
  (html.match(pattern) ?? []).length;

describe('Navbar', () => {
  it('marca o app da página atual como página corrente', () => {
    const html = renderToStaticMarkup(<Navbar currentHref="/produtos/tunelab" />);

    expect(html).toMatch(/<a[^>]*aria-current="page"[^>]*href="\/produtos\/tunelab"|<a[^>]*href="\/produtos\/tunelab"[^>]*aria-current="page"/);
    // Menu do desktop e menu do celular: um em cada.
    expect(countMatches(html, /aria-current="page"/g)).toBe(2);
  });

  it('não marca nada fora das landings', () => {
    expect(renderToStaticMarkup(<Navbar />)).not.toContain('aria-current');
  });
});
