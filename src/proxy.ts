import { NextResponse, type NextRequest } from "next/server";

/** Locales offered by the language selector / ?language= redirect. */
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

/** All routed locale prefixes (includes regional English variants). */
const routedLocales = new Set([
  ...selectableLocales,
  "en-AU",
  "en-CA",
  "en-GB",
]);

const rtlLocales = new Set(["ar-SA", "he", "ur-PK"]);

function localizedPath(locale: string) {
  return locale === "en-US" ? "/" : `/${locale}`;
}

function localeFromPathname(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];

  if (segment && routedLocales.has(segment)) {
    return segment;
  }

  return "en-US";
}

function withLocaleHeaders(request: NextRequest, locale: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-locale-dir", rtlLocales.has(locale) ? "rtl" : "ltr");
  return requestHeaders;
}

export function proxy(request: NextRequest) {
  const requestedLanguage = request.nextUrl.searchParams.get("language");

  if (requestedLanguage && selectableLocales.has(requestedLanguage)) {
    const targetPath = localizedPath(requestedLanguage);

    if (request.nextUrl.pathname !== targetPath) {
      const url = request.nextUrl.clone();
      url.pathname = targetPath;
      url.searchParams.delete("language");
      return NextResponse.redirect(url);
    }
  }

  const locale = localeFromPathname(request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: withLocaleHeaders(request, locale),
    },
  });
}

export const config = {
  matcher: ["/", "/((?!_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
