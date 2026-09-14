A talent-intelligence system for finding undergraduate and graduate builders. I cannot share everything about this project as it is my proprietary way of creating a builder database and I use it in my work, but I think it is a cool project nonetheless, so here is what I am open to sharing thus far. Feel free to contact me if you want guidance building your own.

## Origin

My work at Factory, and across campus ecosystems more broadly, runs on one recurring problem: finding top student builders early. My central thesis here (not unique) is that compelling people are visible in public data (think hackathon results, code, papers, grants) long before they are posting things on LinkedIn or X like "I am taking a leave of absence from my work at X to build Y" or "So excited to announce that our company A has been accepted to YC S26" or something of that nature. This data is everywhere, but very scattered and hard to consolidate! So I built an easy-to-use platform to aggregate and make sense of it.

## The database

The system maintains a database of, currently, over 47,000 student builders across US and Canadian universities that is refreshed daily at 6am. Each record merges what a person has built (repositories, commits, hackathon results), what they have researched (papers, citations, lab affiliations), and whether their work is moving toward commercialization (grants, patents, SBIR/STTR awards).

Records arrive from eleven independent collectors and are deduplicated across sources, so a student's GitHub profile, arXiv papers, and NIH grant history resolve to one person. The database is read through a dashboard: natural-language search, filters, ranked lists, and per-builder profiles with a full score breakdown.

## Sources

All inputs are public data.

| Source | Contributes |
| --- | --- |
| Devpost | Hackathon participation and wins across 26 major events |
| GitHub | Code output: commits, repositories, pull requests, recency |
| arXiv | Preprints in computer science and machine learning |
| Semantic Scholar | Citation counts and h-index |
| OpenAlex | Works, ORCID identifiers, institutional affiliation |
| bioRxiv / medRxiv | Biology preprints across ten biotech modalities |
| Lab rosters | Lab membership at 38 research universities |
| NIH RePORTER | Grant awards to university principal investigators |
| NSF Awards | I-Corps and PFI technology-translation programs |
| SBIR / STTR (via NIH RePORTER) | Awards to small businesses — research that already became a company |
| PatentsView | Patents by university assignee (activates with a free API key) |

![Ingestion pipeline: eleven public-data collectors, deduplicated through identity resolution into one Postgres database.](/student-scraper/ingestion.png)

My thinking behind the three lanes was very deliberate. I believe that 1) Build signals answer whether a person is shipping, and how often. 2) Research signals answer the question of whether a person works on hard problems. And 3) Commercialization signals, which are my personal favorite, are trying to figure out whether their work is becoming a company.

## Scoring

Every builder that my platform pulls receives a score from 0 to 100, which represents a weighted sum of eight components, each of which is computed from raw counts:

| Component | Weight | What it measures |
| --- | --- | --- |
| GitHub activity | 25 | Contribution frequency, repository count, recency |
| Project quality | 15 | Stars, forks, README quality |
| Tech stack relevance | 15 | Alignment with the stacks that matter for the role or ecosystem |
| Student verification | 15 | Confidence the person is currently a student |
| Hackathon performance | 10 | Wins, prizes, participation volume |
| Research impact | 10 | Paper volume, recency, citations, h-index |
| Online presence | 5 | Talks, launches, public writing |
| Network signals | 5 | Org memberships, connections to other top builders |

Two threshold tags sit on top of the score. A candidate for the Guild needs a minimum score plus at least two of: recent commit activity, a relevant stack, verified student status. A prospecting tag needs a minimum score plus at least two of: a shipped project, a hackathon win, evidence of working on a team.

## No model in the loop

Scoring, identity resolution, and deduplication are deterministic functions over extracted fields. In other words, they are rules in code that are applied identically on every run and are auditable. A record rescored tomorrow on the same data returns the same number.

That said, language understanding is unavoidable in cases such as parsing a search query like "postdocs in spatial omics with SBIR funding" into structured filters. But I only use it for that.

## Output

The database is read through one interface, a dashboard with natural-language search, filters, and per-builder profiles. It supports top builder prospecting for my work at Factory and across campus ecosystems more broadly. I have one graph of who is building, what they work on, and how far their work has gone.

![Output: one Postgres database read through a dashboard that serves Factory Guild recruiting and campus prospecting.](/student-scraper/output.png)

## Tech stack

| Layer | Stack |
| --- | --- |
| Front end | Next.js (App Router), React, TypeScript |
| Database | Postgres on Supabase, row-level security, RPC query layer |
| Hosting | Vercel |
| Pipeline | Python collectors, scheduled daily via GitHub Actions |
| Ingestion health | Per-source run ledger with success / partial / failed / skipped states |
