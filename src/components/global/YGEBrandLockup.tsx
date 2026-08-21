import Image from "next/image";
import Link from "next/link";
import { media } from "@/content/media";

interface YGEBrandLockupProps {
  priority?: boolean;
  className?: string;
}

export function YGEBrandLockup({
  priority = false,
  className = "",
}: YGEBrandLockupProps) {
  return (
    <Link
      href="/"
      aria-label="Youth for a Green Earth — Home"
      className={`yge-brand-lockup ${className}`.trim()}
    >
      <span className="yge-brand-plate" aria-hidden="true">
        <Image
          src={media.brand.officialLogo}
          alt=""
          width={993}
          height={1012}
          priority={priority}
          sizes="(min-width: 621px) 58px, 46px"
          className="yge-brand-mark"
        />
      </span>
      <span className="brand-name">Youth for a Green Earth</span>
    </Link>
  );
}
