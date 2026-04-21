import type { ReactNode } from "react"

function Rule({
  number,
  question,
  answer,
  children,
}: {
  number: number
  question: string
  answer: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-start gap-4">
        <span className="shrink-0 mt-0.5 text-3xl font-light text-zinc-200 font-mono leading-none">
          {String(number).padStart(2, "0")}
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-semibold text-zinc-900">{question}</h2>
          <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-0.5 text-sm font-mono text-emerald-700 border border-emerald-200">
            → {answer}
          </span>
        </div>
      </div>
      <div className="ml-14 flex flex-col gap-4">{children}</div>
    </section>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-zinc-900 px-5 py-4 text-sm leading-relaxed text-zinc-300 font-mono">
      <code>{children.trim()}</code>
    </pre>
  )
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 leading-relaxed">
      {children}
    </div>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-zinc-600 leading-[1.8] text-base">{children}</p>
}

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-2xl px-6 py-16">

        {/* Header */}
        <header className="mb-16 flex flex-col gap-3">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em]">
            Animation Guide
          </p>
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
            Animation Timing
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed mt-1">
            A practical guide to choosing the right easing for any animation.
            Seven questions. Seven answers.
          </p>
        </header>

        {/* Intro */}
        <div className="mb-14 flex flex-col gap-4 pb-14 border-b border-zinc-200">
          <P>
            Easing functions are the invisible layer between functional and polished. Two animations
            with identical duration can feel completely different depending on how they accelerate
            and decelerate. Pick the wrong one and your UI feels sluggish, mechanical, or jarring —
            even if users can&apos;t explain why.
          </P>
          <P>
            Most developers apply one easing function everywhere. This works until it doesn&apos;t:
            the modal that feels like it&apos;s rushing in, the tab indicator that slides like a robot,
            the notification badge that bounces at you for the hundredth time today. This guide
            replaces guesswork with a simple decision tree.
          </P>
        </div>

        {/* Rules */}
        <div className="flex flex-col gap-14">

          <Rule number={1} question="Is this element entering or exiting?" answer="ease-out">
            <P>
              When an element enters the screen, it should feel like it&apos;s <em>arriving</em>.
              <code className="mx-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-600">ease-out</code>
              starts at full speed and decelerates — the element sweeps in confidently and
              settles into place. This matches how objects in the physical world behave when
              they reach their destination.
            </P>
            <P>
              The mistake is using
              <code className="mx-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-600">ease-in</code>,
              which does the opposite: the element creeps into view then suddenly rushes to its
              final position. It reads as unfinished — like it forgot to slow down.
            </P>
            <Code>{`
// Framer Motion / motion
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 40 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
/>

// CSS
.element { transition: transform 300ms ease-out; }
            `}</Code>
          </Rule>

          <Rule number={2} question="Is an on-screen element changing position?" answer="ease-in-out">
            <P>
              An element that&apos;s already visible and moves to a new position is different from
              one entering the screen. It starts from rest and ends at rest —
              <code className="mx-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-600">ease-in-out</code>
              honors this by accelerating from a standstill, then decelerating to a stop.
              The motion feels considered and symmetric.
            </P>
            <P>
              Using <code className="mx-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-600">linear</code> here looks robotic.
              Using <code className="mx-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-600">ease-out</code> looks lazy —
              the element rushes off immediately instead of building momentum from rest.
              The classic example is a tab indicator sliding between tabs.
            </P>
            <Code>{`
// Tab indicator — shared layout animation
<motion.div
  layoutId="tab-indicator"
  transition={{ duration: 0.35, ease: "easeInOut" }}
  className="absolute bottom-0 h-0.5 bg-blue-500"
/>

// Any position change
<motion.div
  animate={{ x: targetX }}
  transition={{ duration: 0.35, ease: "easeInOut" }}
/>
            `}</Code>
          </Rule>

          <Rule number={3} question="Is this a hover or color transition?" answer="ease">
            <P>
              Color changes and hover states are micro-interactions — they should feel
              immediate and organic, not theatrical. The CSS{" "}
              <code className="mx-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-600">ease</code>{" "}
              function (cubic-bezier 0.25, 0.1, 0.25, 1) is front-loaded: it changes quickly
              at first, then settles. This matches how the eye perceives color shifts and
              feels natural at the speed of a hover.
            </P>
            <P>
              <code className="mr-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-600">linear</code>
              at the same duration looks synthetic — the color mechanically interpolates
              rather than snapping into the new state. Keep hover transitions short: 200–400ms
              is plenty.
            </P>
            <Code>{`
// CSS — simplest approach
button {
  transition: background-color 300ms ease;
}

// motion — using the CSS ease cubic-bezier
<motion.button
  whileHover={{ backgroundColor: "#2563eb" }}
  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
/>
            `}</Code>
          </Rule>

          <Rule number={4} question="Will users see this 100+ times daily?" answer="Don't animate it">
            <P>
              Animation earns its place when it communicates something new: where an element
              came from, that a state changed, that an action succeeded. But animation that
              repeats hundreds of times a day stops communicating and starts distracting.
              Notification badges, counter increments, tab selection — users habituate fast.
              The signal value drops to zero while the distraction cost remains.
            </P>
            <Note>
              <strong>Test:</strong> Remove the animation. Does anything feel broken or unclear?
              If the answer is no — leave it out. The best animation is often no animation.
            </Note>
            <P>
              If you need to signal that a value changed, consider a subtle background flash
              (a single transition, not a loop) rather than a persistent bounce or scale.
              One frame of visual feedback is enough for an action the user initiated.
            </P>
          </Rule>

          <Rule number={5} question="Is this a drag or interruptible gesture?" answer="Use a spring">
            <P>
              Spring animations are physics-based: they have mass, stiffness, and damping.
              This makes them respond naturally to interruption — grab a spring mid-flight
              and it reacts immediately to the new force. Tween animations run on a fixed
              timeline. Interrupt one and you get a jarring position jump.
            </P>
            <P>
              Beyond interruptibility, springs feel <em>tactile</em>. The slight overshoot
              as an element settles into position mirrors how real objects behave when
              they&apos;re pushed and released. This is why toggles, sliders, and cards
              that snap to positions all feel better with springs.
            </P>
            <Code>{`
// Snap-back after drag
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.8}
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 15,
  }}
/>

// Toggle / position snap
<motion.div
  animate={{ x: isOn ? 48 : 2 }}
  transition={{
    type: "spring",
    stiffness: 500,
    damping: 30,
  }}
/>
            `}</Code>
          </Rule>

          <Rule number={6} question="Is the element large (drawer, sheet)?" answer="Bigger size = longer duration">
            <P>
              Duration should scale with the distance and visual weight of what&apos;s moving.
              A small tooltip animating 8px needs 150ms. A full-height sidebar sliding
              across the viewport needs 450ms. The goal is consistent <em>perceived speed</em>
              — not that small things are faster or larger things are slower, but that
              everything feels like it&apos;s moving at the same comfortable pace.
            </P>
            <P>
              Applying the same short duration to a large element makes it feel rushed
              and cheap. The drawer slams open instead of sliding. Give large elements
              the time they need to feel substantial.
            </P>
            <div className="overflow-hidden rounded-xl border border-zinc-200 text-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200">
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">Element</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {[
                    ["Tooltip, badge, chip", "100–150ms"],
                    ["Dropdown, popover", "200–250ms"],
                    ["Modal, dialog", "300–350ms"],
                    ["Drawer, sidebar, sheet", "400–500ms"],
                  ].map(([el, dur]) => (
                    <tr key={el} className="bg-white">
                      <td className="px-4 py-3 text-zinc-600">{el}</td>
                      <td className="px-4 py-3 font-mono text-zinc-500">{dur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Rule>

          <Rule number={7} question="Is this an exit animation?" answer="Make it faster than the entrance">
            <P>
              Users trigger exits intentionally — they&apos;ve already decided they&apos;re done
              with the element. A slow exit delays their next action with no benefit.
              Entrances carry information (something new appeared), so they deserve slightly
              more time to register. Exits should get out of the way.
            </P>
            <P>
              A 2:1 ratio is a good starting point: if an element enters at 400ms,
              it exits at 200ms. Also swap the easing —
              <code className="mx-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-600">ease-out</code>
              for entrance (decelerates to rest),
              <code className="mx-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-600">ease-in</code>
              for exit (accelerates away).
            </P>
            <Code>{`
// motion — different timing per phase
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  }}
  exit={{
    opacity: 0,
    y: -12,
    transition: { duration: 0.15, ease: "easeIn" },
  }}
/>
            `}</Code>
          </Rule>

        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-zinc-200 pt-8">
          <p className="text-sm text-zinc-400 leading-relaxed">
            These rules cover the 90% case. Animation is ultimately about perception,
            not precision — trust your eye, and when in doubt, go faster and simpler.
          </p>
        </footer>

      </div>
    </div>
  )
}
