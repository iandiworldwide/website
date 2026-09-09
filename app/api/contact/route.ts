import { NextResponse } from "next/server";

/*
  The contact form posts here. The message is sent by Brevo as a
  transactional email to the studio, with the visitor's address set as
  reply-to so replying in the inbox goes straight back to them. If a list
  id is configured the visitor is added to that list as well.

  Needs, in the environment:
    BREVO_API_KEY        an API key from Brevo, SMTP & API > API keys
    BREVO_SENDER_EMAIL   a sender verified in Brevo, e.g. info@iandiworldwide.org
  Optional:
    BREVO_SENDER_NAME    defaults to I&I Worldwide
    CONTACT_TO           where messages land; defaults to the sender address
    BREVO_LIST_ID        a Brevo list id; when set, visitors are added to it
*/

const BREVO = "https://api.brevo.com/v3";
const MAX = { name: 120, email: 200, message: 4000 };

interface Payload {
  name?: string;
  email?: string;
  message?: string;
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
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  const senderName = process.env.BREVO_SENDER_NAME ?? "I&I Worldwide";
  const to = process.env.CONTACT_TO ?? senderEmail;
  const headers = { "api-key": apiKey, "content-type": "application/json", accept: "application/json" };

  const html = `
    <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt; wrote through the website:</p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const sent = await fetch(`${BREVO}/smtp/email`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      replyTo: { email, name },
      subject: `Website enquiry from ${name}`,
      htmlContent: html,
      textContent: `${name} <${email}> wrote through the website:\n\n${message}`,
      tags: ["website-contact"],
    }),
  });

  if (!sent.ok) {
    console.error("Brevo send failed", sent.status, await sent.text().catch(() => ""));
    return NextResponse.json({ error: "The message could not be sent." }, { status: 502 });
  }

  // Optional: keep the visitor as a contact. Failure here is not the
  // visitor's problem, so it is logged and otherwise ignored.
  const listId = Number(process.env.BREVO_LIST_ID);
  if (listId) {
    const [firstName, ...rest] = name.split(/\s+/);
    await fetch(`${BREVO}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: firstName, LASTNAME: rest.join(" ") },
        listIds: [listId],
        updateEnabled: true,
      }),
    }).catch((error) => console.error("Brevo contact failed", error));
  }

  return NextResponse.json({ ok: true });
}
