import { notFound } from "next/navigation";
import { HomePage } from "../HomePage";
import {
  defaultLocale,
  isSupportedLocale,
  localizedMetadata,
  supportedLocales,
} from "../localization";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  return localizedMetadata(locale);
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale) || locale === defaultLocale) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
