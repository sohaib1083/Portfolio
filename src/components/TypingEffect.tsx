"use client";

import { useEffect, useState, useCallback } from "react";

const phrases = [
  "AI/ML Pipelines",
  "Full-Stack Applications",
  "Distributed Systems",
  "Deep Learning Models",
  "NLP Engines",
  "Recommendation Systems",
  "Computer Vision Solutions",
  "Data Engineering Pipelines",
  "Intelligent Agents",
];

export default function TypingEffect() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      setText(currentPhrase.substring(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);
    } else {
      setText(currentPhrase.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }
  }, [charIndex, isDeleting, phraseIndex]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className="flex items-center gap-2.5">
      <span className="text-text-secondary">I build</span>
      <span className="gradient-text font-[var(--font-mono)]">{text}</span>
      <span className="text-accent-indigo animate-blink font-light">|</span>
    </span>
  );
}
