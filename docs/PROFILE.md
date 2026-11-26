# Content source of truth

Prepared 15 October 2026 from David's explicit instructions and approved final CV. Use this together with the CV; neither website copy nor project suggestions should invent additional experience.

## Identity, contact, links

- David Farcas; Cluj-Napoca, Romania.
- Positioning requested: AI/ML Engineer & Full Stack Developer. Actual current job title: AI Engineer at RebelDot, November 2024–present.
- Email: farcas.david@yahoo.com; link mailto:farcas.david@yahoo.com.
- Phone: +40 720 806 333; link tel:+40720806333.
- GitHub: https://github.com/FarcasDavid.
- LinkedIn: https://www.linkedin.com/in/farcas-david/.
- Instagram: https://www.instagram.com/david.seiph/.
- Romanian and English.

## Experience: approved public descriptions

### RAG-based Email Response Automation

Automotive marketplace client. August 2026–present. User chose July/August as the approximate start; August is the working date already used in the approved CV.

David independently architected and implemented an 11-category RAG email assistant combining classification, PostgreSQL/pgvector, Cohere embeddings, Haiku reranking, and cited drafts for human review. Historical agent replies become a reusable, source-grounded knowledge base. GLiNER/Presidio mask PII; MPNet performs semantic clustering; DeBERTa NLI checks grounding before indexing. DSPy/GEPA optimizes prompts programmatically against classification and safety metrics.

**User-reported measured outcomes:** correct drafting 45% → 88%; retrieval in the top five 70% → 91%. These are +43 and +21 percentage points respectively. User attributed the gains to the integrated agent-reply knowledge pipeline. Dataset, baseline version, evaluation split, sample size, and exact metric definitions were not supplied. Keep the approved concise percentages; obtain those details before expanding into a detailed evaluation case study. No invented causal attribution or extra performance figures.

The implemented flow drafts for human review; no autonomous send pathway was established in the reviewed material. PII masking reduces exposure; do not claim perfect removal, security certification, or compliance guarantees.

### LLM-based Call Quality Assurance

Insurance client; 2026. Exact start/end months unknown.

Python, LangChain, DSPy, HuggingFace Transformers. Weighted rubric-driven LLM scoring with per-criterion evidence. RapidFuzz citation verification and DeBERTa NLI flag unsupported reasoning without extra LLM verification calls. Grounding checks are advisory flags; they do not automatically block scores.

CV benchmark scope: eight criteria across 119 calls, 952 judgments; macro-F1 and Cohen's kappa for optimization/evaluation. Local NLI verification benchmark: 108–151 ms per criterion. Do not turn that into end-to-end system latency or a universal SLA. Do not publish client transcripts, rubric details, internal project identifiers, or raw evaluation artifacts.

### AI Applications & Platform Engineering

Insurance, automotive and enterprise clients; November 2024–December 2025. Python, FastAPI, Streamlit, AWS/Azure, Terraform.

- 19 self-scoped optimization tickets; 2.5M-row queries reduced from 25 seconds to under 2 seconds; filtering expanded from three to 40+ parameters under a Q4 deadline. PostgreSQL, batched APIs and Redis.
- Multimodal OCR and cloud AI applications; Terraform, Azure Pipelines, Microsoft Entra ID/JWT authentication, LLM caching, cross-region AWS Bedrock load balancing.

Keep these aggregated dates. No individually confirmed dates, promotions, or client names are available.

### Full-stack review app, architecture and quality gates (confirmed 26 November 2026)

David states he designed the modular, scalable, production-ready architecture of the email assistant on his own. Verified against the project's own documentation (not published): nine decoupled packages with Pydantic contracts at LLM boundaries; evaluation decoupled from inference through run artifacts; a draft review app with a Next.js 16 (App Router) / React 19 frontend in strict TypeScript, a FastAPI REST API on SQLAlchemy/Alembic/PostgreSQL, and a scheduled job that drafts replies to new emails every two hours; guardrails enforced in code (figure/link grounding checks, confidence gating, untrusted-input isolation, human review of every draft); an offline evaluation harness. Code-quality tooling: ESLint (Next.js Core Web Vitals + TypeScript), Prettier, Vitest + React Testing Library on the frontend; Ruff (McCabe ≤ 12), mypy, interrogate (90% docstring coverage), pytest and pre-commit on the backend. Do not name the client or the product, and do not publish source, data or screenshots.

