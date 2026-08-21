import Image, { getImageProps } from 'next/image';
import { media } from '@/content/media';
import { imagePlaceholders } from '@/content/image-placeholders';

export default function StoriesMasthead() {
  const { props: { srcSet: mobileSrcSet } } = getImageProps({
    src: media.stories.mastheadMobile,
    alt: '',
    fill: true,
    sizes: 'calc(100vw - 24px)',
  });

  return (
    <section className="stories-masthead stories-grid-lines" aria-labelledby="stories-page-title">
      <div className="stories-masthead-copy">
        <p className="stories-eyebrow">Dispatches &amp; Field Notes</p>
        <h1 id="stories-page-title">
          Words from <span className="stories-heading-tail">the <em>field.</em></span>
        </h1>
        <span className="stories-title-rule" aria-hidden="true" />
        <p className="stories-deck">
          Stories, field observations, project documentations and campaign reports from YGE teams across Bangladesh.
        </p>
      </div>

      <div className="stories-masthead-art" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="calc(100vw - 24px)" />
          <Image
            src={media.stories.masthead}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={imagePlaceholders.storiesMasthead}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="stories-masthead-image"
          />
        </picture>
        <span className="stories-art-tape stories-art-tape-top" />
        <span className="stories-art-registration" />
      </div>
    </section>
  );
}
