import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { footerColumns, primaryCta } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { YGELogo } from "@/components/global/YGELogo";
import "./Footer.css";

export default function Footer() {
  const socials = Object.entries(siteConfig.social).filter(([, url]) =>
    Boolean(url),
  );

  return (
    <footer id="site-footer" className="yge-footer">
      <div className="yf-body">
        <div className="yf-brand">
          <div className="yf-brand-lockup">
            <YGELogo
              className="yf-logo"
              sizes="(min-width: 1100px) 112px, 92px"
            />
            <span className="yf-brand-name">Youth for a Green Earth</span>
          </div>
          <ul className="yf-tags" aria-label="About YGE">
            <li className="yf-tag yf-tag-solid">Bangladesh</li>
            <li className="yf-tag">Youth-led</li>
            <li className="yf-tag yf-tag-ink">Climate action</li>
          </ul>
        </div>

        <nav className="yf-columns" aria-label="Footer navigation">
          {footerColumns.map((column, index) => (
            <div key={column.heading} className="yf-column">
              <h2>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {column.heading}
              </h2>
              <ul>
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.href}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="yf-column yf-follow">
            <h2>
              <span aria-hidden="true">
                {String(footerColumns.length + 1).padStart(2, "0")}
              </span>
              Connect
            </h2>
            <ul>
              <li>
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </li>
              <li>
                <a className="yf-email" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </li>
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`YGE on ${name} (opens in a new tab)`}
                  >
                    {name}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <p className="yf-wordmark" aria-hidden="true">
        Youth for a <span>Green</span> Earth
      </p>

      <div className="yf-meta">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span className="yf-meta-motto">{siteConfig.motto}</span>
        <a href="#" className="yf-top">
          Back to top
          <ArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
