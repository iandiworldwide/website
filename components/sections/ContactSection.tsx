"use client";

import { FormEvent, useState } from "react";
import { contactContent } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

// Sits at the foot of every page. Where to find us, and a note, which is
// sent through Brevo by the route at /api/contact.
export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>("idle");
  const { form } = contactContent;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      setFormData({ name: "", email: "", message: "", company: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section px-xs md:px-md"
    >
      <div data-reveal className="grid gap-md md:grid-cols-4">
        <div>
          <h2 id="contact-heading">{contactContent.title}</h2>
          <p className="mt-md max-w-[34ch]">{contactContent.description}</p>
          <ul role="list" className="mt-md text-caption">
            <li>{contactContent.address}</li>
            <li>
              <a href={`mailto:${contactContent.email}`} className="link-sweep">
                {contactContent.email}
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-md md:col-span-2">
          <label className="block">
            <span className="block text-caption">{form.nameLabel}</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder={form.namePlaceholder}
            />
          </label>

          <label className="block">
            <span className="block text-caption">{form.emailLabel}</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder={form.emailPlaceholder}
            />
          </label>

          <label className="block">
            <span className="block text-caption">{form.messageLabel}</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder={form.messagePlaceholder}
            />
          </label>

          {/* Honeypot: hidden from people, filled by bots. */}
          <label className="sr-only" aria-hidden="true">
            Company
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <button type="submit" className="cta" disabled={status === "sending"}>
            {status === "sending" ? form.sending : form.submit}
          </button>

          {status === "sent" && <p role="status">{form.success}</p>}
          {status === "error" && <p role="alert">{form.error}</p>}
        </form>
      </div>
    </section>
  );
}
