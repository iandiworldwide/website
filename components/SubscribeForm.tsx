"use client";

import { FormEvent, useState } from "react";
import { subscribeContent } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

// One field and a button. Posts to /api/subscribe, which adds the address
// to the mailing list. Sits in the Substack section near the foot of the
// home page, for people who want the letters without writing a message.
export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const { form } = subscribeContent;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label={form.label} className="max-w-[34ch]">
      <div className="flex items-end gap-sm">
        <label className="block grow">
          <span className="block text-caption">{form.label}</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder={form.placeholder}
          />
        </label>
        <button type="submit" className="cta shrink-0 pb-[0.3em]" disabled={status === "sending"}>
          {status === "sending" ? form.sending : form.submit}
        </button>
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <label className="sr-only" aria-hidden="true">
        Company
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      {status === "sent" && (
        <p role="status" className="mt-sm text-caption">
          {form.success}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-sm text-caption">
          {form.error}
        </p>
      )}
    </form>
  );
}
