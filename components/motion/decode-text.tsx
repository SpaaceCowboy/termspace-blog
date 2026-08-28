"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const GLYPHS = "▚▞█▓▒░/\<>{}[]#$*+=~-_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type Props = {
  text: string;
  className?: string;
  /** Milliseconds before the first character resolves. */
  delay?: number;
  /** Milliseconds between each character locking into place. */
  speed?: number;
};

/**
 * Resolves text out of noise, one character at a time — the brand's terminal
 * heritage stated as motion rather than as a monospace font.
 *
 * The real string is always in the DOM as the accessible name; the scrambled
 * glyphs are `aria-hidden` decoration layered over it, so screen readers and
 * search engines read the sentence, not the noise. Under reduced motion the
 * scramble never runs at all.
 */
export function DecodeText({ text, className, delay = 120, speed = 34 }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(text);
      setIsDecoding(false);
      return;
    }

    setIsDecoding(true);
    let resolved = 0;
    let elapsed = 0;
    let last = performance.now();
    let startTimer = 0;

    const step = (now: number) => {
      elapsed += now - last;
      last = now;

      while (elapsed >= speed && resolved < text.length) {
        elapsed -= speed;
        resolved += 1;
      }

      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < resolved || char === " ") return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );

      if (resolved < text.length) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(text);
        setIsDecoding(false);
      }
    };

    startTimer = window.setTimeout(() => {
      last = performance.now();
      frameRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, speed, prefersReducedMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden data-decoding={isDecoding ? "" : undefined}>
        {display}
      </span>
    </span>
  );
}
