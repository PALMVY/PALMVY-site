import Link from 'next/link';
import { MobileMenu } from '@/components/sections/MobileMenu';
import { CtaLink } from '@/components/ui/CtaLink';
import { Logo } from '@/components/ui/Logo';
import { CONTACT_LINK } from '@/core/data/contact';
import { NAV_LINKS } from '@/core/data/navigation';

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-pacific-night/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex min-h-11 items-center">
          <Logo variant="horizontal" size="sm" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex min-h-11 items-center text-sm text-soft-gray transition-colors hover:text-cloud motion-reduce:transition-none"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Contorno, não sólido: o laranja sólido fica com o CTA da página (One Sun Rule). */}
          <CtaLink
            href={CONTACT_LINK.href}
            isExternal={CONTACT_LINK.isExternal}
            className="hidden h-11 items-center rounded-md border border-sunset/60 px-4 text-sm font-medium text-cloud transition-colors hover:bg-sunset hover:text-pacific-night motion-reduce:transition-none sm:inline-flex"
          >
            Vamos conversar?
          </CtaLink>

          <MobileMenu links={NAV_LINKS} contactLink={CONTACT_LINK} />
        </div>
      </div>
    </nav>
  );
}
