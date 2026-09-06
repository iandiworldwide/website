// Content Management System for I&I Worldwide
// Every piece of copy shown on the site lives in this file.
// Edit the text between the quotes; the layout takes care of itself.

/* ------------------------------------------------------------------ */
/* Site-wide                                                           */
/* ------------------------------------------------------------------ */

export const siteConfig = {
  name: "I&I Worldwide", // header home link
  tagline: "Independent Art Advisory",
  logo: "I&I", // oversized wordmark on the home page
  // Browser tab title and search-engine description
  metaTitle: "I&I Worldwide - Independent Art Advisory",
  metaDescription:
    "Independent art advisory specializing in emerging to mid-career artists of the Americas. Making art accessible to everyone.",
};

// Two kinds of entry. An href starting with "#" scrolls to a section on the
// home page and its id must match that section. An href starting with "/" is
// its own page. The first three sit centre in the header, the rest right.
export const navigation = [
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Founder", href: "#founder" },
  { name: "Placements", href: "/placements" },
  { name: "Visual Diary", href: "/visual-diary" },
  { name: "Blog", href: "/blog" },
];

export const footerContent = {
  copyright: "© 2024 I&I Worldwide",
  socials: [
    { name: "Instagram", url: "https://www.instagram.com/i.and.i.worldwide" },
    { name: "Substack", url: "https://iandiworldwide.substack.com" },
  ],
};

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

// The opening screen: a small line above, a large statement, one sentence.
// It sits full height over the moving gradient, so keep it short.
export const homeContent = {
  eyebrow: "Independent Art Advisory — London & Miami",
  headline: "Making art accessible to everyone.",
  lede: "I&I Worldwide specializes in emerging to mid-career artists of the Americas.",
  testimonialsLabel: "Clients",
  ctaLabel: "Begin",
  cta: "Book a free consultation",
  ctaLink: "/contact",
};

// The full-height subscribe screen near the foot of the home page.
// It sends people to the Substack rather than to a form that goes nowhere.
export const subscribeContent = {
  eyebrow: "Substack",
  headline: "Letters on collecting, sent now and then.",
  lede: "Notes from the fairs, the studios and the rooms where early decisions get made.",
  cta: "Subscribe on Substack",
  ctaLink: "https://iandiworldwide.substack.com",
};

