"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import TypingEffect from "@/components/TypingEffect";
import StatCounter from "@/components/StatCounter";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import {
  projects,
  timeline,
  skillGroups,
  orbitRing1,
  orbitRing2,
} from "@/data/portfolio";
import { useState } from "react";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), {
  ssr: false,
});

// ─── SECTION HEADER ─────────────────────────────────
function SectionHeader({
  tag,
  tagIcon,
  title,
  highlight,
  subtitle,
}: {
  tag: string;
  tagIcon: string;
  title: string;
  highlight: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="text-center mb-16">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-accent-cyan mb-5">
        <i className={`${tagIcon} text-[0.7rem]`} />
        {tag}
      </span>
      <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
        {title} <span className="gradient-text">{highlight}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-text-secondary max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

// ─── PROJECT CARD ───────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.05}>
      <div className="glass-card p-8 flex flex-col h-full transition-all duration-400 hover:border-accent-indigo hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(99,102,241,0.1)] group">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="w-13 h-13 rounded-[14px] bg-linear-to-br from-accent-indigo to-accent-cyan flex items-center justify-center text-xl text-white">
            <i className={project.icon} />
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-[10px] border border-border text-text-muted flex items-center justify-center text-base transition-all hover:border-accent-indigo hover:text-accent-indigo"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github" />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold mb-3 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-grow">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-accent-indigo/8 text-accent-cyan text-[0.7rem] font-semibold font-mono"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <div className="flex flex-col gap-2 pt-4 border-t border-border">
          {project.highlights.map((h) => (
            <div
              key={h}
              className="flex items-center gap-2 text-xs text-text-secondary"
            >
              <i className="fa-solid fa-check text-accent-green text-[0.65rem]" />
              {h}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────
export default function HomePage() {
  const [filter, setFilter] = useState("all");
  const filters = [
    { key: "all", label: "All" },
    { key: "ai", label: "AI / ML" },
    { key: "fullstack", label: "Full-Stack" },
    { key: "data", label: "Data Engineering" },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category.includes(filter));

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 md:px-10 pt-[120px] pb-20 overflow-hidden">
        <ParticleCanvas />

        <div className="relative z-10 max-w-3xl text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-xs font-medium text-text-secondary mb-7 opacity-0"
            style={{ animation: "fade-in-up 0.8s 0.2s forwards" }}
          >
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse-dot" />
            Available for opportunities
          </div>

          {/* Title */}
          <h1
            className="font-display mb-6 opacity-0"
            style={{ animation: "fade-in-up 0.8s 0.4s forwards" }}
          >
            <span className="block text-base md:text-lg text-text-secondary font-normal mb-2">
              Hi, I&apos;m
            </span>
            <span className="relative inline-block">
              <span className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-linear-to-br from-white via-gray-300 to-accent-cyan bg-clip-text text-transparent leading-tight">
                Sohaib Shamsi
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 opacity-60"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8"
                  stroke="url(#grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="grad">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Typing */}
          <div
            className="text-lg md:text-2xl font-medium mb-5 min-h-[40px] flex justify-center opacity-0"
            style={{ animation: "fade-in-up 0.8s 0.6s forwards" }}
          >
            <TypingEffect />
          </div>

          {/* Description */}
          <p
            className="text-base text-text-secondary max-w-xl mx-auto mb-9 leading-relaxed opacity-0"
            style={{ animation: "fade-in-up 0.8s 0.8s forwards" }}
          >
            Full-Stack Engineer &amp; AI/ML Specialist crafting intelligent
            systems that bridge cutting-edge research with production-grade
            software.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 opacity-0"
            style={{ animation: "fade-in-up 0.8s 1.0s forwards" }}
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-linear-to-r from-accent-indigo to-accent-cyan text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all"
            >
              View My Work <i className="fa-solid fa-arrow-right" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm glass text-text-primary hover:border-accent-indigo hover:bg-accent-indigo/8 hover:-translate-y-0.5 transition-all"
            >
              Get In Touch
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex items-center justify-center gap-8 md:gap-12 opacity-0"
            style={{ animation: "fade-in-up 0.8s 1.2s forwards" }}
          >
            <StatCounter target={12} label="Projects Built" />
            <div className="w-px h-10 bg-border" />
            <StatCounter target={5} label="AI/ML Models" />
            <div className="w-px h-10 bg-border" />
            <StatCounter target={3} label="Years Coding" />
          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted text-[0.65rem] tracking-widest uppercase animate-float">
          <div className="w-6 h-9 rounded-xl border-2 border-border-hover flex items-start justify-center pt-1.5">
            <div className="w-[3px] h-2 bg-accent-indigo rounded animate-scroll-down" />
          </div>
          Scroll Down
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            tag="About Me"
            tagIcon="fa-solid fa-user"
            title="Turning Complex Problems Into"
            highlight="Elegant Solutions"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-16 items-start">
            {/* Image */}
            <Reveal className="mx-auto lg:mx-0">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] w-full max-w-[350px]">
                <Image
                  src="/assets/image copy.png"
                  alt="Sohaib Shamsi"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="350px"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl border border-border pointer-events-none" />
              </div>
              <div className="flex justify-center gap-3 mt-5">
                {[
                  { href: "https://github.com/sohaib1083", icon: "fa-brands fa-github" },
                  { href: "https://linkedin.com/in/sohaib1083", icon: "fa-brands fa-linkedin-in" },
                  { href: "mailto:sohaib1083@gmail.com", icon: "fa-solid fa-envelope" },
                ].map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-border text-text-secondary flex items-center justify-center text-lg transition-all hover:border-accent-indigo hover:text-accent-indigo hover:bg-accent-indigo/8 hover:-translate-y-0.5"
                    aria-label="Social"
                  >
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Content */}
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed mb-4">
                I&apos;m a <strong className="text-text-primary">Computer Science graduate from FAST NUCES, Karachi</strong>, with a deep focus on{" "}
                <strong className="text-text-primary">Artificial Intelligence, Machine Learning, and Full-Stack Engineering</strong>.
              </p>
              <p className="text-text-secondary mb-4">
                I specialize in designing and deploying end-to-end AI pipelines—from data ingestion and model training to production APIs and scalable infrastructure. My work spans fraud detection systems, NLP engines, recommendation algorithms, reinforcement learning environments, and distributed data architectures.
              </p>
              <p className="text-text-secondary mb-8">
                Beyond code, I mentor aspiring AI engineers, compete in programming contests (IEEE Xtreme — Top 10 nationally), and regularly publish technical content on system design and ML engineering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: "fa-solid fa-brain", title: "AI/ML Engineering", desc: "End-to-end ML pipelines, model deployment, MLOps" },
                  { icon: "fa-solid fa-code", title: "Full-Stack Dev", desc: "React, Node.js, Python, REST APIs, databases" },
                  { icon: "fa-solid fa-server", title: "Data Engineering", desc: "Apache NiFi, Solr, Ozone, distributed systems" },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="glass p-5 rounded-xl transition-all hover:border-accent-indigo hover:bg-accent-indigo/4 hover:-translate-y-1"
                  >
                    <div className="w-11 h-11 rounded-xl bg-linear-to-br from-accent-indigo to-accent-cyan flex items-center justify-center text-white text-lg mb-3">
                      <i className={c.icon} />
                    </div>
                    <h4 className="text-sm font-semibold mb-1">{c.title}</h4>
                    <p className="text-xs text-text-muted leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ SKILLS ═══════ */}
      <section id="skills" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            tag="Skills"
            tagIcon="fa-solid fa-code"
            title="My"
            highlight="Tech Arsenal"
            subtitle="Technologies and tools I use to bring ideas to life"
          />

          {/* Orbit (desktop only) */}
          <Reveal className="hidden md:flex max-w-[500px] mx-auto aspect-square relative items-center justify-center mb-16">
            {/* Center */}
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-accent-indigo to-accent-cyan flex items-center justify-center text-center text-sm font-bold text-white z-10 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
              Core<br />Stack
            </div>

            {/* Ring 1 */}
            <div className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-border animate-spin-slow">
              {orbitRing1.map((item, i) => (
                <div
                  key={item.label}
                  className={`orbit-pos-1-${i + 1} absolute w-12 h-12 rounded-[14px] bg-bg-card border border-border flex items-center justify-center text-xl text-accent-cyan animate-orbit-counter hover:border-accent-indigo hover:bg-accent-indigo/10 hover:scale-110 transition-all cursor-default`}
                  title={item.label}
                >
                  <i className={item.icon} />
                </div>
              ))}
            </div>

            {/* Ring 2 */}
            <div className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-border animate-spin-slower">
              {orbitRing2.map((item, i) => (
                <div
                  key={item.label}
                  className={`orbit-pos-2-${i + 1} absolute w-12 h-12 rounded-[14px] bg-bg-card border border-border flex items-center justify-center text-xl text-accent-cyan hover:border-accent-indigo hover:bg-accent-indigo/10 hover:scale-110 transition-all cursor-default`}
                  style={{ animation: "orbit-counter-rotate 45s linear infinite reverse" }}
                  title={item.label}
                >
                  <i className={item.icon} />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((group, idx) => (
              <Reveal key={group.title} delay={idx * 0.1}>
                <div className="glass p-8 rounded-2xl transition-all hover:border-border-hover hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-5">
                    <i className={`${group.icon} text-xl text-accent-indigo`} />
                    <h3 className="font-display text-base font-bold">
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 rounded-lg border border-border bg-white/[0.02] text-xs font-medium text-text-secondary transition-all hover:border-accent-indigo hover:text-accent-indigo hover:bg-accent-indigo/6 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROJECTS ═══════ */}
      <section id="projects" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            tag="Projects"
            tagIcon="fa-solid fa-rocket"
            title="What I've"
            highlight="Built"
            subtitle="A selection of projects that showcase my expertise in AI, ML, and full-stack development"
          />

          {/* Filters */}
          <Reveal className="flex items-center justify-center gap-3 mb-12 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-6 py-2 rounded-full text-sm font-medium border transition-all ${
                  filter === f.key
                    ? "bg-linear-to-r from-accent-indigo to-accent-cyan text-white border-transparent"
                    : "border-border text-text-secondary hover:text-white hover:bg-linear-to-r hover:from-accent-indigo hover:to-accent-cyan hover:border-transparent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </Reveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

          {/* CTA */}
          <Reveal className="text-center mt-12">
            <a
              href="https://github.com/sohaib1083"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm glass text-text-primary hover:border-accent-indigo hover:bg-accent-indigo/8 hover:-translate-y-0.5 transition-all"
            >
              <i className="fa-brands fa-github" />
              See More on GitHub
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══════ EXPERIENCE ═══════ */}
      <section id="experience" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            tag="Experience"
            tagIcon="fa-solid fa-trophy"
            title="Career &"
            highlight="Achievements"
          />

          <div className="max-w-3xl mx-auto relative pl-10">
            {/* Vertical line */}
            <div className="absolute left-[14px] top-0 bottom-0 w-[2px] bg-linear-to-b from-accent-indigo via-accent-cyan to-transparent rounded" />

            {timeline.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.1}>
                <div className="relative pb-12 last:pb-0">
                  {/* Marker */}
                  <div className="absolute -left-10 top-1 w-[30px] h-[30px] rounded-full bg-bg-primary border-2 border-accent-indigo flex items-center justify-center text-[0.65rem] text-accent-indigo z-10">
                    <i className={item.icon} />
                  </div>

                  {/* Content */}
                  <div className="glass p-6 rounded-xl transition-all hover:border-border-hover hover:translate-x-2">
                    <div className="text-xs font-semibold text-accent-cyan font-mono mb-1.5">
                      {item.date}
                    </div>
                    <h3 className="font-display text-base font-bold mb-1">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs text-text-muted mb-2">{item.subtitle}</p>
                    )}
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                    {item.bullets && (
                      <ul className="mt-3 space-y-1.5">
                        {item.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-text-secondary">
                            <i className="fa-solid fa-chevron-right text-accent-indigo text-[0.5rem] mt-1.5 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            tag="Contact"
            tagIcon="fa-solid fa-paper-plane"
            title="Let's Build Something"
            highlight="Amazing"
            subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <Reveal className="flex flex-col gap-6">
              {[
                { icon: "fa-solid fa-envelope", label: "Email", value: "sohaib1083@gmail.com", href: "mailto:sohaib1083@gmail.com" },
                { icon: "fa-solid fa-phone", label: "Phone", value: "+92 333 022 0803", href: "tel:+923330220803" },
                { icon: "fa-solid fa-location-dot", label: "Location", value: "Karachi, Pakistan" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass flex items-center gap-5 p-5 rounded-xl transition-all hover:border-border-hover hover:translate-x-2"
                >
                  <div className="w-12 h-12 rounded-[14px] bg-linear-to-br from-accent-indigo to-accent-cyan flex items-center justify-center text-lg text-white flex-shrink-0">
                    <i className={item.icon} />
                  </div>
                  <div>
                    <h4 className="text-xs text-text-muted font-medium">{item.label}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-text-primary hover:text-accent-indigo transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-text-primary">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Socials */}
              <div className="flex gap-3 pt-2">
                {[
                  { href: "https://github.com/sohaib1083", icon: "fa-brands fa-github" },
                  { href: "https://linkedin.com/in/sohaib1083", icon: "fa-brands fa-linkedin-in" },
                  { href: "mailto:sohaib1083@gmail.com", icon: "fa-solid fa-envelope" },
                ].map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="w-13 h-13 rounded-[14px] border border-border text-text-secondary flex items-center justify-center text-xl transition-all hover:border-accent-indigo hover:text-white hover:bg-linear-to-br hover:from-accent-indigo hover:to-accent-cyan hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(99,102,241,0.3)]"
                    aria-label="Social"
                  >
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="py-12 border-t border-border text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
          <div className="font-display text-lg font-bold">
            <span className="text-accent-indigo">&lt;</span>Sohaib Shamsi
            <span className="text-accent-indigo">/&gt;</span>
          </div>
          <p className="text-sm text-text-secondary">
            Crafting intelligent software solutions — one model at a time.
          </p>
          <div className="flex gap-4">
            {[
              { href: "https://github.com/sohaib1083", icon: "fa-brands fa-github" },
              { href: "https://linkedin.com/in/sohaib1083", icon: "fa-brands fa-linkedin-in" },
              { href: "mailto:sohaib1083@gmail.com", icon: "fa-solid fa-envelope" },
            ].map((s) => (
              <a
                key={s.icon}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border text-text-secondary flex items-center justify-center transition-all hover:border-accent-indigo hover:text-accent-indigo"
                aria-label="Social"
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-2">
            &copy; 2026 Sohaib Shamsi. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
