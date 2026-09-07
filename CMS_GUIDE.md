# Editing the site

The site is edited through **Pages CMS**, which is free and signs you in with
GitHub. Nothing is installed on your machine.

## Signing in

1. Go to **https://app.pagescms.org**
2. Choose **Sign in with GitHub**
3. Give it access to the repository holding this site
4. Pick the repository from the list

There is no separate password. Your GitHub account is the login, so anyone
who should be able to edit needs to be a collaborator on the repository.

## What you can edit

Everything on the site, grouped the way the site is:

| Section | What it holds |
|---|---|
| Site | Name, browser tab title, menu, footer links |
| Home | Opening screen, opening flicker, subscribe screen, client words |
| About and Founder | The practice, Talia's biography and quote |
| Services | The four groups and their points |
| Placements | Every work, its image, artist, title, year and category |
| Visual Diary | The images, their descriptions and optional captions |
| Notes | The Substack posts listed on the Notes page |
| Contact | Details and the wording of the form |

Images are uploaded through the same screens. Pick **Image** on any work or
diary entry and either choose one already there or upload a new one.

## Saving

Saving writes the change to the repository, and the site rebuilds and goes
live on its own, usually within a minute or two. Every change is kept in
history, so anything can be undone.

## Where it actually lives

Behind the scenes the content is a set of JSON files in `/content`, one per
section. Pages CMS is a form over those files. They can also be edited
directly by anyone comfortable doing so, with the same result.

`lib/content.ts` reads those files and hands them to the site. It holds no
copy of its own.

## Things worth knowing

- **A placement needs an image** to appear on the home page wall. Works
  without one still show on the Placements page.
- **A filter only appears** if there is work in that category.
- **Notes posts need a different slug each.** It is only used behind the
  scenes, so anything short with dashes is fine.
- **The subscribe screen's feed** comes live from Substack through
  Supascribe, so new posts appear there without any editing.
- **The Visual Diary arrangement** is set by the "Arrangement" number.
  Change it to any other number to shuffle the scatter.
