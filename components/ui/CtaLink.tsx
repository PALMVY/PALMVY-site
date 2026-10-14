import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  getButtonClassName,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/ui/buttonStyles';

// O alinhamento horizontal vem do tamanho (buttonStyles.ts).
const BUTTON_LAYOUT = 'inline-flex items-center';

type CtaLinkProps = {
  href: string;
  isExternal: boolean;
  /** Quando informado, o link usa o mesmo visual do Button. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export function CtaLink({
  href,
  isExternal,
  variant,
  size = 'md',
  className,
  onClick,
  children,
}: CtaLinkProps) {
  const buttonClassName = className
    ? `${BUTTON_LAYOUT} ${className}`
    : BUTTON_LAYOUT;
  const resolvedClassName = variant
    ? getButtonClassName(variant, size, buttonClassName)
    : className;

  if (!isExternal && href.startsWith('/')) {
    return (
      <Link href={href} onClick={onClick} className={resolvedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className={resolvedClassName}
    >
      {children}
    </a>
  );
}
