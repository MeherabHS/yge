import type { CSSProperties } from 'react';
import type { TeamDepartment, TeamMember } from '@/content/team';
import { PaperTexture, TornPaperEdge } from '@/components/editorial/EditorialPrimitives';
import LeadershipCard from './LeadershipCard';
import TeamMemberCard from './TeamMemberCard';

interface TeamDepartmentSectionProps {
  department: TeamDepartment;
  members: TeamMember[];
}

export default function TeamDepartmentSection({ department, members }: TeamDepartmentSectionProps) {
  const isLeadership = department.id === 'leadership';
  const style = { '--team-accent': department.accent } as CSSProperties;

  return (
    <section
      className={`team-department ${isLeadership ? 'team-leadership' : 'team-department-band'}`}
      style={style}
      aria-labelledby={`team-department-${department.id}`}
    >
      {isLeadership && <TornPaperEdge position="top" />}
      {isLeadership && <PaperTexture />}
      <div className="team-shell team-department-grid">
        <header className="team-department-heading">
          <p><span>{department.number}</span><i aria-hidden="true" /></p>
          <h2 id={`team-department-${department.id}`}>{department.name}</h2>
          {department.description && <div>{department.description}</div>}
        </header>
        <div className={isLeadership ? 'leadership-grid' : 'team-members-grid'}>
          {members.map((member, index) =>
            isLeadership ? (
              <LeadershipCard key={member.id} member={member} priority={index === 0} />
            ) : (
              <TeamMemberCard key={member.id} member={member} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
