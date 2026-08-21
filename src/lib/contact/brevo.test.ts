import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverContactMessage, getContactDeliveryConfig } from "./brevo";

afterEach(() => {
  delete process.env.BREVO_API_KEY;
  delete process.env.BREVO_SENDER_EMAIL;
  delete process.env.BREVO_SENDER_NAME;
  delete process.env.BREVO_RECIPIENT_EMAIL;
});

describe("Brevo contact delivery", () => {
  it("fails configuration closed when required credentials are absent", () => {
    expect(getContactDeliveryConfig("YGE", "contact@example.org")).toBeNull();
  });

  it("sends a plain-text transactional message without exposing the API key in content", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 201 }));
    const delivered = await deliverContactMessage(
      {
        name: "Samira Rahman",
        email: "samira@example.com",
        organization: "YGE",
        topic: "Events",
        message: "<script>alert(1)</script>",
      },
      {
        apiKey: "secret-api-key",
        senderEmail: "sender@example.com",
        senderName: "YGE Website",
        recipientEmail: "contact@example.org",
        recipientName: "YGE",
      },
    );

    expect(delivered).toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0];
    expect(init?.headers).toMatchObject({ "api-key": "secret-api-key" });
    expect(String(init?.body)).not.toContain("secret-api-key");
    const body = JSON.parse(String(init?.body));
    expect(body).toMatchObject({
      sender: { email: "sender@example.com", name: "YGE Website" },
      to: [{ email: "contact@example.org", name: "YGE" }],
      replyTo: { email: "samira@example.com", name: "Samira Rahman" },
      subject: "[YGE Contact] Events",
    });
    expect(body.htmlContent).toBeUndefined();
    expect(body.textContent).toContain("<script>alert(1)</script>");
  });
});
