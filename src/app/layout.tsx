import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { Analytics } from "./analytics";
import { siteUrl } from "./site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "False Color Viewer | iOS, iPadOS, and macOS Exposure Maps",
    template: "%s | False Color Viewer",
  },
  description:
    "Import photos and videos on iOS, iPadOS, and macOS to inspect exposure with local false color overlays, EL Zone, ARRI, Blackmagic, and custom exposure maps.",
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
    "macOS false color",
    "macOS exposure app",
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
    title: "False Color Viewer | iOS, iPadOS, and macOS Exposure Maps",
    description:
      "Check exposure locally with false color overlays for imported photos and videos on iOS, iPadOS, and macOS.",
    url: siteUrl,
    siteName: "False Color Viewer",
    images: [
      {
        url: "/product/backlight-el-zone.jpg",
        width: 1920,
        height: 800,
        alt: "EL Zone false color exposure preview scene",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "False Color Viewer | iOS, iPadOS, and macOS Exposure Maps",
  description:
      "Import photos and videos on iOS, iPadOS, and macOS to inspect exposure with local false color overlays.",
    images: ["/product/backlight-el-zone.jpg"],
  },
  appleWebApp: {
    title: "False Color Viewer",
  },
  other: {
    "apple-itunes-app": "app-id=6761836595",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        {children}
        <VercelAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
