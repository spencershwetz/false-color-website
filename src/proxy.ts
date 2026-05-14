import { NextResponse, type NextRequest } from "next/server";

const selectableLocales = new Set([
  "ar-SA",
  "bn-BD",
  "ca",
  "cs",
  "da",
  "de-DE",
  "el",
  "en-US",
  "es-ES",
  "es-MX",
  "fi",
  "fr-CA",
  "fr-FR",
  "gu-IN",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "kn-IN",
  "ko",
  "ml-IN",
  "mr-IN",
  "ms",
  "nl-NL",
  "no",
  "or-IN",
  "pa-IN",
  "pl",
  "pt-BR",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl-SI",
  "sv",
  "ta-IN",
  "te-IN",
  "th",
  "tr",
  "uk",
  "ur-PK",
  "vi",
  "zh-Hans",
  "zh-Hant",
]);

function localizedPath(locale: string) {
  return locale === "en-US" ? "/" : `/${locale}`;
}

export function proxy(request: NextRequest) {
  const requestedLanguage = request.nextUrl.searchParams.get("language");

  if (!requestedLanguage || !selectableLocales.has(requestedLanguage)) {
    return NextResponse.next();
  }

  const targetPath = localizedPath(requestedLanguage);

  if (request.nextUrl.pathname === targetPath) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = targetPath;
  url.searchParams.delete("language");

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};
