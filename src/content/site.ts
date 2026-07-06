// ============================================================================
//  SITE CONTENT  —  EDIT EVERYTHING HERE
// ----------------------------------------------------------------------------
//  This is the ONE file you edit to change wording across the whole site.
//  Nothing here is final copy — it's seeded with your real facts and some of
//  your own About-page phrasing so the site isn't empty. Rewrite freely.
//  (Your essays live as Markdown files in /content/posts — not here.)
// ============================================================================

export const site = {
  name: "Veronica Agudelo",
  // Small uppercase line above your name in the hero:
  eyebrow: "Investor · Writer · Student of complex systems",
  // The one big sentence under your name (EDIT — make it sound like you):
  heroLead:
    "I am a junior at Columbia interested in early-stage investing, philosophy, entrepreneurship, and emerging/disruptive technologies. I got my start working at an early-stage edtech company, and that experience has shaped how I think about supporting and investing in founders today. One of my core beliefs is that technological innovation has functioned, again and again, as the catalyst of human progress, and that through the thoughtful allocation of capital, we can support those building a more resilient world. Outside of work, you can find me trying new restaurants in NYC, watching professional soccer, cooking, reading, and hiking.",
  // Affiliations shown small under the hero line:
  heroAffiliations: [
    "Columbia",
    "New Enterprise Associates",
    "J.P. Morgan",
    "Dorm Room Fund",
  ],
  location: "New York · 40.7°N",
  established: "Est. 2026",
};

// ---- NAVIGATION -----------------------------------------------------------
export const nav = [
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Writings", href: "/writings" },
  { label: "Readings", href: "/readings" },
  { label: "About", href: "/about" },
];

// ---- HOME labeled rows (Atlas-style) --------------------------------------
// "Now" line on the home page. EDIT freely.
export const homeNow =
  "Summer Analyst at NEA, J.P. Morgan & Dorm Room Fund · Building Whel";

// "Elsewhere" links on the home page.
export const homeElsewhere = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vlagudelo/" },
  { label: "Substack", href: "https://veronicaagudelo.substack.com/" },
  { label: "Email", href: "mailto:vla2117@columbia.edu" },
];

// ---- ABOUT (home, section 01) ---------------------------------------------
// Seeded from your Substack About page (your words). EDIT to taste.
export const about = {
  lead:
    "I'm Veronica — a writer and student in New York, studying Philosophy, Economics, and Science, Technology & Society (STS) at Columbia, and working in early-stage venture.",
  paragraphs: [
    "I was born in New York City, spent half a decade in Cali, Colombia, then Boston, and am now back in NYC. I'm fascinated by the long arc of technology: how tools compound, how each invention bends the curve of the next, and how the same human impulse that sketched gears in a notebook five centuries ago now writes the software reshaping the world.",
    "I'm a (cautious) optimist. I've come to understand technology not as something that evolves independent of us, but as something inextricably human throughout its entire value chain — from conception to the ways it is built, maintained, and eventually repurposed by people. That thread runs through everything I do: backing the people building what's next, and writing to understand why it matters.",
  ],
};

// ---- NOW (home, section 02) -----------------------------------------------
export const now = [
  { role: "Summer Analyst", org: "New Enterprise Associates (NEA)" },
  { role: "Sophomore Summer Analyst, USPB", org: "J.P. Morgan" },
  { role: "Fellow", org: "Dorm Room Fund" },
  { role: "Writing essays", org: "Local Maxima" },
  { role: "Mentor", org: "Girls Into VC" },
];

// ---- WRITING TEASER (home, section 03) ------------------------------------
export const writingTeaser = {
  // Shown on the home page above a few featured essays:
  intro:
    "Essays on philosophy, emerging & disruptive technology, and the craft of early-stage investing — published at Local Maxima.",
  // Slugs of posts to feature on the home page (must match files in /content/posts):
  featured: [
    "a-philosophy-of-progress",
    "the-saaspocalypse-and-the-return",
    "on-nontechnical-building",
  ],
};

// ---- EXPERIENCE -----------------------------------------------------------
// Intro shown at the top of the Experience page. EDIT freely.
export const experienceIntro =
  "For the past few years, my goal has been to explore as much as I can while figuring out what kind of work I find most fulfilling and purposeful. I believe deeply in being a generalist, especially in an AI-driven era, and I've tried to build as much range as I can in order to understand what's happening in the world around me and where I can best contribute.\n\nI got my start building at an early-stage company, and most recently that has meant working in venture capital and private investing. I've come to think that being a good early- to growth-stage investor means understanding the entire arc a company travels (including what different kinds of exits look like) which is why I've wanted to understand the public and capital markets, and not only the private side of the table. I still see myself returning to building/startups eventually.";

