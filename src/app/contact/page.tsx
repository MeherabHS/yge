import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import DirectLineCard from "@/components/contact/DirectLineCard";
import ContactFieldNote from "@/components/contact/ContactFieldNote";
import ContactClosingCTA from "@/components/contact/ContactClosingCTA";

export const metadata: Metadata = {
  title: { absolute: "Contact YGE | Youth for a Green Earth" },
  description:
    "Contact Youth for a Green Earth to ask a question, discuss collaboration, learn about events or get involved.",
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <ContactHero />
      <section
        className="contact-paper-section"
        aria-label="Contact form and direct line"
      >
        <div className="contact-paper-texture" aria-hidden="true" />
        <div className="contact-shell contact-form-layout">
          <ContactForm />
          <DirectLineCard />
        </div>
      </section>
      <ContactFieldNote />
      <ContactClosingCTA />
    </div>
  );
}
