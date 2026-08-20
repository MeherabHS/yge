import type { Metadata } from 'next';
import TeamClosingCTA from '@/components/team/TeamClosingCTA';
import TeamDepartmentSection from '@/components/team/TeamDepartmentSection';
import TeamHero from '@/components/team/TeamHero';
import { teamDepartments, teamMembers } from '@/content/team';

export const metadata: Metadata = {
  title: { absolute: 'Our Team | Youth for a Green Earth' },
  description:
    'Meet the youth-led team organizing YGE’s environmental programs, events, communications and operations across Bangladesh.',
};

export default function TeamPage() {
  const departments = [...teamDepartments].sort((a, b) => a.order - b.order);
  const visibleMembers = teamMembers.filter((member) => member.visible !== false);
  const featuredMembers = visibleMembers
    .filter((member) => member.department === 'leadership' && member.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="team-page">
      <TeamHero featuredMembers={featuredMembers} />

      <div className="team-directory" aria-label="YGE team directory">
        {departments.map((department) => {
          const members = teamMembers
            .filter((member) => member.visible !== false)
            .filter((member) => member.department === department.id)
            .sort((a, b) => a.order - b.order);

          if (members.length === 0) return null;

          return (
            <TeamDepartmentSection
              key={department.id}
              department={department}
              members={members}
            />
          );
        })}
      </div>

      <TeamClosingCTA />
    </div>
  );
}
