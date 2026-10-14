import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { LegalPage } from '@/components/sections/LegalPage';
import { CONTACT_EMAIL } from '@/core/data/contact';
import { privacyPolicy } from '@/core/data/legal/privacy';

describe('LegalPage', () => {
  const html = renderToStaticMarkup(<LegalPage document={privacyPolicy} />);

  it('transforma o e-mail de contato em link', () => {
    expect(html).toContain(`href="mailto:${CONTACT_EMAIL}"`);
  });

  it('mantém o texto em volta do e-mail', () => {
    expect(html).toContain('fale com a gente em');
  });
});
