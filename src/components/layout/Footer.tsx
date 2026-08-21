import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  footerColumns,
  primaryCta,
  primaryNavigation,
} from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { YGELogo } from "@/components/global/YGELogo";

export default function Footer() {
  const mobilePrimaryLinks = [...primaryNavigation, primaryCta];

  return (
    <footer id="site-footer" className="editorial-footer">
      <YGELogo
        className="footer-official-logo"
        imageClassName="footer-official-logo-image"
        sizes="(min-width: 768px) 92px, 76px"
      />
      <div className="footer-monogram" aria-hidden="true">
        YGE
      </div>
      <nav
        className="footer-mobile-primary"
        aria-label="Footer primary navigation"
      >
        <ul>
          {mobilePrimaryLinks.slice(0, 4).map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <ul>
          {mobilePrimaryLinks.slice(4).map((link) => (
            <li
              key={link.href}
              className={
                link.href === primaryCta.href
                  ? "footer-mobile-contact"
                  : undefined
              }
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="footer-columns">
        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h2>{column.heading}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer-contact">
          <h2>Contact</h2>
          <Link href="/contact">Contact YGE</Link>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <div className="footer-socials">
            {Object.entries(siteConfig.social)
              .filter(([, url]) => Boolean(url))
              .map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`YGE on ${name}`}
                >
                  <ArrowUpRight aria-hidden="true" />
                  {name}
                </a>
              ))}
          </div>
        </div>
      </div>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} Youth for a Green Earth</span>
        <span>Transforming awareness into action</span>
      </div>
    </footer>
  );
}
