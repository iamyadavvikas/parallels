import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import AmbientOrb from "@/components/layout/AmbientOrb";
import CommandPalette from "@/components/ui/CommandPalette";
import AmbientPlayer from "@/components/ui/AmbientPlayer";
import PageTransition from "@/components/ui/PageTransition";
import UIReviewAgent from "@/components/ui/UIReviewAgent";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { Analytics } from "@/components/analytics/Analytics";

const SITE_URL = "https://parallels-ten.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Parallels — Explore Sacred Scriptures",
    template: "%s | Parallels",
  },
  description:
    "Browse, search, and compare passages from the world's major religious texts — Bible, Quran, Bhagavad Gita, Torah, Guru Granth Sahib, and Dhammapada — side by side.",
  keywords: [
    "holy books",
    "sacred texts",
    "Bible",
    "Quran",
    "Bhagavad Gita",
    "Torah",
    "Guru Granth Sahib",
    "Dhammapada",
    "interfaith",
    "comparative religion",
    "scripture comparison",
    "religious texts online",
  ],
  authors: [{ name: "Parallels" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Parallels",
    title: "Parallels — Explore Sacred Scriptures",
    description:
      "Browse, search, and compare passages from the world's major religious texts side by side.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parallels — Explore Sacred Scriptures",
    description:
      "Browse, search, and compare passages from the world's major religious texts side by side.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-512.png",
  },
  themeColor: "#FFD966",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Parallels",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#FFD966" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{})})}`,
          }}
        />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void focus:shadow-lg">
            Skip to content
          </a>
          <AmbientOrb />
          <CommandPalette />
          <AmbientPlayer />
          <UIReviewAgent />
          <Navbar />
          <main id="main-content" className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-8 md:pb-8">
            <ErrorBoundary>
              <PageTransition>{children}</PageTransition>
            </ErrorBoundary>
          </main>
          <footer className="relative z-10 hidden md:block py-10 text-center">
            <div className="footer-accent-line mx-auto mb-6 max-w-md" />
            <p className="text-xs text-text-muted font-mono tracking-[0.15em] uppercase">
              Parallels — Exploring wisdom across traditions
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
