"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import type { LocaleContent } from "./localization";

const revealFrames = [
  {
    original: "/product/night.jpg",
    falseColor: "/product/night-el-zone.jpg",
    width: 1920,
    height: 923,
  },
  {
    original: "/product/runner.jpg",
    falseColor: "/product/runner-el-zone.jpg",
    width: 1920,
    height: 800,
  },
] as const;

export function ReviewSessionReveal({ content }: { content: LocaleContent }) {
  function updateReveal(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = ((event.clientX - bounds.left) / bounds.width) * 100;
    event.currentTarget.style.setProperty("--reveal-x", `${Math.min(Math.max(position, 0), 100)}%`);
  }

  return (
    <div className="imagePair">
      {revealFrames.map((frame) => (
        <div
          className="revealFrame"
          key={frame.original}
          onPointerMove={updateReveal}
          style={
            {
              "--frame-aspect": `${frame.width} / ${frame.height}`,
              "--reveal-x": "56%",
            } as CSSProperties
          }
        >
          <Image
            src={frame.original}
            alt={`${content.name} original frame before EL Zone false color`}
            width={frame.width}
            height={frame.height}
            sizes="(max-width: 900px) 100vw, 50vw"
            loading="lazy"
          />
          <Image
            className="revealOverlay"
            src={frame.falseColor}
            alt={`${content.name} EL Zone false color exposure overlay`}
            width={frame.width}
            height={frame.height}
            sizes="(max-width: 900px) 100vw, 50vw"
            loading="lazy"
          />
          <span className="revealDivider" aria-hidden="true" />
          <span className="revealBadge">EL Zone</span>
        </div>
      ))}
    </div>
  );
}
