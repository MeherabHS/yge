type Props = {
  topics: string[];
  value: string;
  error?: string;
  onChange: (topic: string) => void;
};

export default function ContactTopicSelector({
  topics,
  value,
  error,
  onChange,
}: Props) {
  return (
    <fieldset
      className="contact-topic-fieldset"
      aria-describedby={error ? "topic-error" : undefined}
      aria-invalid={Boolean(error)}
    >
      <legend>
        I&apos;m contacting about <span aria-hidden="true">*</span>
      </legend>
      <div className="contact-topic-grid">
        {topics.map((topic) => {
          const id = `topic-${topic.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <label key={topic} htmlFor={id} className="contact-topic-chip">
              <input
                id={id}
                type="radio"
                name="topic"
                value={topic}
                checked={value === topic}
                onChange={() => onChange(topic)}
                required
              />
              <span>{topic}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id="topic-error" className="contact-field-error">
          {error}
        </p>
      )}
    </fieldset>
  );
}
