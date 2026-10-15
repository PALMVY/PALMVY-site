import { products } from './products';

export type NavLink = {
  href: string;
  label: string;
};

// Foco nos apps próprios: o menu leva direto a cada landing page.
// (Com o sob medida de volta, as âncoras /#sob-medida e /#contato voltam aqui.)
export const NAV_LINKS: readonly NavLink[] = products.flatMap(
  ({ name, landingPage }) => (landingPage ? [{ label: name, href: landingPage }] : []),
);
