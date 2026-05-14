"use client";

import { track } from "@vercel/analytics";
import Image from "next/image";
import type { AnchorHTMLAttributes } from "react";
import { appStoreUrl } from "./site";
import { storeBadgeAssets, type StoreBadgeKind } from "./storeBadgeAssets";

type AppStoreLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  locale: string;
  location: string;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, string>,
    ) => void;
  }
}

export function AppStoreLink({
  locale,
  location,
  onClick,
  "aria-label": ariaLabel = "False Color Viewer",
  ...props
}: AppStoreLinkProps) {
  const badge = badgeAsset(locale, "appStore");

  return (
    <a
      {...props}
      href={props.href ?? appStoreUrl}
      onClick={(event) => {
        track("App Store Click", {
          location,
          app_name: "False Color Viewer",
          outbound_url: appStoreUrl,
        });
        window.gtag?.("event", "app_store_click", {
          location,
          app_name: "False Color Viewer",
          outbound_url: appStoreUrl,
        });
        onClick?.(event);
      }}
      aria-label={ariaLabel}
    >
      <Image
        src={badge.src}
        alt={ariaLabel}
        width={badge.width}
        height={badge.height}
        unoptimized
      />
    </a>
  );
}

export function MacAppStoreComingSoon({
  label = "False Color Viewer",
  locale,
}: {
  label?: string;
  locale: string;
}) {
  const badge = badgeAsset(locale, "macAppStore");

  return (
    <span
      aria-label={label}
      className="macStoreSoon"
      role="status"
    >
      <Image
        src={badge.src}
        alt={label}
        width={badge.width}
        height={badge.height}
        unoptimized
      />
    </span>
  );
}

function badgeAsset(locale: string, kind: StoreBadgeKind) {
  if (locale in storeBadgeAssets) {
    return storeBadgeAssets[locale as keyof typeof storeBadgeAssets][kind];
  }

  return storeBadgeAssets["en-US"][kind];
}
