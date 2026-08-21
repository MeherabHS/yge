import { ExternalLink } from 'lucide-react';
import type { TeamMember } from '@/content/team';
import TeamPhoto from './TeamPhoto';

export default function LeadershipCard({ member, priority = false }: { member: TeamMember; priority?: boolean }) {
  const socialLinks = Object.entries(member.social ?? {}).filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <article className="leadership-card">
      <TeamPhoto member={member} priority={priority} sizes="(max-width: 620px) 92vw, (max-width: 1024px) 44vw, 360px" />
      <div className="leadership-card-copy">
        <h3>{member.name ?? 'Profile pending'}</h3>
        <p>{member.role}</p>
        {member.bio && <p className="team-member-bio">{member.bio}</p>}
        {socialLinks.length > 0 && (
          <div className="team-social-links" aria-label={`${member.name ?? member.role} social profiles`}>
            {socialLinks.map(([network, href]) => {
              return (
                <a key={network} href={href} target="_blank" rel="noreferrer" aria-label={`${member.name ?? member.role} on ${network}`}>
                  <ExternalLink aria-hidden="true" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
