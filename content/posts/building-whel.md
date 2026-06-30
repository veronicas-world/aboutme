---
title: "Building Whel (Women's Health Evidence Lab)"
subtitle: "Creating a drug‑repurposing research tool for endometriosis, PMDD, PCOS, etc, and learning how useful truths can be present in data before anyone knows to look for them"
date: "2026-04-07"
category: "projects"
excerpt: "How and why I built Whel, a drug-repurposing research tool mining scattered evidence for under-researched hormonal conditions affecting women."
substackUrl: "https://veronicaagudelo.substack.com/p/my-first-project-womens-health-evidence"
---

![](https://substackcdn.com/image/fetch/$s_!siov!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbb905c45-fec7-4221-a00f-f64904e31b50_1720x536.png)

*Quick note: I'm working on Whel almost every day, so the site will keep evolving. Expect numbers to change and phrasing to get refined over time. The point of documenting this process is to build in public and learning as I go.*

**A quick update, May 2026.**

**Since this first piece went up, Whel has grown into a working evidence database. The current work cycle includes a planned cross-reference to MATRIX, the public drug-disease prediction dataset from Every Cure (a massive and very well-funded nonprofit biotech using AI to discover new uses for existing drugs), which will sit beside Whel's grades as an independent biological-plausibility layer wherever MATRIX has coverage. For more on my use of Every Cure (thank you, Hugging Face), see the [External References](https://whel.bio/about/external-references) page.**

**From here on, most updates will live on the site's [Roadmap page](https://whel.bio/about/roadmap), where I track what's live, what's in the current cycle, and what I have planned (I am now implementing open-source ML models). This piece will stay up as the original write-up of how the project began.**

A few weeks ago I shared a bit about my experience undergoing brain surgery to remove a pesky tumor that had been plaguing me for the better part of a decade. The tumor was a prolactinoma, a noncancerous tumor of the pituitary gland made up of prolactin‑secreting cells, which sit at the base of the brain and help regulate hormones. Prolactinomas are, technically, benign. But "benign" is doing a lot of work in that sentence when the thing in question has been disrupting your hormonal system for years, which has a whole array of consequences on the body.

The standard treatment before surgery, and for many people instead of surgery, is medication. Dopamine agonists, such as cabergoline or bromocriptine, that work through the prolactin pathway by suppressing the hormone the tumor overproduces. They are effective, but also for a significant number of patients, including myself, quite rough — common side effects include extreme nausea, psychiatric symptoms, impulse control disorders, etc. So yes, the drugs work, but "working" is not the same as "working well," and for many people who take them over years, the calculation is not clean.

I got through it, and thanks to the remarkable achievements of 21st century medicine, I am more than fine now. And I am aware, acutely, that I had it relatively easy. A prolactinoma is not endometriosis, or PMDD, or eight years of being told your pain is normal, to come back in six months, to try exercise. I had a diagnosis, a few years of semi-successful medication, a surgery, and a recovery. However, many women with reproductive and hormonal conditions do not get that clean of an arc.

That realization, along with a lot of late‑night PubMed rabbit holes and conversations with my mother, who is a psychiatrist and has spent a long time thinking about women's hormonal conditions, eventually turned into a project we've been building together over the past few weeks — a drug‑repurposing research tool that mines and pulls together scattered signals from trials, registries, pharmacovigilance databases, and community forums to investigate whether drugs that we already have developed might help under‑researched and under‑treated hormonal conditions primarily affecting women. We ended up calling it the Women's Health Evidence Lab (Whel), which is both a description and, conveniently, an acronym I can actually say out loud.

As of this writing, Whel contains **271 active repurposing signals across six conditions, drawn from 2,176 unique citations and 135 distinct compounds.** Those numbers will move (the pipelines run on a schedule), but they're the ground truth for everything below.

### Why drug repurposing?

Drug repurposing is the practice of taking an existing medication that was developed for one condition and asking whether it might help with a different one, which is a framing that my mom kept coming back to in our calls. Instead of starting from a blank slate and designing a brand‑new drug, you look at what is already on the market or in late‑stage trials, where the safety profile is at least partially known, and search for unexpected benefits, side effects, or patterns in recorded data that suggest a new use case.

The most surprising thing about drug repurposing that I found when I started looking into it — and that my mom kept confirming from the clinician side — is that the signal (meaning a repeated pattern in the data that hints a drug might be helping a condition it was never designed to treat) is often already there. Somewhere in a published trial, an adverse effects database record, or a Reddit post from two years ago, someone noticed that women on statins were reporting reduced pelvic pain. Someone noticed that a drug developed for one condition seemed to be doing something interesting for another. The data exists, it is just scattered across PubMed and clinical trial registries and adverse event databases and patient community forums, and nobody has built a clean, accessible tool that pulls it together specifically for women's hormonal health conditions.

Medical knowledge has structural blind spots. We know this — the NIH did not require inclusion of women in clinical research until 1993, so we have spent roughly three decades catching up from a standing start. Conditions that affect women most severely have historically been underfunded, and where a research base exists at all, it is thin.

So my mother and I wanted to build something that reversed the typical drug discovery question. Instead of "what does this drug treat?", we wanted to ask: "what existing drugs have shown promise, in any context, for conditions that aren't getting enough research attention?" And because of our own experiences (my tumor and my mother's Hashimoto's), as well as a historical lack of attention given to them, we wanted to focus specifically on women's hormonal health.

### The Conditions

We started by identifying six primarily hormonal conditions that affect huge numbers of women but remain chronically under‑treated, under‑researched, or badly managed: endometriosis, PMDD, PCOS, adenomyosis, vulvodynia, and perimenopause & menopause. This initial set is a starting point and the plan is to add more conditions as we refine the pipelines, feel confident that these first six are well‑covered, and incorporate feedback from relevant parties about which gaps matter most. The current signal distribution across them looks like this:

- **Perimenopause & Menopause** — 59 signals

- **PCOS** — 50 signals

- **Endometriosis** — 47 signals

- **Adenomyosis** — 45 signals

- **PMDD** — 44 signals

- **Vulvodynia** — 26 signals

Endometriosis affects somewhere between 6 and 10% of women of reproductive age. The average diagnostic delay is between 7 to 10 years, and treatment options in 2026 include surgery, hormonal suppression, or pain management. There is no reliable pharmaceutical treatment that addresses the underlying condition rather than suppressing symptoms. For a disease affecting tens of millions of people, this is extraordinary. PMDD (premenstrual dysphoric disorder) is clinically severe, cyclical, and still treated primarily with SSRIs prescribed continuously or cyclically, which is imprecise and doesn't work for everyone. Perimenopause and menopause are widely acknowledged to be poorly managed. Adenomyosis, vulvodynia, and PCOS are chronically underfunded and underrepresented in the research literature.

The problem is not that researchers don't care, it is that funding flows toward conditions with established biological pathways, measurable endpoints, and large pharmaceutical market opportunities, or toward the kind of "sexy" rare diseases that occasionally attract concentrated philanthropic and venture interest. The mechanisms underlying many women's health conditions are still contested or poorly characterized, which makes them harder to study, which makes them less fundable, which means the mechanisms remain poorly characterized. It is a feedback loop.

Drug repurposing is one way to try to interrupt that loop, because if a drug already has a known safety profile, the path to clinical investigation is shorter. If there are already signals in existing data, you don't have to start from scratch. You just have to find the signals.

### The Four Research Arms

The structure of the tool went through a lot of iterations. Most of those iterations happened on calls with my mom, who is, I want to say clearly, the reason this project has any medical validity at all. Here is where we landed, with the current count of signals in each:

#### 1. Direct Research — 49 signals

The first arm pulls published studies and active clinical trials that are specifically designed to investigate the target condition. Our data sources are PubMed and ClinicalTrials.gov. This arm is intentionally sparse for most of the conditions in the database, and the sparseness itself is data. If you search for 'endometriosis' in the direct research arm and get back forty results, most of them from the last five years, that tells you something.

#### 2. Cross‑Condition Signals — 70 signals

This is the arm I find most interesting. It pulls drugs that were developed or trialed for entirely different purposes, where women incidentally reported benefit for the conditions we are tracking. The data sources here were originally FDA AEMS (the adverse event reporting system, which captures both adverse events and sometimes off-label uses), population level epidemiological studies, and the secondary endpoints buried in trials that were designed to study something else.

In addition to FDA AEMS and epidemiologic datasets, we plan to pull the same style of signal from EudraVigilance via the EVDAS analytics interface, which is essentially the European counterpart to AEMS, and from SIDER for systematically catalogued drug side‑effect labels. Female‑only reaction data are filtered and grouped by condition, so a drug that quietly shows up as improving pelvic pain or worsening vulvar pain in European reports is surfaced alongside the U.S. pharmacovigilance data, rather than living in a separate regulatory silo.

A classic example of what we are looking for is statin trials (statins are cholesterol drugs). Several large statin trials have included significant female populations, and buried in the secondary endpoints, there are signals that women on statins report reduced dysmenorrhea, which is a common side effect of endometriosis. Is this a proven treatment for endometriosis? No. Is it a hypothesis worth investigating formally? Absolutely. That is the whole point.

My mom identified the specific drug classes worth targeting in this secondary arm: statins, SSRIs, dopamine agonists (which include cabergoline and bromocriptine, the exact medications I was on, which felt like a strange kind of symmetry), and GLP-1 agonists. GLP-1s are particularly interesting because the recent wave of trials for Ozempic and Wegovy has generated enormous amounts of data about hormonal and inflammatory effects in women, and researchers are only beginning to analyze what that data contains.

#### 3. Pathway Insights — 120 signals

The third arm, Pathway Insights, started as "Caution Signals" and got reframed. Instead of just cataloguing drugs that seem to worsen a condition, this arm now asks what those adverse effects, and broader target‑level data, reveal about underlying disease biology. It pulls from both traditional pharmacovigilance sources and the Open Targets Platform, which aggregates genetic associations, known drug–target interactions, pathway data, and differential gene expression to connect specific targets and diseases in a structured way. This is the largest arm in the database, in part because pathway and mechanism data is the most plentiful — every adverse effect, every shared target, every overlapping mechanism is a potential hypothesis.

Concretely, for each condition we query the Open Targets GraphQL API using standardized EFO/MONDO disease identifiers and pull back the highest‑scoring targets and associated drugs. Those target–disease links are then analysed alongside adverse‑effect signals (like the Tamoxifen–adenomyosis worsening signal — see below) to generate pathway‑level repurposing hypotheses rather than single‑paper hunches.

A good example of a drug in this category is Tamoxifen. Tamoxifen is a breast cancer drug that blocks estrogen receptors, and it is also known to cause or worsen adenomyosis in some patients. This sounds like a purely bad thing, and for patients it is, but from a research perspective it is actually informative because it tells you that estrogen receptor pathways are central to adenomyosis biology. If blocking estrogen receptors makes adenomyosis worse, that gives us something else to investigate about what is driving the condition.

Understanding what makes something worse is often a legitimate path to understanding what might make it better. This is not a counterintuitive insight, it is basic pharmacology, but it rarely gets organized in a publicly accessible way for those trying to understand their own conditions.

#### 4. Community Forum Reports — 32 signals

This arm is the one that required the most convincing, in both directions. I was initially uncertain about including Reddit data in a medical research tool. It felt epistemically sloppy. My mom convinced me it was worth doing, with the important caveat that this arm has to be labeled clearly as community signal rather than clinical evidence.

Here is why it matters: women often do not report positive side effects in clinical trials unless the trial is specifically designed to capture them. If you are in a statin trial and your periods get better, that is not a primary endpoint, it is not something a researcher is looking for, and thus, it may not end up in the published data. But you might go to r/Endo and post about it. And if two hundred women do that over three years, it is a signal.

I built a pipeline that searches subreddits specific to each condition (r/Endo, r/PCOS, r/PMDD, r/Menopause, among others) for mentions of specific medications and treatments, particularly treatments women describe as helpful even though the drug was approved for something else. The pipeline uses a combination of the Pushshift archive (where still accessible) and direct subreddit queries. The filtering is important here. The tool is not pulling anecdotes uncritically, rather it is looking for consistent patterns across a large number of posts, which is different from a single person's experience.

One thing the Reddit pipeline has already surfaced: Meloxicam, an NSAID, being mentioned across multiple endometriosis communities as more effective for pelvic pain than standard ibuprofen. This is plausible on pharmacological grounds (different COX inhibitor profile), but there are very few formal studies on it specifically for endometriosis. This is the kind of gap the tool is designed to identify.

### Inclusion criteria/How we decide what counts as a "signal"

Under the hood, every result in Whel is scored rather than treated as a binary "is this real or not?" question. I use Claude Opus 4.6 as the first‑pass rater, because it currently performs at or near the top of independent reasoning and research‑style benchmarks, and is unusually good at following explicit rubrics for evidence grading. On top of that, my mother (who spent years in clinical and research roles before going into psychiatry) designed the actual inclusion framework so that what the model is doing maps onto how a cautious human researcher would think about signal quality.

The goal is not a single magical cutoff, but a tiered evidence framework with minimum standards for reliability, reproducibility, and actionability. For each drug‑condition pair, we score five dimensions: source quality, replication, specificity, biological plausibility, and direction of effect. Each gets a 0-2 score, and the total (0-10) maps to four tiers:

- **Strong (9–10)** — 30 signals

- **Moderate (7–8)** — 57 signals

- **Emerging (4–6)** — 177 signals

- **Exploratory (0–3)** — 7 signals

The tier shows up next to every result in the interface, less as a verdict and more as a transparent view into how seriously it is reasonable to take any given pattern in the data. The full methodology is written up on the site.

The arms themselves have their own evidentiary thresholds layered on top:

1. **Direct‑research** signals need at least one human study (preferably more), clear population–exposure–outcome definitions, and consistent direction of effect.

2. **Cross‑condition** signals have to show up across at least two evidence domains (for example, literature plus AEMS/EudraVigilance, or registry data plus community reports) with a plausible shared mechanism.

3. **Pathway‑only** signals are explicitly flagged as exploratory unless they also have human or pharmacovigilance support.

4. **Community‑derived** signals are throttled by both volume and specificity (dozens of unique, symptom‑specific posts pointing in the same direction, not just "this drug changed things").

The last rule my mom insisted on, which I like enough to keep verbatim, is: do not confuse frequency with truth. A rare but specific, well‑replicated signal that triangulates across methods matters more than hundreds of vague mentions that "something felt different."

### What My Mother Brought to This

By this point it's clear that my mom was not a side character in this project. What matters here is the specific structure she pushed me toward.

She brought what she called a two‑armed data strategy, which I more or less adopted wholesale. Primary arm: current clinical trials and published studies directly targeting the condition. Secondary arm: systematic search for indirect signals in other drug trials. That framing clarified something to me — that the absence of direct evidence is not the same as the absence of evidence. The sparseness of the primary arm is information, and the signals in the secondary arm are hypotheses. They are different kinds of data and they deserve to be presented differently.

She also brought several future directions I have not built yet. Interventional psychiatry is a direction she flagged early: conditions like PTSD, where women are roughly two‑thirds of sufferers, and addiction medicine, where she noted that cravings may cycle with hormones in ways that current treatment protocols do not account for. Perinatal conditions. Bipolar disorder and its relationship to hormonal cycles. There is a whole second project inside this one.

### I Am Not a Coder

This part might be the most useful section for some readers, but I will note that I almost cut it because I was worried it would undermine the technical credibility of everything else. But I think transparency matters here, so… I had never really built anything before this project. I do not know how to code very well. I did not learn how to code to build this. I built it using Claude Code, which lets you describe what you want in plain language and then handles the implementation while you watch and occasionally say 'that's not what I meant' and rephrase.

My "stack" is Next.js with TypeScript and Tailwind CSS, Supabase for the database, Vercel for hosting. Total monthly cost to run: zero dollars. Total cost to build: Claude Pro subscription plus approximately $10 in API credits. I was inspired, as I explained in my article from last week, by the story of the guy who used AI to build a cancer vaccine for his dog. If he could do that, I could build a drug repurposing database.

The initial version took under 24 hours. I remember the moment it first worked. I was staring at the terminal and data was populating and I typed into the chat something like "wow. this is insane. it worked" which is not a very deep thing to say but was the honest response. I also experienced the strange aliveness of having made something function. And now I understand why people build things.

The data pipelines took longer. PubMed required learning how to query NCBI's Entrez API. FDA AEMS has a public API but the data structure is not intuitive. ClinicalTrials.gov has its own API. The Reddit pipeline uses the Pushshift archive and direct subreddit queries. Each one was its own debugging session, its own moment of figuring out what the tool was returning versus what I thought I was asking for.

The UX/UI went through several iterations. I started with plum and burgundy, which I still think is aesthetically correct but apparently signals "not a medical tool" to most people. Then a blue phase. Then sage green from a Figma mockup. The final version has a sage green color scheme, which I think threads the needle between "trustworthy" and "not completely sterile," although I am still actively trying to nudge it further away from looking overly "vibecoded," which I recently learned can be used as an insult.

### What the Data Shows

A few early findings that I found particularly convincing, with the caveat that all of these are currently in the 'emerging' or 'moderate' tiers of our evidence scoring, so, interesting enough to be worth a real study, not nearly enough to count as medical advice. I am a university student with an NIH search interface and a very patient mother.

1. **Melatonin for endometriosis** has a surprisingly strong evidence base in published literature. Several small trials have looked at melatonin supplementation for pain related to endometriosis, with promising results. The mechanism involves melatonin's anti-inflammatory and antioxidant properties, and the fact that endometriosis lesions have melatonin receptors. This is not in the mainstream conversation about endometriosis treatment. It probably should be.

2. **The Tamoxifen/adenomyosis reverse signal** I mentioned earlier continues to be one of the cleaner examples of what the Pathway Insights arm is designed to surface. The signal has been documented in case reports and retrospective studies, and the implication for estrogen receptor biology in adenomyosis is understudied.

3. **The Reddit pipeline** is early but already generating interesting volume. The Meloxicam mentions across endometriosis communities are consistent enough that I think this warrants a deeper investigation. I am not saying Meloxicam treats endometriosis, but the pattern in patient reports is the kind of signal that should feed into a prospective study design.

4. **The GLP-1 arm** is where I expect the most activity in the next year. The sheer volume of clinical data being generated by Ozempic and Wegovy trials means there is an enormous amount of secondary data that could be analyzed for women's health signals. Several research groups are already starting to look at GLP-1 effects on PCOS, which is the obvious entry point. I think there is more there.

### Why This and Not Something Else

My own medical experience was certainly a catalyst for this project, and this is in some sense, a mother–daughter research project. That said, bigger questions — "what do we know?" "how do we know it?" and "what are the structural reasons we fail to know certain things?" — are always of particular interest to me. Drug repurposing provides a path toward an answer, because it says the knowledge already exists, in a different form, and we are going to find it. This is quite beautiful as a concept — the idea that a drug developed for cholesterol might contain, embedded in its trial data, a signal about pelvic pain, is a claim about the structure of knowledge itself. Useful truths can be present in data before anyone knows to look for them.

### What's Next

A few things I am actively working on or planning:

1. **Improving the search interface.** Right now you can search by condition, by medication, and by signal type. I want to add filtering by evidence strength (RCT vs. population study vs. case report vs. community signal), which requires better metadata tagging.

2. **Expanding the condition set.** Current focus is endometriosis, PMDD, PCOS, adenomyosis, vulvodynia, and perimenopause & menopause. I want to add perinatal conditions and begin the PTSD and addiction arms my mom flagged.

3. **Better sourcing transparency.** Every result in the tool has a source link, but I want to add more context about what kind of source it is and what that means for how seriously to take the signal.

4. **Feedback from people who know more than me.** If you are a researcher, a clinician, a patient advocate, or a woman who has been navigating one of these conditions and has thoughts about what the tool is missing or getting wrong, I want to hear from you. The site is at [whel.bio](https://whel.bio/), and my messages on here or LinkedIn are always open.

Thanks to my mom for the medical architecture of this. And thanks to Claude Code for making it possible for a non technical person to build something. And thanks to the women in r/Endo, r/PCOS, r/PMDD, and the rest who have been doing their own research for years because the formal system was not doing it for them :)
