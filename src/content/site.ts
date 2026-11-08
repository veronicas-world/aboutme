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
    "I am a junior at Columbia interested in venture capital, philosophy, entrepreneurship, and emerging/disruptive technologies. I believe that the world has gotten better over time because founders have taken on hard, uncertain projects that few others would, and as such, I have an enormous amount of respect for the people who dedicate their lives to that kind of work. More broadly, my view is that technological innovation is the greatest catalyst of progress, and that through the thoughtful allocation of capital we can accelerate the work of those building a resilient and abundant future.\n\nMost of my time today is spent at [Lightspeed](https://lsvp.com/) and [Dorm Room Fund](https://www.dormroomfund.com/). I find this work incredibly fulfilling and have been lucky to learn from a number of brilliant people early on in my career. This is not an opportunity I take lightly.\n\nAs for my interests in tech, they are many, but I have spent the most time in applied AI. The categories that I think will become massive in the next five years are the space economy, cybersecurity, robotics-as-a-service (RaaS) + the data and deployment companies that support it, and drug discovery.\n\nOutside of work, you can find me listening to electronic music, trying new restaurants in NYC, watching professional soccer or a docuseries, cooking, and hiking.",
  // Standalone middle paragraph in the hero bio, with an inline link:
  heroInterests: {
    before:
      "My interests within tech are many and they shift as I learn more. The most current account of what I'm interested in can be found ",
    linkText: "here",
    href: "/writings/veronicas-2026-mid-year-outlook",
    after:
      ". That said, most of my work in investing has been in applied AI. A good way to frame this vertical, I think, is that if the frontier labs are creating the next generation of generalist intelligence models, then applied AI is the successful deployment and configuration of that intelligence in practice. As it turns out, configuration and deployment is a very hard thing to do well. I enjoy this work and find it meaningful. Beyond applied AI, I've spent time in robotics, defense, AI infra, fintech, and a bit of consumer. Recently, I have also developed a strong interest in world models.",
  },
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
  // Projects page archived: hidden from the menu, but /projects still works.
  // { label: "Projects", href: "/projects" },
  { label: "Writings", href: "/writings" },
  { label: "Library", href: "/readings" },
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
// logoWide: wordmark logos (much wider than tall) get a shorter max height so
// they read at the same visual weight as square marks.
export const experience = [
  {
    year: "Oct 2026 – Now",
    role: "New Media",
    org: "Lightspeed Venture Partners",
    location: "NYC",
    logo: "/logos/std/lightspeed.png",
    logoWide: true,
  },
  {
    year: "Oct 2026 – Now",
    role: "Investment Partner",
    org: "Dorm Room Fund",
    location: "NYC",
    logo: "/logos/std/dorm-room-fund-dark.png",
  },
  {
    year: "Aug 2026 – Now",
    role: "Campus Growth",
    org: "Factory",
    location: "NYC",
    logo: "/logos/std/factory.png",
    logoWide: true,
    note: "Building Factory's Guild program on college campuses and created a database of 4,698 engineers across 38 universities.",
  },
  {
    year: "May – Aug 2026",
    role: "Summer Analyst, Tech Investing",
    org: "New Enterprise Associates (NEA)",
    location: "NYC",
    logo: "/logos/std/nea.webp",
    logoWide: true,
    note: "One of two students in the first Summer Analyst class in NEA's ~50-year history.",
  },
  {
    year: "May – Aug 2026",
    role: "Summer Analyst, Asset & Wealth Management",
    org: "J.P. Morgan",
    location: "NYC",
    logo: "/logos/std/jpm.png",
    logoWide: true,
    note: "Mostly worked in venture and growth-equity funds for the alternatives platform and mapped the neolab and frontier AI ecosystem in NYC.",
  },
  {
    year: "Jan – Jun 2026",
    role: "Fellow",
    org: "New Enterprise Associates (NEA)",
    location: "NYC",
    logo: "/logos/std/nea.webp",
    logoWide: true,
  },
  {
    year: "Sep – Dec 2025",
    role: "Fall Analyst",
    org: "Burnt Island Ventures",
    location: "NYC",
    logo: "/logos/std/burnt-island.webp",
  },
  {
    year: "May – Aug 2025",
    role: "Summer Analyst",
    org: "Draper Richards Kaplan Foundation",
    location: "Boston & Menlo Park",
    logo: "/logos/std/drkf.jpg",
    logoWide: true,
  },
  {
    year: "May 2023 – Aug 2024",
    role: "Analyst",
    org: "Thinker",
    location: "Cambridge",
    logo: "/logos/std/thinker.png",
    logoWide: true,
  },
];

export const educationTimeline = [
  {
    year: "2024 – 2028",
    role: "Columbia University",
    org: "Philosophy & AI",
    details: ["3.96/4.00 GPA"],
    logo: "/logos/std/columbia.png",
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
    "This blog is a collection of my own local maxima. I enjoy writing about technology, projects I build, a bit of philosophy, etc, and of course am fully aware that there are far higher summits than whatever I happen to write about (many of which you can find {{readings}}).",
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
      "A graded evidence database for drug repurposing in women's health, pulling together scattered evidence (trials, registries, mechanisms, adverse-event data) for conditions like endometriosis, PMDD, and PCOS and grading the certainty of the evidence behind each drug-condition pair.",
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
