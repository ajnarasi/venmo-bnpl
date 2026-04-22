'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Prototype' },
  { href: '/deck', label: 'Deck' },
  { href: '/pitch', label: 'Pitch' },
  { href: '/artifacts', label: 'Artifacts' },
];

export function TopNav() {
  const pathname = usePathname();
  return (
    <nav className="app-nav" aria-label="Sections">
      {LINKS.map((l) => {
        const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} className={isActive ? 'active' : ''} aria-current={isActive ? 'page' : undefined}>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
