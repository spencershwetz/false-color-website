import type { MetadataRoute } from "next";
import {
  languageAlternates,
  localeUrl,
  supportedLocales,
} from "./localization";
import { siteUrl } from "./site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...languageAlternates(),
    "x-default": siteUrl,
  };

  return supportedLocales.map((locale) => ({
      url: localeUrl(locale),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: locale === "en-US" ? 1 : 0.85,
      alternates: {
        languages,
      },
    }));
}
