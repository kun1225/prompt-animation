"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type IconName = "arrow" | "search" | "download" | "play" | "spark";

type IconDemo = {
  name: IconName;
  title: string;
  note: string;
  accent: string;
  strategy: string;
};

const iconDemos: IconDemo[] = [
  {
    name: "arrow",
    title: "Arrow pull",
    note: "The shaft stretches while the point pinches inward.",
    accent: "#2f6f5e",
    strategy: "path morph",
  },
  {
    name: "search",
    title: "Search bounce",
    note: "The glass squeezes and the handle snaps after it.",
    accent: "#d04a35",
    strategy: "shape + group transform",
  },
  {
    name: "download",
    title: "Download drop",
    note: "The arrow lands heavy, then recoils from the tray.",
    accent: "#227c9d",
    strategy: "path morph + translate",
  },
  {
    name: "play",
    title: "Play press",
    note: "The triangle compresses like a soft button press.",
    accent: "#816c1d",
    strategy: "polygon morph",
  },
  {
    name: "spark",
    title: "Spark flare",
    note: "The rays trade height and width for a tiny burst.",
    accent: "#b5365a",
    strategy: "path morph",
  },
];

const spring = {
  type: "spring",
  stiffness: 360,
  damping: 13,
  mass: 0.75,
} as const;

export function SvgSquashStretchPlayground() {
  return (
    <div
      className="min-h-screen bg-[#f7f8f5] text-zinc-950"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-5 py-10 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 border-b border-zinc-950/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
              SVG squash and stretch
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-zinc-950 sm:text-6xl">
              Tiny icons with elastic bones.
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-6 text-zinc-600">
            Hover, tap, or focus each icon. Every shape is drawn inline and
            animated from its own SVG paths.
          </p>
        </header>

        <section
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          aria-label="Hand-drawn SVG animation demos"
        >
          {iconDemos.map((demo) => (
            <IconDemoButton key={demo.name} demo={demo} />
          ))}
        </section>
      </main>
    </div>
  );
}

function IconDemoButton({ demo }: { demo: IconDemo }) {
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function triggerPulse() {
    if (shouldReduceMotion) {
      return;
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setIsActive(true);
    timeoutRef.current = window.setTimeout(() => {
      setIsActive(false);
    }, 180);
  }

  function resetPulse() {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsActive(false);
  }

  return (
    <button
      type="button"
      onBlur={resetPulse}
      onFocus={triggerPulse}
      onPointerEnter={triggerPulse}
      onPointerLeave={resetPulse}
      className="group flex min-h-[310px] flex-col justify-between rounded-lg border border-zinc-950/10 bg-white p-5 text-left shadow-[0_18px_50px_rgba(39,39,42,0.08)] transition duration-200 hover:-translate-y-1 hover:border-zinc-950/20 focus-visible:-translate-y-1 focus-visible:border-zinc-950/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20"
      style={{ color: demo.accent }}
    >
      <span className="flex h-36 items-center justify-center rounded-md bg-[#f1f3ee] text-current">
        <AnimatedIcon name={demo.name} isActive={isActive && !shouldReduceMotion} />
      </span>

      <span className="flex flex-col gap-3 text-zinc-950">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          {demo.strategy}
        </span>
        <span className="text-xl font-semibold">{demo.title}</span>
        <span className="text-sm leading-6 text-zinc-600">{demo.note}</span>
      </span>
    </button>
  );
}

function AnimatedIcon({
  name,
  isActive,
}: {
  name: IconName;
  isActive: boolean;
}) {
  if (name === "arrow") {
    return <ArrowIcon isActive={isActive} />;
  }
  if (name === "search") {
    return <SearchIcon isActive={isActive} />;
  }
  if (name === "download") {
    return <DownloadIcon isActive={isActive} />;
  }
  if (name === "play") {
    return <PlayIcon isActive={isActive} />;
  }
  return <SparkIcon isActive={isActive} />;
}

function ArrowIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-24 w-24 overflow-visible"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    >
      <motion.path
        animate={{ d: isActive ? "M 12 32 H 55" : "M 12 32 H 46" }}
        initial={false}
        transition={spring}
      />
      <motion.path
        animate={{
          d: isActive ? "M 41 22 L 55 32 L 41 42" : "M 36 18 L 50 32 L 36 46",
        }}
        initial={false}
        transition={spring}
      />
    </svg>
  );
}

function SearchIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-24 w-24 overflow-visible"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    >
      <motion.ellipse
        animate={{
          cx: 29,
          cy: 28,
          rx: isActive ? 18 : 15,
          ry: isActive ? 12 : 15,
        }}
        initial={false}
        transition={spring}
      />
      <motion.g
        animate={{
          rotate: isActive ? 8 : 0,
          x: isActive ? 3 : 0,
          y: isActive ? 2 : 0,
        }}
        initial={false}
        transition={{ ...spring, delay: isActive ? 0.04 : 0 }}
        style={{ transformOrigin: "43px 43px" }}
      >
        <path d="M 40 39 L 52 51" />
      </motion.g>
    </svg>
  );
}

function DownloadIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-24 w-24 overflow-visible"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    >
      <motion.path
        animate={{
          d: isActive ? "M 32 10 V 39" : "M 32 12 V 34",
          y: isActive ? 4 : 0,
        }}
        initial={false}
        transition={spring}
      />
      <motion.path
        animate={{
          d: isActive ? "M 22 30 L 32 41 L 42 30" : "M 22 27 L 32 37 L 42 27",
          y: isActive ? 4 : 0,
        }}
        initial={false}
        transition={spring}
      />
      <motion.path
        animate={{ d: isActive ? "M 17 50 H 47" : "M 20 50 H 44" }}
        initial={false}
        transition={{ ...spring, damping: 10 }}
      />
    </svg>
  );
}

function PlayIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-24 w-24 overflow-visible"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    >
      <motion.path
        animate={{
          d: isActive
            ? "M 23 17 L 48 32 L 23 47 Z"
            : "M 21 15 L 50 32 L 21 49 Z",
          scaleX: isActive ? 0.9 : 1,
          scaleY: isActive ? 1.08 : 1,
        }}
        fill="currentColor"
        initial={false}
        stroke="none"
        style={{ transformOrigin: "32px 32px" }}
        transition={spring}
      />
      <motion.path
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1.05 : 0.88 }}
        d="M 17 12 H 47 Q 52 12 52 17 V 47 Q 52 52 47 52 H 17 Q 12 52 12 47 V 17 Q 12 12 17 12 Z"
        initial={false}
        strokeOpacity="0.3"
        transition={spring}
      />
    </svg>
  );
}

function SparkIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-24 w-24 overflow-visible"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    >
      <motion.path
        animate={{
          d: isActive
            ? "M 32 7 L 37 27 L 57 32 L 37 37 L 32 57 L 27 37 L 7 32 L 27 27 Z"
            : "M 32 12 L 36 28 L 52 32 L 36 36 L 32 52 L 28 36 L 12 32 L 28 28 Z",
        }}
        fill="currentColor"
        fillOpacity="0.12"
        initial={false}
        transition={spring}
      />
      <motion.path
        animate={{
          d: isActive
            ? "M 32 7 L 37 27 L 57 32 L 37 37 L 32 57 L 27 37 L 7 32 L 27 27 Z"
            : "M 32 12 L 36 28 L 52 32 L 36 36 L 32 52 L 28 36 L 12 32 L 28 28 Z",
        }}
        initial={false}
        transition={spring}
      />
      <motion.path
        animate={{
          d: isActive ? "M 47 11 L 49 20 L 58 22" : "M 48 14 L 50 20 L 56 22",
          opacity: isActive ? 1 : 0.45,
        }}
        initial={false}
        transition={{ ...spring, delay: isActive ? 0.03 : 0 }}
      />
    </svg>
  );
}
