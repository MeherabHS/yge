'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { imagePlaceholders } from '@/content/image-placeholders';

interface EventGalleryImageProps {
  src: string;
  alt: string;
  placeholder?: boolean;
  objectPosition?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

export default function EventGalleryImage({
  src,
  alt,
  placeholder = false,
  objectPosition = 'center',
  sizes,
  priority = false,
  className = '',
}: EventGalleryImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  return (
    <div className={`event-gallery-image ${placeholder ? 'is-placeholder' : ''} ${className}`}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          placeholder={placeholder ? 'blur' : 'empty'}
          blurDataURL={placeholder ? imagePlaceholders.eventPortrait : undefined}
          sizes={sizes}
          onError={() => setFailed(true)}
          style={{ objectFit: 'cover', objectPosition }}
        />
      ) : (
        <div className="event-image-fallback" role="img" aria-label={alt} />
      )}
      {(placeholder || failed) && <span className="event-placeholder-label">Photo placeholder</span>}
    </div>
  );
}
