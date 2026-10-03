// ═══════════════════════════════════════════════════
// PROJECTS: production systems + side projects
// Production details come from merged PRs and Sohaib's own write-ups.
// ═══════════════════════════════════════════════════

export interface ProductionSystem {
  id: string;
  name: string;
  org: string;
  line: string;
  details: string[];
  stack: string[];
  code?: string;
  writeup?: string;
  /** tazama-lf repos whose PRs count towards this system's live badge */
  repos?: string[];
}

export const production: ProductionSystem[] = [
  {
    id: "SYS-01",
    name: "BIAR",
    org: "Tazama",
    line: "Business intelligence, analytics and reporting for Tazama's fraud platform.",
    details: [
      "Auth service for the data-lakehouse API",
      "Gold-layer transaction views and entity resolution",
      "Spark and Hudi runtime tuning",
    ],
    stack: ["Spark", "Hudi", "TypeScript", "Lakehouse API"],
    code: "https://github.com/tazama-lf/biar",
    repos: ["biar"],
  },
  {
    id: "SYS-02",
    name: "DEMS",
    org: "Tazama",
    line: "Tazama's dynamic event monitoring service.",
    details: [
      "Raw transaction history persistence",
      "Related-transaction cache",
      "Cache loading on notification",
    ],
    stack: ["Node.js", "TypeScript", "Caching"],
    code: "https://github.com/tazama-lf/event-monitoring-service",
    repos: ["event-monitoring-service"],
  },
  {
    id: "SYS-03",
    name: "Simulation Studio",
    org: "Tazama",
    line: "Tenant-segregated rule simulations inside Tazama Rule Studio.",
    details: [
      "Per-tenant simulation routes",
      "Docker Hub image pipeline for rule templates",
      "Deployable behind any host",
    ],
    stack: ["Docker", "Multi-tenant", "Vite"],
    code: "https://github.com/tazama-lf/rule-studio",
    repos: ["rule-studio", "rule-studio-example", "rule-studio-devtestops", "connection-studio"],
  },
  {
    id: "SYS-04",
    name: "Case Management hardening",
    org: "Tazama",
    line: "Security hardening for Tazama's case and investigation management system.",
    details: [
      "Browser hardening headers via helmet",
      "Cookie flags and CORS allowlist driven by environment",
      "Fail-fast checks on missing config",
    ],
    stack: ["Node.js", "Security", "CouchDB"],
    code: "https://github.com/tazama-lf/case-management-system",
    repos: ["case-management-system"],
  },
  {
    id: "SYS-05",
    name: "ILF for ABL",
    org: "Paysys Labs",
    line: "Interledger enablement for ABL: banking microservices on Rafiki for cross-currency payments.",
    details: [
      "Wallet creation, payments and reversals",
      "AML/CFT screening on every transfer",
      "Containerised local environment",
    ],
    stack: ["Rafiki", "Express", "Next.js", "PostgreSQL"],
    code: "https://github.com/sohaib1083/ILF-PROJECT",
  },
  {
    id: "SYS-06",
    name: "Fraud Alert Triage",
    org: "Paysys Labs",
    line: "ML pipeline that prioritises and classifies high-volume fraud alerts.",
    details: ["Retrains on elastic data windows", "Continuous feedback loop from analysts"],
    stack: ["Python", "XGBoost", "FastAPI"],
    writeup: "/blog/fraud-detection-ml-pipeline",
  },
  {
    id: "SYS-07",
    name: "Data Archiving Pipeline",
    org: "Paysys Labs",
    line: "Archiving for structured and unstructured data, searchable and stored for the long term.",
    details: ["Content extraction with Tika", "Full-text search on Solr", "S3-compatible storage on Ozone"],
    stack: ["Apache NiFi", "Tika", "Solr", "Ozone"],
    writeup: "/blog/apache-nifi-data-archiving",
  },
  {
    id: "SYS-08",
    name: "Agentic RL framework",
    org: "Preference Model",
    line: "RL agents on frozen LLMs that curate high-quality offline datasets.",
    details: ["Teaching pipeline for LLM strategies", "Automated judge for evaluation"],
    stack: ["Python", "Anthropic API", "RL"],
    writeup: "/blog/rl-agents-frozen-llms",
  },
];

