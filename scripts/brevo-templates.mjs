/*
  Uploads the campaign templates in brevo/templates to Brevo, creating each
  one the first time and updating it by name after that.

    BREVO_API_KEY=... BREVO_SENDER_EMAIL=info@iandiworldwide.org node scripts/brevo-templates.mjs

  Optional: BREVO_SENDER_NAME (defaults to I&I Worldwide).
*/

import { readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://api.brevo.com/v3";
const apiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.BREVO_SENDER_EMAIL;
const senderName = process.env.BREVO_SENDER_NAME ?? "I&I Worldwide";

if (!apiKey || !senderEmail) {
  console.error("Set BREVO_API_KEY and BREVO_SENDER_EMAIL first.");
  process.exit(1);
}

// One entry per file: the name it has in Brevo and its default subject.
const TEMPLATES = {
  "notes.html": { name: "I&I · Notes", subject: "Notes on collecting, from I&I" },
  "placement.html": { name: "I&I · A work", subject: "A work placed with a collector" },
  "invitation.html": { name: "I&I · Invitation", subject: "You are invited" },
};

const headers = { "api-key": apiKey, "content-type": "application/json", accept: "application/json" };

async function call(path, init = {}) {
  const response = await fetch(`${API}${path}`, { ...init, headers });
  const text = await response.text();
  if (!response.ok) throw new Error(`${init.method ?? "GET"} ${path} → ${response.status} ${text}`);
  return text ? JSON.parse(text) : {};
}

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "brevo", "templates");
const files = (await readdir(dir)).filter((f) => f.endsWith(".html"));

// What is there already, so a second run updates rather than duplicates.
const existing = (await call("/smtp/templates?limit=100&sort=desc")).templates ?? [];

for (const file of files) {
  const meta = TEMPLATES[file];
  if (!meta) { console.warn(`Skipping ${file}: no entry in TEMPLATES.`); continue; }
  const htmlContent = await readFile(join(dir, file), "utf8");
  const body = {
    templateName: meta.name,
    subject: meta.subject,
    sender: { name: senderName, email: senderEmail },
    htmlContent,
    isActive: true,
  };
  const found = existing.find((t) => t.name === meta.name);
  if (found) {
    await call(`/smtp/templates/${found.id}`, { method: "PUT", body: JSON.stringify(body) });
    console.log(`Updated  ${meta.name}  (id ${found.id})`);
  } else {
    const created = await call("/smtp/templates", { method: "POST", body: JSON.stringify(body) });
    console.log(`Created  ${meta.name}  (id ${created.id})`);
  }
}

console.log("\nIn Brevo: Campaigns > Templates. Start a campaign from any of them.");