export const experience = [
  {
    year: "May 2026 to Aug 2026",
    role: "Incoming Fall Analyst",
    org: "New Enterprise Associates (NEA)",
    location: "New York, NY",
    logo: "/logos/nea.webp",
    note: "One of two students in the first Summer/Fall Analyst class in NEA's ~fifty–year history, continuing the work I started during my fellowship.",
  },
  {
    year: "May 2026 to Aug 2026",
    role: "Blueprint Fellow",
    org: "Dorm Room Fund",
    logo: "/logos/dorm-room-fund.jpg",
    note: "Dorm Room Fund is a student‑run pre‑seed venture capital fund backed by First Round Capital, with 400+ investments, 140+ exits, and a portfolio of 300+ student‑led companies that have raised $6B+ in follow‑on capital.\n\nI am a fellow in their Blueprint track, an intensive program for underrepresented investors and founders, combining deal evaluation, founder support, and curriculum to help fellows build an investing toolkit and venture track record.",
  },
  {
    year: "May 2026 to Aug 2026",
    role: "Sophomore Summer Analyst, Asset & Wealth Management",
    org: "J.P. Morgan",
    location: "New York, NY",
    logo: "/logos/jpm.png",
    note: "J.P. Morgan's Asset & Wealth Management platform oversees roughly $4.8 trillion in assets under management (AUM) and $7.1 trillion in total client assets, delivering public and private market strategies, portfolio construction, and advisory across institutions and clients.\n\nI work primarily within the U.S. Private Bank on their alternatives platform, researching venture and growth‑equity funds sourced from the Global Alternative Investment Solutions team, with an emphasis on how these strategies slot into multi‑asset portfolios for clients.",
  },
  {
    year: "January 2026 to June 2026",
    role: "Fellow",
    org: "New Enterprise Associates (NEA)",
    location: "New York, NY",
    logo: "/logos/nea.webp",
    note: "New Enterprise Associates (NEA) is a venture capital firm with ~$30B+ in assets under management, nearly 1,000 investments, 270+ IPOs and 450+ M&A exits across technology and healthcare companies from seed through IPO (fun fact, NEA is one of the largest suppliers of companies to the public market!).\n\nDuring my time as a [fellow](https://neafellowship.com/), I assessed prospective investments via market sizing, competitive and customer analysis, and investment memos, while building sector theses and market maps that identified key technical, commercial, and operational inflection points to inform NEA's sourcing and diligence. My work contributed directly to two firmwide investments.",
  },
  {
    year: "Sept 2025 to Dec 2025",
    role: "Fall Analyst",
    org: "Burnt Island Ventures",
    location: "New York, NY",
    logo: "/logos/burnt-island.webp",
    logoTile: true,
    note: "Burnt Island Ventures is an early‑to-growth stage venture capital firm focused exclusively on water technology, backing founders who build critical infrastructure, analytics, and climate‑resilient solutions in the $1.6T global water market.\n\nI ran fund communications during my time there (including during the launch of their $50 million Fund II in October of 2025), leading LP and founder‑facing materials and digital strategy across LinkedIn, web, YouTube, and X. Additionally, I partnered with portfolio companies on go‑to‑market and operational initiatives, using performance analytics to improve reach and engagement outcomes.",
  },
  {
    year: "May 2025 to Aug 2025",
    role: "Summer Analyst",
    org: "Draper Richards Kaplan Foundation",
    location: "Boston, MA & Menlo Park, CA",
    logo: "/logos/drkf.jpg",
    note: "The Draper Richards Kaplan Foundation (DRK) is a global venture‑philanthropy firm that supports early‑stage (mostly Series A), high‑impact social enterprises tackling urgent social and environmental problems. They have funded 277+ early‑stage social enterprises whose portfolio has collectively impacted over 610 million lives across sectors including healthcare, education, climate resilience, and food access.\n\nDuring my time there, I worked on financial and impact data from their 200+ portfolio companies to create the annual report, validating growth metrics and investment communications across stakeholders.",
  },
  {
    year: "May 2023 to Aug 2024",
    role: "Analyst",
    org: "Thinker",
    location: "Cambridge, MA",
    logo: "/logos/thinker.png",
    note: "Thinker is an edtech startup spun out of Harvard's Philosophy Department that builds argument‑mapping tools and curriculum to teach critical thinking and argumentative reasoning, used by over 120+ schools and universities.\n\nDuring my time there, I led product, content, and growth initiatives, creating 25+ argument maps and 75+ pages of HarvardX course content. Additionally, I helped redesign their website for accessibility compliance (WCAG standards).",
  },
];

