import { ViewTransition, type ReactNode } from 'react';
import type { Product } from '@/core/data/products';

type ProductArtTransitionProps = {
  productId: Product['id'];
  children: ReactNode;
};

/**
 * Painel de arte do produto que atravessa a navegação: o painel do card na
 * home vira o painel do topo da landing (e volta, no "Todos os produtos").
 * Os dois lados precisam usar este componente com o mesmo `productId`.
 *
 * `default="none"` impede o painel de animar em outras transições da página;
 * `share="morph"` liga o par à classe .morph do globals.css.
 */
export function ProductArtTransition({
  productId,
  children,
}: ProductArtTransitionProps) {
  // Só o React interno do Next exporta ViewTransition; o React estável (usado
  // pelo Vitest) não. Sem ele, o painel aparece normalmente, sem morph.
  if (!ViewTransition) return <>{children}</>;

  return (
    <ViewTransition
      name={`product-art-${productId}`}
      share="morph"
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
