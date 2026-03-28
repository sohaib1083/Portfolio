"use client";

import { useRef, useEffect, useState } from "react";

interface StatCounterProps {
  target: number;
  label: string;
}

export default function StatCounter({ target, label }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let current = 0;
          const increment = target / 40;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(Math.floor(current));
          }, 40);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center">
        <span className="font-[var(--font-display)] text-3xl md:text-4xl font-extrabold gradient-text">
          {count}
        </span>
        <span className="font-[var(--font-display)] text-xl font-bold text-accent-cyan">+</span>
      </div>
      <span className="block text-xs text-text-muted mt-0.5">{label}</span>
    </div>
  );
}
