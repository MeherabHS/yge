export default function ContactFieldNote() {
  return (
    <section className="contact-field-note-wrap" aria-labelledby="contact-field-note-title">
      <div className="contact-shell contact-field-note-shell">
        <div className="contact-field-note">
          <div className="contact-paper-texture" aria-hidden="true" />
          <span className="contact-note-tape contact-note-tape-left" aria-hidden="true" />
          <span className="contact-note-tape contact-note-tape-right" aria-hidden="true" />
          <h2 id="contact-field-note-title">
            <span>One message can</span>
            <span>Start something <em>real.</em></span>
          </h2>
          <i aria-hidden="true" />
          <svg className="contact-note-map" viewBox="0 0 360 170" aria-hidden="true">
            <g className="contact-note-contours">
              <path d="M137 21c47 2 87 18 108 48 20 30 58 37 100 22" />
              <path d="M122 34c48 3 81 21 101 50 21 32 59 44 127 26" />
              <path d="M111 50c45 2 70 21 90 51 24 36 67 49 148 31" />
              <path d="M101 68c47 0 69 19 91 48 27 35 69 49 147 40" />
            </g>
            <path className="contact-note-country" d="M185 10l22 12 17 24-10 20 7 22-14 15 5 22-18 32-14-9 2-24-12-18 8-17-7-17 12-21-7-18z" />
            <path className="contact-note-river" d="M196 31c-14 19 3 29-8 47-9 15 8 24 4 43-2 10-7 18-4 29M181 75c11 4 18 9 20 18M187 109c-9 3-14 9-17 18" />
          </svg>
        </div>
      </div>
    </section>
  );
}