// ─── Side projects (from GitHub READMEs) ───────────

export interface SideProject {
  name: string;
  repo: string;
  line: string;
  stack: string[];
  year: number;
  category: string;
  homepage: string | null;
  featured: boolean;
}

export const sideProjects: SideProject[] = [
  {
    "name": "TaskPilot.ai",
    "repo": "https://github.com/sohaib1083-paysys/Taskpilot.ai",
    "line": "Turns a plain-English task into a GitHub issue, plan, code and pull request through human-approved LLM agents.",
    "stack": [
      "FastAPI",
      "Next.js",
      "Groq",
      "E2B"
    ],
    "year": 2026,
    "category": "AI agents",
    "homepage": null,
    "featured": true
  },
  {
    "name": "AI Property Closer",
    "repo": "https://github.com/sohaib1083/AI-property-automation",
    "line": "WhatsApp real estate agent that chats with leads in Roman Urdu, matches properties and scores buyer intent.",
    "stack": [
      "Next.js",
      "whatsapp-web.js",
      "Groq",
      "MongoDB"
    ],
    "year": 2026,
    "category": "AI agents",
    "homepage": null,
    "featured": true
  },
  {
    "name": "Business Flow",
    "repo": "https://github.com/sohaib1083/Business-flow",
    "line": "Conversational analytics app where non-technical users ask data questions in plain English and get tables or charts.",
    "stack": [
      "Next.js",
      "Groq",
      "DuckDB",
      "Firebase"
    ],
    "year": 2026,
    "category": "AI agents",
    "homepage": "https://business-flow-demo-sohaib.vercel.app",
    "featured": true
  },
  {
    "name": "Mpay AI Integration Agent",
    "repo": "https://github.com/sohaib1083/MPAY-AI-INTEGRATION",
    "line": "CLI agent that turns plain-English API descriptions into validated SQL integration configs for the Mpay payment platform.",
    "stack": [
      "Python",
      "Groq",
      "MySQL",
      "Docker"
    ],
    "year": 2026,
    "category": "Fintech",
    "homepage": null,
    "featured": true
  },
  {
    "name": "WhatsApp Ticketing Agent",
    "repo": "https://github.com/sohaib1083/whatsapp-ticketing-agent",
    "line": "WhatsApp bot that turns customer messages and Urdu voice notes into structured support tickets using Groq LLaMA and Whisper.",
    "stack": [
      "Flask",
      "whatsapp-web.js",
      "Groq",
      "MongoDB"
    ],
    "year": 2026,
    "category": "AI agents",
    "homepage": null,
    "featured": true
  },
  {
    "name": "DevOps Risk Analyzer",
    "repo": "https://github.com/sohaib1083/DevOps-risk-analyzer-agent",
    "line": "CLI that scans IaC, CI/CD, Kubernetes, Docker and secrets for risky misconfigurations and scores the findings.",
    "stack": [
      "Python",
      "Typer",
      "Pydantic",
      "python-hcl2"
    ],
    "year": 2026,
    "category": "DevOps & tooling",
    "homepage": null,
    "featured": true
  },
  {
    "name": "Skin Cancer Detection",
    "repo": "https://github.com/sohaib1083/skin-cancer-detection",
    "line": "Classifies skin lesion images with a fine-tuned Vision Transformer and adds LLM-generated guidance through a FastAPI web app.",
    "stack": [
      "FastAPI",
      "PyTorch",
      "ViT",
      "Groq"
    ],
    "year": 2026,
    "category": "Machine learning",
    "homepage": null,
    "featured": true
  },
  {
    "name": "GitSwipe",
    "repo": "https://github.com/sohaib1083/GitSwipe",
    "line": "Mobile app for triaging GitHub issues with swipeable cards, filters, analytics and AI-generated issue summaries.",
    "stack": [
      "React Native",
      "Expo",
      "Firebase",
      "Groq"
    ],
    "year": 2026,
    "category": "Web apps",
    "homepage": null,
    "featured": true
  },
  {
    "name": "LexiBot",
    "repo": "https://github.com/sohaib1083/LexiBot",
    "line": "Bilingual English and Urdu legal assistant that answers questions on Pakistani law and on uploaded documents.",
    "stack": [
      "Next.js",
      "LangChain",
      "Groq"
    ],
    "year": 2025,
    "category": "AI agents",
    "homepage": null,
    "featured": true
  },
  {
    "name": "Mpay MCP Config Server",
    "repo": "https://github.com/sohaib1083/MPAY-MCP-MSSDB",
    "line": "MCP server and web UI that generate and validate Mpay API configuration SQL with an LLM.",
    "stack": [
      "Node.js",
      "MCP SDK",
      "Groq",
      "SQL Server"
    ],
    "year": 2026,
    "category": "Fintech",
    "homepage": null,
    "featured": false
  },
  {
    "name": "YouTube Automation Pipeline",
    "repo": "https://github.com/sohaib1083/yt-automation",
    "line": "Pipeline that turns a topic into a scripted, narrated video and uploads it to YouTube.",
    "stack": [
      "Python",
      "Gemini",
      "MoviePy",
      "YouTube Data API"
    ],
    "year": 2026,
    "category": "AI agents",
    "homepage": null,
    "featured": false
  },
  {
    "name": "Voice Assessment Agent",
    "repo": "https://github.com/sohaib1083/Calling-agent-ASR-pipeline",
    "line": "Real-time voice agent that holds spoken English assessment conversations over WebSockets.",
    "stack": [
      "FastAPI",
      "WebSockets",
      "Groq",
      "gTTS"
    ],
    "year": 2026,
    "category": "AI agents",
    "homepage": null,
    "featured": false
  },
  {
    "name": "Rabta.ai",
    "repo": "https://github.com/sohaib1083/rabta.ai",
    "line": "Lead management dashboard for property prospects with Twilio outbound calling and call outcome tracking.",
    "stack": [
      "Next.js",
      "MongoDB",
      "Twilio"
    ],
    "year": 2026,
    "category": "Web apps",
    "homepage": "https://rabta-ai.vercel.app",
    "featured": false
  },
  {
    "name": "Zameen Ads Booster",
    "repo": "https://github.com/sohaib1083/Zameen-ads-booster-automated",
    "line": "Browser automation that logs into Zameen Profolio and boosts every property listing across all pages.",
    "stack": [
      "Python",
      "Playwright"
    ],
    "year": 2026,
    "category": "DevOps & tooling",
    "homepage": null,
    "featured": false
  },
  {
    "name": "BIAR Document Processor",
    "repo": "https://github.com/sohaib1083-paysys/BIAR-unstr",
    "line": "Pipeline that extracts text from CouchDB documents with Tika, indexes it in Solr and forwards it to NiFi.",
    "stack": [
      "TypeScript",
      "Apache Tika",
      "Solr",
      "NiFi"
    ],
    "year": 2025,
    "category": "DevOps & tooling",
    "homepage": null,
    "featured": false
  },
  {
    "name": "ATM Priority Prediction API",
    "repo": "https://github.com/sohaib1083-paysys/ATM-AI-API",
    "line": "Dockerized API that predicts ATM transaction priority with confidence scores from a stacking ensemble model.",
    "stack": [
      "FastAPI",
      "scikit-learn",
      "Docker"
    ],
    "year": 2025,
    "category": "Fintech",
    "homepage": null,
    "featured": false
  },
  {
    "name": "CampusConnect",
    "repo": "https://github.com/sohaib1083/CampusConnect",
    "line": "Mobile campus assistant that answers university questions using a RAG knowledge base and Groq LLaMA.",
    "stack": [
      "React Native",
      "Expo",
      "Firebase",
      "Groq"
    ],
    "year": 2025,
    "category": "AI agents",
    "homepage": null,
    "featured": false
  },
  {
    "name": "Intellact",
    "repo": "https://github.com/sohaib1083/Intellact",
    "line": "Mobile learning app with courses and enrollments, plus a Next.js admin portal for managing content and users.",
    "stack": [
      "React Native",
      "Expo",
      "Firebase",
      "Next.js"
    ],
    "year": 2025,
    "category": "Web apps",
    "homepage": "https://intellact.vercel.app",
    "featured": false
  },
  {
    "name": "RL Paper Review Task",
    "repo": "https://github.com/sohaib1083/RL-Paper-Review",
    "line": "Reinforcement learning task that has an LLM peer-review generated papers and grades its critique.",
    "stack": [
      "Python",
      "Anthropic API"
    ],
    "year": 2025,
    "category": "Machine learning",
    "homepage": null,
    "featured": false
  },
  {
    "name": "AgentPortal",
    "repo": "https://github.com/sohaib1083/AgentPortal",
    "line": "Admin and agent portal for managing sales agents, recording sales and splitting commissions.",
    "stack": [
      "Next.js",
      "MongoDB",
      "JWT"
    ],
    "year": 2025,
    "category": "Web apps",
    "homepage": null,
    "featured": false
  },
  {
    "name": "EstateFlow",
    "repo": "https://github.com/sohaib1083/EstateFlow",
    "line": "Property management dashboard for owners, tenants, brokers, rent agreements and payments.",
    "stack": [
      "Next.js",
      "Supabase",
      "PostgreSQL"
    ],
    "year": 2025,
    "category": "Web apps",
    "homepage": "https://estate-flow-flame.vercel.app",
    "featured": false
  },
  {
    "name": "Tabarukh Stock Management",
    "repo": "https://github.com/sohaib1083/Tabarukh-stock-management",
    "line": "Inventory and sales management dashboard with admin login and PDF invoice generation.",
    "stack": [
      "Next.js",
      "MongoDB",
      "NextAuth",
      "React-PDF"
    ],
    "year": 2025,
    "category": "Web apps",
    "homepage": null,
    "featured": false
  },
  {
    "name": "AI Backend Test Automator",
    "repo": "https://github.com/sohaib1083/AI-Backend-Automator",
    "line": "GitHub Actions workflow that uses an LLM to write pytest tests for Flask routes and publish coverage reports.",
    "stack": [
      "Python",
      "Flask",
      "pytest",
      "GitHub Actions"
    ],
    "year": 2025,
    "category": "DevOps & tooling",
    "homepage": null,
    "featured": false
  },
  {
    "name": "Playwright Test Suite",
    "repo": "https://github.com/sohaib1083/Playwright-mcp-test-agent",
    "line": "End-to-end Playwright tests covering login, agent management and sales flows of the Agent Portal app.",
    "stack": [
      "Playwright",
      "JavaScript"
    ],
    "year": 2025,
    "category": "DevOps & tooling",
    "homepage": null,
    "featured": false
  },
  {
    "name": "Hate Speech Detector",
    "repo": "https://github.com/sohaib1083/Hate-Speech-Detector",
    "line": "Fine-tunes BERT to classify tweets as hate speech, offensive or neither.",
    "stack": [
      "TensorFlow",
      "Hugging Face Transformers",
      "BERT"
    ],
    "year": 2024,
    "category": "Machine learning",
    "homepage": null,
    "featured": false
  },
  {
    "name": "Digit Classifier",
    "repo": "https://github.com/sohaib1083/Digit-Classifier",
    "line": "Draw digits in a Pygame window and get predictions from a NumPy neural network built from scratch on MNIST.",
    "stack": [
      "Python",
      "NumPy",
      "Pygame"
    ],
    "year": 2024,
    "category": "Machine learning",
    "homepage": null,
    "featured": false
  }
];
