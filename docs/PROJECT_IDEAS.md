# Proposed personal AI/ML projects

These are recommendations, not completed projects. Publish only after building and evaluating them. Use independent code and public or synthetic data; employer code, private datasets and internal architectures must stay private. Build one flagship well before starting the rest.

## 1. Eval-first support knowledge assistant — strongest AI engineering signal

**Problem:** answer questions from a public product/manual corpus with trustworthy citations and explicit abstention.

**MVP:** ingestion, chunking, hybrid search, reranking, source-cited responses, refusal on unsupported questions, and a small accessible web interface. Use public documentation with appropriate reuse rights or original synthetic support material. Keep it independent from confidential employer work.

**Stack:** Python, FastAPI, PostgreSQL/pgvector, BM25, a reranker, Claude or a configurable model provider, Docker; a lightweight TypeScript frontend. Provide a deterministic offline demo or recorded run so employers do not need an API key.

**Evaluation:** publish a versioned question set with answerability labels and expected sources; compare dense versus hybrid versus reranked retrieval using Recall@5/MRR, citation correctness, grounded answer quality, abstention accuracy, cost and latency. Separate tuning and held-out data. Report actual outcomes, including failure cases.

**Showcase:** interactive source highlighting, architecture diagram, reproducible benchmark table, CI regression checks. Differentiator: evidence and evaluation, not another unmeasured chat UI.

## 2. Prompt optimization and evaluation workbench — strongest DSPy/GEPA signal

**Problem:** make prompt changes measurable and reproducible rather than relying on impressions.

**MVP:** baseline prompt, DSPy program, GEPA optimization, saved experiment runs, regression comparison and a small dashboard. Start with one public intent-classification/structured-extraction task and add a second only after the pipeline works.

**Stack:** Python, DSPy/GEPA, Pydantic, pytest, SQLite/PostgreSQL, Streamlit or a small web frontend. Use supported provider integration and configurable budgets; check current library APIs.

**Evaluation:** fixed train/development/test split, macro-F1 or schema/field accuracy, error categories, confidence intervals where appropriate, cost, latency and experiment budgets. Compare manual baseline with optimized prompts on the same held-out set; record model/version/seed and avoid test-set leakage.

**Showcase:** before/after examples, downloadable experiment metadata, reproducible scripts, honest limits. Differentiator: explicit evaluation discipline and optimization tradeoffs.

## 3. Endurance training analytics — strongest personal/full-stack signal

**Problem:** understand running, cycling and swimming consistency while preparing for a future triathlon.

**MVP:** import David's explicitly selected FIT/TCX/GPX/CSV exports or use demo data; show weekly volume, sport distribution, session trends and transparent training-load summaries. Keep precise locations and private health data private by default.

**Stack:** Python, pandas, FastAPI, PostgreSQL, a responsive TypeScript charting interface, Docker. Add simple forecasting or anomaly detection only after useful baseline analytics exist.

**Evaluation:** validate import units/time zones, derived aggregates and missing-data behavior against fixtures; compare any forecast against a naive time-series baseline with chronological splits. No medical advice or claims of injury prediction without appropriate evidence.

**Showcase:** polished demo dashboard with synthetic data, documented calculation choices, privacy controls and a personal motivation story. Differentiator: real user interest combined with credible full-stack execution.

## 4. Reproducible ML prediction service — broadens classical ML evidence

**Problem:** deliver a public tabular prediction task from data analysis through deployed inference.

**MVP:** public licensed dataset, feature pipeline, naive baseline and two justified models, versioned artifact, FastAPI inference, simple explanation UI and monitoring report. Choose a non-sensitive application such as bike demand or energy forecasting.

**Stack:** scikit-learn, pandas, Pydantic, FastAPI, Docker, CI; optional experiment tracking. Avoid adding infrastructure solely for logos.

**Evaluation:** appropriate temporal or grouped split, leakage checks, task-specific accuracy/error metrics, calibration when relevant, inference latency and simulated drift. Explain where a simple baseline is sufficient.

**Showcase:** model card, clear limitations, reproducible training/inference, useful demo. Differentiator: proof of classical ML delivery beyond LLM APIs.

## 5. Document intelligence review tool — focused product opportunity

**Problem:** extract structured fields from varied documents while making uncertainty reviewable.

**MVP:** public or synthetic invoices/forms, OCR or multimodal extraction, schema validation, source-region references, confidence/review flags and export. Do not use real customer or identity documents.

**Stack:** Python, FastAPI, Pydantic, a documented OCR/multimodal provider, PostgreSQL and a small review UI.

**Evaluation:** field-level precision/recall, document exact match, difficult-layout slices, review rate, cost and latency. Compare a simple rule/OCR baseline with the model approach.

**Showcase:** side-by-side document/review screen and reproducible public fixtures. Differentiator: useful human review and error handling instead of an opaque upload demo.

## Recommended order

Start with the support assistant **or** optimization workbench as a flagship. Add endurance analytics to demonstrate personality and product skills. Add the classical ML service when broadening ML evidence. Keep the document tool as an optional later project. The portfolio can launch with substantial anonymized professional experience and no fabricated personal-project section.
