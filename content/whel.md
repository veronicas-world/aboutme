## Origin

I spent several years with a prolactinoma, a benign pituitary tumor that disrupts hormone regulation, and, in December of 2025, had brain surgery to remove it. The outcome was good. The process made clear how much longer that arc runs for women with endometriosis, PMDD, or PCOS, where diagnostic delay is measured in years and treatment options are thin.

Whel began as a question worked through with my mother, a physician with a research background in perinatal psychiatry: which drugs that already exist might help conditions that remain badly under-researched, and how would we know?

The structural problem is documented. The NIH did not require women in federally funded clinical research until 1993. Male animals still outnumber females in pharmacology research by roughly five to one. Women experience adverse drug reactions at about twice the rate of men. The evidence base underlying prescribing decisions for women's hormonal conditions was built, in large part, on bodies that are not theirs.

## Whel

Whel is a graded evidence database for drug repurposing in six conditions: endometriosis, PMDD, PCOS, adenomyosis, vulvodynia, and perimenopause and menopause.

It maintains a curated list of repurposing candidates, retrieves the literature for each, extracts claims with verbatim provenance, and grades the certainty of the evidence behind them.

It does not generate candidates. Every literature query names a specific compound, so the database gathers evidence about drugs already on the list rather than proposing new ones. Platforms that do generate candidates (Open Targets, Hetionet, Every Cure's MATRIX) do it through knowledge-graph inference, which Whel does not perform. The closest comparable project, ReDO_DB in oncology, builds its candidate list by manual literature curation over years. Whel follows that model for intake.

The contribution is the grading layer. No existing drug-repurposing resource applies a certainty-of-evidence framework to its candidates. Open Targets, CTD, DisGeNET, Pharos, and ChEMBL all publish associations without grading how good the evidence behind each one is.

## Sources

| Source | Contributes |
| --- | --- |
| PubMed | Published literature: trials, systematic reviews, meta-analyses |
| ClinicalTrials.gov | Trial registrations and development stage |
| openFDA (FAERS) | Post-market adverse-event reports, filtered to female patients |
| Open Targets Platform | Genetic-target and mechanistic pathway associations |
| SIDER | Drug side-effect reference (SIDER 4.1 bulk release) |
| Patient communities | Structured patient-reported experience, condition-specific forums |

Adverse-event data is read two ways: as safety signal, and as a phenotypic probe. A drug's side-effect profile is information about what its targets do in a female body, which is a legitimate route to a repurposing hypothesis and an under-used one.

## Scoring

Each drug–condition pair is read through three evidence arms:

- Direct: clinical research on the drug in that condition
- Pathway: mechanistic evidence that the drug's targets are implicated
- Community: patient-reported experience

Community signal enters as hypothesis generation and is validated downstream against the other two arms. It is never equated with trial evidence and never discarded.

Each arm is scored on four dimensions, 0-2 each, summing to an arm strength of 0-8:

- Corroboration: how many independent sources report it
- Rigor: study design and risk of bias
- Specificity: how precisely the claim names intervention, population, and outcome
- Plausibility: whether a mechanism supports the effect

A consistency penalty of 0, −1, or −2 is then applied where independent sources disagree on direction of effect. It is downgrade-only: a signal drawn from a single source cannot be assessed for consistency and receives no credit for it.

Arm strength determines a confidence tier. A female-applicability multiplier is applied after tier assignment and affects rank and display only. It marks down evidence generated in male-only or mixed populations rather than in women. It does not move a signal between tiers, because a multiplier applied before a threshold makes the threshold mean different things for different signals.

Every claim carries a verbatim quote from its source with character offsets, and every claim is checked by an entailment judge that asks one question: does this quote actually support this claim? Claims that fail are labeled neutral or contradicted and do not surface.

## Moving scoring out of the model

The architecture separates two jobs that are often conflated: reading source text, and judging evidence quality.

Reading is a language task. Extracting a claim from a paper, pinning it to a verbatim quote, and checking whether the quote supports the claim are structured information-extraction problems, and a language model is the right tool for them.

Judging is not. A model asked to score the same evidence twice does not return the same answer, and a grade that changes between runs is not a measurement. The design goal is that the model supplies structured features (study design, sample size, comparator, population, direction of effect, number of independent sources) and that the score is a deterministic function over those features: rules in code, applied identically every time, auditable line by line.

Parts of this are already true. The female-applicability multiplier, the imprecision caps, and tier assignment are computed in code today. The dimension scores are still model-proposed, and moving them onto extracted features is the main open piece of engineering. The end state is a rubric a methodologist can review as a specification rather than as model behavior (the same property GRADE has), where the assessment is rule-governed and two trained assessors following the rules should reach the same answer.

## External references

Independent sources are shown beside Whel's grades.

- Every Cure MATRIX: a treatment-probability score from a graph-ML model trained across the whole disease space, used as a cross-reference on matched pairs. Agreement between two methodologically unrelated approaches is informative; so is disagreement.
- DailyMed: FDA drug labels, giving the on-label or off-label read for each pair.
- FDA Orange Book: approved products and therapeutic equivalence, giving generic availability.
- ClinicalTrials.gov: trial stage for the pair.
- Clinical guideline curation: strength and certainty drawn from named society guidelines, for the small set of pairs a guideline covers.

## Reporting standards

Retrieval is recorded as PRISMA-S requires: every query string, database, interface, parameter, filter, and result count is written to a dated manifest at the time the search runs. Each pipeline run also emits a PRISMA-style flow record showing records identified, screened, excluded with reasons, and included.

A validation study of the entailment judge is pre-registered against STARD and GRRAS reporting standards. Its primary endpoint is the false omission rate: of the claims the database publishes as supported, what fraction a qualified human reader would say are not.

## Tech stack

| Layer | Stack |
| --- | --- |
| Front end | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Database | Postgres on Supabase |
| Hosting | Vercel |
| Pipeline | Python; local SQLite working store, exported to Postgres as versioned migrations |
| Programmatic access | MCP server exposing the corpus |
| Reporting | PRISMA-S retrieval manifest and PRISMA flow record emitted per run |

Three stages use a language model, each a different one, chosen for the job:

| Stage | Model | Task |
| --- | --- | --- |
| Extraction | claude-sonnet-4-6 | Read source text, emit structured claims with a verbatim quote and character offsets |
| Entailment | claude-sonnet-5 | Judge whether a stored quote supports the claim attached to it |
| Scoring | claude-opus-4-8 | Propose dimension scores against the fixed rubric |

Everything deterministic runs in code. The project is open source.

## Limits

Whel does not provide clinical advice. A graded signal is a description of the evidence, not a recommendation, and the absence of a high grade reflects the state of the literature rather than a judgment about a drug.

The database grades evidence for a curated candidate list. It does not discover candidates, and it inherits the coverage gaps of the sources it reads, all of which were built from the same under-studied literature.

## Writing

- [Building Whel](/writings/building-whel)
- [An Update on Whel](/writings/an-update-on-whel)
- [Rebuilding Whel](/writings/rebuilding-whel)

Signals are currently being regraded and are not published. The scoring methodology is under review by a physician.
