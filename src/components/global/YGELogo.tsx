import Image from 'next/image';
import Link from 'next/link';
import { media } from '@/content/media';

interface YGELogoProps {
  priority?: boolean;
  className?: string;
}

export function YGELogo({ priority = false, className = '' }: YGELogoProps) {
  return (
    <Link
      href="/"
      aria-label="Youth for a Green Earth — Home"
      className={`yge-logo ${className}`.trim()}
    >
      <Image
        src={media.brand.officialLogo}
        alt=""
        width={993}
        height={1012}
        priority={priority}
        sizes="(min-width: 1100px) 54px, 46px"
        className="yge-logo-image"
      />
    </Link>
  );
}
