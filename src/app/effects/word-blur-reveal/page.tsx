import { WordBlurReveal } from "@/components/word-blur-reveal";

export default function WordBlurRevealPage() {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-950">
      <main>
        <section className="flex min-h-screen items-end justify-center px-6 pb-16">
          <p className="max-w-sm text-center text-sm uppercase tracking-[0.24em] text-stone-500">
            Scroll to reveal
          </p>
        </section>

        <section className="flex min-h-screen items-center px-6 py-32">
          <WordBlurReveal />
        </section>

        <section className="min-h-[40vh]" aria-hidden="true" />
      </main>
    </div>
  );
}
