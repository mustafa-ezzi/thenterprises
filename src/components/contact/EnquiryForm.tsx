import { useState, type FormEvent } from "react";
import { categories } from "../../data/categories";
import { company } from "../../data/company";
import { services } from "../../data/services";
import { Button } from "../ui/Button";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

type Status = "idle" | "sending" | "sent" | "error";

function buildMessage(data: Record<string, string>) {
  return [
    `Name: ${data.name}`,
    `Organisation: ${data.organisation}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Category: ${data.category}`,
    "",
    data.message,
  ].join("\n");
}

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const body = buildMessage(payload);
    const subject = `Quote request — ${payload.category || "supply"}`;

    setStatus("sending");

    if (FORMSPREE_ID) {
      try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Formspree failed");
        form.reset();
        setStatus("sent");
        return;
      } catch {
        setStatus("error");
      }
    }

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  return (
    <form className="enquiry-form" onSubmit={onSubmit}>
      <p className="contact-label">Enquiry</p>
      <div className="enquiry-grid">
        <label className="enquiry-field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className="enquiry-field">
          <span>Organisation</span>
          <input name="organisation" type="text" autoComplete="organization" />
        </label>
        <label className="enquiry-field">
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        <label className="enquiry-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="enquiry-field enquiry-field--full">
          <span>Product or service</span>
          <select name="category" required defaultValue="">
            <option value="" disabled>
              Select a product or service
            </option>
            <optgroup label="Products">
              {categories.map((category) => (
                <option key={category.slug} value={category.name}>
                  {category.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Services">
              {services.map((service) => (
                <option key={service.slug} value={service.name}>
                  {service.name}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
        <label className="enquiry-field enquiry-field--full">
          <span>Message</span>
          <textarea name="message" rows={5} required placeholder="Line, quantity, site, and timeline." />
        </label>
      </div>
      <div className="inner-actions enquiry-actions">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
      {status === "sent" ? (
        <p className="enquiry-status" role="status">
          {FORMSPREE_ID
            ? "Received. We will reply with a quote."
            : "Your mail app should open with the enquiry filled in. If it does not, WhatsApp or email us directly."}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="enquiry-status enquiry-status--error" role="alert">
          The form could not send. Use WhatsApp or email below.
        </p>
      ) : null}
    </form>
  );
}
