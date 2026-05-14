"use client";

import Image from "next/image";
import { useState } from "react";
import type { LocaleContent } from "./localization";

type RGB = readonly [number, number, number];

type Band = {
  lowerBound: number;
  upperBound: number;
  color: RGB;
  legendLabel: string;
};

type Mode = {
  id: "el-zone" | "arri" | "blackmagic" | "custom";
  label: string;
  shortLabel: string;
  previewSrc: string;
  bands: Band[];
  preservesGrayscaleOutsideBands: boolean;
};

const middleGrayIRE = 39;

const modes: Mode[] = [
  {
    id: "el-zone",
    label: "EL Zone",
    shortLabel: "EL Zone",
    previewSrc: "/product/skin-tone-el-zone.jpg",
    bands: elZoneBands(middleGrayIRE),
    preservesGrayscaleOutsideBands: false,
  },
  {
    id: "arri",
    label: "ARRI",
    shortLabel: "ARRI",
    previewSrc: "/product/skin-tone-arri.jpg",
    bands: [
      band(99, 100, [1, 0, 0], "-1/3"),
      band(97, 99, [1, 1, 0], "-2/3"),
      band(52, 56, [1, 0.7, 0.7], "+1"),
      band(38, 42, [0, 1, 0], "18%"),
      band(2.5, 4, [0, 0, 1], "2.5-4"),
      band(0, 2.5, [0.7, 0, 1], "0-2.5"),
    ],
    preservesGrayscaleOutsideBands: true,
  },
  {
    id: "blackmagic",
    label: "Blackmagic",
    shortLabel: "BMD",
    previewSrc: "/product/skin-tone-blackmagic.jpg",
    bands: [
      band(0, 8, [0.5, 0, 0.5], "BDL"),
      band(8, 18, [0.1, 0.1, 0.95], "NBDL"),
      band(38, 42, [0.17, 0.75, 0.2], "18%MG"),
      band(48, 52, [0.96, 0.66, 0.78], "MG+1"),
      band(78, 82, [0.96, 0.9, 0.3], "80%WC"),
      band(92, 96, [0.92, 0.1, 0.08], "95%WC"),
    ],
    preservesGrayscaleOutsideBands: true,
  },
  {
    id: "custom",
    label: "Custom",
    shortLabel: "Custom",
    previewSrc: "/product/skin-tone-custom.jpg",
    bands: [
      band(0, 12, [0, 0, 0], "0-12"),
      band(14, 28, [0.5, 0, 0.8], "14-28"),
      band(40, 56, [0, 1, 0], "40-56"),
      band(72, 88, [0.9, 0.12, 0.12], "72-88"),
      band(95, 100, [1, 1, 1], "95-100"),
    ],
    preservesGrayscaleOutsideBands: false,
  },
];

