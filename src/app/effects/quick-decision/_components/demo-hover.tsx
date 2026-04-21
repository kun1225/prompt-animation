"use client";

import type { Easing } from "motion/react";
import { motion } from "motion/react";

function Base({ ease, label }: { ease: Easing; label: string }) {
  return (
    <>
      <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-500">
        {label}
      </code>
      <motion.button
        className="rounded-xl px-6 py-3 text-sm font-medium cursor-pointer"
        style={{ backgroundColor: "#f4f4f5", color: "#333333" }}
        whileHover={{ backgroundColor: "#2563eb", color: "#ffffff" }}
        transition={{ duration: 0.2, ease }}
      >
        Hover over me
      </motion.button>
      <span className="text-[10px] text-zinc-400">Hover to see transition</span>
    </>
  );
}

export function HoverBefore() {
  return <Base ease="linear" label="ease: 'linear'" />;
}

export function HoverAfter() {
  return <Base ease={[0.25, 0.1, 0.25, 1.0]} label="ease: 'ease'" />;
}
