"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    // gtag page view
    window.gtag?.("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  // Don't render script tags if no GA ID
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Helper to track events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