export const testimonials = [
  {
    text: "Talia's expertise transformed how I approach collecting. Her research is impeccable.",
    author: "Private Collector, Miami",
  },
  {
    text: "An art advisor who truly understands and champions emerging artists.",
    author: "Corporate Client, New York",
  },
  {
    text: "Building my collection with I&I Worldwide has been a meaningful and insightful experience.",
    author: "Collector, London",
  },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const aboutContent = {
  title: "About",
  intro:
    "With a discerning eye and deep knowledge of the contemporary art landscape, we work closely with private clients, corporations, and institutions—whether you're acquiring your first piece or building upon an established collection.",
  approach:
    "Our approach goes beyond transactional. We provide insight into each artist's practice, contextualizing the artist's intention and story, helping clients understand where the work fits within broader art historical and market contexts. By tracking career trajectories and market trends, we guide clients through informed decisions, ensuring thoughtful, meaningful acquisitions.",
  closing:
    "From curation and sourcing to market analysis and collection management, we're here to support your art journey with integrity, clarity, and a genuine passion for contemporary art. We don't advise on speculation. We advise on significance.",
  servicesLabel: "Services",
  services: [
    "An initial consultation to understand your taste, your space and your goals",
    "Monthly curated selections of works matched to your vision and budget",
    "Access to works before they reach the public market",
    "Full acquisition support — research, negotiation and post-sale logistics",
    "Ongoing collection management and advice as your collection grows",
    "Valuations and secondary sales when the time is right",
  ],
  founderTitle: "About the Founder",
  founderName: "Talia Pockhai",
  founderBio:
    "Talia Pockhai is an art advisor and collector based between London and Miami. With nearly two decades of collecting experience, a Masters from Sotheby's Institute of Art, and deep relationships across the global gallery and institutional landscape, Talia brings a rare combination of insider knowledge and genuine passion to every client engagement. Her perspective is informed by research, global art travel and a commitment to championing artists whose work deserves far greater recognition.",
  founderQuote:
    "I started collecting nearly two decades ago and spent years navigating an art world that wasn't built for everyone. Finding artists who spoke directly to me — who reflected my history, my curiosity, my sense of beauty — took years of searching. That search became a career. Now I do it for you.",
  founderApproach:
    "My work sits at the intersection of cultural research and collection strategy, identifying artists at the point where critical recognition precedes market recognition — which is where the most meaningful acquisitions happen. For clients building serious collections, that timing is everything. I travel regularly to art fairs, institutional exhibitions and gallery openings around the world — not waiting for headlines or watching from outside, but by being directly in the rooms where early decisions are made.",
  founderClosure:
    "Every recommendation I make is rooted in deep research — into the artists I source as much as into my clients. I spend time understanding who you are and what's important to you before I bring a single work to your attention. The result is a collection that is a true reflection of you and your journey.",
  ctaLabel: "Begin",
  cta: "Book a free consultation",
  ctaLink: "/contact",
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const servicesContent = {
  title: "Services",
  headline:
    "Whether collecting for your home, diversifying an existing collection, or assembling a corporate collection, I&I Worldwide understands the needs of each of our clients.",
  intro:
    "We offer new and established collectors alike unique acquisition experiences, customized to suit each of their individual interests, aesthetic preferences, budgets and goals.",
  services: [
    {
      title: "Acquisition Planning",
      description:
        "Following an initial consultation with our Founder, where we'll gain a thorough understanding of your artistic vision, we conduct in-depth research into artists and galleries worldwide. Our goal is to source unique pieces specifically tailored to your preferences.",
      items: [
        "Work with clients to establish and refine collection goals",
        "Develop on-going list of artists for consideration",
        "Identify acquisition opportunities (upcoming exhibitions, auctions and potential private market offerings by target artists)",
        "Provide in-depth analysis of artists' primary and secondary markets",
      ],
    },
    {
      title: "Global Access",
      description: "",
      items: [
        "Provide VIP access and personalized navigation of international art fairs",
        "Coordinate customized global art agendas (including private gallery viewings, studio visits, and guided museum tours)",
        "Secure access to works from the world's leading galleries with strategic guidance and recommendations based on individual artist's market as well as broader industry trends",
      ],
    },
    {
      title: "Global Shipping & Installation",
      description: "",
      items: [
        "Domestic and international shipping and insurance",
        "Framing",
        "Professional installation",
        "Storage",
      ],
    },
    {
      title: "Collection Management",
      description: "",
      items: [
        "Create and maintain digital database of client artworks (including up to date provenance and exhibition histories)",
        "Continuously track markets of artists within clients' collections",
        "Identify and facilitate exhibition opportunities (e.g. museum loans)",
        "Identify and facilitate sale opportunities (per terms of original purchase agreement)",
        "Assist in long-term care and conservation of artworks",
        "Art library development",
      ],
    },
  ],
  ctaLabel: "Begin",
  cta: "Schedule a consultation",
  ctaLink: "/contact",
};

/* ------------------------------------------------------------------ */
/* Placements                                                          */
/* ------------------------------------------------------------------ */

export type PlacementCategory =
  | "painting"
  | "sculpture"
  | "works-on-paper"
  | "textile"
  | "mixed-media";

export interface Placement {
  id: number;
  artist: string;
  title: string;
  year: number;
  medium: string;
  category: PlacementCategory;
  /** Path under /public, e.g. "/placements/artist-title.jpg". Leave out to show the placeholder. */
  image?: string;
}

export const placementsContent = {
  title: "Placements",
  intro: "A curated selection of works placed with our clients.",
  filterLabel: "Filter by category",
  gridLabel: "Placed works",
  // The home page shows this many works, then this link to the full page.
  previewCount: 4,
  previewCta: "View all placements",
  previewCtaLink: "/placements",
  ctaLabel: "Enquire",
  cta: "Contact us about upcoming placements",
  ctaLink: "/contact",
};

export const placementCategories: { value: PlacementCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "painting", label: "Painting" },
  { value: "sculpture", label: "Sculpture" },
  { value: "works-on-paper", label: "Works on paper" },
  { value: "textile", label: "Textile" },
  { value: "mixed-media", label: "Mixed media" },
];

// Works shown on the Placements page. The home page shows the first eight that have an image.
// Order here is the order on the page. Image files live in public/placements/.
export const placements: Placement[] = [
  {
    id: 1,
    artist: "Nick Irzyk",
    title: "Dancer",
    year: 2023,
    medium: "Oil on canvas",
    category: "painting",
    image: "/placements/nick-irzyk-dancer.jpg",
  },
  {
    id: 2,
    artist: "Brandon Morris",
    title: "Untitled",
    year: 2022,
    medium: "Leather, wood, polystyrene, and nylon",
    category: "sculpture",
    image: "/placements/brandon-morris-untitled.jpg",
  },
  {
    id: 3,
    artist: "Muzae Sesay",
    title: "Neighborhood",
    year: 2024,
    medium: "Oil pastel on canvas",
    category: "painting",
    image: "/placements/muzae-sesay-neighborhood.jpg",
  },
  {
    id: 4,
    artist: "Ellex Swavoni",
    title: "Genesis",
    year: 2023,
    medium: "Acrylic on canvas",
    category: "painting",
    image: "/placements/ellex-swavoni-genesis.jpg",
  },
  {
    id: 5,
    artist: "Ben Tong",
    title: "Although My Eyes Were Closed",
    year: 2025,
    medium: "Oil on canvas",
    category: "painting",
    image: "/placements/ben-tong-although-my-eyes-were-closed.jpg",
  },
  {
    id: 6,
    artist: "Thebe Phetogo",
    title: "Lowe La Leru (Lowe of the cloud)",
    year: 2024,
    medium: "Acrylic and oil on canvas",
    category: "painting",
    image: "/placements/thebe-phetogo-lowe-la-leru.jpg",
  },
  {
    id: 7,
    artist: "Covey Gong",
    title: "Portrait of a Lady",
    year: 2023,
    medium: "Bronze",
    category: "sculpture",
    image: "/placements/covey-gong-portrait-of-a-lady.jpg",
  },
  {
    id: 8,
    artist: "Justin Chance",
    title: "Station",
    year: 2020,
    medium: "Cut paper, linen tape, and ink on woven paper",
    category: "works-on-paper",
    image: "/placements/justin-chance-station.jpg",
  },
  {
    id: 9,
    artist: "Tyler Garces Ormsby",
    title: "walking after rain",
    year: 2024,
    medium: "Oil on canvas",
    category: "painting",
    image: "/placements/tyler-garces-ormsby-walking-after-rain.jpg",
  },
  {
    id: 10,
    artist: "Esiri Erheriene-Essi",
    title: "E is for Everybody",
    year: 2023,
    medium: "Oil, ink and xerox transfer on linen",
    category: "painting",
    image: "/placements/esiri-erheriene-essi-e-is-for-everybody.jpg",
  },
  {
    id: 11,
    artist: "Jacob Littlejohn",
    title: "Burial",
    year: 2025,
    medium: "Oil and colored pencil on paper",
    category: "works-on-paper",
    image: "/placements/jacob-littlejohn-burial.jpg",
  },
  {
    id: 12,
    artist: "Claudia Alarcón & Silät",
    title: "Opak / My Voice",
    year: 2025,
    medium: "Hand-spun and woven chaguar fiber, natural and industrial dyes",
    category: "textile",
    image: "/placements/claudia-alarcon-silat-opak.jpg",
  },
  {
    id: 13,
    artist: "Antonio Tarsis",
    title: "Untitled",
    year: 2026,
    medium: "Matchbox balsa wood and paper on wood",
    category: "mixed-media",
    image: "/placements/antonio-tarsis-untitled.jpg",
  },
  {
    id: 14,
    artist: "Emma Amos",
    title: "Vision",
    year: 2010,
    medium: "Acrylic on African fabric panel",
    category: "mixed-media",
    image: "/placements/emma-amos-vision.jpg",
  },
  {
    id: 15,
    artist: "Heath Wae",
    title: "Meridian 08 — Cu",
    year: 2026,
    medium: "Pigments, copper and metal salts on linen",
    category: "painting",
    image: "/placements/heath-wae-meridian-08-cu.jpg",
  },
  {
    id: 16,
    artist: "Nnena Kalu",
    title: "Vortex Drawing 49",
    year: 2018,
    medium: "Watercolour, pencil, marker and ink on paper",
    category: "works-on-paper",
    image: "/placements/nnena-kalu-vortex-drawing-49.jpg",
  },
  {
    id: 17,
    artist: "Saj Issa",
    title: "Majnoona",
    year: 2025,
    medium: "Oil on canvas",
    category: "painting",
    image: "/placements/saj-issa-majnoona.jpg",
  },
  {
    id: 18,
    artist: "Kelsey Isaacs",
    title: "classical detail twin",
    year: 2024,
    medium: "Oil on canvas",
    category: "painting",
    image: "/placements/kelsey-isaacs-classical-detail-twin.jpg",
  },
  {
    id: 19,
    artist: "Molly Rose Lieberman",
    title: "I can see the moon from where you stand",
    year: 2026,
    medium: "Oil, acrylic, paper, tape on canvas in artist's frame",
    category: "mixed-media",
    image: "/placements/molly-rose-lieberman-i-can-see-the-moon.jpg",
  },
  {
    id: 20,
    artist: "Molly Rose Lieberman",
    title: "EmBedded",
    year: 2026,
    medium: "Oil, acrylic, paper, tape on canvas in artist's frame",
    category: "mixed-media",
    image: "/placements/molly-rose-lieberman-embedded.jpg",
  },
  {
    id: 21,
    artist: "Autumn Ramsey",
    title: "The Light",
    year: 2024,
    medium: "Oil on canvas",
    category: "painting",
    image: "/placements/autumn-ramsey-the-light.jpg",
  },
  {
    id: 22,
    artist: "Mohammed Z Rahman",
    title: "Spaghetti Rooms III (Games)",
    year: 2026,
    medium: "Acrylic on canvas",
    category: "painting",
    image: "/placements/mohammed-z-rahman-spaghetti-rooms-iii.jpg",
  },
];

/* ------------------------------------------------------------------ */
/* Visual Diary                                                        */
/* ------------------------------------------------------------------ */

export interface DiaryEntry {
  id: number;
  /** Path under /public, e.g. "/visual-diary/photo.jpg". */
  image: string;
  /** Short description for screen readers. Not shown on the page. */
  alt: string;
  /** Optional. Shown beneath the image when present. */
  caption?: string;
  /** Optional. Makes the image (and caption) a link. External links open in a new tab. */
  link?: string;
  /** Optional. Overrides the automatic size: "small", "medium" or "large". */
  size?: "small" | "medium" | "large";
}

export const visualDiaryContent = {
  title: "Visual Diary",
  intro: "A glimpse into our world of art, travel, and discovery.",
  feedLabel: "Diary entries",
  // Images are scattered down the page in a loose, non-grid flow.
  // Change the seed to any other number to get a different arrangement.
  seed: 7,
  // true = ignore the list order below and mix the images up (by seed).
  shuffle: true,
};

// No captions by default. Add `caption` and/or `link` to any entry to show them.
export const diaryEntries: DiaryEntry[] = [
  { id: 1, image: "/visual-diary/acrylic-letters.jpg", alt: "Cut acrylic letters pinned to a wall" },
  { id: 2, image: "/visual-diary/seafood-table.jpg", alt: "Mussels, clams and flatbread on a long black table" },
  { id: 3, image: "/visual-diary/ceramic-legs.jpg", alt: "Stitched ceramic legs on a gallery floor" },
  { id: 4, image: "/visual-diary/bottles-by-the-sea.jpg", alt: "Seven glass bottles on a plinth by a window to the sea" },
  { id: 5, image: "/visual-diary/dinner-place-setting.jpg", alt: "A dinner place setting with a menu and place card" },
  { id: 6, image: "/visual-diary/heath-wae-painting.jpg", alt: "Framed pink and blue painting by Heath Wae" },
  { id: 7, image: "/visual-diary/black-sphere-white-column.jpg", alt: "A black sphere and a white column in a corner" },
  { id: 8, image: "/visual-diary/molly-rose-lieberman-framed.jpg", alt: "Framed painting by Molly Rose Lieberman" },
];

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  author?: string;
  content?: string;
}