export const educationTimeline = [
  {
    year: "Aug 2024 to May 2028 (expected)",
    role: "Columbia University",
    location: "New York, NY",
    logo: "/logos/columbia.png",
    bullets: [
      "3.96 / 4.00 GPA",
      "Student Advisory Board — Eric H. Holder Initiative for Civil and Political Rights",
      "Board Member — Latino Professional Network",
      "Interviewer — Gadfly Magazine",
      "Member — Girls Into VC, Sustainable Finance Group, and Girls Who Invest",
    ],
  },
];

export const education = {
  schools: [
    {
      name: "Columbia University",
      note: "Philosophy, Economics & Science, Technology & Society (STS) · Gadfly Magazine · Sustainable Finance Group · Girls Into VC · Latino Professional Network · Girls Who Invest",
    },
    { name: "The Winsor School", note: "" },
  ],
  credentials: [
    "Investment Foundations® — CFA Institute",
    "Mentor — Girls Into VC",
  ],
  languages: "English · Spanish · Latin",
};

// ---- THE SHELF / READING (home, section 05) -------------------------------
// EDIT — swap in the books shaping your thinking.
export const shelf = [
  { title: "Add a title", author: "Author" },
  { title: "Add a title", author: "Author" },
  { title: "Add a title", author: "Author" },
  { title: "Add a title", author: "Author" },
  { title: "Add a title", author: "Author" },
];

// ---- CURIOSITIES / INTERESTS (home, section 06) ---------------------------
export const interests = [
  "Evolution & the history of humanity",
  "The acceleration of technology",
  "German Idealism",
  "Post-structuralism",
  "Complex systems",
  "Early-stage venture",
  "First-principles design",
  "Open societies",
];

// ---- CONTACT (home, section 07) -------------------------------------------
// NOTE: I did not publish your personal email automatically. Add it if you want.
export const contact = [
  { label: "LinkedIn", value: "/in/vlagudelo", href: "https://www.linkedin.com/in/vlagudelo/" },
  { label: "Local Maxima", value: "Substack", href: "https://veronicaagudelo.substack.com/" },
  { label: "Email", value: "add your email", href: "#" },
  { label: "X / Twitter", value: "add your handle", href: "#" },
];

// ---- THE "WHY LOCAL MAXIMA" INTRO (Writings landing page) ------------------
// Seeded from your About page. EDIT freely.
export const localMaxima = {
  title: "Local Maxima",
  tagline: "Observations, philosophical inquiries, and the occasional half-formed argument.",
  // The first paragraph renders, then the sketch, then the rest.
  intro: [
    "In math, local maxima are points on a graph that look like peaks when you zoom in, but aren't the highest points overall (those are called global maxima (see the sketch below)).",
    "This blog is a collection of those — observations, philosophical inquiries, and the occasional half-formed argument from someone fully aware that there are far higher summits than whatever I happen to write about (many of which you can find {{readings}}).",
    "Most of it lives at the intersection of ethics, venture, and emerging technology. Some of it is rigorous. Most of it is not.",
    "If you have thoughts or feedback, please do reach out. I'd love to chat.",
  ],
  substackUrl: "https://veronicaagudelo.substack.com/",
};

// Category labels & order for the Writings page.
export const categories: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "emerging-tech", label: "Emerging & Disruptive Tech" },
  { id: "philosophy", label: "Philosophy & Progress" },
  { id: "interviews", label: "Interviews" },
  { id: "projects", label: "Projects" },
  { id: "academic", label: "Academic" },
];

// ---- PROJECTS -------------------------------------------------------------
// EDIT — each project gets its own page at /projects/<slug>.
// relatedPosts: slugs of essays (in /content/posts) to surface on the project page.
export const projects = [
  {
    slug: "whel",
    name: "Whel",
    subtitle: "Women's Health Evidence Lab",
    year: "2026 — Present",
    role: "Founder",
    tags: ["Drug repurposing", "Women's health", "Research tooling"],
    summary:
      "A drug-repurposing research tool that mines scattered evidence (trials, case reports, mechanisms) for conditions like endometriosis, PMDD, and PCOS — surfacing useful truths that can be present in data before anyone knows to look for them.",
    body: [
      "Whel (Women's Health Evidence Lab) began as a question: how many useful truths are already sitting in the literature, waiting for someone to connect them? It's a tool for finding repurposing candidates by mining scattered, under-connected evidence across trials, case reports, and mechanisms.",
      "EDIT — expand this with the story of why you started it, what it does today, and where it's going. The detailed essays are linked below.",
    ],
    links: [
      { label: "Read the essays", href: "/writings?category=projects" },
    ],
    relatedPosts: ["building-whel", "an-update-on-whel", "rebuilding-whel"],
  },
];
