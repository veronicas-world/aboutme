---
title: "An Update on Whel"
date: "2026-06-07"
category: "projects"
excerpt: "A follow-up detailing the most significant updates and setbacks to Whel, including its new external validation architecture and grounding plans."
substackUrl: "https://veronicaagudelo.substack.com/p/an-update-on-whel"
---

![](https://substackcdn.com/image/fetch/$s_!0SmQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa2a40b38-80cc-4b9b-8f72-3dcd5e2e05b0_1886x1036.png)

*This post is a follow up to the one I made a few months ago ([here](https://veronicaagudelo.substack.com/p/my-first-project-womens-health-evidence)), where I outlined why I began this project, what I wanted it to become, and what I had built (and subsequently, what had surfaced) so far. Since then, much has changed, and I continue work on it every single day. So, I figured I would write another post detailing the most significant updates (as well as setbacks), and what my plans are for this project going forward.*

*Please note that from here on, most updates will live on the site's [Roadmap](https://whel.bio/about/roadmap) page, where I track what's live, what I am currently working on, and what I have planned. This piece, and the original, will stay up as the write-ups of how the project began. I might make another update post once I reach a substantial amount of macro-level updates, which is what triggered this post. But for daily/weekly changes, the site itself is the most reliable resource.*

### Where Whel is now

As of writing, [Whel](https://whel.bio) carries 271 active repurposing signals across the same six conditions (endometriosis, PMDD, PCOS, adenomyosis, vulvodynia, and perimenopause & menopause), drawn from 2,166 unique source citations. Those numbers will keep moving as the pipelines run. The four research arms (Direct Research, Cross-Condition Signals, Pathway Insights, Community Forum Reports) are all still the central organizing structure on the site, and the five-dimension confidence rubric (replication, source quality, specificity, biological plausibility, direction consistency) still maps every signal into Strong/Moderate/Emerging/Exploratory.

What is new, beyond more data, is that the project has grown an external validation architecture on top of its internal scoring, and it now sits in a much more honest relationship to the literature on what LLMS can and cannot do in biomedical text work. So most of this update will be about that.

If you want to skip to where the changes live on the site:

- The [Methodology page](https://whel.bio/about/methodology) now has a full L0-L3 external-validation rubric, plus a strength-and-certainty glossary, plus a dated "Methodology update log" with five versioned entries.

- The [External References page](https://whel.bio/about/external-references) has detailed audit numbers for the Every Cure MATRIX cross-reference layer (live), and a separate "Structured Grounding in Progress" section documenting two further layers I'm planning to build.

- The current [Featured Signal walkthrough](https://whel.bio/featured) is now Vaginal Estrogen for postmenopausal recurrent UTI, with an "External Validation: Literature Whel did not ingest" section that I will explain below.

### A new external validation grade: L0 through L3

The biggest single addition since the original post is an external validation grade that every signal in Whel now carries alongside its internal confidence tier. The grade is on a four-step ladder, L0 to L3:

- **L0** = no external evidence identified.

- **L1** = the signal appears in a single independent source (a study, a trial, an adverse-event report, a guideline).

- **L2** = the signal is replicated across independent evidence types, or appears as a primary endpoint in a trial.

- **L3** = the signal is named in a published clinical guideline with explicit recommendation or guidance.

The L-grade is not the same as the confidence tier. That (confidence) tier reflects Whel's own scoring of how well the literature it ingested supports the signal (the methodology on that is [here](https://whel.bio/about/technical-architecture)). The L-grade reflects whether the signal is independently supported in the broader clinical record. A signal can sit at any combination of the two grades, and the combinations are themselves informative. The current audit returns L0 on 217 of the 271 live signals, L1 on 45, L2 on 6, and L3 on 3. L3 is the rarest grade, and that scarcity is by design, as L3 requires a body-assigned recommendation explicitly tied to the indication, and most repurposing signals are pre-guideline by definition.

The three signals that earned L3 in the current snapshot are:

1. **Vaginal Estrogen/Perimenopause & Menopause**, backed by the [2020 NAMS Position Statement](https://pubmed.ncbi.nlm.nih.gov/32852449/) on the genitourinary syndrome of menopause. Strength: recommended. Certainty: moderate.

2. **Testosterone (transdermal)/Perimenopause & Menopause**, backed by the [2021 ISSWSH guideline](https://pubmed.ncbi.nlm.nih.gov/33814355/) on hypoactive sexual desire disorder. Strength: recommended. Certainty: moderate.

3. **Continuous Oral Contraceptive/Endometriosis**, backed by the [2022 ESHRE Endometriosis Guideline](https://pubmed.ncbi.nlm.nih.gov/35350465/). Strength: weak. Certainty: low.

Each of those three grades was set by a human curation pass, not by the LLM. I read the guideline PDFs themselves and recorded the strength and certainty values the issuing body itself assigned. The point of doing it that way is to keep the L3 grade defensible, so if someone asks "where does the L3 on this signal come from," the answer is a specific recommendation in a specific guideline that is traceable to a specific PMID.

The strength × certainty pair shows up on each condition page as a small dashed pill beside the L-grade chip, with the full triple (strength, certainty, guideline_id) in the tooltip. If you click the pill it deep-links to a small glossary on the methodology page that explains what recommended, weak, high, moderate, low and very low mean.

### MATRIX + what an independent corroboration layer looks like

The second piece of external architecture is a cross-reference to the Every Cure [MATRIX dataset](https://huggingface.co/datasets/everycure/matrix-scores). MATRIX is a public release of machine-learned biological-plausibility scores covering roughly 1,800 drugs paired against roughly 22,000 diseases, generated by a graph-machine-learning model trained on a large biomedical knowledge graph. Every Cure is a nonprofit founded in 2022 that focuses on a re-evaluation of approved drugs across the entire disease space; their MATRIX work is funded by an [ARPA-H program](https://arpa-h.gov/news-and-events/arpa-h-awards-ai-driven-project-repurpose-approved-medications) of the same name. Their methodology was published in [Lancet Haematology](https://everycure.org/lancet/) in 2024.

MATRIX and Whel are doing different things. MATRIX is a global model that predicts treatment probability from a knowledge graph, it does not read the clinical literature for any specific condition, and it is not condition-specific. Whel is the opposite — a narrow set of women's-health conditions read closely across literature, trials, adverse-event data, target databases, and named patient communities, with every signal scored individually. The two outputs are different enough that wherever MATRIX has coverage of a Whel pair, the MATRIX score appears beside Whel's grade.

An audit script I now run alongside the database scoring writes the coverage numbers to a snapshot, published on the [External References page](https://whel.bio/about/external-references#coverage-disclosure). At the current run, MATRIX has scored 83.0% of the eligible Whel pairs and resolved 85.7% of eligible compounds against its drug list. The asymmetries across conditions are themselves informative: PMDD sits inside MATRIX's official disease filter but produced zero predictions, while Endometriosis sits outside the official filter yet returned 38 useful scores. Both kinds of mismatch are the reason the two layers stay separate rather than blended.

There's a small but important piece of plumbing inside the cross-reference: a brand-and-synonym dictionary that translates between Whel's compound strings (which sometimes carry brand names, salt forms, or formulation qualifiers) and MATRIX's canonical drug-list keys. Without that translation step, roughly 29% of the matched compounds would have been missed. The dictionary is published openly on the same page so anyone doing similar cross-referencing can reuse or audit it.

### A new featured signal

In the original post I featured Anastrozole for endometriosis. Anastrozole is an aromatase inhibitor approved for hormone-receptor-positive breast cancer, and there is a real biological argument for using it in endometriosis (CYP19A1 is locally overexpressed in endometriotic lesions). It scored Strong tier in Whel.

I've now swapped the featured signal to Vaginal Estrogen for postmenopausal recurrent UTI, because I wanted the homepage's featured example to be the cleanest possible illustration of what the L-grade ladder actually does. Of Whel's 271 active signals, vaginal estrogen for the postmenopausal population is the only one that currently sits at both Strong internal tier AND L3 external grade with recommended and moderate strength × certainty values. Both the literature replication is well-established and a named society (NAMS) has explicitly endorsed the use. That combination is the corner case where Whel's two axes both point at the top.

There's also something more honest in the swap, which the new featured walkthrough page makes clear. Section 04 of the [walkthrough](https://whel.bio/featured) is titled "Literature Whel did not ingest." It names three landmark references for vaginal estrogen + recurrent UTI that Whel's automated pipelines surfaced none of: the [Raz & Stamm 1993 NEJM trial](https://pubmed.ncbi.nlm.nih.gov/8350884/) that established intravaginal estriol as effective prophylaxis, the [Perrotta 2008 Cochrane review](https://pubmed.ncbi.nlm.nih.gov/18425910/) that synthesized the randomized evidence, and the [2022 AUA/CUA/SUFU guideline](https://pubmed.ncbi.nlm.nih.gov/35942788/) that names vaginal estrogen as a recommended non-antibiotic prevention strategy in this population.

You might be wondering WHY Whel did not ingest this literature (rightly so! I did as well. Seems like an oversight or problem…) The honest framing is that Whel's pipelines surfaced three sources for this signal (a Climacteric review, a Cochrane review of vaginal atrophy with urinary symptoms as a secondary outcome, and the NAMS 2020 position statement). The broader clinical literature extends well beyond those three. The walkthrough acknowledges that, and while it is an uncomfortable thing to realize when you are building an evidence-database project, it is the right kind of admission to make, and it sets up the structured-grounding direction I will get to below.

For those who are curious, the Anastrozole walkthrough is preserved at [/featured/anastrozole-endometriosis](https://whel.bio/featured/anastrozole-endometriosis) (but is archived).

### The LLM question

A few weeks ago I came across a benchmark called [WHBench](https://arxiv.org/abs/2604.00024), which was built to evaluate how frontier LLMs perform on women's-health clinical questions. WHBench is small but expert-built: 47 hand-crafted clinical scenarios across 10 women's-health topics, scored against a 23-criterion rubric covering clinical accuracy, completeness, safety, communication, equity, uncertainty handling, and guideline adherence. They evaluated 22 frontier LLMs (including Claude Opus 4.6, used in Whel).

The findings… well… scary to see… context needed… but very necessary. The top model in the lineup (Claude Opus 4.6, actually) scored a 72.1%; no model exceeded 75%. The fully correct rate (responses where the model got every criterion right) was 35.5% for the best model. The universal blind spot was equity: all 22 models scored between 0.7% and 19.1% on the social-determinants-of-health criterion, even though they scored 78–93% on bias-language avoidance. The models had learned to sound fair while remaining clinically blind. The benchmark's recommendation, prominently stated, is expert oversight in clinical deployment.

A separate piece of empirical work, [Gong et al. 2026](https://pmc.ncbi.nlm.nih.gov/articles/PMC13024205/) in Bioengineering, documents biomedical LLM reference fabrication rates of 47-55% on citation tasks. That is the failure mode where the LLM produces a confident-looking citation for a paper that does not exist.

### What this does and doesn't mean for Whel

When I first read WHBench I had a small panic. Valid, I think, but context is needed.

WHBench tests LLMs as direct clinical advisors. You ask the model "what's the best treatment for X in a 47-year-old with comorbidity Y?" and the rubric scores whether the response is safe, complete, equitable, guideline-adherent clinical guidance. That is one job an LLM can be asked to do, WHBench's finding is that frontier LLMs are not ready to do it unsupervised.

Whel does not ask Claude to do that job. Whel asks Claude to read sources and extract structured facts, then score those facts against a fixed rubric (replication, source quality, specificity, plausibility, direction). That is an entirely different task. The LLM is not generating clinical advice. Instead, its reading what a published paper says about a compound and a condition and converting that into a row in a database. So the failure modes WHBench documents don't all transfer one-to-one. Some do, though, and they are:

1. **Equity blind spots.** If a published RCT was conducted in a specific demographic and the LLM extraction doesn't surface that, Whel is propagating the same social-determinants blindness WHBench measured. The planned ontology grounding (Path A, see below) is part of how I'm closing this. The human guideline curation passes also play a role here, because the curators (so far, me, and my mom on the medical side) read the actual papers and can catch this in a way the automated pipeline cannot.

2. **Reference fabrication, in spirit.** Whel classifies PMIDs that the PubMed search step already returned, so the LLM isn't generating citations from scratch (the headline 47-55% number does not directly apply). But the underlying tendency to confidently produce plausible-looking-but-wrong structured output (a misclassified study type, a wrong direction of effect, an off-by-one numeric extraction) is the same family of error. Path A's entity validation catches the entity-level version of this: an LLM that produces a compound name that doesn't actually resolve to any registered drug gets caught at write time.

3. **Outdated knowledge.** The LLM reads what's in the source. If the source is from 2018, the LLM's classification is based on 2018 evidence. The L0-L3 grade pass is what catches "but is this still endorsed today" by requiring independent guideline corroboration for the strongest claims. That layer is shipped and live!!!

The ones that don't transfer, because Whel doesn't ask the LLM to do these things:

1. **Dosing recommendations.** Whel doesn't recommend doses.

2. **Treatment-plan completeness.** Whel doesn't produce treatment plans, follow-up timelines, or monitoring schedules.

3. **Safety judgments in a specific patient case.** Whel doesn't make patient-specific safety calls.

So the benchmark's headline (no model over 75%, 35.5% fully correct) is alarming if you're building a chatbot that gives unsupervised clinical advice (booo). Whel is not building that (yay!). What WHBench tells me is that the model I depend on has a documented ceiling on a specific job, and that ceiling motivates the structured-grounding direction I describe below. As such, the path forward is not to panic and throw out the LLM, and instead, my task should be to build in external knowledge that constrains the parts of the pipeline where the LLM's specific failure modes do transfer.

### So, is machine learning the answer?

Machine learning, in the broadest terms, is when you train a computer program on examples and let it learn to make predictions or classifications on new examples it has not seen. Random forests, gradient-boosted trees, neural networks of all kinds, large language models, graph neural networks, all of these are machine learning.

Large language models are machine learning models. Specifically, they are large neural networks trained on enormous amounts of text. Claude Opus 4.6 is an LLM and therefore is an ML model. When Whel calls Claude to extract a structured signal from a PubMed abstract and assign it a confidence tier, Whel is using machine learning.

There is, however, a distinction between consuming ML and developing ML that I think matters here. Whel uses Claude as a service: I write a prompt, the model produces an output, I store the output in the database. I don't train the model, I don't fine-tune it, I don't have access to its weights. Same with MATRIX: the scores displayed beside Whel's grades are predictions from a graph-ML model trained by Every Cure. Whel surfaces those predictions; it doesn't generate them.

So the accurate framing is that Whel is an LLM-assisted evidence index. It consumes one ML service (Claude Opus 4.6) for extraction and scoring, and surfaces one external ML prediction layer (Every Cure MATRIX) as a disclosure cross-reference. It does not train or develop its own ML models.

That distinction helps frame the appropriate next move, which is NOT to throw out the LLM and rewrite Whel as a graph neural network (who do you think I am, really). The right move is to add structured external knowledge that constrains and corroborates what the LLM produces. This is called, technically, grounding.

### What's planned/Two structured grounding layers

In the methodology version log (very bottom of [this](https://whel.bio/about/methodology) page) I added a v3.4 entry that records two new planned layers, both grounded in current literature on hybrid LLM-plus-structured-knowledge systems (this is the term of art for what I'm describing). Both are recorded on the [Roadmap](https://whel.bio/about/roadmap) as Planned, and both have detailed disclosure surfaces on the [External References](https://whel.bio/about/external-references#structured-grounding-in-progress) page.

#### Path A: Ontology-grounded entity resolution

Every compound and condition that the LLM extracts will be resolved against a canonical biomedical registry before being written to Whel's database. Compounds resolve against [ChEMBL](https://www.ebi.ac.uk/chembl/) or [DrugBank](https://go.drugbank.com/); and conditions resolve against [MONDO](https://mondo.monarchinitiative.org/) (the same ontology MATRIX uses for its cross-reference).

The resolution step does three things at once:

1. **Canonicalize**: the LLM may extract "Wellbutrin"; the database stores DB01156 (the DrugBank ID) and rewrites the canonical generic name (Bupropion).

2. **Enrich**: the resolution returns structured metadata (drug class, ATC code, known targets for a compound; ontology lineage for a condition) that travels with the signal.

3. **Gate**: entities that fail to resolve are flagged for human review rather than silently stored.

The gating function is what addresses the [Gong et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC13024205/) reference-fabrication concern that I flagged above directly. An LLM that confidently produces a plausible-looking compound name that doesn't actually exist as a registered drug gets caught at write time.

#### Path B: Knowledge-graph grounding via BioCypher

The second layer is a domain-restricted biomedical knowledge graph built using the [BioCypher framework](https://biocypher.org/), restricted to Whel's six conditions and the compounds attached to active signals.

If you have not encountered BioCypher (I hadn't): it is an open-source framework developed by Sebastian Lobentanzer and colleagues at the European Molecular Biology Laboratory in Heidelberg, published in [Nature Biotechnology in 2023](https://www.nature.com/articles/s41587-023-01848-y). It is specifically designed for building biomedical knowledge graphs from heterogeneous sources. The idea behind a knowledge graph is to model biomedical data as a network of nodes (drugs, diseases, pathways, adverse events) connected by typed edges (targets, treats, interacts with, associated with). Once your data has that shape, you can ask questions that flat databases cannot answer: what compounds target the same pathway as this one, what genes are upstream of a given condition, where do drug-target paths intersect.

The knowledge graph in Path B will draw edges from open biomedical sources: the [Drug Repurposing Knowledge Graph (DRKG)](https://github.com/gnn4dr/DRKG) for drug-target-pathway-disease relationships, and [PheKnowLator](https://github.com/callahantiff/PheKnowLator) for ontology-aligned conditions. BioCypher provides the schema management and integration layer on top.

I chose BioCypher because it is the actively maintained, peer-reviewed, EU-funded option in a field where several alternative tools are research artifacts that haven't been updated in years. DRKG itself hasn't been meaningfully updated since 2021, K-Paths hasn't been updated since 2020, and several "drug repurposing GNN" reference implementations are orphaned forks. BioCypher is the piece I think I can build on.

The knowledge graph will do two things. First, it will inform the LLM at prompt time: when Claude scores a signal, the relevant subgraph of mechanistic paths will be included in the prompt as structured context. This pattern, called knowledge-guided prompting, was [shown to improve biomedical LLM performance](https://pubmed.ncbi.nlm.nih.gov/41024078/). Second, the graph will surface beside each signal as a disclosure layer ("graph supports"/"graph silent") in the same shape as the existing MATRIX cross-reference.

#### One thing I am not planning to do

I am not planning to train a custom graph neural network for drug-condition link prediction (again, I repeat, who do you think I am). There are good academic systems that do this well at scale (Every Cure's [KGML-xDTD](https://everycure.org/lancet/), and Marinka Zitnik's lab's [TxGNN](https://www.nature.com/articles/s41591-024-03233-x) in Nature Medicine 2024). But Whel's value proposition is not scale. It is transparency, condition focus, and provenance, applied to a narrow set of women's health conditions. Adding a black-box prediction layer beside transparent evidence cards would weaken the thing that distinguishes Whel from MATRIX.

The grounding layers that I am working on currently, however, are different. They make the existing pipeline and the existing data shape more structured. So I think that it is the right move for a tool whose central claim is interpretability.

### A setback worth documenting

The featured-signal swap that I mentioned above surfaced a limitation that is also what's driving one of the additions on the roadmap.

When you actually look at what Whel ingested for Vaginal Estrogen for postmenopausal UTI, the three sources are all synthesis papers: a topical review, a Cochrane review of vaginal atrophy, and the NAMS position statement. The original RCTs that those reviews cite (Raz & Stamm 1993 chief among them) are not separately indexed in Whel. They sit one citation step removed.

That happened because Whel's PubMed pipeline runs a condition-keyed Boolean search, filters by article type and publication date, and takes the top-N results by relevance. The Raz & Stamm trial is 33 years old, so it falls outside any reasonable date filter. The AUA recurrent-UTI guideline is scoped to UTI broadly, not menopause, so a menopause-keyed search would never have surfaced it. Whel's pipeline did what it was designed to do, but this makes me think that the design itself has a limitation.

That logic-by-design is fine for under-researched conditions like vulvodynia and PMDD, where the literature is sparse enough that three to five sources is roughly the available evidence base. It is, however, not fine for well-studied compound-condition pairs where the literature is rich. Whel treated both cases the same, and that seems to be the limitation of it.

I recorded the design decision in the methodology version log at v3.3 and added a Planned item to the [Roadmap](https://whel.bio/about/roadmap): a manual primary-source curation pass, modeled on the same worklist pattern that produced the L3 guideline grades. For high-evidence signals where Whel surfaced three sources but the published landscape has ten, I will open a CSV worklist of proposed primary-RCT attachments, fill in the PMIDs by hand, and emit a migration that adds them as additional source rows. Same human-in-the-loop workflow that worked for the guideline curation, I guess.

The version of this for outside reviewers (you, reader!) is that Whel's automated pipeline returns representative sources, but not exhaustive ones and to solve that, I am trying to close the gap on high-evidence signals through the same human curation pattern that produced the L3 grades.

### The roadmap

The site's [Roadmap](https://whel.bio/about/roadmap) is now the place for "what is shipped, what is in the current work cycle, what is planned for later." A short version, in priority order:

**Live today**: the four research arms; the L0-L3 external validation grade; the MATRIX cross-reference; the human guideline curation pipeline.

**Next work cycle**: the two-rater validation study; disproportionality statistics (PRR and ROR) on the adverse-event arm; the cross-arm concordance flag; the manual primary-source curation pass; ontology-grounded entity resolution (Path A); knowledge-graph grounding via BioCypher (Path B); a citable open data export with a DOI.

**Later**: more conditions, EudraVigilance as a European pharmacovigilance source, DrugBank integration, deeper coverage on the existing six conditions.

The Methodology page now carries a dated "Methodology update log" (collapsed by default so it doesn't dominate the page on first scroll), with version entries tracking what changed and when. Each major decision has a dated entry. If you want to see how the project's reasoning has evolved in real time, that's the log.

### What I'm reading

This post leans on a small set of papers that have shaped how I'm thinking about the next phase of the project:

- Maurya, Saboo & Kumar, 2026. [WHBench](https://arxiv.org/abs/2604.00024).

- Gong et al., 2026. [Applications of Large Language Models in Medical Research: From Systematic Reviews to Clinical Studies](https://pmc.ncbi.nlm.nih.gov/articles/PMC13024205/).

- Zong et al., 2026. [Building evidence-based knowledge bases from full-text literature for disease-specific biomedical reasoning](https://arxiv.org/abs/2603.28325). (the closest published analogue to where Whel is going).

- Zhou et al., 2025. [High-throughput biomedical relation extraction for semi-structured web articles empowered by large language models](https://pubmed.ncbi.nlm.nih.gov/41024078/).

- Lobentanzer et al., 2023. [Democratizing knowledge representation with BioCypher](https://www.nature.com/articles/s41587-023-01848-y).

- Fajgenbaum et al., 2024. [KGML-xDTD](https://everycure.org/lancet/) (Every Cure's methodology paper for MATRIX).

- Huang et al., 2024. [A Foundation Model for Clinician Centered Drug Repurposing](https://zitniklab.hms.harvard.edu/projects/TxGNN/).

### THANK YOU!!!
