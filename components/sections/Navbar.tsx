import Link from 'next/link';
import { MobileMenu } from '@/components/sections/MobileMenu';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS } from '@/core/data/navigation';

type NavbarProps = {
  /** Rota da página atual (ex.: a landing do app), marcada no menu. */
  currentHref?: string;
};

export function Navbar({ currentHref }: NavbarProps) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-pacific-night/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex min-h-11 items-center">
          <Logo variant="horizontal" size="sm" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const isCurrent = href === currentHref;

            return (
              <Link
                key={href}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className={`inline-flex min-h-11 items-center text-sm transition-colors hover:text-cloud motion-reduce:transition-none ${
                  isCurrent
                    ? "text-cloud underline decoration-sunset decoration-2 underline-offset-8"
                    : "text-soft-gray"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Sem "Vamos conversar?" enquanto o sob medida está pausado. */}
        <MobileMenu links={NAV_LINKS} currentHref={currentHref} />
      </div>
    </nav>
  );
}
