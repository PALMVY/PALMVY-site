import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import NotFound from '@/app/not-found';

describe('NotFound', () => {
  const html = renderToStaticMarkup(<NotFound />);

  it('diz em português que a página não existe', () => {
    expect(html).toContain('Essa página não existe.');
  });

  it('oferece caminho de volta para o início e para os produtos', () => {
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/#produtos"');
  });
});
