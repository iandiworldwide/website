# I&I Worldwide - Independent Art Advisory Website

A modern, elegant website for **I&I Worldwide**, an independent art advisory specializing in emerging to mid-career artists of the Americas.

🌐 **Live Demo**: [Coming Soon](#)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd iandi

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📝 Content Management

**All website copy is in one file** - no coding required to update content!

### Quick Edit Guide
1. Open `lib/content.ts`
2. Find the section to edit (use Ctrl+F to search)
3. Update the text
4. Save - changes appear immediately

**See [CMS_GUIDE.md](./CMS_GUIDE.md)** for detailed instructions on managing all website content.

## 🏗️ Website Structure

- **Home** (`/`) - Hero section with featured works and testimonials
- **About** (`/about`) - Company mission, approach, and founder story
- **Services** (`/services`) - Detailed service offerings
- **Placements** (`/placements`) - Gallery of placed artworks
- **Visual Diary** (`/visual-diary`) - Behind-the-scenes imagery
- **Blog** (`/blog`) - Insights on contemporary art collecting
- **Contact** (`/contact`) - Contact form and information

## 🎨 Design Features

- **Color Palette**: Sophisticated earth tones and lavender tones
  - Olive Leaf (#364E17)
  - Lavender Grey (#9396BA)
  - Pale Slate (#C1C7D3)
  - Granite (#56625A)

- **Typography**: Playfair Display (headings) + Helvetica (body)
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Tree of Life Visualizer**: Subtle animated background using canvas
- **Interactive Elements**: Hover effects, smooth scrolling, form validation

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Playfair Display)
- **Deployment Ready**: Vercel, Netlify, or any Node.js hosting

## 📦 Build & Deploy

### Production Build
```bash
npm run build
npm start
```

### Deployment Options

**Vercel** (Recommended)
```bash
npm install -g vercel
vercel
```

**Netlify**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`

**Other Platforms**
```bash
npm run build
npm start
```

## 📋 Project Structure

```
.
├── app/                           # Next.js pages
│   ├── page.tsx                  # Home page
│   ├── about/page.tsx            # About page
│   ├── services/page.tsx         # Services page
│   ├── placements/page.tsx       # Placements gallery
│   ├── visual-diary/page.tsx     # Visual diary
│   ├── blog/page.tsx             # Blog listing
│   ├── contact/page.tsx          # Contact form
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles & colors
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer with links
│   ├── Button.tsx                # Reusable button
│   └── TreeBackground.tsx        # Tree of life canvas
├── lib/
│   ├── content.ts                # 📝 ALL WEBSITE COPY (CMS)
│   └── types.ts                  # TypeScript types
├── public/                        # Static assets
├── CMS_GUIDE.md                  # 📖 Content editing guide
└── README_WEBSITE.md             # Website technical docs
```

## ✨ Key Features

✅ **Easy Content Management** - All text in one TypeScript file  
✅ **SEO Optimized** - Meta tags, semantic HTML  
✅ **Mobile Responsive** - Works on all devices  
✅ **Fast Performance** - Next.js optimizations, static generation  
✅ **Beautiful Design** - Custom color scheme and typography  
✅ **Interactive Components** - Smooth animations, hover effects  
✅ **Contact Form** - Built-in form handling  
✅ **Blog Ready** - Blog page with category filtering  
✅ **Tree of Life Background** - Subtle canvas visualization  
✅ **Testimonials** - Client testimonials carousel  

## 📚 Documentation

- **[CMS_GUIDE.md](./CMS_GUIDE.md)** - How to update all website content
- **[README_WEBSITE.md](./README_WEBSITE.md)** - Technical documentation
- **[Next.js Docs](https://nextjs.org/docs)** - Framework documentation

## 🎯 Common Tasks

### Update Site Text
See [CMS_GUIDE.md](./CMS_GUIDE.md)

### Change Colors
Edit `app/globals.css` CSS variables

### Add a New Page
1. Create `app/your-page/page.tsx`
2. Add to navigation in `lib/content.ts`

### Add a Testimonial
Edit `testimonials` array in `lib/content.ts`

### Add Blog Post
Edit `blogPosts` array in `app/blog/page.tsx`

## 🐛 Troubleshooting

### Port in use
```bash
npm run dev -- -p 3001
```

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Styles not applying
Clear cache and restart dev server

## 📞 Support

For issues or questions:
1. Check [CMS_GUIDE.md](./CMS_GUIDE.md) for content updates
2. Check [README_WEBSITE.md](./README_WEBSITE.md) for technical help
3. Review [Next.js documentation](https://nextjs.org/docs)

## 📄 License

© 2024 I&I Worldwide. All rights reserved.

---

**Ready to make changes?** Start with [CMS_GUIDE.md](./CMS_GUIDE.md) for a complete guide on updating website content!
