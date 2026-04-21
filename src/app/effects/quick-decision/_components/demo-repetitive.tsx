"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function RepetitiveBefore() {
  const [count, setCount] = useState(3);

  return (
    <>
      <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-500">
        animates on every update
      </code>
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-200 text-2xl">
          🔔
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
          >
            {count}
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={() => setCount((c) => (c >= 9 ? 1 : c + 1))}
        className="rounded-lg border border-zinc-300 px-4 py-1.5 text-xs text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-800"
      >
        + New notification
      </button>
    </>
  );
}

export function RepetitiveAfter() {
  const [count, setCount] = useState(3);

  return (
    <>
      <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-500">
        no animation needed
      </code>
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-200 text-2xl">
          🔔
        </div>
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {count}
        </div>
      </div>
      <button
        onClick={() => setCount((c) => (c >= 9 ? 1 : c + 1))}
        className="rounded-lg border border-zinc-300 px-4 py-1.5 text-xs text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-800"
      >
        + New notification
      </button>
    </>
  );
}
