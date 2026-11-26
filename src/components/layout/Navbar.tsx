"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { primaryCta, primaryNavigation } from "@/content/navigation";
import { YGEBrandLockup } from "@/components/global/YGEBrandLockup";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const contactActive = pathname === primaryCta.href;
  const prefetchPrimaryRoutes = () => {
    [...primaryNavigation, primaryCta].forEach((item) => {
      router.prefetch(item.href);
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <header className="editorial-nav">
        <nav aria-label="Main navigation">
          <YGEBrandLockup priority className="editorial-brand-lockup" />
          <ul className="editorial-nav-links">
            {primaryNavigation.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={true}
                    aria-current={active ? "page" : undefined}
                    className={active ? "active" : ""}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={primaryCta.href}
            prefetch={true}
            aria-current={contactActive ? "page" : undefined}
            className={`nav-join${contactActive ? " active" : ""}`}
          >
            {primaryCta.label} <ArrowUpRight aria-hidden="true" />
          </Link>
          <SheetTrigger asChild>
            <button
              className="nav-toggle"
              onPointerEnter={prefetchPrimaryRoutes}
              onFocus={prefetchPrimaryRoutes}
              onClick={prefetchPrimaryRoutes}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </SheetTrigger>
        </nav>
        <SheetContent
          id="mobile-navigation"
          side="top"
          overlay={false}
          className="mobile-navigation open"
          aria-describedby={undefined}
        >
          <div className="mobile-menu-utility" aria-hidden="true">
            <span>YGE</span>
            <span>Bangladesh</span>
            <span>Since 2024</span>
          </div>
          <div className="mobile-menu-head">
            <SheetTitle asChild>
              <span className="mobile-menu-brand">Youth for a Green Earth</span>
            </SheetTitle>
            <SheetClose asChild>
              <button
                type="button"
                className="mobile-menu-close"
                aria-label="Close menu"
              >
                <X aria-hidden="true" />
              </button>
            </SheetClose>
          </div>
          <ul>
            {primaryNavigation.map((item, index) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <span>0{index + 1}</span>
                  <Link
                    href={item.href}
                    prefetch={true}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={active ? "active" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={primaryCta.href}
            prefetch={true}
            aria-current={contactActive ? "page" : undefined}
            onClick={() => setOpen(false)}
            className="lime-button mobile-contact-cta"
          >
            {primaryCta.label} <ArrowRight aria-hidden="true" />
          </Link>
        </SheetContent>
      </header>
    </Sheet>
  );
}
