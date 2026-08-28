"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/hooks/use-in-view";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type Props = {
  value: number;
  className?: string;
  /** Total roll duration in ms. */
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Rolls a number up to its value once it scrolls into view. Numbers that
 * arrive already-counted read as static facts; numbers that climb read as
 * momentum, which is the point of putting them on a marketplace page.
 */
export function CountUp({
  value,
  className,
  duration = 1400,
  suffix = "",
  prefix = "",
  decimals = 0,
}: Props) {
  const { ref, isInView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCurrent(value * easeOutExpo(progress));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration, prefersReducedMotion]);

  const formatted =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString("en-US");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
