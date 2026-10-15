export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const BASE_STYLES =
  "rounded-md transition-colors duration-200 font-sans motion-reduce:transition-none";

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-sunset text-pacific-night hover:bg-sunset-dark",
  secondary:
    "border border-cloud/10 bg-pacific-deep text-cloud hover:border-cloud/30",
  ghost: "text-soft-gray hover:text-cloud",
};

// O alinhamento fica no tamanho: o `xl` empurra a seta "→" para a ponta.
const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "justify-center px-3 py-1.5 text-sm font-medium",
  md: "justify-center px-4 py-2 text-base font-medium",
  lg: "justify-center px-6 py-3 text-lg font-medium h-12",
  xl: "justify-between gap-6 h-14 px-6 text-sm font-bold uppercase tracking-widest",
};

export const getButtonClassName = (
  variant: ButtonVariant,
  size: ButtonSize,
  className = "",
): string =>
  `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`;
