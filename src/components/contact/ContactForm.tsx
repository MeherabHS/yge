"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { contactConfig } from "@/content/site";
import ContactTopicSelector from "./ContactTopicSelector";

type FormValues = {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
  addressLine2: string;
};

type FieldName = "name" | "email" | "topic" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type SubmitState = "idle" | "loading" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  email: "",
  organization: "",
  topic: "",
  message: "",
  addressLine2: "",
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.topic) errors.topic = "Please select an inquiry topic.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

export default function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [securityReady, setSecurityReady] = useState(false);
  const mountedRef = useRef(true);
  const securityRef = useRef<{
    csrfToken: string;
    formToken: string;
    expiresAt: number;
  } | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const topicGroupRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const requestFormSecurity = useCallback(async () => {
    if (mountedRef.current) setSecurityReady(false);
    try {
      const response = await fetch("/api/security/form-token", {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
        headers: { accept: "application/json" },
      });
      const result = (await response.json().catch(() => ({}))) as {
        csrfToken?: string;
        formToken?: string;
        expiresAt?: number;
      };
      if (
        !response.ok ||
        !result.csrfToken ||
        !result.formToken ||
        !result.expiresAt
      ) {
        throw new Error("Form security unavailable");
      }
      securityRef.current = {
        csrfToken: result.csrfToken,
        formToken: result.formToken,
        expiresAt: result.expiresAt,
      };
      await new Promise((resolve) => window.setTimeout(resolve, 2_000));
      if (mountedRef.current) setSecurityReady(true);
      return true;
    } catch {
      securityRef.current = null;
      if (mountedRef.current) {
        setSecurityReady(false);
        setSubmitState("error");
        setSubmitMessage(
          `Secure online sending is temporarily unavailable. Please email ${contactConfig.email}.`,
        );
      }
      return false;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const timer = window.setTimeout(() => void requestFormSecurity(), 0);
    return () => {
      window.clearTimeout(timer);
      mountedRef.current = false;
    };
  }, [requestFormSecurity]);

  function setField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field in errors) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (submitState !== "idle") {
      setSubmitState("idle");
      setSubmitMessage("");
    }
  }

  function focusField(field: FieldName) {
    const target = {
      name: nameRef.current,
      email: emailRef.current,
      topic:
        topicGroupRef.current?.querySelector<HTMLInputElement>(
          'input[type="radio"]',
        ) ?? null,
      message: messageRef.current,
    }[field];
    window.requestAnimationFrame(() => target?.focus());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitState("error");
      setSubmitMessage("Please fill in the required fields before sending.");
      focusField(Object.keys(nextErrors)[0] as FieldName);
      return;
    }

    if (contactConfig.formMode === "mailto") {
      const subject = encodeURIComponent(`YGE contact: ${values.topic}`);
      const body = encodeURIComponent(
        `Name: ${values.name}\nOrganization / School: ${values.organization || "Not provided"}\n\n${values.message}`,
      );
      window.location.href = `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
      setSubmitState("idle");
      setSubmitMessage(
        "Your email application should open with the message ready to send.",
      );
      return;
    }

    if (contactConfig.formMode !== "api" || !contactConfig.endpoint) {
      setSubmitState("error");
      setSubmitMessage(
        `Online sending is not configured. Please email ${contactConfig.email}.`,
      );
      return;
    }

    const formSecurity = securityRef.current;
    if (
      !securityReady ||
      !formSecurity ||
      formSecurity.expiresAt <= Date.now()
    ) {
      setSubmitState("error");
      setSubmitMessage(
        "The secure form is refreshing. Please try again shortly.",
      );
      void requestFormSecurity();
      return;
    }

    setErrors({});
    setSubmitState("loading");
    setSubmitMessage("Sending your message…");

    try {
      const response = await fetch(contactConfig.endpoint, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": formSecurity.csrfToken,
          "X-Form-Token": formSecurity.formToken,
        },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok) {
        if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
          setErrors(result.fieldErrors);
          focusField(Object.keys(result.fieldErrors)[0] as FieldName);
        }
        setSubmitState("error");
        setSubmitMessage(
          result.error ??
            `Your message could not be sent. Please email ${contactConfig.email}.`,
        );
        if ([403, 409].includes(response.status)) void requestFormSecurity();
        return;
      }

      setErrors({});
      setSubmitState("success");
      setSubmitMessage("Thank you. Your message has been sent to YGE.");
      setValues(initialValues);
      securityRef.current = null;
      void requestFormSecurity();
    } catch {
      setSubmitState("error");
      setSubmitMessage(
        `Your message could not be sent. Please email ${contactConfig.email}.`,
      );
    }
  }

  const invalidAttempt =
    submitState === "error" && Object.keys(errors).length > 0;

  return (
    <div className="contact-form-sheet">
      <div className="contact-paper-texture" aria-hidden="true" />
      <span className="contact-form-tape" aria-hidden="true" />
      <div className="contact-form-heading">
        <h2>Write to us.</h2>
        <i aria-hidden="true" />
      </div>

      <form
        id="contact-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact YGE"
      >
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-address-line-2">Address line 2</label>
          <input
            id="contact-address-line-2"
            name="addressLine2"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.addressLine2}
            onChange={(event) => setField("addressLine2", event.target.value)}
          />
        </div>

        <div className="contact-line-field">
          <label htmlFor="contact-name">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            ref={nameRef}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="contact-field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="contact-line-field">
          <label htmlFor="contact-email">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            ref={emailRef}
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={254}
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="contact-field-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="contact-line-field">
          <label htmlFor="contact-organization">
            Organization / School (optional)
          </label>
          <input
            id="contact-organization"
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={150}
            value={values.organization}
            onChange={(event) => setField("organization", event.target.value)}
          />
        </div>

        <div ref={topicGroupRef}>
          <ContactTopicSelector
            topics={contactConfig.inquiryTopics}
            value={values.topic}
            error={errors.topic}
            onChange={(topic) => setField("topic", topic)}
          />
        </div>

        <div className="contact-message-field">
          <label htmlFor="contact-message">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            ref={messageRef}
            id="contact-message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={5000}
            value={values.message}
            onChange={(event) => setField("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="contact-field-error">
              {errors.message}
            </p>
          )}
        </div>

        <button
          className="contact-submit"
          type="submit"
          disabled={submitState === "loading" || !securityReady}
        >
          {submitState === "loading" ? (
            <>
              <span>Sending</span>
              <LoaderCircle className="contact-spinner" aria-hidden="true" />
            </>
          ) : (
            <>
              <span>Send message</span>
              <ArrowRight aria-hidden="true" />
            </>
          )}
        </button>

        <AnimatePresence mode="wait">
          {submitMessage && (
            <motion.div
              key={`${submitState}-${submitMessage}`}
              className={`contact-submit-notice contact-submit-${submitState}`}
              role={submitState === "error" ? "alert" : "status"}
              aria-live="polite"
              initial={reduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {submitState === "success" && <CheckCircle2 aria-hidden="true" />}
              <span>
                {invalidAttempt
                  ? "Please fill in the required fields before sending."
                  : submitMessage}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
