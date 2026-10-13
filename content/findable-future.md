![](https://substackcdn.com/image/fetch/$s_!e1_9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7b8d9e80-caaa-4aea-aa3c-8cae159695c7_319x169.png)

My premise is that the next generation of great builders is findable: by name and with evidence attached. Before the YC batch, before a Series A, many people who will build something important have already left a long, legible trail of proof in public - commits on GitHub, preprints on arXiv, medal lists in olympiad archives, winner galleries on hackathon sites, and names on lab rosters.

To test that claim, I built a database that since September has grown into 4,698 builders, 28,814 research papers, and 6,058 pieces of company-formation evidence across thirty-eight universities. I built it entirely through Factory, as a person who cannot code.

### How it works

- **Five collection lanes:** GitHub search, academic papers, hackathons and events, olympiad archives, and lab rosters, plus NIH grants, NSF I-Corps awards, and USPTO patents.
- **Entity resolution:** each builder is one row, assembled from however many public identities I can prove belong to the same human.
- **Scoring:** a unified 0-100 builder score from seven weighted components, downstream of an evidence ledger with source URLs.
- **Chat interface:** Factory is connected directly to the database, so I can ask in plain English: "show me top robotics PhD students at CMU with recent papers."

Read the full write-up [here](/writings/building-a-findable-future-with-factory).
