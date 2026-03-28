// ═══════════════════════════════════════════════════
// PORTFOLIO DATA — Projects, Skills, Experience
// ═══════════════════════════════════════════════════

export interface Project {
  title: string;
  description: string;
  icon: string;
  category: string[];
  tech: string[];
  highlights: string[];
  github?: string;
}

export interface TimelineEntry {
  icon: string;
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets?: string[];
}

export interface SkillGroup {
  icon: string;
  title: string;
  tags: string[];
}

// ─── PROJECTS ──────────────────────────────────────

export const projects: Project[] = [
  {
    title: "Fraud Alert Triage & Evaluation Pipeline",
    description:
      "AI-driven alert triage module for fraud risk management at Paysys, enabling automated prioritization and classification of high-volume transaction alerts using a dynamically retraining ML pipeline that adapts to evolving fraud patterns with elastic data windows.",
    icon: "fa-solid fa-shield-halved",
    category: ["ai"],
    tech: ["Python", "XGBoost", "Scikit-learn", "FastAPI", "PostgreSQL", "Docker"],
    highlights: [
      "Dynamic retraining with elastic data windows",
      "Real-time alert classification at scale",
      "Continuous feedback loop integration",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "Enterprise Data Archiving Pipeline",
    description:
      "Engineered a structured and unstructured data archiving pipeline using Apache NiFi, Tika, and Solr for content extraction, indexing, and searchability. Integrated long-term storage with Apache Ozone (S3-compatible) for scalability and durability.",
    icon: "fa-solid fa-database",
    category: ["data"],
    tech: ["Apache NiFi", "Apache Tika", "Apache Solr", "Apache Ozone", "Java", "S3"],
    highlights: [
      "Multi-format content extraction",
      "Full-text search with Solr indexing",
      "S3-compatible lifecycle management",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "Agentic RL Framework for LLM Teaching",
    description:
      "Designed and implemented an agentic AI framework for reinforcement learning tasks using Anthropic models at Preference Model. Built RL agents with frozen language models for inference, developing a teaching pipeline where agents curate high-quality offline datasets.",
    icon: "fa-solid fa-brain",
    category: ["ai"],
    tech: ["Python", "Anthropic API", "PyTorch", "RL", "Transformers", "RLHF"],
    highlights: [
      "Agentic AI framework for RL tasks",
      "Frozen LLM inference pipeline",
      "Automated judge evaluation system",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "Insulin Resistance & ML Analysis",
    description:
      "Applied advanced ML models to public physiological and clinical time-series datasets to study insulin resistance under noisy, non-stationary data conditions. Built robust preprocessing pipelines for biomedical signal analysis.",
    icon: "fa-solid fa-heartbeat",
    category: ["ai"],
    tech: ["Python", "TensorFlow", "Pandas", "SciPy", "Matplotlib", "Jupyter"],
    highlights: [
      "Time-series clinical data modeling",
      "Noise-robust feature engineering",
      "Biomedical signal processing",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "Collaborative Filtering Recommendation System",
    description:
      "Implemented sophisticated recommendation models on user–item interaction datasets (MovieLens-style), analyzing sparsity, cold-start, and scalability trade-offs with matrix factorization and neural collaborative filtering.",
    icon: "fa-solid fa-users",
    category: ["ai"],
    tech: ["Python", "PyTorch", "Surprise", "NumPy", "Pandas", "Flask"],
    highlights: [
      "Matrix factorization & neural CF",
      "Cold-start mitigation strategies",
      "Scalability benchmarking",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "Reinforcement Learning Task Design",
    description:
      "Designed custom RL environments with synthetic and semi-realistic datasets, focusing on reward shaping, evaluation stability, and policy gradient methods for complex sequential decision-making tasks.",
    icon: "fa-solid fa-gamepad",
    category: ["ai"],
    tech: ["Python", "OpenAI Gym", "Stable Baselines3", "PyTorch", "Ray RLlib"],
    highlights: [
      "Custom Gym environment design",
      "Advanced reward shaping",
      "Policy gradient evaluation",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "RAG-Powered Knowledge Engine",
    description:
      "Built a Retrieval-Augmented Generation system combining vector databases with LLMs for context-aware question answering over large document corpora. Features semantic search, chunk optimization, and hallucination reduction.",
    icon: "fa-solid fa-magnifying-glass-chart",
    category: ["ai", "fullstack"],
    tech: ["LangChain", "OpenAI", "Pinecone", "FastAPI", "React", "Docker"],
    highlights: [
      "Semantic vector search",
      "Context-aware response generation",
      "Hallucination guard rails",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "Real-Time Sentiment Analysis Dashboard",
    description:
      "End-to-end NLP pipeline streaming social media data through Kafka, performing real-time sentiment classification with transformer models, and visualizing trends on a live React dashboard with WebSocket updates.",
    icon: "fa-solid fa-chart-line",
    category: ["ai", "fullstack"],
    tech: ["Transformers", "Kafka", "React", "WebSocket", "D3.js", "FastAPI"],
    highlights: [
      "Sub-second streaming inference",
      "Transformer-based classification",
      "Interactive D3.js visualizations",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "AI-Powered Code Review Agent",
    description:
      "Autonomous code review bot using LLMs to analyze pull requests, detect bugs, suggest refactoring, and enforce coding standards. Integrates with GitHub Actions for seamless CI/CD pipeline integration.",
    icon: "fa-solid fa-robot",
    category: ["ai", "fullstack"],
    tech: ["GPT-4", "LangChain", "GitHub API", "Node.js", "TypeScript", "Docker"],
    highlights: [
      "Automated PR analysis",
      "Bug detection & code smell alerts",
      "GitHub Actions integration",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "Distributed ML Training Platform",
    description:
      "Scalable distributed training infrastructure supporting data and model parallelism across GPU clusters. Features automatic hyperparameter tuning, experiment tracking, and one-click model deployment with MLflow.",
    icon: "fa-solid fa-network-wired",
    category: ["ai", "data"],
    tech: ["PyTorch DDP", "Ray", "MLflow", "Kubernetes", "Terraform", "AWS"],
    highlights: [
      "Multi-GPU distributed training",
      "Automated hyperparameter search",
      "One-click model serving",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "Computer Vision Quality Inspector",
    description:
      "Deep learning-based visual inspection system for manufacturing defect detection. Uses custom-trained YOLO and EfficientNet models with real-time inference on edge devices, achieving 98.5% defect detection accuracy.",
    icon: "fa-solid fa-eye",
    category: ["ai"],
    tech: ["YOLOv8", "EfficientNet", "OpenCV", "ONNX", "TensorRT", "FastAPI"],
    highlights: [
      "98.5% detection accuracy",
      "Edge-optimized inference",
      "Real-time video processing",
    ],
    github: "https://github.com/sohaib1083",
  },
  {
    title: "ILF Cross-Currency Payment System",
    description:
      "Led the Interledger Framework (ILF) project at Paysys enabling cross-currency payments using the Interledger Protocol. Built a robust settlement system handling multi-currency transactions with real-time exchange rates.",
    icon: "fa-solid fa-money-bill-transfer",
    category: ["fullstack"],
    tech: ["Node.js", "TypeScript", "Interledger", "PostgreSQL", "Redis", "Docker"],
    highlights: [
      "Cross-currency settlement engine",
      "Interledger Protocol integration",
      "Real-time FX rate handling",
    ],
    github: "https://github.com/sohaib1083",
  },
];

// ─── TIMELINE / EXPERIENCE ─────────────────────────

export const timeline: TimelineEntry[] = [
  {
    icon: "fa-solid fa-robot",
    date: "Nov 2024 — 2025",
    title: "AI/ML Engineer — Preference Model",
    subtitle: "Remote, USA",
    description:
      "Designed and implemented an agentic AI framework for reinforcement learning tasks using Anthropic models.",
    bullets: [
      "Built RL agents with frozen language models for inference, focusing on teaching LLMs effective strategies",
      "Developed an RL-based teaching pipeline where agents curate high-quality offline datasets",
      "Implemented automated judge system for model performance evaluation",
    ],
  },
  {
    icon: "fa-solid fa-shield-halved",
    date: "Jun 2024 — Present",
    title: "Software Engineer & AI — Paysys",
    subtitle: "Karachi, Pakistan",
    description:
      "Working on AI-driven fraud risk management and cross-currency payment systems.",
    bullets: [
      "Built rule engines and AI models for fraud risk management using Tazama's platform",
      "Led ILF (Interledger Framework) project for cross-currency payments with Interledger Protocol",
      "Engineered data archiving pipeline with Apache NiFi, Tika, Solr, and Ozone",
    ],
  },
  {
    icon: "fa-solid fa-graduation-cap",
    date: "2021 — 2025",
    title: "BS Computer Science — FAST NUCES, Karachi",
    description:
      "Relevant Coursework: Machine Learning, Deep Learning, NLP, Computer Vision, Distributed Systems, Data Structures & Algorithms, Database Systems, Operating Systems",
  },
  {
    icon: "fa-solid fa-award",
    date: "Competition",
    title: "IEEE Xtreme Programming Contest",
    description:
      'Achieved Top 10 nationally in the IEEE Xtreme 24-hour competitive programming marathon, demonstrating exceptional problem-solving skills under pressure.',
  },
  {
    icon: "fa-solid fa-chalkboard-user",
    date: "Ongoing",
    title: "AI/ML Mentor & Technical Writer",
    description:
      "Mentored 50+ students in AI and ML fundamentals through online platforms. Regularly publish technical content, system design explanations, and ML engineering guides.",
  },
];

// ─── SKILLS ────────────────────────────────────────

export const skillGroups: SkillGroup[] = [
  {
    icon: "fa-solid fa-robot",
    title: "AI / Machine Learning",
    tags: [
      "PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face", "LangChain",
      "OpenAI API", "Anthropic API", "XGBoost", "NLTK / spaCy", "OpenCV",
      "MLflow", "W&B", "RAG Pipelines", "RLHF",
    ],
  },
  {
    icon: "fa-solid fa-laptop-code",
    title: "Full-Stack Development",
    tags: [
      "React", "Next.js", "Node.js", "Express", "FastAPI", "Flask",
      "TypeScript", "Tailwind CSS", "PostgreSQL", "MongoDB", "Redis", "GraphQL",
    ],
  },
  {
    icon: "fa-solid fa-cloud",
    title: "Data & Cloud Engineering",
    tags: [
      "Apache NiFi", "Apache Solr", "Apache Ozone", "Apache Tika",
      "Apache Kafka", "Docker", "Kubernetes", "AWS", "CI/CD",
      "Terraform", "Airflow", "Spark",
    ],
  },
  {
    icon: "fa-solid fa-wrench",
    title: "Tools & Practices",
    tags: [
      "Git / GitHub", "Linux", "VS Code", "Jupyter", "Agile / Scrum",
      "System Design", "REST APIs", "Microservices", "Testing", "Documentation",
    ],
  },
];

// ─── ORBIT ITEMS (for skill orbit visual) ──────────

export const orbitRing1 = [
  { icon: "fa-brands fa-python", label: "Python" },
  { icon: "fa-brands fa-js", label: "JavaScript" },
  { icon: "fa-brands fa-react", label: "React" },
  { icon: "fa-brands fa-node-js", label: "Node.js" },
];

export const orbitRing2 = [
  { icon: "fa-brands fa-docker", label: "Docker" },
  { icon: "fa-brands fa-aws", label: "AWS" },
  { icon: "fa-brands fa-git-alt", label: "Git" },
  { icon: "fa-brands fa-linux", label: "Linux" },
  { icon: "fa-solid fa-database", label: "Database" },
  { icon: "fa-solid fa-brain", label: "TensorFlow" },
];
