import type { Metadata } from "next";
import { HomePage } from "./HomePage";
import { defaultLocale, localizedMetadata } from "./localization";

export const metadata: Metadata = localizedMetadata(defaultLocale);

export default function Home() {
  return <HomePage locale={defaultLocale} />;
}
