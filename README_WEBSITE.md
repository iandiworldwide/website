# I&I Worldwide Website

A beautiful, responsive website for I&I Worldwide - Independent Art Advisory specializing in emerging to mid-career artists of the Americas.

## 🏗️ Project Structure

```
.
├── app/                      # Next.js App Router pages
│   ├── about/
│   ├── services/
│   ├── placements/
│   ├── visual-diary/
│   ├── blog/
│   ├── contact/
│   ├── layout.tsx           # Root layout with Header & Footer
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles & color palette
├── components/              # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   └── TreeBackground.tsx   # Tree of life visualizer
├── lib/
│   └── content.ts          # 📝 ALL WEBSITE COPY (CMS)
└── public/                  # Static assets & tree visualizer files
```

## 🎨 Design System

### Color Palette (All pages inherit these colors)
```css
--olive-leaf: #364E17        /* Primary color - dark green */
--lavender-grey: #9396BA     /* Secondary - muted purple */
--pale-slate: #C1C7D3        /* Tertiary - light blue-grey */
--granite: #56625A           /* Text/accent - dark grey-green */
```

### Typography
- **Headings**: Playfair Display (serif) - elegant, sophisticated
- **Body**: Helvetica Neue (sans-serif) - clean, professional
- **Accent Font**: ABC Camera (serif) - used for special emphasis

## 📝 Content Management System (CMS)

All website copy is managed in a **single file** for easy updates: `lib/content.ts`

### Structure
```typescript
export const aboutContent = {
  headline: "Your headline here",
  // ... other properties
};
```

### How to Update Content

1. **Open** `/lib/content.ts`
2. **Find** the section you want to edit (e.g., `aboutContent`, `servicesContent`, etc.)
3. **Update** the text
4. **Save** the file
5. Changes appear immediately in development mode

### Available Content Sections

- `homeContent` - Home page headlines & CTA
- `aboutContent` - About page including founder info
- `servicesContent` - Services page with service descriptions
- `testimonials` - Client testimonials (array of objects)
- `contactContent` - Contact page info
- `footerContent` - Footer copy & social links
- `navigation` - Navigation menu items

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 📄 Page Guide

### Home (`/`)
- Hero section with headline
- Featured artworks gallery (placeholder)
- Client testimonials carousel

### About (`/about`)
- Company mission & approach
- About the founder section
- Services overview

### Services (`/services`)
- Detailed service offerings
- 4 main service categories with features
- Call-to-action to booking

### Placements (`/placements`)
- Gallery of placed artworks
- Category filtering (Painting, Sculpture, Mixed Media)
- Artwork details

### Visual Diary (`/visual-diary`)
- Image gallery with hover effects
- Behind-the-scenes narrative
- Global art travel documentation

### Blog (`/blog`)
- Blog post listing
- Category filtering
- Newsletter signup

### Contact (`/contact`)
- Contact form
- Contact information (email, phone, address)
- Consultation expectations

## 🌳 Tree of Life Visualizer

The background tree of life visualization is rendered as a canvas element in `TreeBackground.tsx` using the I&I color palette. It's:
- **Responsive** - adapts to screen size
- **Subtle** - low opacity so text remains readable
- **Customizable** - modify colors in the component file

## 🔧 Customization

### Adding a New Page

1. Create folder: `app/new-page/`
2. Create file: `app/new-page/page.tsx`
3. Add to navigation in `lib/content.ts`:
```typescript
export const navigation = [
  // ... existing items
  { name: "New Page", href: "/new-page" },
];
```

### Changing Colors

1. Update CSS variables in `app/globals.css`:
```css
--olive-leaf: #YOUR_COLOR;
```
2. Use in components:
```jsx
<div className="text-olive-leaf bg-lavender-grey">...</div>
```

### Adding Images

1. Place images in `public/` folder
2. Reference in components:
```jsx
import Image from "next/image";
<Image src="/image-name.jpg" alt="description" width={800} height={600} />
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`

### Other Platforms
Build command: `npm run build`
Start command: `npm start`

## 📋 SEO & Meta Tags

- Update metadata in `app/layout.tsx`
- Each page can have its own metadata export
- Open Graph tags ready for social sharing

## 🐛 Troubleshooting

### Port already in use
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
- Clear browser cache
- Restart dev server with `npm run dev`

## 📚 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + custom CSS
- **Language**: TypeScript
- **Fonts**: Google Fonts (Playfair Display)
- **Canvas**: Tree of life visualization

## 📞 Support

For issues or questions about the website, check:
1. Make sure all content in `lib/content.ts` is properly formatted
2. Browser console for JavaScript errors
3. Rebuild with `npm run build`

## 📄 License

© 2024 I&I Worldwide. All rights reserved.
