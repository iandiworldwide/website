# 🎯 I&I Worldwide Website - Quick Reference Card

Print this or bookmark it for quick access!

---

## 📍 Project Location
```
/Users/valentineeluwasi/Documents/GitHub/iandi
```

---

## 🚀 Start Development Server
```bash
cd /Users/valentineeluwasi/Documents/GitHub/iandi
npm run dev
# Visit: http://localhost:3000
```

---

## ✏️ Update Website Text
1. Open: `lib/content.ts`
2. Find text to change (use Ctrl+F)
3. Edit the text
4. Save file (Ctrl+S)
5. Refresh browser (F5)

---

## 🎨 Change Colors
Edit: `app/globals.css`
```css
--olive-leaf: #364E17;        /* Primary green */
--lavender-grey: #9396BA;     /* Secondary purple */
--pale-slate: #C1C7D3;        /* Tertiary light */
--granite: #56625A;           /* Dark accent */
```

---

## 📚 Which File to Read?

| Need | Read This |
|------|-----------|
| Overview | WELCOME.md |
| Where to start | DOCUMENTATION_INDEX.md |
| 5-minute guide | QUICK_START.md |
| Update content | CMS_GUIDE.md |
| Prepare to launch | LAUNCH_CHECKLIST.md |
| Technical details | README_WEBSITE.md |
| What was built | BUILD_SUMMARY.md |

---

## 📁 Project Structure

```
iandi/
├── 📖 WELCOME.md                 ← START HERE
├── 📖 DOCUMENTATION_INDEX.md     ← Navigation
├── 🚀 QUICK_START.md             ← 5-min guide
├── ✏️ CMS_GUIDE.md               ← Update content
├── 📋 LAUNCH_CHECKLIST.md        ← Before launch
├── app/                          ← Website pages
│   ├── page.tsx                 ← Home
│   ├── about/page.tsx           ← About
│   ├── services/page.tsx        ← Services
│   ├── placements/page.tsx      ← Gallery
│   ├── visual-diary/page.tsx    ← Diary
│   ├── blog/page.tsx            ← Blog
│   ├── contact/page.tsx         ← Contact
│   └── globals.css              ← Colors & fonts
├── components/                   ← UI Components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   └── TreeBackground.tsx
├── lib/
│   ├── content.ts               ← 📝 ALL TEXT HERE
│   └── types.ts
└── public/                       ← Images & assets
```

---

## 🎬 5-Minute Setup

1. **Read** WELCOME.md (1 min)
2. **Run** `npm run dev` (1 min)
3. **Open** `lib/content.ts` (1 min)
4. **Edit** your info (1 min)
5. **Refresh** browser (1 min)

---

## 📝 CMS Content Sections

| Section | What | File |
|---------|------|------|
| Site name | Logo, tagline | `lib/content.ts` |
| Navigation | Menu items | `lib/content.ts` |
| Home | Headlines, CTA | `lib/content.ts` |
| About | Mission, founder | `lib/content.ts` |
| Services | Service details | `lib/content.ts` |
| Contact | Email, phone | `lib/content.ts` |
| Testimonials | Client quotes | `lib/content.ts` |
| Footer | Links, copyright | `lib/content.ts` |

---

## 🌐 Website Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page |
| About | `/about` | Company info |
| Services | `/services` | What we offer |
| Placements | `/placements` | Art gallery |
| Visual Diary | `/visual-diary` | Behind scenes |
| Blog | `/blog` | Articles |
| Contact | `/contact` | Contact form |

---

## 💻 Common Commands

| Command | What It Does |
|---------|--------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Check for errors |
| Ctrl+C | Stop the server |

---

## 🔧 Customization Quick Tips

### Add Your Logo
1. Place in `public/logo.jpg`
2. Edit `components/Header.tsx`

### Change Company Name
Edit `siteConfig.name` in `lib/content.ts`

### Add Email
Edit `contactContent.email` in `lib/content.ts`

### Add Phone
Edit `contactContent.phone` in `lib/content.ts`

### Add Social Links
Edit `footerContent.socials` in `lib/content.ts`

### Add Testimonial
Add to `testimonials` array in `lib/content.ts`

### Add Blog Post
Add to `blogPosts` array in `app/blog/page.tsx`

---

## 🚀 Deploy (When Ready)

### Quick Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Or Deploy to Netlify
1. Push to GitHub
2. Connect repo on netlify.com
3. Set build: `npm run build`
4. Set publish: `.next`

---

## 🐛 If Something Breaks

```bash
# Clear and rebuild
rm -rf .next node_modules
npm install
npm run build
npm run dev
```

---

## ✅ Pre-Launch Checklist

- [ ] Content updated
- [ ] Colors customized
- [ ] Logo added
- [ ] Contact info set
- [ ] Tested on mobile
- [ ] Tested all forms
- [ ] Built locally
- [ ] Ready to deploy!

---

## 📊 What You Have

✅ 7 complete pages
✅ 4 components  
✅ Responsive design
✅ Custom colors & fonts
✅ CMS for content
✅ Blog system
✅ Contact form
✅ Testimonials
✅ Image galleries
✅ Tree background
✅ Full documentation
✅ Production ready

---

## 🎯 Next Action

### Choose One:

**Option A: See It Work**
```bash
npm run dev
# Visit http://localhost:3000
```

**Option B: Update Content**
```
Open: lib/content.ts
Edit: Your company info
```

**Option C: Customize Design**
```
Open: app/globals.css
Edit: Colors and fonts
```

**Option D: Deploy Live**
```
Read: LAUNCH_CHECKLIST.md
Follow: Deployment steps
```

---

## 📞 Need Help?

| Question | Read |
|----------|------|
| Where to start? | WELCOME.md |
| How to update content? | CMS_GUIDE.md |
| How to deploy? | LAUNCH_CHECKLIST.md |
| Technical help? | README_WEBSITE.md |
| Find something? | DOCUMENTATION_INDEX.md |

---

## 🎉 You're All Set!

Your website is ready to use. Pick your next action above and get started! 

**👉 Start with: WELCOME.md or QUICK_START.md**

---

© 2024 I&I Worldwide

*Built with Next.js, React, TypeScript, and Tailwind CSS*
