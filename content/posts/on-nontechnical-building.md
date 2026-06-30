---
title: "On Nontechnical Building"
subtitle: "All men by nature desire to know. — Aristotle, Metaphysics, 980a21"
date: "2026-03-29"
category: "philosophy"
excerpt: "Why whole categories of problems can only be touched if non-technical people decide to build anyway, framed through Aristotle's delight in knowing."
substackUrl: "https://veronicaagudelo.substack.com/p/on-nontechnical-building"
---

![](https://substackcdn.com/image/fetch/$s_!Gmvr!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2f5f1d8b-dce5-4ea7-be37-f908da88ac6a_1110x638.jpeg)

A few weeks ago I came across the story of a data engineer in Sydney who, with no medical degree and no formal training in oncology, used AI tools (mainly ChatGPT) to help design a personalized mRNA cancer vaccine for his dog, whose tumors had resisted standard treatment. Working with researchers at UNSW, he took the dog's tumor, sequenced the DNA, used AI to make sense of the mutations, and collaborated with a lab to turn that into an actual, physical vaccine, which shrank several tumors after chemotherapy had failed. Scientists involved have publicly said they were stunned, and my LinkedIn feed reflects that as well ;)

This story, which reads like speculative fiction, is, predictably, more complicated than its virality suggests. This was not a guy in his garage uploading raw DNA to ChatGPT and printing a cure at home. But, I think, the core fact is astonishing enough: a non‑doctor, driven by a mixture of love and desperation, used a combination of AI and publicly accessible tools to drive a line of experimentation that would have been unthinkable for a layperson even five years ago. Companies such as OpenAI and Anthropic keep talking about the democratization of software development and scientific discovery, but here is an actual example of it.

Of course, the involvement of AI was not what feels new here, but rather, that the person at the center of the story sits entirely outside the traditional priesthood of medicine. This is the first time I actually believed the 'democratization' brochure copy, and it has given me what I am dubbing "builder bug" (sounds stupid, bear with me).

For context: I am, by any standard definition, non‑technical. Most of my prior contact with "coding" was through the Scratch games everyone made in middle school computer class, which I mostly used to animate unimaginative cats (pictured at the top of this essay). I could not reliably tell you what language a given block of code is written in, and until very recently, "deploy" lived in the same conceptual bucket as "invade." And yet, recently, the idea of making something from literal point‑zero has started to feel almost indecently appealing. I should note that this comes alongside a deep respect for the history and craft of coding itself. So, despite having no formal training, I've taken it upon myself to learn how coding has evolved since its inception, because context matters, even when you're operating at the blurred layer of abstraction I currently inhabit.

I suspect that part of the enjoyment I derive is just temperament, but, like most things I love, is also part philosophical. The whole "building from point-zero/create something out of nothing" framework actually feels very adjacent to infamous philosophical undertakings. Perhaps the most obvious example of this is Descartes' methodic doubt, where one is required to strip away everything that can be doubted and rebuild knowledge from a single indubitable point (cogito, ergo sum/I think, therefore I am). Or you might be reminded of Kant's insistence that before we talk about morality, we must first undertake an a priori investigation into the supreme principle that could ground it. Both of these are attempts to start over, to begin again from something like scratch. Building seems to have that flavor because you excavate down to nothing, then try to assemble a structure that actually holds.

Or maybe I am just projecting my reading list onto my GitHub commits (very possible).

Anyway, I am now in the middle of my own tiny Copernican revolution. Over the past weeks, I've spent hours cycling through Claude Code, Supabase, GitHub, Vercel, and Next.js, trying to teach myself how to build ("build" here meaning "persuade a set of tools I barely understand to cohere into something that runs in a browser").

A few early observations:

- The learning curve is steep + bendy. There's a point where nothing makes sense, and then, suddenly, two percent of it does, and you live off that two percent for days.

- I now have a hazy sense of what Claude Code and Supabase do. Claude writes code and explains it if I beg; Supabase is, roughly, a database with training wheels. GitHub and Vercel I interact with more as proper nouns than as concepts. So GitHub is where my "project" allegedly lives; Vercel is, according to Google, "the platform for the web and AI," which both feels accurate and is exactly the sort of sentence that tells you nothing.

- Iteration is real. Not real in the inspirational, LinkedIn‑carousel way; real in the "you will rerun this line of code fourteen times and it will have an error" way. It's annoying, and occasionally soul‑sucking, and also the only path through.

I should also say: I have no idea what most of the code Claude is generating actually *means*. I do not know what files I have pointed it to on my laptop. I am aware that this is both mildly chaotic and also a privacy concern. But nothing has exploded yet, and I am not trying to become a software engineer, so for now I am choosing to inhabit this slightly blurred layer of abstraction and see how far it gets me.

What am I trying to build?

An open‑source, web‑based research tool that uses AI to mine medical literature, community forums, pathways, and clinical trial data for overlooked "repurposing signals" linking existing drugs to underfunded women's health conditions. In English: a tool that helps surface, cluster, and contextualize plausible "this existing drug might help with this neglected condition" hints hiding in PubMed abstracts, ClinicalTrials.gov records, and related sources. As a (probably-not-needed-but-I-will-say-it-anyway) disclaimer, I am not pretending to give direct treatment recommendations.

My original thought was that something like this could help clinicians and researchers see, at a glance, which approved compounds show unexpected promise, what evidence exists, how strong it is, and how different conditions and mechanisms might connect before the funding and formal trial infrastructure catch up. Conditions like Endometriosis, PMDD, perimenopause, PCOS, chronic pelvic pain, and adenomyosis are staggeringly common in women, debilitating, and systematically underfunded relative to their impact.

The idea for this came from my mother, who is casually multidimensional in a way that would be annoying if I didn't love her. She decided about seven years ago to go to medical school. So she did. This means I get a running commentary on what medicine cares about, what it underfunds, and where AI is being used versus where it's just branding. Recently she mentioned, almost in passing, how many women's health conditions live in this gray zone — too common to be rare‑disease sexy, too gendered to be properly resourced, and/or too messy to fit neatly into existing drug pipelines.

At the same time, drug repurposing is one of those revolutionary things hiding in plain sight (and there are many, many platforms that are being built or already operate in this space currently). We already have multiple major drugs whose most important uses were discovered as "side effects" or off‑label explorations that eventually became standard of care (Sildenafil/Viagra, Minoxidil/Rogaine, Aspirin/acetylsalicylic acid, etc). But, based on my research, almost no one is systematically applying that lens to these specific women's health conditions, especially not with the full machinery of modern search, LLMs, and structured evidence‑mapping pointed at the problem.

So we talked, and I proposed a citation‑first research tool that does exactly that —mines the existing evidence base, scores and summarizes potential repurposing signals, surfaces them in a way a human expert can interrogate, and stays very far away from pretending to be a diagnostic or prescribing tool.

You might reasonably ask why I am doing this when no one asked me to, with a full course load, a job, and precisely zero compensation, beyond a negative $41.11 line item labeled "Claude Pro + API credits."

Because it is so FUN. Oh what a joy it has been to discover that I love watching something go from "vague idea in Notes app" to "object that exists at a URL!"

And so to investigate this personal phenomenon, I shall begin with the opening line of Aristotle's *Metaphysics*:

*"All men by nature desire to know (eidenai). An indication of this is the delight we take in our senses; for even apart from their usefulness they are loved for themselves; and above all others the sense of sight… [it] makes us know and brings to light many differences between things."*

This line is perhaps the cleanest description of what the "builder bug" actually is. The desire to know, explore, and experiment is about the particular, almost childlike delight in making distinctions, seeing how one thing differs from another, how systems hang together, how you can intervene and change them. Sight, for Aristotle, is the privileged sense because it discloses structure, and building, in this very contemporary, AI‑mediated way, is just another a way of bringing to light new "differences between things." Except, I suppose, that the "things" are now database schemas and model weights and clinical endpoints. Oh how the times have changed.

If I had to sum it up: to build is to put your hands (metaphorically) on the structure of the world, or some particular aspect of it, and feel where it gives.

So, yes: consider this a standing invitation, especially if you consider yourself "non‑technical," to go build something, literally anything. Whole categories of problems will only be touched if people who have never thought of themselves as "technical" decide to build anyway, precisely because they carry different urgencies and ways of seeing. So let the tools carry the weight you don't yet understand.

And do not let anyone be pretentious to you about learning to code the "right way." Let your curiosity be wildly disproportionate to your credentials (I have been told that this is especially important if you, like me, are young, wide-eyed, and naive about the world around you). Worst‑case scenario, you learn a lot about how things *don't* work (which is valuable as well). Best‑case, you make something that didn't exist before, and in the process, you get a little closer to that Aristotelian delight in knowing.
