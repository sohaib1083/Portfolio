// ═══════════════════════════════════════════════════
// BLOG DATA — Posts, Tags, Metadata
// ═══════════════════════════════════════════════════

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;        // ISO 8601
  readTime: number;    // minutes
  tags: string[];
  category: string;
  coverIcon: string;   // Font Awesome class
  coverGradient: string; // Tailwind gradient classes
  content: string;     // Markdown
}

// ─── POSTS ─────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    slug: "rl-agents-frozen-llms",
    title: "Teaching LLMs with RL: Agentic Frameworks and Frozen Models",
    excerpt:
      "Explore how reinforcement learning agents with frozen language models can curate high-quality training datasets — the architecture behind modern RLHF pipelines.",
    date: "2026-03-28",
    readTime: 8,
    tags: ["AI", "Reinforcement Learning", "LLM", "RLHF"],
    category: "AI / ML",
    coverIcon: "fa-solid fa-brain",
    coverGradient: "from-accent-indigo to-accent-violet",
    content: `
## The Core Idea

Reinforcement learning from human feedback (RLHF) has powered models like GPT-4 and Claude. But collecting human feedback at scale is expensive. What if an *agent* — itself powered by a frozen language model — could do the curation automatically?

This is the architecture I built at [Preference Model](https://github.com/sohaib1083): an **agentic RL framework** where frozen LLMs act as evaluators and dataset curators.

---

## Architecture Overview

\`\`\`
┌────────────────────────────────────────────┐
│  Rollout Engine                            │
│  (Environment generates trajectories)      │
└───────────────┬────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  Frozen LLM Judge                          │
│  (Scores each trajectory 0–1)              │
└───────────────┬────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  Offline Dataset Buffer                    │
│  (Only high-quality pairs are stored)      │
└───────────────┬────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  Policy Update (DPO / PPO)                 │
└────────────────────────────────────────────┘
\`\`\`

---

## Why Freeze the LLM?

Freezing the inference model avoids catastrophic forgetting and keeps evaluation consistent across training iterations. The frozen model essentially acts as a *stable reward oracle*.

\`\`\`python
from anthropic import Anthropic

client = Anthropic()

def judge_trajectory(trajectory: str) -> float:
    """Score a trajectory using a frozen LLM judge."""
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=16,
        messages=[{
            "role": "user",
            "content": f"Rate this trajectory on a scale 0.0–1.0. Reply with only a number.\\n\\n{trajectory}"
        }]
    )
    return float(response.content[0].text.strip())
\`\`\`

---

## Dataset Curation Strategy

Rather than storing every trajectory, we apply a **top-K filter** per batch:

\`\`\`python
def curate_batch(trajectories: list[str], top_k: float = 0.3) -> list[tuple]:
    scored = [(t, judge_trajectory(t)) for t in trajectories]
    scored.sort(key=lambda x: x[1], reverse=True)
    cutoff = int(len(scored) * top_k)
    return scored[:cutoff]
\`\`\`

This ensures the offline buffer only contains the best demonstrations, making downstream policy updates far more sample-efficient.

---

## Key Takeaways

- **Frozen LLMs** make excellent reward models when fine-tuning is infeasible.
- **Agentic curation** dramatically reduces the need for human annotators.
- The pipeline generalises to any task that can be expressed as a trajectory.

If you're building similar systems, feel free to reach out — always happy to talk RL architectures.
`,
  },
  {
    slug: "fraud-detection-ml-pipeline",
    title: "Building a Real-Time Fraud Detection Pipeline with Elastic Retraining",
    excerpt:
      "How I designed an ML-powered alert triage system at Paysys — including dynamic retraining with elastic data windows and continuous feedback loops.",
    date: "2026-02-14",
    readTime: 6,
    tags: ["ML", "Fraud Detection", "MLOps", "FastAPI"],
    category: "MLOps",
    coverIcon: "fa-solid fa-shield-halved",
    coverGradient: "from-accent-cyan to-accent-green",
    content: `
## The Problem

In high-volume payment systems, fraud alert queues can contain **thousands of events per hour**. Manual triage is impossible. The goal: build a system that automatically prioritises alerts so analysts only see what matters.

---

## Pipeline Design

The system has three core loops:

1. **Inference loop** — real-time scoring of incoming alerts
2. **Feedback loop** — analyst actions feed back as labels
3. **Retraining loop** — model retrains on an elastic window of recent data

### Elastic Data Windows

Unlike a fixed training window (e.g., last 30 days), elastic windows adapt to **fraud velocity**:

\`\`\`python
def get_training_window(fraud_rate: float) -> int:
    """Return window size in days based on current fraud rate."""
    if fraud_rate > 0.05:   # High fraud period
        return 7
    elif fraud_rate > 0.02:
        return 21
    else:                   # Low fraud, need more history
        return 60
\`\`\`

This keeps the model sensitive to emerging fraud patterns without overfitting to noise.

---

## Feature Engineering

Key features that drove performance:

| Feature | Type | Description |
|---|---|---|
| amount_zscore | Numerical | Z-score of txn amount per merchant |
| time_since_last_txn | Numerical | Seconds since previous transaction |
| device_fingerprint_match | Binary | Known device vs new device |
| merchant_risk_score | Numerical | Rolling fraud rate per merchant |
| velocity_1h | Numerical | # of txns in last hour for this card |

---

## Model: XGBoost with Calibrated Probabilities

\`\`\`python
from xgboost import XGBClassifier
from sklearn.calibration import CalibratedClassifierCV

base_model = XGBClassifier(
    n_estimators=400,
    max_depth=6,
    learning_rate=0.05,
    scale_pos_weight=20,  # Class imbalance
    tree_method="hist",
)

model = CalibratedClassifierCV(base_model, cv=3, method="isotonic")
model.fit(X_train, y_train)
\`\`\`

Calibrated probabilities are critical here — analysts need to trust the score, not just the binary prediction.

---

## Results

- **Precision@top-5%**: 78% (vs 34% baseline)
- **Alert queue reduction**: ~65%
- **Model staleness**: retraining triggered automatically when AUC drops below threshold

The elastic window approach was the single biggest performance gain — adapting to fraud seasonality made a measurable difference.
`,
  },
  {
    slug: "apache-nifi-data-archiving",
    title: "Enterprise Data Archiving with Apache NiFi, Tika, Solr & Ozone",
    excerpt:
      "A deep dive into the unstructured data archiving pipeline I built — covering content extraction with Tika, full-text indexing with Solr, and S3-compatible storage with Apache Ozone.",
    date: "2026-01-10",
    readTime: 7,
    tags: ["Apache NiFi", "Data Engineering", "Solr", "Big Data"],
    category: "Data Engineering",
    coverIcon: "fa-solid fa-database",
    coverGradient: "from-accent-violet to-accent-pink",
    content: `
## Why This Stack?

Most enterprise archiving tools are either too rigid (proprietary formats) or too loose (dump-and-forget cold storage). The goal was a pipeline that could:

- **Ingest** any document format (PDF, DOCX, emails, images)
- **Extract** structured content for search
- **Index** everything for full-text retrieval
- **Store** long-term with lifecycle policies

---

## The Pipeline

\`\`\`
Files / APIs / Databases
        │
        ▼
   Apache NiFi
   (Orchestration & routing)
        │
        ├──► Apache Tika
        │    (Content extraction)
        │
        ├──► Apache Solr
        │    (Full-text index)
        │
        └──► Apache Ozone
             (S3-compatible storage)
\`\`\`

---

## Apache NiFi — The Orchestrator

NiFi's visual dataflow makes it ideal for this kind of multi-sink pipeline. Key processors used:

- **GetSFTP / ListS3** — source connectors
- **RouteOnAttribute** — route by MIME type
- **InvokeHTTP** — call Tika REST API
- **PutSolrRecord** — index into Solr
- **PutOzoneObject** — store in Ozone

One underappreciated NiFi feature: **back-pressure**. When Solr is slow, NiFi automatically throttles ingestion rather than dropping records.

---

## Content Extraction with Tika

Apache Tika handles 1,400+ file formats. Running it as a server:

\`\`\`bash
java -jar tika-server-standard-2.9.0.jar --port 9998
\`\`\`

Extract text and metadata via REST:

\`\`\`python
import requests

def extract(file_path: str) -> dict:
    with open(file_path, "rb") as f:
        meta = requests.put(
            "http://localhost:9998/meta/form",
            files={"upload": f},
        ).json()
        
    with open(file_path, "rb") as f:
        text = requests.put(
            "http://localhost:9998/tika",
            data=f,
            headers={"Accept": "text/plain"},
        ).text

    return {"metadata": meta, "content": text}
\`\`\`

---

## Solr Schema Design

For archiving, a flat schema with dynamic fields works well:

\`\`\`xml
<field name="id" type="string" indexed="true" stored="true" required="true"/>
<field name="content" type="text_general" indexed="true" stored="false"/>
<field name="title" type="string" indexed="true" stored="true"/>
<field name="created_at" type="pdate" indexed="true" stored="true"/>
<field name="file_type" type="string" indexed="true" stored="true"/>
<dynamicField name="meta_*" type="string" indexed="true" stored="true"/>
\`\`\`

The \`content\` field is indexed but not stored — this saves significant disk space since the original file lives in Ozone.

---

## Ozone for Long-Term Storage

Apache Ozone is HDFS's successor — an object store with an S3-compatible API. Lifecycle rules automatically transition objects to cheaper storage tiers after 90 days:

\`\`\`bash
ozone sh bucket setlifecycle /vol/archive-bucket \\
  --lifecycle '{"Rules":[{"Status":"Enabled","Transitions":[{"Days":90,"StorageClass":"GLACIER"}]}]}'
\`\`\`

---

## Lessons Learned

1. **Tika memory usage** spikes on large PDFs — run it in a container with memory limits.
2. **Solr commit intervals** — don't auto-commit per document; batch commits every 30s instead.
3. **NiFi provenance** is invaluable for debugging — turn it on even in prod.
`,
  },
  {
    slug: "next-js-portfolio-build",
    title: "Building My Portfolio with Next.js 16, Tailwind v4 & Framer Motion",
    excerpt:
      "A behind-the-scenes look at the design decisions, performance optimisations, and animation techniques used to build this very site.",
    date: "2025-12-20",
    readTime: 5,
    tags: ["Next.js", "React", "Tailwind CSS", "Web Dev"],
    category: "Web Development",
    coverIcon: "fa-brands fa-react",
    coverGradient: "from-accent-cyan to-accent-indigo",
    content: `
## Why Next.js 16?

Next.js 16 ships with React 19 and the App Router as the default. The file-system routing, built-in metadata API, and server components make it ideal for a content-heavy portfolio.

---

## Tailwind v4 — A Different Mental Model

Tailwind v4 drops the \`tailwind.config.js\` file. Configuration moves into \`globals.css\` using \`@theme\`:

\`\`\`css
@import "tailwindcss";

@theme inline {
  --color-accent-indigo: #6366f1;
  --color-accent-cyan: #06b6d4;
  --font-display: "Space Grotesk", sans-serif;
}
\`\`\`

These become CSS variables *and* Tailwind utilities automatically. So \`bg-accent-indigo\` just works.

---

## Framer Motion Patterns

### Reveal on Scroll

\`\`\`tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
\`\`\`

### Staggered Children

\`\`\`tsx
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.li key={i} variants={item}>{i}</motion.li>
  ))}
</motion.ul>
\`\`\`

---

## Performance Notes

- All heavy components use \`"use client"\` only where needed — server components handle static markup.
- Images served from \`/public\` — no external image domains needed.
- Font loading via \`next/font/google\` with \`display: swap\` to avoid layout shift.

---

## What I'd Do Differently

1. **MDX for blog posts** — richer than plain markdown, composable React components inline.
2. **View Transitions API** — browser-native page transitions instead of Framer Motion for route changes.
3. **Incremental Static Regeneration** — for blog posts that update infrequently.

The full source is on [GitHub](https://github.com/sohaib1083).
`,
  },
  {
    slug: "h",
    title: "Hello",
    excerpt: "hello",
    date: "2026-04-08",
    readTime: 5,
    tags: [],
    category: "AI",
    coverIcon: "fa-solid fa-pen-nib",
    coverGradient: "from-accent-indigo to-accent-violet",
    content: `## Introduction

Write your intro here...

---

## Section 1

Content...

---

## Conclusion

Wrap up...
`,
  },
];

// ─── HELPERS ───────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}

export function getAllTags(): string[] {
  return [...new Set(blogPosts.flatMap((p) => p.tags))];
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
