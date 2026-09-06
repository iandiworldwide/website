"use client";

import { FormEvent, useState } from "react";
import { contactContent } from "@/lib/content";

export default function Contact() {
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
    <article className="px-xs py-lg md:px-md">
      <section data-reveal className="grid gap-md md:grid-cols-4">
        <h1>{contactContent.title}</h1>
        <p className="md:col-span-2">{contactContent.description}</p>
      </section>

      <section data-reveal className="mt-lg grid gap-md md:grid-cols-4">
        <h2>{contactContent.detailsLabel}</h2>
        <ul className="md:col-span-2">
          <li>{contactContent.address}</li>
          <li>
            <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
          </li>
          <li>
            <a href={`tel:${contactContent.phone}`}>{contactContent.phone}</a>
          </li>
        </ul>
      </section>

      <section data-reveal className="mt-lg grid gap-md md:grid-cols-4">
        <h2>{contactContent.formLabel}</h2>
        <form onSubmit={handleSubmit} className="space-y-md md:col-span-2">
          <label className="block">
            <span className="block">{form.nameLabel}</span>
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
            <span className="block">{form.emailLabel}</span>
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
            <span className="block">{form.messageLabel}</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder={form.messagePlaceholder}
            />
          </label>

          <button type="submit" className="cta">
            {form.submit}
          </button>

          {submitted && <p role="status">{form.success}</p>}
        </form>
      </section>

      <section data-reveal className="mt-lg grid gap-md md:grid-cols-4">
        <h2>{contactContent.expectLabel}</h2>
        <div className="space-y-xs md:col-span-2">
          {contactContent.expect.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </article>
  );
}
