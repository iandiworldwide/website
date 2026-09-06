# I&I Worldwide Website - Quick Start Guide

## 🎉 Welcome!

Your I&I Worldwide website is ready to go. This guide will help you get started.

## 📖 First Steps

### 1. **Understand the CMS Structure**
All website content is managed in **one file**: `lib/content.ts`

No HTML editing needed! Just update the text strings.

### 2. **View the Website Locally**
```bash
npm install      # Install dependencies (if not already done)
npm run dev      # Start development server
```
Open http://localhost:3000 in your browser.

### 3. **Update Your Content**
Follow [CMS_GUIDE.md](./CMS_GUIDE.md) to update:
- Headlines
- Descriptions
- Testimonials
- Contact information
- Navigation menu
- Blog posts
- Services

## 📍 Key Files

| File | Purpose | Edit? |
|------|---------|-------|
| `lib/content.ts` | **All website copy** | ✅ YES |
| `app/globals.css` | Colors & fonts | ✅ YES |
| `CMS_GUIDE.md` | How to update content | 📖 READ |
| `app/page.tsx` | Home page | ❌ No (uses `lib/content.ts`) |
| `app/*/page.tsx` | Other pages | ❌ No |
| `components/*` | UI components | ❌ No |

## ⚡ 30-Second Content Update

1. Open `lib/content.ts`
2. Find text to change (use Ctrl+F)
3. Edit between the quotes
4. Save file
5. Refresh browser (F5)

**That's it!** No rebuilding, no deployment needed for development changes.

## 🎨 Color Scheme

The website uses your brand colors throughout. To change them:

1. Open `app/globals.css`
2. Find the CSS variables section
3. Update the hex colors
4. Refresh browser

Current colors:
- **Olive Leaf** (#364E17) - Primary
- **Lavender Grey** (#9396BA) - Secondary
- **Pale Slate** (#C1C7D3) - Tertiary
- **Granite** (#56625A) - Text/Accent

## 🌍 Website Pages

All pages are ready to use:

- 🏠 **Home** - Hero section with CTAs
- 📖 **About** - Company mission & founder story
- 💼 **Services** - Your service offerings
- 🖼️ **Placements** - Gallery of placed works
- 📷 **Visual Diary** - Behind-the-scenes imagery
- 📝 **Blog** - Articles & insights
- 📧 **Contact** - Contact form

## 🚀 Deployment (When Ready)

### Easy Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Or Deploy to Netlify

1. Push code to GitHub
2. Connect repo on Netlify.com
3. Set build: `npm run build`
4. Set publish: `.next`

Your website goes live automatically with each commit!

## 🔧 Common Customizations

### Add Your Logo
1. Place image in `public/` folder
2. In `components/Header.tsx`, replace logo text with image

### Change the Header
Edit `siteConfig` in `lib/content.ts`:
```typescript
name: "Your Company Name",
tagline: "Your Tagline",
logo: "LOGO",
```

### Update Phone/Email
In `lib/content.ts`, update `contactContent`:
```typescript
email: "your@email.com",
phone: "+1 (XXX) XXX-XXXX",
```

### Add Social Media Links
In `lib/content.ts`, update `footerContent.socials`:
```typescript
socials: [
  { name: "Instagram", url: "https://instagram.com/your-handle" },
  { name: "LinkedIn", url: "https://linkedin.com/in/your-profile" },
]
```

### Add a Blog Post
In `app/blog/page.tsx`, add to `blogPosts` array:
```typescript
{
  id: 7,
  title: "Your Blog Title",
  excerpt: "Brief description...",
  date: "January 20, 2024",
  category: "Your Category",
  slug: "your-blog-url",
}
```

## 📊 What's Included

✅ Fully responsive website
✅ All 7 pages built and styled
✅ CMS for easy content updates
✅ Beautiful color scheme
✅ Tree of life background visualization
✅ Contact form ready to integrate
✅ Blog with categories
✅ SEO meta tags
✅ Production-ready code
✅ Mobile-optimized design

## 📚 Full Documentation

- **[README.md](./README.md)** - Complete project overview
- **[CMS_GUIDE.md](./CMS_GUIDE.md)** - Detailed content management
- **[README_WEBSITE.md](./README_WEBSITE.md)** - Technical documentation
- **[Next.js Docs](https://nextjs.org/docs)** - Framework help

## ❓ FAQ

**Q: Do I need to code to update the website?**
A: No! Update `lib/content.ts` - that's it.

**Q: How do I add images?**
A: Place in `public/` folder and reference them in components.

**Q: Can I add more pages?**
A: Yes! Create `app/new-page/page.tsx` and add to navigation.

**Q: How do I go live?**
A: Deploy to Vercel or Netlify (see Deployment section above).

**Q: How do I change colors?**
A: Edit `app/globals.css` CSS variables.

**Q: What if something breaks?**
A: Run `npm install && npm run build` to reset.

## 🎯 Next Steps

1. ✅ Read this guide
2. 📖 Read [CMS_GUIDE.md](./CMS_GUIDE.md)
3. ✏️ Update content in `lib/content.ts`
4. 🌍 Deploy to Vercel/Netlify when ready
5. 🚀 Share your website!

---

**Questions?** Check [CMS_GUIDE.md](./CMS_GUIDE.md) or the full [README.md](./README.md)

**Ready to customize?** Start editing `lib/content.ts` now! 🎉
