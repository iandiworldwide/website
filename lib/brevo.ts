/*
  The one place the site talks to Brevo. The contact route sends mail and,
  when asked, adds the sender to the list; the subscribe route only adds to
  the list. Both go through here so the list handling is written once.

  Needs, in the environment:
    BREVO_API_KEY   an API key from Brevo, SMTP & API > API keys
    BREVO_LIST_ID   the list new subscribers join
*/

export const BREVO = "https://api.brevo.com/v3";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const brevoHeaders = (apiKey: string) => ({
  "api-key": apiKey,
  "content-type": "application/json",
  accept: "application/json",
});

/** The configured list id, or null when subscribing is not set up yet. */
export const brevoListId = () => {
  const id = Number(process.env.BREVO_LIST_ID);
  return Number.isInteger(id) && id > 0 ? id : null;
};

/**
  Adds an address to the list, creating the contact or updating one that
  already exists. Returns false when Brevo refuses.
*/
export async function addToList(
  apiKey: string,
  listId: number,
  email: string,
  name = "",
): Promise<boolean> {
  const [firstName = "", ...rest] = name.split(/\s+/).filter(Boolean);
  const response = await fetch(`${BREVO}/contacts`, {
    method: "POST",
    headers: brevoHeaders(apiKey),
    body: JSON.stringify({
      email,
      attributes: { FIRSTNAME: firstName, LASTNAME: rest.join(" ") },
      listIds: [listId],
      updateEnabled: true,
    }),
  }).catch((error: unknown) => {
    console.error("Brevo contact failed", error);
    return null;
  });

  if (!response) return false;
  if (!response.ok) {
    console.error("Brevo contact refused", response.status, await response.text().catch(() => ""));
    return false;
  }
  return true;
}
