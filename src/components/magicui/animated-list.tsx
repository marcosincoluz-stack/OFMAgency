"use client";

import { Children, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

type AnimatedListItem = {
  id: number;
  node: ReactNode;
  sourceIndex: number;
};

export function AnimatedList({
  children,
  className,
  delay = 1400,
  direction = "up",
  maxItems,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down";
  maxItems?: number;
}) {
  const items = useMemo<AnimatedListItem[]>(
    () =>
      Children.toArray(children).map((node, id) => ({
        id,
        node,
        sourceIndex: id,
      })),
    [children]
  );

  const visibleCount = Math.max(1, Math.min(maxItems ?? items.length, items.length || 1));
  const [queue, setQueue] = useState(items.slice(0, visibleCount));
  const cursorRef = useRef(0);
  const idRef = useRef(items.length);

  useEffect(() => {
    setQueue(items.slice(0, visibleCount));
    cursorRef.current = visibleCount % (items.length || 1);
    idRef.current = items.length;
  }, [items, visibleCount]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setQueue((prev) => {
        if (prev.length <= 1) return prev;
        const nextSourceIndex = cursorRef.current % items.length;
        cursorRef.current = (cursorRef.current + 1) % items.length;
        const nextItem: AnimatedListItem = {
          id: idRef.current++,
          node: items[nextSourceIndex].node,
          sourceIndex: nextSourceIndex,
        };

        if (direction === "down") {
          return [nextItem, ...prev].slice(0, visibleCount);
        }
        return [...prev.slice(1), nextItem].slice(0, visibleCount);
      });
    }, delay);

    return () => window.clearInterval(timer);
  }, [delay, direction, items, queue.length, visibleCount]);

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <AnimatePresence initial={false}>
        {queue.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{
              opacity: 0,
              y: direction === "down" ? -44 : 20,
              scale: direction === "down" ? 0.96 : 0.98,
            }}
            animate={
              direction === "down"
                ? {
                    opacity: [0, 1, 1],
                    y: [-44, 8, 0],
                    scale: [0.96, 1.015, 1],
                  }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, y: direction === "down" ? 20 : -20, scale: 0.98 }}
            transition={{
              layout: {
                type: "spring",
                stiffness: 420,
                damping: 30,
                mass: 0.5,
              },
              opacity: { duration: 0.28 },
              y:
                direction === "down"
                  ? {
                      duration: 0.44,
                      ease: [0.16, 1, 0.3, 1],
                      times: [0, 0.7, 1],
                    }
                  : { type: "spring", stiffness: 240, damping: 22, mass: 0.55 },
              scale:
                direction === "down"
                  ? {
                      duration: 0.44,
                      ease: [0.16, 1, 0.3, 1],
                      times: [0, 0.7, 1],
                    }
                  : { type: "spring", stiffness: 240, damping: 22, mass: 0.55 },
            }}
          >
            {item.node}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
