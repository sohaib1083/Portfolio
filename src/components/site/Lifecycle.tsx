import type { CSSProperties } from "react";
import { lifecycle } from "@/data/profile";

// The progress line sweeps across the loop once on load; each step lights up as it's reached.
const START_MS = 900;
const STEP_MS = 380;

const at = (i: number) => ({ "--d": `${START_MS + STEP_MS * i}ms` }) as CSSProperties;

export default function Lifecycle() {
  const last = lifecycle.length - 1;

  return (
    <div className="relative">
      {/* Desktop: one continuous track from the first dot to the last */}
      <div
        aria-hidden
        className="absolute top-[7px] left-[7px] right-[calc(100%_/_7_-_7px)] hidden h-px bg-line md:block"
      />
      <div
        aria-hidden
        className="draw-x absolute top-[7px] left-[7px] right-[calc(100%_/_7_-_7px)] hidden h-px bg-accent md:block"
        style={{ "--d": `${START_MS}ms`, "--t": `${STEP_MS * last}ms` } as CSSProperties}
      />

      <ol className="relative flex flex-col gap-7 md:grid md:grid-cols-7 md:gap-0">
        {lifecycle.map((s, i) => (
          <li key={s.step} className="relative pl-9 md:pl-0 md:pr-5">
            {/* Mobile: a segment from this dot down to the next */}
            {i < last && (
              <>
                <span aria-hidden className="absolute top-[15px] -bottom-7 left-[7px] w-px bg-line md:hidden" />
                <span
                  aria-hidden
                  className="draw-y absolute top-[15px] -bottom-7 left-[7px] w-px bg-accent md:hidden"
                  style={{ ...at(i), "--t": `${STEP_MS}ms` } as CSSProperties}
                />
              </>
            )}

            <span
              aria-hidden
              className="light-up absolute top-0 left-0 block size-[15px] rounded-[3px] border border-ink/30 bg-card md:relative"
              style={at(i)}
            />

            <p className="font-mono text-[11px] text-muted md:mt-5">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3
              className={`mt-1 text-[15px] font-medium ${i === last ? "turn-accent" : ""}`}
              style={i === last ? at(i) : undefined}
            >
              {s.step}
            </h3>
            <p className="mt-1 text-[13px] leading-snug text-muted">{s.line}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
