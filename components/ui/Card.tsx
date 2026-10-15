export interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export function Card({
  children,
  className = "",
  interactive = false,
}: CardProps) {
  return (
    <div
      className={`
        rounded-3xl border border-cloud/10 bg-pacific-deep
        shadow-[inset_0_1px_0_rgba(199,209,216,0.06)]
        transition-[border-color,box-shadow,translate] duration-200 motion-reduce:transition-none
        ${
          interactive
            ? "hover:border-soft-gray/25 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(199,209,216,0.06),0_16px_32px_rgba(7,26,43,0.45)]"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
