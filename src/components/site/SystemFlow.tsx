import type { CSSProperties } from "react";
import { flow } from "@/data/profile";
import { Label } from "@/components/site/Chrome";

// A packet loops through the pipeline forever; each node flashes the moment it arrives.
// Timing lives in CSS (--cycle, .travel-*, .hit): node i is hit at fraction 0.8 * i / (n - 1).
const at = (i: number) => ({ "--f": (0.8 * i) / (flow.length - 1) }) as CSSProperties;

function Node({ i }: { i: number }) {
  return (
    <span
      className="hit relative z-10 inline-flex items-center gap-2 rounded-md border border-line bg-card px-3 py-2 font-mono text-[12px] tracking-[0.06em]"
      style={at(i)}
    >
      {flow[i].node}
    </span>
  );
}

export default function SystemFlow() {
  return (
    <figure className="relative rounded-xl border border-line bg-card/70 p-5 backdrop-blur-[2px] sm:p-7">
      <figcaption className="flex items-center justify-between gap-4">
        <Label>
          <span className="text-accent">Fig. 01</span>{" / "}A payment through systems I build &amp; harden
        </Label>
        <span className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase sm:flex">
          <span className="breathe size-1.5 rounded-full bg-accent" aria-hidden /> Live
        </span>
      </figcaption>

      {/* Desktop: left to right */}
      <div className="relative mt-8 hidden md:block" aria-hidden>
        <div className="absolute top-[18px] right-[10%] left-[10%] border-t border-dashed border-muted/50" />
        <div className="absolute top-[18px] right-[10%] left-[10%]">
          <span className="travel-x absolute -top-[5px] -ml-[5px] size-2.5 bg-accent shadow-[0_0_12px_var(--accent)]" />
        </div>
        <ol className="relative grid grid-cols-5">
          {flow.map((f, i) => (
            <li key={f.node} className="flex flex-col items-center text-center">
              <Node i={i} />
              <span className="mt-3 max-w-[9rem] text-[12px] leading-snug text-muted">{f.caption}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: top to bottom */}
      <div className="relative mt-6 md:hidden" aria-hidden>
        <div className="absolute top-[18px] bottom-[18px] left-[27px] border-l border-dashed border-muted/50" />
        <div className="absolute top-[18px] bottom-[18px] left-[27px]">
          <span className="travel-y absolute -left-[5px] -mt-[5px] size-2.5 bg-accent shadow-[0_0_12px_var(--accent)]" />
        </div>
        <ol className="relative flex flex-col gap-5">
          {flow.map((f, i) => (
            <li key={f.node} className="flex items-center gap-4">
              <span className="w-[56px] text-center">
                <Node i={i} />
              </span>
              <span className="text-[13px] text-muted">{f.caption}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="sr-only">
        A payment flows through {flow.map((f) => `${f.node} (${f.caption})`).join(", ")}.
      </p>
    </figure>
  );
}
