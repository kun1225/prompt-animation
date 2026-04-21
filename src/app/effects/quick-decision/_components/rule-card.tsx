import type { ReactNode } from "react";

interface RuleCardProps {
  number: number;
  question: string;
  answer: string;
  beforeDemo: ReactNode;
  afterDemo: ReactNode;
}

export function RuleCard({
  number,
  question,
  answer,
  beforeDemo,
  afterDemo,
}: RuleCardProps) {
  return (
    <div className="grid grid-cols-2 gap-3 ">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
          <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.15em]">
            Before
          </span>
        </div>
        <div className="min-h-[170px] bg-white rounded-xl border border-red-100  flex flex-col items-center justify-center p-4 gap-3">
          {beforeDemo}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-[0.15em]">
            After
          </span>
        </div>
        <div className="min-h-[170px] bg-white rounded-xl border border-emerald-100  flex flex-col items-center justify-center p-4 gap-3">
          {afterDemo}
        </div>
      </div>
    </div>
  );
}
