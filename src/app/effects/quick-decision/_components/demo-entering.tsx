"use client";

import type { Easing } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function Base({ ease, label }: { ease: Easing; label: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-500">
        {label}
      </code>
      <div className="flex h-16 w-full items-center justify-center">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.2, ease }}
              className="rounded-xl bg-white border border-zinc-200 px-5 py-2.5 text-sm text-zinc-700 shadow-md"
            >
              Notification entered
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={() => setVisible((v) => !v)}
        className="rounded-lg border border-zinc-300 px-4 py-1.5 text-xs text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-800 active:scale-95"
      >
        {visible ? "Hide" : "Show"}
      </button>
    </>
  );
}

export function EnteringBefore() {
  return <Base ease="easeIn" label="ease: 'easeIn'" />;
}

export function EnteringAfter() {
  return <Base ease="easeOut" label="ease: 'easeOut'" />;
}
