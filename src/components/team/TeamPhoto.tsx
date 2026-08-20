'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { TeamMember } from '@/content/team';

function memberInitials(member: TeamMember) {
  if (member.initials) return member.initials;
  if (!member.name) return null;

  return member.name
    .replaceAll('.', '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0])
    .join('');
}

interface TeamPhotoProps {
  member: TeamMember;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export default function TeamPhoto({
  member,
  priority = false,
  sizes = '(max-width: 560px) 92vw, (max-width: 1024px) 44vw, 260px',
  className = '',
}: TeamPhotoProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [member.photo]);

  const showPhoto = Boolean(member.photo) && !failed;
  const initials = memberInitials(member);

  return (
    <div className={`team-photo ${className}`}>
      {showPhoto ? (
        <Image
          src={member.photo as string}
          alt={member.photoAlt ?? `${member.name}, ${member.role} at Youth for a Green Earth`}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setFailed(true)}
          style={{ objectFit: 'cover', objectPosition: member.photoPosition ?? 'center 24%' }}
        />
      ) : (
        <div className="team-photo-fallback">
          <svg viewBox="0 0 220 260" aria-hidden="true">
            <path d="M-20 48c46-37 86 26 135-2s81-19 126 15" />
            <path d="M-18 66c48-37 85 27 134-1s82-20 127 14" />
            <path d="M-20 84c46-36 86 27 135-1s81-20 126 14" />
            <path d="M-18 102c48-36 85 27 134 0s82-20 127 13" />
            <path d="M-20 120c46-35 86 28 135 0s81-20 126 13" />
            <path className="team-photo-leaf" d="M110 197c-2-30 7-54 32-75-2 31-11 55-32 75Zm0 0c-13-23-30-37-50-43 6 23 23 39 50 43Zm0 0v31" />
          </svg>
          <strong>{initials ?? 'PROFILE PENDING'}</strong>
          {initials && <span>Portrait pending</span>}
        </div>
      )}
    </div>
  );
}
