# Brevo

Email runs through Brevo: the contact form sends through it, and the
campaign templates here are uploaded to it.

## What the site needs

Set these in Vercel, Settings > Environment Variables, for Production:

| Name | What it is |
|---|---|
| `BREVO_API_KEY` | An API key, made in Brevo under SMTP & API > API keys |
| `BREVO_SENDER_EMAIL` | A sender verified in Brevo, e.g. info@iandiworldwide.org |
| `BREVO_SENDER_NAME` | Optional. Defaults to I&I Worldwide |
| `CONTACT_TO` | Optional. Where enquiries land. Defaults to the sender |
| `BREVO_LIST_ID` | Optional. A list id; enquirers are added to it when set |

Until the first two are set, the form tells the visitor to email instead.

## Campaign templates

Three templates live in `templates/`, written for email: tables, inline
styles, system fonts, 600 pixels wide, on the site's palette.

| File | For |
|---|---|
| `notes.html` | A letter: a few paragraphs and a link, for Notes and Substack news |
| `placement.html` | One work, captioned, with a short note, for placements and artists to watch |
| `invitation.html` | A date and a place with an RSVP, for fairs, viewings and openings |

They use Brevo's merge tags: `{{ contact.FIRSTNAME }}`, `{{ unsubscribe }}`
and `{{ mirror }}`. The header image is the site's email header, made with
the asset generator and served from the site.

To upload or update them in Brevo:

```bash
BREVO_API_KEY=... BREVO_SENDER_EMAIL=info@iandiworldwide.org node scripts/brevo-templates.mjs
```

The script creates each template the first time and updates it by name
after that. In Brevo they appear under Campaigns > Templates, and a new
campaign can start from any of them.