export function ExposureModeDemo({ content }: { content: LocaleContent }) {
  const [activeModeID, setActiveModeID] = useState<Mode["id"]>("el-zone");
  const activeMode = modes.find((mode) => mode.id === activeModeID) ?? modes[0];
  const activeModeLabel =
    activeMode.id === "custom" ? content.customLabel : activeMode.label;
  const activeModeShowsBandRanges = activeMode.id !== "el-zone";

  return (
    <section id="preview" className="modeDemo" aria-labelledby="mode-demo-title">
      <div className="modeDemoCopy">
        <p className="sectionKicker">EL Zone · ARRI · Blackmagic · {content.customLabel}</p>
        <h2 id="mode-demo-title">{content.descriptionLines[1] ?? content.subtitle}</h2>
        <p>{content.promotionalText}</p>
      </div>

      <div className="modeWorkbench">
        <div className="modePreview" aria-live="polite">
          <Image
            alt={`${activeModeLabel} ${content.name}`}
            className="modeSourceImage"
            height={800}
            priority
            src={activeMode.previewSrc}
            width={1920}
          />
          <div className="modeReadout">
            <span>{activeMode.id === "custom" ? content.customLabel : activeMode.shortLabel}</span>
            <strong>{activeModeShowsBandRanges ? formatRange(activeMode.bands[activeMode.bands.length - 1]) : "Stops"}</strong>
          </div>
        </div>

        <div className="modeControls">
          <div className="modeButtons" aria-label={content.subtitle}>
            {modes.map((mode) => (
              <button
                aria-pressed={activeMode.id === mode.id}
                className="modeButton"
                key={mode.id}
                onClick={() => setActiveModeID(mode.id)}
                type="button"
              >
                {mode.id === "custom" ? content.customLabel : mode.label}
              </button>
            ))}
          </div>

          <div className="modeMeta">
            <h3>{activeModeLabel}</h3>
            <p>{content.descriptionLines[2] ?? content.promotionalText}</p>
            <div
              className={activeModeShowsBandRanges ? "bandLegend" : "bandLegend bandLegendStopsOnly"}
              aria-label={activeModeShowsBandRanges ? `${activeModeLabel} IRE` : `${activeModeLabel} stops`}
            >
              {activeMode.bands
                .slice()
                .sort((left, right) => left.lowerBound - right.lowerBound)
                .map((item) => (
                  <div className="bandItem" key={`${item.lowerBound}-${item.upperBound}-${item.legendLabel}`}>
                    <span
                      className="bandSwatch"
                      style={{ backgroundColor: rgbCSS(item.color) }}
                    />
                    <span>{item.legendLabel}</span>
                    {activeModeShowsBandRanges ? <strong>{formatRange(item)}</strong> : null}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function band(lowerBound: number, upperBound: number, color: RGB, legendLabel: string): Band {
  return {
    lowerBound,
    upperBound,
    color,
    legendLabel,
  };
}

function elZoneBands(middleGray: number): Band[] {
  const middleGraySignal = Math.min(Math.max(middleGray / 100, 0), 1);
  const middleGrayLinear = srgbToLinear(middleGraySignal);
  const colors: Array<{ label: string; color: RGB }> = [
    { label: "-6", color: [0, 0, 0] },
    { label: "-5", color: [0.5, 0, 0.8] },
    { label: "-4", color: [0, 0, 1] },
    { label: "-3", color: [0, 0.5, 0.5] },
    { label: "-2", color: [0, 0.4, 0] },
    { label: "-1", color: [0, 0.65, 0] },
    { label: "-1/2", color: [0, 1, 0] },
    { label: "0", color: [0.5, 0.5, 0.5] },
    { label: "+1/2", color: [1, 1, 0] },
    { label: "+1", color: [1, 1, 0.5] },
    { label: "+2", color: [1, 0.6, 0] },
    { label: "+3", color: [1, 0.7, 0.4] },
    { label: "+4", color: [0.85, 0, 0] },
    { label: "+5", color: [1, 0.2, 0.2] },
    { label: "+6", color: [1, 1, 1] },
  ];
  const stopBoundaries = [-5.5, -4.5, -3.5, -2.5, -1.5, -0.75, -0.25, 0.25, 0.75, 1.5, 2.5, 3.5, 4.5, 5.5];
  const encodedBoundaries = stopBoundaries.reduce<number[]>((values, boundary) => {
    const boundaryLinear = middleGrayLinear * Math.pow(2, boundary);
    const encoded = Math.min(Math.max(linearToSRGB(boundaryLinear) * 100, 0), 100);
    values.push(values.length === 0 ? encoded : Math.max(encoded, values[values.length - 1]));
    return values;
  }, []);

  let lowerBound = 0;
  return colors.map((entry, index) => {
    const upperBound = index < encodedBoundaries.length ? encodedBoundaries[index] : 101;
    const nextBand = band(lowerBound, upperBound, entry.color, entry.label);
    lowerBound = upperBound;
    return nextBand;
  });
}

function srgbToLinear(encoded: number) {
  const value = Math.min(Math.max(encoded, 0), 1);
  if (value <= 0.04045) {
    return value / 12.92;
  }
  return Math.pow((value + 0.055) / 1.055, 2.4);
}

function linearToSRGB(linear: number) {
  const value = Math.min(Math.max(linear, 0), 1);
  if (value <= 0.0031308) {
    return value * 12.92;
  }
  return (1.055 * Math.pow(value, 1 / 2.4)) - 0.055;
}

function rgbCSS(color: RGB) {
  return `rgb(${Math.round(color[0] * 255)} ${Math.round(color[1] * 255)} ${Math.round(color[2] * 255)})`;
}

function formatRange(band: Band) {
  const upperBound = Math.min(band.upperBound, 100);
  return `${formatNumber(band.lowerBound)}-${formatNumber(upperBound)} IRE`;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}
