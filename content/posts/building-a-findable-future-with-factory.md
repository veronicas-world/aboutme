---
title: "Building a Findable Future (with Factory!)"
date: "2026-10-12"
category: "projects"
substackUrl: "https://veronicaagudelo.substack.com/p/building-a-findable-future-with-factory"
full: true
titleLinkText: "Factory"
titleLinkHref: "https://factory.ai"
cover: "https://substackcdn.com/image/fetch/$s_!e1_9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7b8d9e80-caaa-4aea-aa3c-8cae159695c7_319x169.png"
---

![](https://substackcdn.com/image/fetch/$s_!e1_9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7b8d9e80-caaa-4aea-aa3c-8cae159695c7_319x169.png)

Most of us are probably familiar with the notion of “big data.” This idea is of course nothing new (in fact, as many will remember, this was one of *the* big tech trends of the 2010s), and was largely kickstarted by innovations in cloud infra, Hadoop and Distributed Computing, and NoSQL Databases. And, also notably, many will argue that the outcomes of big data, which included mass collection, storage, and processing of unprecedented volumes of digital information, laid the foundation for the deep learning and machine learning breakthroughs that allowed for the AI revolution that we find ourselves in today. Big data is typically understood as an enterprise term – it is how companies normalize massive and messy information and analyze it to extract information that would be impossible for humans to find manually. Okay, sure that makes sense, and it also tracks that companies would want to do that. Nothing new to add there.

What I think is very, very exciting about this particular moment is the idea that innovations in large scale agentic coding (software factories) allow individual people, technical or not, to undertake our own big data revolution. So to those of us whose work would be far more efficient and of net-higher quality if we simply had the ability to analyze what is out there, or just *more*, this is an incredibly exciting time to get building. Naturally, this is what I decided to do. Welcome to the layman’s big data wave (though of course many of us (you, not me) are highly specialized and brilliant people in their own right… so maybe, the polymath’s big data wave?) 🙂

To start your own big data project you must first identify the premise upon which you want to build. Mine was very straightforward. I spend a large amount of my time mapping campus ecosystems and have done so for a while. Within this mapping work, I am interested in finding the most talented people *earlier*. And moreover, I believe that they are out there, so, in other words, my premise is that the next generation of great builders is findable: by name and with evidence attached. Before the YC W26 batch, before a Series A, etc, many people who will build something important have already left a long, legible trail of proof in public. This includes but is not limited to commits on GitHub, preprints on arXiv, medal lists in olympiad archives, winner galleries on hackathon sites, and names on lab rosters.

And, in my own (little) big data world, the future of campus ecosystems is more than anything an indexing problem. The artisanal version of this work is ancient and honorable, and you and I must not only respect it, but partake in it as well – the coffee chats, professor introductions, demo days, and a spreadsheet with a thousand rows. I have done plenty of this and will keep doing it (there is no replacement for relationships and facetime), but the artisanal version is flawed in that it scales with your network and finds the people everyone else does.

I want to supplement this work with signals that already exist but are just scattered across a dozen public surfaces. The following section is about the database I built to test that claim, which since September has grown into 4,698 builders, 28,814 research papers, and 6,058 pieces of company-formation evidence. I will describe how it works, what I have learned thus far from building it and what I am interested in changing as I go forward, and what it is like to co-own an engineering project as a person who cannot code (I have written about this before; I am, by any standard definition, nontechnical).

### My Database

My database exists to answer this very basic question: who is building things and where? Although I have expanded on it a lot and have developed my own grading methodology. In short, a “builder” is one row, assembled from however many public identities I can prove belong to the same human (a GitHub account, an author record on a paper platform, a hackathon profile, a lab-roster line). Each record carries the university, degree level, research topics, publication and citation counts, a 0-100 builder score (my framework!), formation signals with source URLs, and a sector tag. Here is the pipeline currently:

![](https://substackcdn.com/image/fetch/$s_!azGV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88173c02-ae0c-44b3-a0b7-806dc789740a_1564x152.png)

![](https://substackcdn.com/image/fetch/$s_!luo3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9238db6-d11b-4842-9d1e-bc058ca4357a_1636x180.png)

What began as a fifteen-campus scouting list now holds builders at thirty-eight universities, and about 3,150 of them have no campus attached yet (many of them olympiad medalists who are still pre-university). This sounds like a bug. It is not! Finding people before an ecosystem claims them is the entire point.

### Five Collection Lanes

Like any evidence system, the database is only as good as its collection. There are five lanes, each with its own etiquette (normalization and analysis):

![](https://substackcdn.com/image/fetch/$s_!mWgt!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa008f7ce-298c-44cf-a3e2-7055307a190d_1386x377.png)

Builders can appear in more than one lane, obviously. Also, I omitted papers because they would mess up my visual, but they add 28,814 records of evidence.

1. **GitHub search:** 2,295 profiles. Location, language, and bio queries, enriched through the GraphQL API with repos, stars, commits, and languages. This is the noisiest lane hence the strict identity rules I will outline below.
2. **Academic papers:** 28,814 stored. Semantic Scholar, OpenAlex, arXiv, and bioRxiv/medRxiv as an early-signal lane for biotech. Authors at target universities get affiliations, h-indexes, and an importance score per paper, so the database can rank researchers.
3. **Hackathons and events:** 728 builders. Devpost plus winner galleries from company, VC-backed, and university hackathons, with an events directory that links structured results to the builders behind them.
4. **Olympiad archives:** 1,683 medalists. IMO, IOI, IPhO, USACO camp and EGOI, ICPC World Finals, USAMO, USAPhO.
5. **Lab rosters: 342 builders.** Resolved from the affiliation text printed on publication with twenty-nine seeded top labs and their known spinouts

Also included: NIH RePORTER grants, NSF I-Corps and Partnerships for Innovation awards, USPTO patents, and a re-verification loop that refreshes public GitHub profiles for the high-conviction shortlist. Every collector writes a row to source_runs after every run.

### My Scoring Methodology

The scoring engine gives every person pulled a unified 0-100 score from seven weighted components:

![](https://substackcdn.com/image/fetch/$s_!D4yq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F709e96ec-6835-4453-9496-e88ce5ffa919_1658x620.png)

The end score is important, but it is downstream of an arguably more important component: the evidence ledger! See below the ledger so far:

![](https://substackcdn.com/image/fetch/$s_!Hjbr!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd99663d6-2df2-4c62-9d45-1a605a1ce5e1_1124x442.png)

When the pipeline resolves an olympiad medalist to a GitHub account, it refuses ambiguous name matches, refuses accounts already claimed by another builder, and refuses organization accounts (“allenai” for example). Finally, every builder with stored evidence is classified into one of fourteen sectors by transparent keyword rules. This is a boring taxonomy, maybe, but that’s okay with me!

### Some sparse notes

As I mentioned above, I am, strictly speaking, nontechnical. I built this platform entirely through the use of [Factory](https://factory.ai), which, as I have told many, has completely changed the way I build software. I go further, faster, and far more efficiently. Droid, the agent I work with (though there are many droids!), handled the implementation part of this project. Here are three key things that I either would not have known how to build, or known what they were at all.

1. **Entity resolution:** One person can exist across multiple identities (a GitHub account, two author records on two different paper platforms, a hackathon profile, a lab-roster line, etc). And, to have any sort of cohesive picture of them and their work, you have to merge their many parts. Factory was able to do this for me by creating strict name-matching rules (surnames must match, names must clear similarity thresholds), and a claimed-login registry to make sure one GitHub account cannot be attached to two builders.
2. **Rate limits:** Semantic Scholar returns 429s; the GitHub GraphQL API has an hourly point budget; OpenAlex has a polite pool you join by sending an email. Scraping is not the same as just “downloading data,” and Droid was able to manage all of these various rate limits and even auto register me for sites that I needed to request API access from.
3. **Learning to use free tiers:** The whole database is 93 MB of a free-tier Supabase project. At one point, it got far too large and crashed the entire database. I was very freaked out by this! However, Droid was able to slim it down via a US-only migration, keeping only builders with GitHub links or formation evidence, and vacuumed the disk. Hooray!

### Dashboard to chat

For most of its (month-long) life, the database had a proper interface that included a Next.js dashboard with a landing page, saved searches, a leaderboard, school rollups, sector pages, lab pages, a papers browser, and a source-health panel. The search page parsed plain-language intent (such as “top robotics PhD students with recent papers”) into structured filters, deterministically, and without an AI API. This was a very cool platform, but I realized that I deferred to using Factory’s chat to navigate our data pool a lot of the time, so there was not really a need for a separate platform. At one point, I even considered trying to build my own chatbot to run my site… and then I realized I would not be able to do that with my constrained budget, and I already HAD it with Factory.

So, I connected Factory to the database directly via a connector and now I can ask in plain English: “show me top robotics PhD students at CMU with recent papers,” and the answer comes back in a very understandable format (names, evidence, links, caveats about data freshness) and if the answer is wrong, the same conversation can fix the pipeline that produced it, because, well, it’s a very simple chat interface.

The original dashboard is not entirely dead. It is generally good for showing others and also where the operational metrics that I am interested in live. But for the actual work of scouting, Factory’s interface is now my point of contact.

### More on using Factory to build

Here are some more ways I was able to use Factory to build my database. A lot of these specific functions are what I think allow for individuals to undergo their own software revolutions like the ones I spoke about above. Side note, if anyone reading this wants access to the Factory platform, do reach out! I would love to chat.

1. **The session/main mode:** a persistent chat with an agent that reads whole codebases, edits files, and shows me diffs before anything is saved. Also helpful is that it maintains a todo list that I can watch get crossed off!
2. **Spec mode:** for anything consequential, it writes a plan first and waits for my approval before touching anything. The recovery pipeline was diagnosed, specced, approved, then built.
3. **Workers:** it delegates bounded research to fresh-context subagents. During one campus shortlist, it ran two workers in parallel, one on graduate researchers, one on undergrads, and when the undergrad worker’s model provider went down mid-run, it picked up the undergrad research itself and kept going.
4. **Browser mode:** campus competition pages (NASA’s Lunabotics, RASC-AL, university pitch competitions) have no API, no feed… basically no structured anything. It reads them with a browser in the same way that a person would.
5. **Connectors:** Supabase is connected, so the database is queryable in-chat. This is helpful as it runs aggregate checks, verifies migrations, and proposes schema changes.
6. **Long runs:** scraping runs and rate-limited recoveries start in the background, checkpoint their progress, resume where they stopped if killed, and report back.
7. **Artifacts:** Sessions end in documents; the agent produces the write-ups, decks, and PDFs from what it did. I enjoy reading these to both check that the project is going in the direction I want it to, and to try to teach myself more technical knowledge!Also… I am able to talk to Factory’s Droid all while it builds because of a very helpful side-chat box!

### What my map has found (so far)

The sector map tracks my broader theses with a high degree of fidelity. Developer tools and infrastructure (1,323 builders) and AI/ML (617) dominate campus building, while the agentic-workforce shift I wrote about in my mid-year outlook is small but becoming more visible. Robotics and hardware (115) and biotech and health (55) are, I think, where under-priced talent is (and I am trying to figure out a better way to score these profiles… feedback welcome). The long tail  (fintech, security, gaming, climate, defense) is small but growing.

![](https://substackcdn.com/image/fetch/$s_!2zOm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9818ae23-6737-4347-bf67-ea4e02694532_996x468.png)

As for campus distribution, MIT (270), Stanford (230), CMU (159), and Berkeley (148) sit at the top, which will surprise no one, and then a long, healthy middle. I am putting less weight on this category right now because it is, in my mind, less a picture of the most successful campuses and more so about the data currently ingested. So do not put too much emphasis on this for now.

![](https://substackcdn.com/image/fetch/$s_!oEZE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd73cab3f-7ef9-446d-82d0-d75f40b2eb0a_1032x986.png)

### What I am working on now

1. **Competition and accelerator collector:** NASA Lunabotics, RASC-AL, VEX, and the campus pitch competitions, the McGinnis at CMU, Cozad at Illinois, the Keller Center at Princeton, Venture Lab at Penn, plus accelerator demo days.
2. **Curated-list importer:** a way to seed hand-curated shortlists directly, so a name I meet at a demo day enters the pipeline.
3. **Closing coverage gaps:** paper lanes, like all datasets, have blind spots. For example, think of researchers whose most-cited work predates the collection window, or never hit an arXiv preprint at all.
4. **A student-status pass.** 2,252 verified builders and 2,446 unverified; plenty of the unverified pile are pre-university olympiad medalists in need of a dedicated pass.
5. **An always-on scout:** in my mind this is the natural end state – scheduled automations that re-verify the shortlist, watch for new papers, and flag fresh formation signals as they appear.
