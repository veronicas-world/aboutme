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
    "I am a junior at Columbia interested in early-stage investing, philosophy, entrepreneurship, and emerging/disruptive technologies. One of my core beliefs is that technological innovation has functioned, again and again, as the catalyst of human progress, and that through the thoughtful allocation of capital, we can support founders building a more resilient world. Outside of work, you can find me trying new restaurants in NYC, watching professional soccer, cooking, and hiking.",
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
  "For the past few years, my goal has been to explore as much as I can while trying to figure out what kind of work I enjoy the most and find fulfilling/purposeful. I believe deeply in being a generalist, especially in an AI-driven era, and I have tried to build up as much range as I can to understand what is happening in the world around me and where I can best contribute. Most recently, that has meant working in venture capital and private investing, though I do see myself returning to startups eventually.";

export const experience = [
  {
    year: "May 2026 to Aug 2026",
    role: "Summer Analyst",
    org: "New Enterprise Associates (NEA)",
    note: "One of two fellows promoted into NEA's first-ever summer analyst class. I assess early-stage companies through market sizing, customer research, and investment memos, and build sector theses and market maps to find where technology markets are about to inflect.",
  },
  {
    year: "May 2026 to Aug 2026",
    role: "Investment Fellow",
    org: "Dorm Room Fund",
    note: "A cohort program for students in venture, built around a weekly speaker series with leading founders and investors, one-on-one mentorship, and a community of student investors.",
  },
  {
    year: "May 2026 to Aug 2026",
    role: "Sophomore Summer Analyst, Asset & Wealth Management",
    org: "J.P. Morgan",
    note: "Advising and onboarding clients on portfolio construction, liquidity, and post-exit strategies across public markets and alternatives.",
  },
  {
    year: "January 2026 to June 2026",
    role: "Investment Fellow",
    org: "New Enterprise Associates (NEA)",
    note: "Where my time at NEA began.",
  },
  {
    year: "Sept 2025 to Dec 2025",
    role: "Fall Analyst",
    org: "Burnt Island Ventures",
    note: "Running fund communications across LP and founder-facing materials, and partnering with portfolio companies on go-to-market and digital strategy.",
  },
  {
    year: "May 2025 to Aug 2025",
    role: "Summer Analyst",
    org: "Draper Richards Kaplan Foundation",
    note: "Synthesizing financial and impact data from over 200 portfolio companies for the annual report, working across teams to validate growth metrics across climate tech, healthcare, and social enterprise investments.",
  },
  {
    year: "May 2023 to Aug 2024",
    role: "Analyst",
    org: "Thinker",
    note: "An edtech company spun out of Harvard's Philosophy Department. I led product, content, and growth, built 25+ argument-mapping assets used by 120+ institutions, and edited Harvard course content.",
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
