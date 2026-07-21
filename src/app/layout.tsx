import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { Analytics } from "./analytics";
import { defaultLocale, textDirection } from "./localization";
import { ogImagePath, siteUrl } from "./site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const rootDescription =
  "Import photos and videos on iOS and iPadOS to inspect exposure with local false color overlays—EL Zone, ARRI, Blackmagic, and custom maps.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "False Color Viewer | iOS & iPadOS Exposure Maps",
    template: "%s | False Color Viewer",
  },
  description: rootDescription,
  applicationName: "False Color Viewer",
  category: "Photo & Video",
  keywords: [
    "false color viewer",
    "false color exposure",
    "exposure map",
    "cinematography app",
    "iOS false color",
    "false color app for iOS",
    "iOS exposure app",
    "iPadOS false color",
    "iPadOS exposure app",
    "video exposure",
    "photo exposure",
    "EL Zone",
    "ARRI false color",
    "Blackmagic false color",
    "IRE exposure",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "False Color Viewer | iOS & iPadOS Exposure Maps",
    description:
      "Check exposure locally with false color overlays for imported photos and videos on iOS and iPadOS.",
    url: siteUrl,
    siteName: "False Color Viewer",
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: "False Color Viewer — local false color exposure maps for iOS and iPadOS",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "False Color Viewer | iOS & iPadOS Exposure Maps",
    description:
      "Import photos and videos on iOS and iPadOS to inspect exposure with local false color overlays.",
    images: [ogImagePath],
  },
  appleWebApp: {
    title: "False Color Viewer",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "apple-itunes-app": "app-id=6761836595",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const locale = headerStore.get("x-locale") ?? defaultLocale;
  const dir =
    headerStore.get("x-locale-dir") ?? textDirection(locale);

  return (
    <html lang={locale} dir={dir} className={geistSans.variable}>
      <body>
        {children}
        <VercelAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
