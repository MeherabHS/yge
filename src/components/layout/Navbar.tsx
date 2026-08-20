'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { primaryCta, primaryNavigation } from '@/content/navigation';
import { YGELogo } from '@/components/global/YGELogo';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open || !mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const focusable = Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const focusTimer = window.setTimeout(() => focusable[0]?.focus(), 60);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const contactActive = pathname === primaryCta.href;
  return (
    <header className="editorial-nav">
      <nav aria-label="Main navigation">
        <YGELogo priority className="editorial-brand" />
        <ul className="editorial-nav-links">
          {primaryNavigation.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return <li key={item.href}><Link href={item.href} aria-current={active ? 'page' : undefined} className={active ? 'active' : ''}>{item.label}</Link></li>;
          })}
        </ul>
        <Link
          href={primaryCta.href}
          aria-current={contactActive ? 'page' : undefined}
          className={`nav-join${contactActive ? ' active' : ''}`}
        >
          {primaryCta.label} <ArrowUpRight aria-hidden="true" />
        </Link>
        <button ref={toggleRef} className="nav-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      <div ref={mobileMenuRef} id="mobile-navigation" className={`mobile-navigation ${open ? 'open' : ''}`} aria-hidden={!open}>
        <p className="font-mono">YGE / BANGLADESH / SINCE 2024</p>
        <ul>{primaryNavigation.map((item, index) => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return <li key={item.href}><span>0{index + 1}</span><Link href={item.href} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</Link></li>;
        })}</ul>
        <Link
          href={primaryCta.href}
          aria-current={contactActive ? 'page' : undefined}
          onClick={() => setOpen(false)}
          className="lime-button mobile-contact-cta"
        >
          {primaryCta.label} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