### iOS Developer, CHR Mobile Solutions (confirmed 26 November 2026)

Cluj-Napoca, 2022–2024; David's first engineering role. Do not publish months. Built FlyEvents, a native iOS app for booking and customizing private-event services (DJ, bar, decor, photography), in Swift and UIKit with MVVM, Firebase Authentication/Firestore/Storage, REST APIs via Alamofire, SwiftLint and CocoaPods (verified from the public FlyEventsApp repository). Together with RebelDot this gives four years of professional experience.

## Collaboration and strengths

End-to-end ownership, initiative, analytical problem-solving, technical communication, delivery under deadlines. Shared AI coding-agent rules and pre-commit checks for style, tests and commits; architecture/contribution guides adopted by the team. Treat these as engineering practices with practical delivery benefits; no quantified development-time saving was substantiated.

## Technology inventory

The CV is authoritative for the original inventory. On 21 October 2026, David additionally confirmed TypeScript, Cypher, MongoDB, Neo4j, Claude Code, Codex and Warp, alongside Python, SQL, Qdrant, FAISS and Git. These are user-confirmed technologies; no additional project-specific production claims were supplied. The Tech Stack section presents a concise grouped inventory.

- AI engineering: Python, RAG, LangChain, LangGraph, DSPy, GEPA, AWS Bedrock, pgvector, prompt optimization, structured outputs, grounding, reranking, evaluation, LiteLLM, OpenWebUI.
- Models/NLP: Claude Sonnet/Haiku/Opus, Cohere Embed English v3, MPNet, DeBERTa NLI, GLiNER, Presidio, spaCy, PyTorch, Sentence Transformers, HuggingFace Transformers, BERTopic, UMAP.
- Backend/data: SQL, FastAPI, Pydantic, Streamlit, SQLAlchemy, PostgreSQL, Redis, Qdrant, Pinecone, FAISS, pandas, NumPy, scikit-learn, SciPy, RapidFuzz, BM25, ROUGE-L.
- Cloud/delivery: AWS S3/RDS/EC2/Secrets Manager; Azure App Service/ACR/Key Vault/Entra; Terraform, Docker, Podman, Kubernetes, Azure DevOps, Azure Pipelines, Git, Bash, pytest, Ruff, mypy.

On 26 November 2026 David confirmed the OpenAI API (used during his Azure AI-102 certification, via Azure OpenAI) and the Next.js/React/TypeScript frontend stack above. Do not invent experience with other frontend frameworks.

## Certifications and education

David explicitly confirmed on 16 October 2026 that all certifications listed in his CV remain valid.

- Claude Certified Architect - Foundations: 20 June 2026–June 2027. User-supplied credential. Skills: Claude API/Agent SDK, agentic orchestration, tool and MCP integration, Claude Code workflows, prompt engineering, structured outputs, context management and reliability. No badge URL provided.
- Microsoft Certified: Azure AI Engineer Associate (AI-102): earned 2024; current validity confirmed by David. Skills: Azure AI design/deployment, Azure OpenAI (OpenAI API), NLP, computer vision, document extraction, search, responsible AI. No badge URL provided.
- Technical University of Cluj-Napoca, 2020–2024: Bachelor's Degree in Electronics, Telecommunications and Information Technology.

## Life outside engineering

On 21 October 2026, David confirmed cycling, training for his next race, playing tennis, and DJing at private events. These are user-confirmed personal details, not CV-derived claims.

Running and triathlon. David states he is registered for IM 70.3 Mamaia 2027. Describe training toward this future event. Official event naming/date should be verified before specific race details or a countdown. No past race times, training data, finisher status, Strava link, or approved photography was supplied.

## Public personal work and unknowns

David says he has no portfolio-ready personal AI projects at this time. An initial public profile lookup found CryptoMarket, FlyEventsApp, GameDashboard, ioio, RecipeBook and SwiftUI-Projects. Their quality, ownership details, licensing, suitability, and current status have not been reviewed. Do not feature automatically. docs/PROJECT_IDEAS.md is a proposal list, not completed work.

No custom domain ownership, portrait, preferred color theme, blog content, hosting account, or analytics preference has been confirmed. Start with thoughtful defaults and ask only when needed. No site has been built or deployed in this handoff.
