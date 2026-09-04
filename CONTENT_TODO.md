# Content that needs your input

The site was rebuilt with your **LinkedIn profile as the source of truth**. This file lists
everything I could not verify from a source document, plus what I removed and why.

Nothing here blocks the site — it builds and deploys as-is. These are the places where filling in
real detail would make it noticeably stronger.

---

## 1. Virtusa and Ideate Technologies need real detail

`data/experience.ts` → roles `virtusa` and `ideate-technologies`, both marked `needsDetail: true`.

Your LinkedIn confirms the companies, titles, and dates. Neither your résumé nor the LinkedIn
export describes what you actually built there, so those two roles are written as generic
Generative AI Engineer responsibilities with **no metrics attached**. I deliberately did not
invent numbers.

For each role, replace the `highlights` array with real work. The shape:

```ts
{ text: 'What you built and why', metric: '43% fewer support escalations' }
```

`metric` is optional — omit it rather than estimating. Where a figure is approximate, prefix it
with `~`, matching how your résumé handles it.

If either role produced something substantial, add a case study to `data/work.ts` and it will
appear on the home page and in `/work` automatically.

## 2. Résumé PDF is out of date

`public/resume/resume.pdf` still lists **WorkingFox** and **Creative Sense Pvt Ltd** — companies
that appear nowhere on your LinkedIn. It also gives Cognizant as *Machine Learning Consultant,
Aug 2021 – Nov 2022*, while LinkedIn says *Programming Analyst, Jul 2021 – Nov 2022*.

The site follows LinkedIn throughout. Right now a recruiter who reads the site and then opens the
résumé link will see two different work histories. **Replace this PDF before sharing the site.**

## 3. Claims removed from the previous site

The old site presented work at **CVS Health**, **Morgan Stanley**, and **Verizon**, with detailed
metrics (91% retrieval accuracy, 350,000+ indexed documents, 22% upsell lift). None of those three
employers appears on your LinkedIn or in your résumé. All of it was removed.

Also removed: **Microsoft Certified: Azure AI Engineer Associate (AI-102)**, which the old site
listed and used in its headline, but which is in neither your LinkedIn certifications nor your
résumé. If you do hold it, add it back to `data/certifications.ts` with the credential URL.

## 4. Publications were cut from 90 to 38

The old `data/publications.ts` had 90 entries. 46 had no linked report at all, and 6 more were
duplicates pointing at a report already listed under a different title. Only entries backed by a
PDF that exists in `public/reports/` survived: **15 co-authored, 23 supervised**.

If any of the removed entries are real, add them back with a link to the report.

## 5. Two gaps in the timeline

LinkedIn shows nothing between **Nov 2022 and Aug 2024** (presumably the move to the US and the
start of the MS) or between **May 2025 and Mar 2026**. The site doesn't draw attention to either,
but an interviewer will notice. Worth having an answer ready, or adding the roles if they exist.

## 6. Headshot

`public/images/profile/portrait.jpg` is your original photo cropped to portrait framing — which
also removed the generative-AI watermark that was in the bottom-right corner of the source file.
A real photograph would serve you better here if you have one.

## 7. Writing

The three essays carried over from the old site. `healthcare-llm-production.mdx` was originally
written in the first person as though you had deployed clinical LLM systems; since your healthcare
work was claims and utilisation data rather than clinical documents, I reframed it as analysis.
The technical content is unchanged. Read it over and make sure it sounds like you.
