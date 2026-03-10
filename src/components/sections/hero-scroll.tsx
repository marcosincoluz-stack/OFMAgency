"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Decisiones basadas en datos
              <br />
              <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                Transparencia total
              </span>
            </h1>
          </>
        }>
        <img
          src={`/images/scrollimage.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="size-full rounded-2xl object-cover object-center"
          draggable={false} />
      </ContainerScroll>
    </div>
  );
}
