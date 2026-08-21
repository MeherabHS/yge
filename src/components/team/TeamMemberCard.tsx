import { ExternalLink } from "lucide-react";
import type { TeamMember } from "@/content/team";
import TeamPhoto from "./TeamPhoto";

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const socialLinks = Object.entries(member.social ?? {}).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  );

  return (
    <article className="team-member-card">
      <TeamPhoto member={member} />
      <div className="team-member-copy">
        <h3>{member.name ?? "Profile pending"}</h3>
        <p>{member.role}</p>
        {member.bio && <p className="team-member-bio">{member.bio}</p>}
        {socialLinks.length > 0 && (
          <div
            className="team-social-links"
            aria-label={`${member.name ?? member.role} social profiles`}
          >
            {socialLinks.map(([network, href]) => {
              return (
                <a
                  key={network}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name ?? member.role} on ${network}`}
                >
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
