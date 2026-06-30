## How it emerged

After years with a prolactinoma, a benign pituitary tumor that disrupted my hormones, and the brain surgery to remove it, I came out the other side fine, but acutely aware of how much harder that arc is for women with conditions like endometriosis, PMDD, or PCOS, who are often told their pain is normal and sent away for years. Late-night PubMed rabbit holes and long calls with my mother, a psychiatrist who has spent a career thinking about women's hormonal conditions, turned into a project we began building together: a tool to ask which drugs we already have might help conditions that remain badly under-researched.

The premise of drug repurposing is that the signal is often already there, scattered across trials, registries, adverse-event databases, target platforms, and patient forums, but never pulled together for women's hormonal health. Medical knowledge has structural blind spots here. The NIH did not require women in clinical research until 1993, and roughly 80% of preclinical research still runs on male-only animal models. Whel is an attempt to read what already exists and surface what has been missed.

## What it does and where it stands

Whel is a drug-repurposing platform for female biology. It surfaces approved drugs that already appear to work for women's health conditions, validates each one against mechanistic and clinical evidence, and maps candidates to the 505(b)(2) regulatory pathway. Today it indexes 183 drug-condition pairs across six conditions (endometriosis, PMDD, PCOS, adenomyosis, vulvodynia, and perimenopause and menopause), drawn from 433 verbatim evidence claims, each pinned to a source quote.

Every pair is read through three evidence arms (direct research, pathway, and community) and scored on the same five dimensions: corroboration, rigor, specificity, plausibility, and consistency. That score is then discounted by a female-applicability multiplier that marks down evidence generated in male-only or mixed populations rather than in women, which is the part of the project I care about most. The result sorts into four frozen tiers, from strong to exploratory, and each signal also carries an external validation ladder (E0 to E3) and an independent comparison against Every Cure's MATRIX model, both kept separate from the score so that nothing grades its own homework.

## Technical architecture

The application is built with Next.js, TypeScript, and Tailwind CSS, with a Postgres database on Supabase and hosting on Vercel. A set of data pipelines pull from PubMed, ClinicalTrials.gov, the FDA's openFDA / FAERS adverse-event data, the Open Targets Platform, SIDER, and EudraVigilance, each mapped to a signal type.

A large language model (currently Claude Opus 4.8) does one narrow job: read sources and extract structured facts, then score them against a fixed rubric. The deterministic parts, including the female-applicability multiplier, the imprecision caps, and the final tier assignment, are computed in code rather than by the model, so that every number traces back to a source quote and a piece of stated reasoning. Entities are grounded against canonical biomedical registries (MONDO, EFO, RxNorm, ChEMBL), with a knowledge-graph grounding layer built on BioCypher planned next. The whole project is open source.

## Building in public

I have documented the project as I have built it, including the rebuilds and the things I got wrong and took back out. If you want the longer story, these are the write-ups, in order:

- [Building Whel](https://veronicaagudelo.substack.com/p/my-first-project-womens-health-evidence): why I started it, and what first surfaced.
- [An Update on Whel](https://veronicaagudelo.substack.com/p/an-update-on-whel): external validation, the MATRIX cross-reference, and what LLMs can and cannot do here.
- [Rebuilding Whel](https://veronicaagudelo.substack.com/p/rebuilding-whel): rebuilding the scoring engine, and why a smaller, more honest number beats a larger fuzzy one.

## Where it's going

Whel is a continuous technical project. On the near roadmap: a two-rater validation study, disproportionality statistics on the adverse-event data, a manual primary-source curation pass for well-studied pairs, ontology-grounded entity resolution, the BioCypher knowledge-graph layer, and a citable open-data export with a DOI. Further out, the same substrate is meant to extend past repurposing toward sex-divergent conditions, and eventually toward sex-stratified drug development more broadly.
