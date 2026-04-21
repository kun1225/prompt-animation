"use client";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function Base({
  transition,
  label,
}: {
  transition: Transition;
  label: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-500">
        {label}
      </code>
      <div
        className={cn(
          "flex h-24 w-full transition items-center justify-center ",
        )}
      >
        <motion.div
          onClick={() => setExpanded((v) => !v)}
          animate={{
            width: expanded ? 220 : 88,
            height: expanded ? 64 : 30,
            borderRadius: 24,
          }}
          transition={transition}
          className="relative cursor-pointer overflow-hidden bg-zinc-900 "
        >
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="absolute text-nowrap inset-0 flex items-center gap-3 px-4"
              >
                <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 text-sm">
                  ♪
                </div>
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <span className="text-[10px] text-white font-medium">
                    Now Playing
                  </span>
                  <span className="text-[9px] text-zinc-400">Ambient Mix</span>
                </div>
                <div className="flex items-end gap-0.5 h-5 shrink-0">
                  {[3, 5, 4, 6, 3, 5, 4].map((h, i) => (
                    <div
                      key={i}
                      className="w-0.5 rounded-full bg-zinc-400"
                      style={{ height: h * 3 }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="absolute inset-0 flex items-center justify-center gap-1.5"
              >
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <span className="text-[10px] text-zinc-400">Click to expand</span>
    </>
  );
}

export function SpringBefore() {
  return (
    <Base
      transition={{ type: "tween", duration: 0.3, ease: "linear" }}
      label="linear"
    />
  );
}

export function SpringAfter() {
  return (
    <Base
      transition={{ type: "spring", stiffness: 300, damping: 22, mass: 1.2 }}
      label="spring"
    />
  );
}
