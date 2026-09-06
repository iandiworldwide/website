# I&I Worldwide CMS Management Guide

This guide explains how to manage and update all website content without touching code.

## 📍 Quick Access: Where to Edit Content

All website copy is in ONE file: **`lib/content.ts`**

### Finding What You Need

| Page | Content Object | File |
|------|----------------|------|
| Site name, wordmark, browser title | `siteConfig` | `lib/content.ts` |
| Navigation | `navigation` | `lib/content.ts` |
| Footer | `footerContent` | `lib/content.ts` |
| Home | `homeContent`, `testimonials`, `placements` | `lib/content.ts` |
| About | `aboutContent` | `lib/content.ts` |
| Services | `servicesContent` | `lib/content.ts` |
| Placements | `placementsContent`, `placementCategories`, `placements` | `lib/content.ts` |
| Visual Diary | `visualDiaryContent`, `diaryEntries` | `lib/content.ts` |
| Blog | `blogContent`, `blogPosts` | `lib/content.ts` |
| Contact (details, form, what to expect) | `contactContent` | `lib/content.ts` |

Section labels ("Practice", "Begin", "Newsletter" and so on), link text, form labels, and placeholder text are all in these objects too. Nothing visible on the site is written inside the page files.

### Adding images

`placements` accepts an optional `image` field. Put the file in `public/placements/` and reference it by path, for example `image: "/placements/untitled-1.jpg"`. Entries without an image show a plain placeholder.

### Visual Diary

Each `diaryEntries` item needs an `image` (a file in `public/visual-diary/`) and an `alt` description for screen readers. Nothing else is shown unless you add it:

```typescript
{
  id: 9,
  image: "/visual-diary/studio-visit.jpg",
  alt: "Artist studio in Miami",
  caption: "Studio visit, Miami",          // optional, shown under the image
  link: "https://instagram.com/p/...",     // optional, makes the image a link
  size: "large",                           // optional: "small" | "medium" | "large"
}
```

Images are scattered down the page at varied sizes. In `visualDiaryContent`, change `seed` to any other number for a different arrangement, or set `shuffle: false` to keep the list order.

## ✏️ How to Edit Content

### Step 1: Open the CMS File
Go to: `lib/content.ts`

### Step 2: Find the Section
Use Ctrl+F (or Cmd+F) to search for keywords. For example:
- Search `"I&I Worldwide"` to find site name
- Search `"Talia"` to find founder info
- Search `"Services"` to find service descriptions

### Step 3: Update the Text
Simply replace the existing text between the quotes. For example:

**Before:**
```typescript
headline: "I&I Worldwide is an independent art advisory specializing in emerging to mid-career artists of the Americas."
```

**After:**
```typescript
headline: "I&I Worldwide is an independent art advisory specializing in emerging artists."
```

### Step 4: Save
Press Ctrl+S (or Cmd+S) and the changes appear live in development mode.

## 📋 Content Sections Reference

### `siteConfig`
**Used on:** Every page, header, footer
```typescript
export const siteConfig = {
  name: "I&I Worldwide",           // Logo text
  tagline: "Independent Art Advisory",
  logo: "I&I",                      // Short header text
};
```

### `navigation`
**Used on:** Header & Footer
**Type:** Array of menu items
```typescript
export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  // Add new pages here for menu
];
```

### `homeContent`
**Used on:** Home page (`/`)
```typescript
export const homeContent = {
  title: "I&I Worldwide",           // Main headline
  subtitle: "Independent Art Advisory",
  cta: "Book a free consultation",   // Button text
  ctaLink: "/contact",               // Button link
};
```

### `aboutContent`
**Used on:** About page (`/about`)
```typescript
export const aboutContent = {
  headline: "Main headline...",
  intro: "Introduction paragraph...",
  approach: "How we work paragraph...",
  closing: "Closing statement...",
  services: [
    "Service item 1",
    "Service item 2",
    // More items
  ],
  founderTitle: "About the Founder",
  founderName: "Talia Pockhai",
  founderBio: "Bio paragraph...",
  founderQuote: "Quote from founder...",
  founderApproach: "Approach paragraph...",
  founderClosure: "Closing paragraph...",
};
```

### `servicesContent`
**Used on:** Services page (`/services`)
```typescript
export const servicesContent = {
  headline: "Main headline...",
  intro: "Introduction...",
  services: [
    {
      title: "Service Name",
      description: "What this service is...",
      items: [
        "Feature 1",
        "Feature 2",
        // More features
      ],
    },
    // More services
  ],
};
```

### `testimonials`
**Used on:** Home page
**Type:** Array of objects
```typescript
export const testimonials = [
  {
    text: "What the client said...",
    author: "Client Name, City",
  },
  {
    text: "Another testimonial...",
    author: "Another Client, Location",
  },
  // Add more testimonials
];
```

### `contactContent`
**Used on:** Contact page (`/contact`)
```typescript
export const contactContent = {
  title: "Get in Touch",
  description: "Intro text for contact page...",
  email: "hello@iandiworldwide.com",
  address: "London & Miami",
  phone: "+1 (555) 123-4567",
};
```

