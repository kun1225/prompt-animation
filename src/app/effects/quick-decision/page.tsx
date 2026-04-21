import { EnteringAfter, EnteringBefore } from "./_components/demo-entering";
import { ExitSpeedAfter, ExitSpeedBefore } from "./_components/demo-exit-speed";
import { HoverAfter, HoverBefore } from "./_components/demo-hover";
import { MovingAfter, MovingBefore } from "./_components/demo-moving";
import {
  RepetitiveAfter,
  RepetitiveBefore,
} from "./_components/demo-repetitive";
import {
  SizeDurationAfter,
  SizeDurationBefore,
} from "./_components/demo-size-duration";
import { SpringAfter, SpringBefore } from "./_components/demo-spring";
import { RuleCard } from "./_components/rule-card";

const rules = [
  {
    question: "這個元素是進入還是離開畫面？",
    answer: "ease-out",
    before: <EnteringBefore />,
    after: <EnteringAfter />,
  },
  {
    question: "畫面上的元素正在改變位置？",
    answer: "ease-in-out",
    before: <MovingBefore />,
    after: <MovingAfter />,
  },
  {
    question: "這是 hover 或顏色的過渡效果？",
    answer: "ease",
    before: <HoverBefore />,
    after: <HoverAfter />,
  },
  {
    question: "使用者每天會看到這個動畫超過 100 次？",
    answer: "不要加動畫",
    before: <RepetitiveBefore />,
    after: <RepetitiveAfter />,
  },
  {
    question: "這個元素需要有生命感（變形、彈跳、回應手勢）？",
    answer: "使用 spring",
    before: <SpringBefore />,
    after: <SpringAfter />,
  },
  {
    question: "這是大型元素（如抽屜、側邊欄）？",
    answer: "越大 = 持續時間越長",
    before: <SizeDurationBefore />,
    after: <SizeDurationAfter />,
  },
  {
    question: "這是離開的動畫？",
    answer: "比進入動畫更快",
    before: <ExitSpeedBefore />,
    after: <ExitSpeedAfter />,
  },
];

export default function QuickDecisionPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-12 flex flex-col gap-2">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em]">
            Animation Guide
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
            Quick Decision
          </h1>
          <p className="mt-1 text-zinc-500">
            7 rules to pick the right easing for any animation.
          </p>
        </header>

        <div className="flex flex-col gap-24">
          {rules.map((rule, i) => (
            <RuleCard
              key={i}
              number={i + 1}
              question={rule.question}
              answer={rule.answer}
              beforeDemo={rule.before}
              afterDemo={rule.after}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
