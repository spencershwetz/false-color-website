import type { Metadata } from "next";
import { appStoreLocaleContent } from "./appStoreLocaleContent";
import { siteUrl } from "./site";

export type LocaleContent = {
  locale: (typeof supportedLocales)[number];
  name: string;
  subtitle: string;
  descriptionLines: string[];
  keywords: string[];
  promotionalText: string;
  customLabel: string;
};

export const defaultLocale = "en-US";

export const supportedLocales = [
  "ar-SA",
  "bn-BD",
  "ca",
  "cs",
  "da",
  "de-DE",
  "el",
  "en-AU",
  "en-CA",
  "en-GB",
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
] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const languageLabels: Record<SupportedLocale, string> = {
  "ar-SA": "العربية",
  "bn-BD": "বাংলা",
  ca: "Catala",
  cs: "Cestina",
  da: "Dansk",
  "de-DE": "Deutsch",
  el: "Ελληνικά",
  "en-AU": "English (Australia)",
  "en-CA": "English (Canada)",
  "en-GB": "English (UK)",
  "en-US": "English",
  "es-ES": "Espanol",
  "es-MX": "Espanol (Mexico)",
  fi: "Suomi",
  "fr-CA": "Francais (Canada)",
  "fr-FR": "Francais",
  "gu-IN": "ગુજરાતી",
  he: "עברית",
  hi: "हिन्दी",
  hr: "Hrvatski",
  hu: "Magyar",
  id: "Indonesia",
  it: "Italiano",
  ja: "日本語",
  "kn-IN": "ಕನ್ನಡ",
  ko: "한국어",
  "ml-IN": "മലയാളം",
  "mr-IN": "मराठी",
  ms: "Melayu",
  "nl-NL": "Nederlands",
  no: "Norsk",
  "or-IN": "ଓଡ଼ିଆ",
  "pa-IN": "ਪੰਜਾਬੀ",
  pl: "Polski",
  "pt-BR": "Portugues (Brasil)",
  "pt-PT": "Portugues (Portugal)",
  ro: "Romana",
  ru: "Русский",
  sk: "Slovencina",
  "sl-SI": "Slovenscina",
  sv: "Svenska",
  "ta-IN": "தமிழ்",
  "te-IN": "తెలుగు",
  th: "ไทย",
  tr: "Turkce",
  uk: "Українська",
  "ur-PK": "اردو",
  vi: "Tieng Viet",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
};

export const languageSelectorLocales = [
  "en-US",
  "ar-SA",
  "bn-BD",
  "ca",
  "cs",
  "da",
  "de-DE",
  "el",
  "es-ES",
  "es-MX",
  "fi",
  "fr-FR",
  "fr-CA",
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
] as const satisfies readonly SupportedLocale[];

export const browserLanguageLocaleMap: Record<string, SupportedLocale> = {
  ar: "ar-SA",
  bn: "bn-BD",
  ca: "ca",
  cs: "cs",
  da: "da",
  de: "de-DE",
  el: "el",
  en: "en-US",
  es: "es-ES",
  fi: "fi",
  fr: "fr-FR",
  gu: "gu-IN",
  he: "he",
  hi: "hi",
  hr: "hr",
  hu: "hu",
  id: "id",
  it: "it",
  ja: "ja",
  kn: "kn-IN",
  ko: "ko",
  ml: "ml-IN",
  mr: "mr-IN",
  ms: "ms",
  nl: "nl-NL",
  no: "no",
  nb: "no",
  or: "or-IN",
  pa: "pa-IN",
  pl: "pl",
  pt: "pt-PT",
  ro: "ro",
  ru: "ru",
  sk: "sk",
  sl: "sl-SI",
  sv: "sv",
  ta: "ta-IN",
  te: "te-IN",
  th: "th",
  tr: "tr",
  uk: "uk",
  ur: "ur-PK",
  vi: "vi",
  zh: "zh-Hans",
};

