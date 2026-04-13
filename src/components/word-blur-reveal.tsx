"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const WORD_STAGGER_SECONDS = 0.06;
const WORD_ANIMATION_DURATION_SECONDS = 0.6;

const DEFAULT_TEXT =
  "What started as a home by the water evolved into a sanctuary — stewarded with intention, rooted in preserved land, and dedicated to meaningful pause.";

type WordBlurRevealProps = {
  text?: string;
  classname?: string;
};

export function WordBlurReveal({
  text = DEFAULT_TEXT,
  classname,
}: WordBlurRevealProps) {
  const words = text.split(" ");

  return (
    <p
      className={cn(
        "mx-auto max-w-4xl text-center font-serif text-[40px] leading-tight tracking-normal text-stone-950",
        classname,
      )}
    >
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="inline-block origin-left will-change-[opacity,transform,filter]"
          initial={{ opacity: 0, y: 24, rotate: 6, filter: "blur(8px)" }}
          key={`${word}-${index}`}
          transition={{
            delay: index * WORD_STAGGER_SECONDS,
            duration: WORD_ANIMATION_DURATION_SECONDS,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </p>
  );
}
