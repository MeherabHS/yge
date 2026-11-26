export default function StoriesMasthead() {
  return (
    <section
      className="stories-masthead stories-masthead-video"
      aria-labelledby="stories-page-title"
    >
      {/* Decorative background loop: muted, no controls, text sits on top. */}
      <video
        className="stories-masthead-media"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/stories/stories-hero-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source
          src="/videos/stories-hero-mobile.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src="/videos/stories-hero.mp4" type="video/mp4" />
      </video>
      <span className="stories-masthead-shade" aria-hidden="true" />

      <div className="stories-masthead-copy">
        <p className="stories-eyebrow">Our Stories</p>
        <h1 id="stories-page-title">
          Stories of youth{" "}
          <span className="stories-heading-tail">
            <em>in action.</em>
          </span>
        </h1>
        <span className="stories-title-rule" aria-hidden="true" />
        <p className="stories-deck">
          Stories, field observations, project documentations and campaign
          reports from YGE teams across Bangladesh.
        </p>
      </div>
    </section>
  );
}