export const blogContent = {
  title: "Blog",
  intro: "Insights on contemporary art, collecting, and the global art market.",
  filterLabel: "Filter by category",
  allLabel: "All", // the filter that shows every post
  categories: ["Market Insights", "Collecting Guide", "Artist Spotlight", "Events"],
  newsletterLabel: "Newsletter",
  newsletterFieldLabel: "Email",
  newsletterPlaceholder: "your@email.com",
  newsletterButton: "Subscribe",
};

// To add a post, copy one of these blocks and change the text.
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Emerging Art Markets",
    slug: "future-emerging-art-markets",
    excerpt:
      "Exploring trends in contemporary art collecting and what collectors should watch for in 2024.",
    date: "January 15, 2024",
    category: "Market Insights",
    author: "Talia Pockhai",
  },
  {
    id: 2,
    title: "Understanding Artist Provenance",
    slug: "understanding-artist-provenance",
    excerpt:
      "A deep dive into why provenance matters and how it affects both value and authenticity.",
    date: "January 8, 2024",
    category: "Collecting Guide",
  },
  {
    id: 3,
    title: "Latin American Contemporary Art: A Golden Age",
    slug: "latin-american-contemporary-art",
    excerpt:
      "Why Latin American artists are gaining critical recognition and market momentum globally.",
    date: "December 28, 2023",
    category: "Artist Spotlight",
  },
  {
    id: 4,
    title: "Building Your First Art Collection",
    slug: "building-first-art-collection",
    excerpt:
      "Essential tips for new collectors: budget considerations, sourcing, and authentication.",
    date: "December 20, 2023",
    category: "Collecting Guide",
  },
  {
    id: 5,
    title: "The Art Fair Calendar: What Not to Miss",
    slug: "art-fair-calendar-guide",
    excerpt: "A comprehensive guide to the global art fair circuit and which ones matter most.",
    date: "December 10, 2023",
    category: "Events",
  },
  {
    id: 6,
    title: "Women Artists Reshaping Contemporary Discourse",
    slug: "women-artists-contemporary",
    excerpt: "Celebrating emerging and mid-career women artists redefining contemporary art.",
    date: "November 30, 2023",
    category: "Artist Spotlight",
  },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contactContent = {
  title: "Contact",
  description:
    "Let's start your art journey together. Book a free consultation to discuss your vision and goals.",
  detailsLabel: "Details",
  email: "hello@iandiworldwide.com",
  address: "London & Miami",
  phone: "+1 (555) 123-4567",
  formLabel: "Write to us",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your art collecting interests and goals",
    submit: "Send message",
    success: "Thank you for reaching out. We will be in touch soon.",
  },
  expectLabel: "What to expect",
  expect: [
    "During your initial consultation, we will discuss your collecting goals, aesthetic preferences, budget, and the spaces where you envision displaying art. This conversation helps us understand your vision and identify artists and works that align with your values.",
    "Whether you are acquiring your first piece or building a serious collection, we are here to guide you with expertise, integrity, and genuine passion for contemporary art.",
  ],
};
