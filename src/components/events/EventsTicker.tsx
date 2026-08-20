const ticker = 'MEET  •  CREATE  •  LEARN  •  COMPETE  •  ORGANIZE  •  ACT  •  ';

export default function EventsTicker() {
  return (
    <section className="events-action-ticker" aria-label="Meet, create, learn, compete, organize and act">
      <div className="events-ticker-track">
        <span>{ticker.repeat(3)}</span>
        <span aria-hidden="true">{ticker.repeat(3)}</span>
      </div>
    </section>
  );
}
