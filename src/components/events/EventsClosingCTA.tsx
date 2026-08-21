import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { YGEEvent } from "@/types";
import {
  PaperTexture,
  TornPaperEdge,
} from "@/components/editorial/EditorialPrimitives";

export default function EventsClosingCTA({
  nextEvent,
}: {
  nextEvent?: YGEEvent;
}) {
  const href = nextEvent ? `/events/${nextEvent.slug}` : "/contact";

  return (
    <section className="events-closing" aria-labelledby="events-closing-title">
      <PaperTexture />
      <TornPaperEdge position="top" />
      <div className="events-shell events-closing-grid">
        <h2 id="events-closing-title">
          Bring your <em>energy.</em>
        </h2>
        <Link href={href}>
          {nextEvent ? "View the next event" : "Contact YGE"}{" "}
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