### `footerContent`
**Used on:** Footer (every page)
```typescript
export const footerContent = {
  copyright: "© 2024 I&I Worldwide. All rights reserved.",
  socials: [
    { name: "Instagram", url: "https://instagram.com/..." },
    { name: "LinkedIn", url: "https://linkedin.com/..." },
  ],
};
```

## 🎨 Updating Typography

### Page Titles (Large Headings)
These are defined with the `Playfair Display` serif font:
- Home page headline
- About headline
- Services headline
- etc.

To change the text: Edit in `lib/content.ts`

### Font Selection

The website uses:
- **Playfair Display** (serif) - for all headings
- **Helvetica Neue** (sans-serif) - for body text
- **ABC Camera** (accent) - for special emphasis

To change fonts, edit `app/globals.css`:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: "Playfair Display", serif;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
```

## 🎨 Updating Colors

All colors are defined in `app/globals.css`:

```css
:root {
  --olive-leaf: #364E17;        /* Primary green */
  --lavender-grey: #9396BA;     /* Secondary purple */
  --pale-slate: #C1C7D3;        /* Tertiary light blue-grey */
  --granite: #56625A;           /* Dark grey-green accent */
}
```

To change a color, update the hex value. For example:
```css
--olive-leaf: #2D4A1F;  /* Slightly different shade */
```

## 📸 Adding Images

### Blog Post Images
The blog page currently has placeholder gradients. To add images:

1. Place image in `public/` folder
2. In `app/blog/page.tsx`, add image:
```jsx
<div className="h-48 bg-cover" style={{backgroundImage: 'url(/image-name.jpg)'}}>
```

### Gallery Images (Placements & Visual Diary)
Similarly, these pages have placeholder gradients that can be replaced with images.

## 📝 Adding Blog Posts

Blog posts are currently defined in `app/blog/page.tsx`. To add a new post:

1. Open `app/blog/page.tsx`
2. Add new object to `blogPosts` array:
```typescript
{
  id: 7,
  title: 'Your Blog Post Title',
  description: 'Brief excerpt...',
  month: 'Jan',  // For display
  category: 'Market Insights',
}
```

3. Update the blog categories if needed in the `categories` array

## ✅ Checklist for Updates

- [ ] Opened `lib/content.ts`
- [ ] Found the section to edit (use Ctrl+F to search)
- [ ] Updated the text between quotes
- [ ] Saved file (Ctrl+S)
- [ ] Checked the website for changes
- [ ] Tested all links work correctly

## 🔗 Adding New Pages

To add a completely new page:

1. Create folder: `app/your-page-name/`
2. Create file: `page.tsx` in that folder
3. Add to navigation in `lib/content.ts`:
```typescript
export const navigation = [
  // ... existing items
  { name: "Your Page", href: "/your-page-name" },
];
```

Example page template:
```typescript
export default function YourPage() {
  return (
    <div>
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-6xl text-olive-leaf">
            Page Title
          </h1>
          {/* Your content */}
        </div>
      </section>
    </div>
  );
}
```

## 📞 Common Updates

### Change Phone Number
In `lib/content.ts`, find:
```typescript
phone: "+1 (555) 123-4567",
```
Replace with your number.

### Change Email
In `lib/content.ts`, find:
```typescript
email: "hello@iandiworldwide.com",
```
Replace with your email.

### Add a Testimonial
In `lib/content.ts`, in the `testimonials` array, add:
```typescript
{
  text: "This is what the client said...",
  author: "Client Name, Location",
},
```

### Update Founder Information
In `lib/content.ts`, under `aboutContent`, update:
- `founderName`
- `founderBio`
- `founderQuote`
- `founderApproach`
- `founderClosure`

### Add a Service
In `lib/content.ts`, under `servicesContent.services`, add:
```typescript
{
  title: "New Service Name",
  description: "What this service does...",
  items: [
    "Benefit 1",
    "Benefit 2",
  ],
},
```

## 🚀 Deployment

After making changes:

1. **Development**: Changes appear automatically
2. **Production**: Push to GitHub, Vercel/Netlify auto-deploys
3. **Manual Build**:
   ```bash
   npm run build
   npm start
   ```

## ⚠️ Important: Do Not Edit

- `app/page.tsx` - refers to `homeContent`
- `components/*.tsx` - component structure
- `next.config.ts` - build configuration
- `tailwind.config.ts` - Tailwind setup

Only edit content in `lib/content.ts` and this rarely changes the structure.

## 🆘 Troubleshooting

### Changes aren't showing up
1. Save the file (Ctrl+S)
2. Refresh browser (F5)
3. Clear cache (Ctrl+Shift+Delete)

### Text looks broken
- Make sure you didn't delete quote marks
- Example of WRONG: `title: I&I Worldwide,` (missing quotes)
- Example of RIGHT: `title: "I&I Worldwide",`

### Can't find the text
Use Ctrl+F to search `lib/content.ts` for key words

## 📚 Learn More

- Full README: `README_WEBSITE.md`
- Color palette: See `app/globals.css` CSS variables
- Font choices: See `app/globals.css` and `tailwind.config.ts`
- Component code: See `components/` folder
