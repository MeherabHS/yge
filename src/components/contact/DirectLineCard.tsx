import { ArrowRight } from 'lucide-react';
import { contactConfig } from '@/content/site';
import ContactSeal from './ContactSeal';

const socialDetails = {
  facebook: {
    label: 'YGE on Facebook',
    path: 'M14 8.5h3V5h-3c-3 0-5 2-5 5v2H6v3.5h3V23h4v-7.5h3L17 12h-4v-1.5c0-1.3.5-2 1-2Z',
  },
  linkedin: {
    label: 'YGE on LinkedIn',
    path: 'M5 8.5H1.5V22H5V8.5ZM3.2 2A2.2 2.2 0 1 0 3.2 6.4 2.2 2.2 0 0 0 3.2 2ZM22.5 14.2c0-4.1-2.2-6-5.1-6-2.4 0-3.4 1.3-4 2.2V8.5H10V22h3.5v-6.7c0-1.8.3-3.5 2.5-3.5 2.1 0 2.2 2 2.2 3.6V22h3.5v-7.8h.8Z',
  },
  instagram: {
    label: 'YGE on Instagram',
    path: 'M12 2c3 0 3.4 0 4.6.1 3.1.2 5 1.9 5.2 5.2.1 1.2.1 1.6.1 4.6s0 3.4-.1 4.6c-.2 3.2-1.9 5-5.2 5.2-1.2.1-1.6.1-4.6.1s-3.4 0-4.6-.1C4 21.6 2.2 20 2.1 16.6 2 15.4 2 15 2 12s0-3.4.1-4.6C2.3 4.2 4 2.3 7.4 2.1 8.6 2 9 2 12 2Zm0 5.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm6.2-8.3a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z',
  },
};

export default function DirectLineCard() {
  const socials = Object.entries(contactConfig.socialLinks).filter(
    (entry): entry is [keyof typeof socialDetails, string] => Boolean(entry[1]),
  );

  return (
    <aside className="contact-direct-card" aria-labelledby="direct-line-title">
      <div className="contact-paper-texture" aria-hidden="true" />
      <div className="contact-direct-main">
        <h2 id="direct-line-title">Direct line</h2>
        <i aria-hidden="true" />
        <a className="contact-direct-email" href={`mailto:${contactConfig.email}`}>
          {contactConfig.email}
        </a>
        <a className="contact-email-button" href={`mailto:${contactConfig.email}`}>
          Email YGE <ArrowRight aria-hidden="true" />
        </a>
      </div>
      <div className="contact-direct-location">
        <p>Bangladesh</p>
        <i aria-hidden="true" />
        <strong>Youth-led.<br />Open to ideas.</strong>
      </div>
      {socials.length > 0 && (
        <div className="contact-socials" aria-label="YGE social media">
          {socials.map(([name, url]) => {
            const { label, path } = socialDetails[name];
            return (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={path} />
                </svg>
              </a>
            );
          })}
        </div>
      )}
      <div className="contact-card-postmark" aria-hidden="true"><span /><span /><span /></div>
      <div className="contact-direct-seal"><ContactSeal /></div>
    </aside>
  );
}