const customLabels: Partial<Record<(typeof supportedLocales)[number], string>> = {
  "ar-SA": "مخصص",
  "bn-BD": "কাস্টম",
  ca: "Personalitzat",
  cs: "Vlastní",
  da: "Brugerdefineret",
  "de-DE": "Benutzerdefiniert",
  el: "Προσαρμοσμένο",
  "en-AU": "Custom",
  "en-CA": "Custom",
  "en-GB": "Custom",
  "en-US": "Custom",
  "es-ES": "personalizado",
  "es-MX": "personalizado",
  fi: "Mukautettu",
  "fr-CA": "Personnalisé",
  "fr-FR": "Personnalisé",
  "gu-IN": "કસ્ટમ",
  he: "מותאם אישית",
  hi: "कस्टम",
  hr: "Custom",
  hu: "Egyedi",
  id: "Adat",
  it: "Personalizzato",
  ja: "カスタム",
  "kn-IN": "ಕಸ್ಟಮ್",
  ko: "맞춤",
  "ml-IN": "കസ്റ്റം",
  "mr-IN": "सानुकूल",
  ms: "Adat",
  "nl-NL": "Aangepast",
  no: "Egendefinert",
  "or-IN": "କଷ୍ଟମ୍",
  "pa-IN": "ਕਸਟਮ",
  pl: "Niestandardowe",
  "pt-BR": "Personalizado",
  "pt-PT": "Personalizado",
  ro: "Personalizat",
  ru: "Пользовательский",
  sk: "Vlastné",
  "sl-SI": "Po meri",
  sv: "Anpassad",
  "ta-IN": "தனிப்பயன்",
  "te-IN": "కస్టమ్",
  th: "กำหนดเอง",
  tr: "Özel",
  uk: "Custom",
  "ur-PK": "حسب ضرورت",
  vi: "tùy chỉnh",
  "zh-Hans": "定制",
  "zh-Hant": "客製化",
};

export function isSupportedLocale(locale: string): locale is (typeof supportedLocales)[number] {
  return supportedLocales.includes(locale as (typeof supportedLocales)[number]);
}

export function localePath(locale: string) {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

export function localeUrl(locale: string) {
  return `${siteUrl}${localePath(locale)}`;
}

export function getLocaleContent(locale = defaultLocale): LocaleContent {
  const resolvedLocale = isSupportedLocale(locale) ? locale : defaultLocale;
  const content = appStoreLocaleContent[resolvedLocale];

  return {
    locale: resolvedLocale,
    name: content.name,
    subtitle: content.subtitle,
    descriptionLines: [...content.descriptionLines],
    keywords: [...content.keywords],
    promotionalText: content.promotionalText,
    customLabel: customLabels[resolvedLocale] ?? "Custom",
  };
}

export function seoDescription(content: LocaleContent) {
  const description = content.descriptionLines.slice(0, 3).join(" ");
  return `${description} iOS, iPadOS, macOS, EL Zone, ARRI, Blackmagic, Custom.`;
}

export function languageAlternates() {
  return Object.fromEntries(
    supportedLocales.map((locale) => [locale, localeUrl(locale)]),
  );
}

export function textDirection(locale: string) {
  return ["ar-SA", "he", "ur-PK"].includes(locale) ? "rtl" : "ltr";
}

export function localizedMetadata(locale = defaultLocale): Metadata {
  const content = getLocaleContent(locale);
  const url = localeUrl(content.locale);
  const description = seoDescription(content);

  return {
    title: {
      absolute: `${content.name} | ${content.subtitle}`,
    },
    description,
    keywords: [
      ...content.keywords,
      "false color viewer",
      "false color app for iOS",
      "iOS false color",
      "iPadOS false color",
      "macOS false color",
      "EL Zone",
      "ARRI false color",
      "Blackmagic false color",
    ],
    alternates: {
      canonical: url,
      languages: {
        ...languageAlternates(),
        "x-default": siteUrl,
      },
    },
    openGraph: {
      title: `${content.name} | ${content.subtitle}`,
      description,
      url,
      siteName: content.name,
      images: [
        {
          url: "/product/backlight-el-zone.jpg",
          width: 1920,
          height: 800,
          alt: content.subtitle,
        },
      ],
      locale: content.locale.replace("-", "_"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.name} | ${content.subtitle}`,
      description,
      images: ["/product/backlight-el-zone.jpg"],
    },
    other: {
      "apple-itunes-app": "app-id=6761836595",
    },
  };
}

export const appStoreLocalesSource =
  "asc localizations supported-locales --version 3c479887-533b-4d87-bdf3-890f59fcff59";
