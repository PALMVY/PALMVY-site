'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CtaLink } from '@/components/ui/CtaLink';
import type { ContactLink } from '@/core/data/contact';
import type { NavLink } from '@/core/data/navigation';

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

const HAMBURGER_ICON_PATH = 'M4 6h16M4 12h16M4 18h16';
const CLOSE_ICON_PATH = 'M6 6l12 12M18 6L6 18';

type MobileMenuProps = {
  links: readonly NavLink[];
  /** Botão de contato no fim do menu. Sem ele (sob medida pausado), não aparece. */
  contactLink?: ContactLink;
  /** Rota da página atual, marcada com aria-current. */
  currentHref?: string;
};

export function MobileMenu({ links, contactLink, currentHref }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((current) => !current), []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      toggleButtonRef.current?.focus();
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  const scrimState = isOpen ? 'visible opacity-100' : 'invisible opacity-0';
  const panelState = isOpen
    ? 'visible translate-y-0 opacity-100'
    : 'invisible -translate-y-2 opacity-0';

  return (
    <div className="md:hidden">
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        className="inline-flex h-11 w-11 items-center justify-center text-cloud"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? CLOSE_ICON_PATH : HAMBURGER_ICON_PATH}
          />
        </svg>
      </button>

      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`absolute inset-x-0 top-full h-dvh bg-black/60 transition-[opacity,visibility] duration-200 ease-out motion-reduce:transition-none ${scrimState}`}
      />

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full border-t border-soft-gray/10 bg-pacific-night px-6 pb-8 pt-2 transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none ${panelState}`}
      >
        <ul>
          {links.map(({ href, label }) => (
            <li key={href} className="border-b border-soft-gray/10">
              <Link
                href={href}
                onClick={closeMenu}
                aria-current={href === currentHref ? 'page' : undefined}
                className={`block py-4 text-2xl transition-colors hover:text-sunset ${
                  href === currentHref ? 'text-sunset' : 'text-cloud'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {contactLink && (
          <CtaLink
            href={contactLink.href}
            isExternal={contactLink.isExternal}
            onClick={closeMenu}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-sunset px-4 text-base font-medium text-pacific-night transition-colors hover:bg-sunset-dark sm:hidden"
          >
            Vamos conversar?
          </CtaLink>
        )}

        <div className="mt-8 space-y-1">
          <p className="text-sm text-soft-gray">
            California Dreamin&apos;.{' '}
            <span className="text-sunset">Digital reality.</span>
          </p>
          <p className="text-xs text-muted">Apps feitos com calma.</p>
        </div>
      </div>
    </div>
  );
}
