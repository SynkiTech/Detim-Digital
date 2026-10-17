import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import { Loader } from "@/components/shared/Loader";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Cursor } from "@/components/shared/Cursor";
import { RouteTransitionProvider } from "@/components/shared/RouteTransition";
import { site } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} | ${site.person}`,
  description:
    "One site, two ways to work with Oluwadetimi Ajayi: take your product to market, or win funding and plan your growth. Choose where to go next.",
  openGraph: {
    title: `${site.name} | ${site.person}`,
    description:
      "Take your product to market, or win funding and plan your growth. Choose where to go next.",
    url: siteUrl,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.person}`,
    description:
      "Take your product to market, or win funding and plan your growth. Choose where to go next.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${instrument.variable} ${inter.variable} ${jetbrains.variable} antialiased bg-ink text-paper font-sans`}
      >
        {/* Restore the saved day/night mode before first paint (no flash).
            Night is the default; the ThemeToggle writes "dd-mode". */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("dd-mode")==="day"){document.documentElement.dataset.mode="day"}}catch(e){}`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:font-bold focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Loader />
        <ScrollProgress />
        <Cursor />
        <RouteTransitionProvider>
          {children}
        </RouteTransitionProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
