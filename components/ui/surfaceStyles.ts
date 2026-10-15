/**
 * Superfície tonal de cards e painéis: sobe de camada trocando de azul,
 * sem blur nem sombra (DESIGN.md, "The Tonal Depth Rule").
 */
export const SURFACE = 'border border-cloud/10 bg-pacific-deep';

/** Superfície que reage ao hover; o pai precisa ter a classe `group`. */
export const INTERACTIVE_SURFACE = `${SURFACE} transition-colors duration-200 hover:border-sunset/40 motion-reduce:transition-none`;
