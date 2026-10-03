// ═══════════════════════════════════════════════════
// PROFILE: single source of truth for links & copy
// ═══════════════════════════════════════════════════

export const profile = {
  name: "Sohaib Shamsi",
  role: "Software Engineer",
  location: "Karachi, Pakistan",
  email: "sohaib1083@gmail.com",
  site: "https://sohaib1083.tech",
};

export const links = {
  youtube: "https://www.youtube.com/@SohaibShamsi.s",
  medium: "https://medium.com/@sohaib1083",
  linkedin: "https://www.linkedin.com/in/sohaib1083",
  github: "https://github.com/sohaib1083",
  githubWork: "https://github.com/sohaib1083-paysys",
};

export const handles = {
  youtubeChannelId: "UCHmhUQ4fJ-KQqtLe4EK175w",
  medium: "sohaib1083",
  githubWork: "sohaib1083-paysys",
};

// ─── The loop: how I take a problem end to end ─────

export const lifecycle = [
  { step: "Requirements", line: "Sit with the client. Ask the questions nobody asked." },
  { step: "Analysis", line: "Map the data, the edge cases and the constraints." },
  { step: "Business case", line: "Make sure it's worth building before building it." },
  { step: "Build", line: "Clean, readable code, with Claude as my pair." },
  { step: "Test", line: "Unit, integration, load. Then the weird inputs." },
  { step: "Pen-test", line: "Break it before someone else does." },
  { step: "Deliver", line: "Hand it to the client myself and stay for the questions." },
];

// ─── Career snapshot (LinkedIn preview) ────────────

export const career = [
  { when: "2024 – now", what: "Software Engineer", where: "Paysys Labs", current: true },
  { when: "2024 – 25", what: "AI/ML Engineer", where: "Preference Model", current: false },
  { when: "2021 – 25", what: "BS CS, Teaching Assistant", where: "FAST NUCES", current: false },
];

// ─── Work: systems shipped + open source ───────────

export const systems = [
  {
    id: "SYS-01",
    name: "BIAR",
    line: "Business intelligence, analytics and reporting for Tazama.",
    stack: "Spark · Hudi · Lakehouse API",
    href: "https://github.com/tazama-lf/biar",
  },
  {
    id: "SYS-02",
    name: "DEMS",
    line: "Tazama's dynamic event monitoring service.",
    stack: "Node · Caching · Events",
    href: "https://github.com/tazama-lf/event-monitoring-service",
  },
  {
    id: "SYS-03",
    name: "Simulation Studio",
    line: "Tenant-segregated rule simulations in Tazama Rule Studio.",
    stack: "Docker · Multi-tenant",
    href: "https://github.com/tazama-lf/rule-studio",
  },
  {
    id: "SYS-04",
    name: "ILF for ABL",
    line: "Interledger enablement for ABL: cross-currency payments.",
    stack: "Interledger · Microservices",
    href: "https://github.com/sohaib1083/ILF-PROJECT",
  },
];

export const openSource = [
  {
    name: "Tazama",
    line: "Real-time fraud and AML transaction monitoring.",
    href: "https://github.com/tazama-lf",
  },
  {
    name: "Mojaloop",
    line: "Open-source rails for interoperable instant payments.",
    href: "https://github.com/mojaloop",
  },
  {
    name: "ILF",
    line: "Cross-currency payments over the Interledger Protocol.",
    href: "https://github.com/interledger",
  },
];

// ─── The live diagram: a payment through the systems I build and harden ───

export const flow = [
  { node: "TXN", caption: "payment in" },
  { node: "DEMS", caption: "event monitoring" },
  { node: "RULES", caption: "simulated in Rule Studio" },
  { node: "CASE", caption: "case mgmt, hardened" },
  { node: "BIAR", caption: "analytics & reporting" },
];
