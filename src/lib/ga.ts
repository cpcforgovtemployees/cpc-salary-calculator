// src/lib/ga.ts

declare global {
  interface Window {
    gtag: any;
  }
}

export const trackEvent = (
  eventName: string,
  params?: { [key: string]: any }
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  } else {
    console.warn("GA4 not initialized yet:", eventName, params);
  }
};
