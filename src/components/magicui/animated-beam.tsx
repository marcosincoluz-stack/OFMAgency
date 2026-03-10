"use client";

import React, { useEffect, useId, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type HTMLElementRef = React.RefObject<HTMLElement | null>;

interface AnimatedBeamProps {
  containerRef: HTMLElementRef;
  fromRef: HTMLElementRef;
  toRef: HTMLElementRef;
  className?: string;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

function getElementCenter(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  className,
  curvature = 0,
  reverse = false,
  duration = 4,
  delay = 0,
  pathColor = "#64748b",
  pathWidth = 2,
  pathOpacity = 0.25,
  gradientStartColor = "#38bdf8",
  gradientStopColor = "#0ea5e9",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const gradientId = useId().replace(/:/g, "");
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const updatePath = () => {
      const containerEl = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!containerEl || !fromEl || !toEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const fromCenter = getElementCenter(fromEl);
      const toCenter = getElementCenter(toEl);

      const startX = fromCenter.x - containerRect.left + startXOffset;
      const startY = fromCenter.y - containerRect.top + startYOffset;
      const endX = toCenter.x - containerRect.left + endXOffset;
      const endY = toCenter.y - containerRect.top + endYOffset;

      const controlX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 - curvature;
      const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;

      setPathD(d);
      setSvgSize({ width: containerRect.width, height: containerRect.height });
    };

    updatePath();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updatePath)
        : null;

    if (containerRef.current && observer) observer.observe(containerRef.current);
    if (fromRef.current && observer) observer.observe(fromRef.current);
    if (toRef.current && observer) observer.observe(toRef.current);

    window.addEventListener("resize", updatePath);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  if (!pathD || !svgSize.width || !svgSize.height) return null;

  return (
    <svg
      width={svgSize.width}
      height={svgSize.height}
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
      className={cn("pointer-events-none absolute left-0 top-0", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeOpacity={pathOpacity}
        strokeWidth={pathWidth}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        stroke={`url(#beam-gradient-${gradientId})`}
        strokeWidth={pathWidth + 0.6}
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          id={`beam-gradient-${gradientId}`}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", y1: "0%", x2: "0%", y2: "0%" }}
          animate={gradientCoordinates}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0,
          }}
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="25%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="50%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStartColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}

