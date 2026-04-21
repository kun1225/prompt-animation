"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Base({
  exitDuration,
  label,
}: {
  exitDuration: number;
  label: string;
}) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), 1200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-500">
        {label}
      </code>
      <div className="relative h-16 w-full">
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.94 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.25, ease: "easeOut" as const },
              }}
              exit={{
                opacity: 0,
                y: -12,
                scale: 0.96,
                transition: { duration: exitDuration, ease: "easeIn" as const },
              }}
              className="absolute inset-x-0 top-2 mx-auto flex w-fit items-center gap-2 rounded-xl bg-white border border-zinc-200 px-4 py-2.5 text-sm text-zinc-700 shadow-md"
            >
              <span className="text-emerald-500">✓</span>
              Saved successfully
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={show}
        disabled={visible}
        className="rounded-lg border border-zinc-300 px-4 py-1.5 text-xs text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-800 disabled:opacity-40"
      >
        Show toast
      </button>
    </>
  );
}

export function ExitSpeedBefore() {
  return <Base exitDuration={0.25} label="Enter 250ms · Exit 250ms" />;
}

export function ExitSpeedAfter() {
  return <Base exitDuration={0.12} label="Enter 250ms · Exit 120ms" />;
}
