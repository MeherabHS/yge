import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Youth for a Green Earth privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: "var(--color-paper-white)" }}>
      <section
        className="section-pad pt-32"
        style={{ backgroundColor: "var(--color-forest-ink)" }}
        aria-label="Privacy policy hero"
      >
        <div className="container-yge max-w-3xl">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-6"
            style={{ color: "var(--color-muted-sage)" }}
          >
            Legal
          </p>
          <h1
            className="font-display font-800 text-display leading-tight tracking-tight mb-4"
            style={{ color: "var(--color-paper-white)" }}
          >
            Privacy Policy
          </h1>
          <p
            className="font-mono text-xs"
            style={{ color: "var(--color-muted-sage)" }}
          >
            Draft — requires YGE review and approval before publication
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-yge max-w-3xl prose-yge">
          <div
            className="p-5 rounded-xl mb-10 border-l-4"
            style={{
              backgroundColor: "rgba(255,210,63,0.08)",
              borderColor: "var(--color-solar-yellow)",
            }}
          >
            <p
              className="font-mono text-xs font-700"
              style={{ color: "var(--color-solar-yellow)" }}
            >
              DRAFT NOTICE
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--color-charcoal)" }}
            >
              This privacy policy template requires review and approval by Youth
              for a Green Earth before it is formally published. The content
              below is illustrative only.
            </p>
          </div>

          <h2>1. Who we are</h2>
          <p>
            Youth for a Green Earth (&ldquo;YGE&rdquo;, &ldquo;we&rdquo;,
            &ldquo;our&rdquo;) is a youth-led environmental organization based
            in Bangladesh. Our contact email is{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              style={{ color: "var(--color-deep-moss)" }}
            >
              {siteConfig.email}
            </a>
            .
          </p>

          <h2>2. What data we collect</h2>
          <p>
            When you contact us or submit a form on this website, we may collect
            your name, email address and the message you send. We do not
            currently operate a database or CMS.
          </p>
          <p>
            This website does not use cookies beyond those technically necessary
            for operation. No third-party analytics or tracking scripts are
            loaded.
          </p>

          <h2>3. How we use your data</h2>
          <p>
            Contact form submissions (when forms are active) are used solely to
            respond to your inquiry. We do not sell, share or trade personal
            data.
          </p>

          <h2>4. Photography and media</h2>
          <p>
            YGE may photograph or film participants at its events for
            documentation and communication purposes. Participants have the
            right to request that their image not be used. Please contact us at
            the email above.
          </p>
          <p>
            Where photographs of children are concerned, YGE follows a
            safeguarding and consent procedure. See our{" "}
            <a href="/safeguarding" style={{ color: "var(--color-deep-moss)" }}>
              Safeguarding Policy
            </a>{" "}
            for details.
          </p>

          <h2>5. Your rights</h2>
          <p>
            You have the right to access, correct or request deletion of any
            personal data we hold about you. Contact us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              style={{ color: "var(--color-deep-moss)" }}
            >
              {siteConfig.email}
            </a>
            .
          </p>

          <h2>6. Changes to this policy</h2>
          <p>
            This policy will be updated as YGE’s data practices evolve. The date
            of the most recent update will appear at the top of this page.
          </p>

          <p
            className="font-mono text-xs mt-12"
            style={{ color: "var(--color-muted-sage)" }}
          >
            Last reviewed: Draft. Pending YGE approval.
          </p>
        </div>
      </section>
    </div>
  );
}
