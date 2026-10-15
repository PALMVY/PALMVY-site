import { describe, expect, it } from 'vitest';
import { NAV_LINKS } from '@/core/data/navigation';
import { products } from '@/core/data/products';

describe('NAV_LINKS', () => {
  it('lista cada app com landing page, na ordem dos produtos', () => {
    const withLanding = products.filter(({ landingPage }) => landingPage);

    expect(NAV_LINKS).toEqual(
      withLanding.map(({ name, landingPage }) => ({ label: name, href: landingPage })),
    );
  });
});
