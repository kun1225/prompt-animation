"use client";

import type { Easing } from "motion/react";
import { LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = ["Overview", "Details", "Settings"];

function Base({
  ease,
  label,
  groupId,
}: {
  ease: Easing;
  label: string;
  groupId: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <>
      <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-500">
        {label}
      </code>
      <div className="w-full">
        <LayoutGroup id={groupId}>
          <div className="relative flex border-b border-zinc-200">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActive(i)}
                className={cn(
                  "relative flex-1 pb-2.5 pt-1 text-xs font-medium transition-colors",
                  active === i
                    ? "text-blue-600"
                    : "text-zinc-400 hover:text-zinc-600",
                )}
              >
                {tab}
                {active === i && (
                  <motion.div
                    layoutId="indicator"
                    transition={{ duration: 0.25, ease }}
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-blue-500"
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
      <span className="text-[10px] text-zinc-400">Click tabs to switch</span>
    </>
  );
}

export function MovingBefore() {
  return <Base ease="linear" label="ease: 'linear'" groupId="moving-before" />;
}

export function MovingAfter() {
  return (
    <Base ease="easeInOut" label="ease: 'easeInOut'" groupId="moving-after" />
  );
}
