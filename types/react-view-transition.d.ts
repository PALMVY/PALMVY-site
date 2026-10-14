/// <reference types="react/experimental" />
import type { ExoticComponent, ViewTransitionProps } from 'react';

/*
 * O React que o Next 16 usa por baixo exporta `ViewTransition`, mas o
 * @types/react 19.1.4 só tipa `unstable_ViewTransition`. Esta declaração liga
 * os dois. Apague o arquivo quando atualizar o @types/react para 19.2+.
 */
declare module 'react' {
  export const ViewTransition: ExoticComponent<ViewTransitionProps>;
}
