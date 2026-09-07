"use client";

import { FormEvent, useState } from "react";
import { contactContent } from "@/lib/content";

// Sits at the foot of every page. Where to find us, and a note.
export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { form } = contactContent;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Wire to a backend or form service here.
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
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

          <button type="submit" className="cta">
            {form.submit}
          </button>

          {submitted && <p role="status">{form.success}</p>}
        </form>
      </div>
    </section>
  );
}
