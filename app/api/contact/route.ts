import { NextResponse } from "next/server";
import { BREVO, EMAIL_PATTERN, addToList, brevoHeaders, brevoListId } from "@/lib/brevo";

/*
  The contact form posts here. The message is sent by Brevo as a
  transactional email to the studio, with the visitor's address set as
  reply-to so replying in the inbox goes straight back to them. If the
  visitor ticked the subscribe box, and a list id is configured, they are
  added to that list as well.

  Needs, in the environment:
    BREVO_API_KEY        an API key from Brevo, SMTP & API > API keys
    BREVO_SENDER_EMAIL   a sender verified in Brevo, e.g. info@iandiworldwide.org
  Optional:
    BREVO_SENDER_NAME    defaults to I&I Worldwide
    CONTACT_TO           where messages land; defaults to the sender address
    BREVO_LIST_ID        a Brevo list id; visitors who opt in are added to it
*/

const MAX = { name: 120, email: 200, message: 4000 };

interface Payload {
  name?: string;
  email?: string;
  message?: string;
  /** True when the visitor ticked the subscribe box. */
  subscribe?: boolean;
  /** Honeypot. Real people never fill it. */
  company?: string;
}

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    return NextResponse.json({ error: "The contact form is not set up yet." }, { status: 503 });
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Could not read the message." }, { status: 400 });
  }

  // A filled honeypot is a bot. Say it went fine and do nothing.
  if (body.company) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim().slice(0, MAX.name);
  const email = (body.email ?? "").trim().slice(0, MAX.email);
  const message = (body.message ?? "").trim().slice(0, MAX.message);
  const subscribe = body.subscribe === true;
  if (!name || !email || !message || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  const senderName = process.env.BREVO_SENDER_NAME ?? "I&I Worldwide";
  const to = process.env.CONTACT_TO ?? senderEmail;

  const html = `
    <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt; wrote through the website:</p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    ${subscribe ? "<p><em>They asked to join the mailing list.</em></p>" : ""}`;

  const sent = await fetch(`${BREVO}/smtp/email`, {
    method: "POST",
    headers: brevoHeaders(apiKey),
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      replyTo: { email, name },
      subject: `Website enquiry from ${name}`,
      htmlContent: html,
      textContent:
        `${name} <${email}> wrote through the website:\n\n${message}` +
        (subscribe ? "\n\nThey asked to join the mailing list." : ""),
      tags: ["website-contact"],
    }),
  });

  if (!sent.ok) {
    console.error("Brevo send failed", sent.status, await sent.text().catch(() => ""));
    return NextResponse.json({ error: "The message could not be sent." }, { status: 502 });
  }

  // Only when asked. Failure here is not the visitor's problem: the
  // message has gone, so it is logged and otherwise ignored.
  const listId = brevoListId();
  if (subscribe && listId) await addToList(apiKey, listId, email, name);

  return NextResponse.json({ ok: true });
}
