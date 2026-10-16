# Portfolio content review

Reviewed 15 October 2026 against CODEX_PROMPT.md, docs/PROFILE.md and the approved CV source. This document gives copy guidance and evidence boundaries; it does not replace those sources.

## Recommended public narrative

**Role:** AI/ML Engineer & Full Stack Developer.

**Hero:** “I build evidence-grounded AI systems, from retrieval and evaluation to backend and cloud delivery.”

**Supporting context:** “AI Engineer at RebelDot, based in Cluj-Napoca. I take ownership from problem definition and evaluation through implementation, with a focus on useful AI and dependable engineering.”

Lead with two substantial professional systems, followed by the earlier platform work. Explain the problem, personal ownership, engineering decisions and measured result in that order. An experience-led launch is stronger than adding unbuilt personal-project cards. Keep the project roadmap in PROJECT_IDEAS.md.

## Experience copy and boundaries

### RAG-based Email Response Automation

Automotive marketplace · August 2026–present.

“Independently designed and implemented an 11-category assistant that turns historical agent replies into reusable knowledge and drafts cited email responses for human review.”

Explain PostgreSQL/pgvector and Cohere retrieval as finding relevant past knowledge; Haiku reranking as improving source selection; GLiNER/Presidio as reducing personal-data exposure; MPNet clustering and DeBERTa NLI as preparing source-grounded knowledge before indexing. DSPy/GEPA replaces ad hoc prompt changes with repeatable optimization against defined metrics.

Show **correct drafting 45% → 88%** and **top-5 retrieval 70% → 91%** as user-reported measured outcomes of the integrated knowledge pipeline. Do not attribute all improvement to prompt optimization. Dataset size, splits and exact metric definitions remain unknown; no expanded benchmark claims are justified. Do not claim autonomous email sending, perfect PII removal or compliance certification.

### LLM-based Call Quality Assurance

Insurance · 2026.

“Built rubric-driven scoring with per-criterion evidence, so reviewers can inspect how each assessment was reached.”

Explain RapidFuzz as checking citation matches and DeBERTa NLI as flagging unsupported reasoning without extra LLM verification calls. These are advisory evidence flags and do not guarantee factual correctness or block scores. DSPy/GEPA optimization uses macro-F1 and Cohen's kappa to compare quality and agreement.

If showing benchmark details, preserve their scope: **eight criteria, 119 calls, 952 judgments**; **108–151 ms per criterion** refers only to local NLI verification. It is not end-to-end latency or an SLA.

### AI Applications & Platform Engineering

Insurance, automotive and enterprise · November 2024–December 2025.

“Delivered backend optimizations and cloud AI applications, combining PostgreSQL, batched APIs and Redis with FastAPI, Streamlit and AWS/Azure.”

Approved outcomes: 19 self-scoped optimization tickets; 2.5M-row queries from 25 seconds to under 2 seconds; filtering from three to 40+ parameters under a Q4 deadline. Keep these grouped dates. Mention OCR, authentication, Terraform, Azure Pipelines, caching and cross-region AWS Bedrock load balancing as engineering solutions, without inventing individual assignment dates or deployment scale.

## Expertise, credentials and personality

Group expertise into AI systems/evaluation, backend/data and cloud/delivery. Include searchable names **Python, RAG, DSPy, GEPA, LangChain, LangGraph, HuggingFace Transformers, FastAPI, PostgreSQL, pgvector and AWS Bedrock**. Tie the groups to the work above. A framework chosen for this website is an implementation choice, not proof of prior professional experience.

Include both credentials with learning context and honest dates: **Claude Certified Architect - Foundations**, 20 June 2026–June 2027; **Microsoft Certified: Azure AI Engineer Associate (AI-102)**, earned 2024, with renewal unconfirmed. No verification badge URL was supplied. Include the Technical University of Cluj-Napoca degree, 2020–2024, and Romanian/English.

Professional strengths should sound concrete: independent ownership, analytical problem-solving, initiative, technical communication and delivery under deadlines. Shared coding-agent rules, pre-commit checks and architecture/contribution guides demonstrate collaboration. No time-saving percentage is established.

Safe personal copy: “Outside engineering, I run and train for triathlon. I'm registered for IM 70.3 Mamaia 2027.” Registration is user-reported and future-facing. Avoid a countdown or specific official date until independently verified; never imply finisher status or invent training statistics.

## Public release checks

Use descriptive headings and broad industries. No employer/client source, real messages, transcripts, screenshots, proprietary rubric, internal names or client identities. No fictional portrait, testimonials, demo links, results or seniority labels. Avoid “PoC” and “selected delivery.”

Use the exact approved email, phone and social links from PROFILE.md. The contact section should open mailto/tel links and download the existing PDF. Preserve both approved CV files byte-for-byte. Add a real portfolio URL to the CV only when David asks.

The GitHub review and recommendations are documented in PROJECT_IDEAS.md. No existing repository was validated as a portfolio-ready AI project, and no repository was run or security-audited as part of this content review.

## Expanded project evidence — 16 October 2026

David explicitly requested details from his older CV in Downloads/Archive. Only CV material was consulted; no neighboring proprietary source, data or assets were imported. The approved final CV remains unchanged. The older four-page “David Farcas CV 2026.pdf” supports these additional responsibilities:

- Pages 1–2: PostgreSQL materialized views, batched endpoints and Redis; Builder/component architecture for cascading filters; memory profiling, cache management, authentication and cross-region AWS Bedrock work. These expand the approved platform summary without new outcome figures.
- Pages 2–3: multimodal OCR with PDF-to-image conversion, multithreaded batched LLM inference, modular prompts, synthesized Markdown/Excel outputs, FastAPI/presigned S3 downloads, JWT/Entra authentication, Streamlit, Terraform and Azure Pipelines with ephemeral environments.
- Page 3: vehicle-listing assistant responsibilities covering SSO/token validation, JWT/long-lived-token caching, LLM chain/model caching and typo-tolerant matching. System-level truthfulness/plagiarism guarantees are omitted because personal ownership is not established.
- Page 4: workforce/sales assistants with Terraform, Azure DevOps, Docker, App Service/ACR, environment/service-connection configuration and role-specific assistant setup. Ambiguous “custom AI models” wording is not used to imply model training.

The additional application cards inherit the approved Nov 2024–Dec 2025 grouping; no individual project dates or performance claims were added. An unrelated reference CV found in the archive was excluded. Main case studies now expose most approved CV bullets directly, including DSPy/GEPA agreement optimization for calls. Reported pipeline results, human review, advisory grounding and component-latency scope remain explicit. Removing the public confidentiality note changes presentation only; client identities and proprietary details remain excluded.
