import { Leaf } from "lucide-react";

export default function ContactSeal({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`contact-seal${light ? " contact-seal-light" : ""}`}
      aria-hidden="true"
    >
      <span>Youth for</span>
      <Leaf />
      <span>Green Earth</span>
    </span>
  );
}
