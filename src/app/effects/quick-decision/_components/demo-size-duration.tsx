"use client";

import { motion } from "motion/react";
import { useState } from "react";

function Base({
  smallDuration,
  largeDuration,
  label,
}: {
  smallDuration: number;
  largeDuration: number;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-500">
        {label}
      </code>

      <div className="flex w-full gap-6">
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="text-center text-[10px] text-zinc-400 whitespace-nowrap">
            Tooltip · {smallDuration * 1000}ms
          </span>
          <div className="relative h-8 overflow-hidden rounded-lg ">
            <motion.div
              animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
              transition={{
                duration: open ? smallDuration : 0.125,
                ease: "easeOut",
              }}
              style={{ originX: "50%" }}
              className="absolute inset-0 rounded-lg bg-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-2 flex-col gap-1.5">
          <span className="text-center text-[10px] text-zinc-400">
            Drawer · {largeDuration * 1000}ms
          </span>
          <div className="relative h-40 overflow-hidden rounded-xl bg-zinc-200">
            <motion.div
              animate={{
                scaleY: open ? 0.6 : 0,
              }}
              transition={{
                duration: open ? largeDuration : 0.2,
                ease: "easeOut",
              }}
              style={{ originY: "100%" }}
              className="absolute inset-0 rounded-xl bg-blue-500"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-zinc-300 px-4 py-1.5 text-xs text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-800"
      >
        {open ? "Close" : "Open"}
      </button>
    </>
  );
}

export function SizeDurationBefore() {
  return (
    <Base
      smallDuration={0.2}
      largeDuration={0.2}
      label="Same duration: 200ms each"
    />
  );
}

export function SizeDurationAfter() {
  return (
    <Base
      smallDuration={0.125}
      largeDuration={0.3}
      label="Proportional: 125ms / 300ms"
    />
  );
}
