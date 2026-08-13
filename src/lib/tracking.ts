/**
 * Camada única de tracking.
 * Pronta para Meta Pixel / GA4 / GTM — basta os scripts existirem na página.
 */
export type TrackEvent =
  | "page_view"
  | "hero_cta_click"
  | "benefits_cta_click"
  | "video_play"
  | "video_cta_click"
  | "ticket_section_view"
  | "ticket_compromisso_click"
  | "ticket_vip_click"
  | "ticket_platinum_click"
  | "sticky_cta_click"
  | "final_cta_click"
  | "whatsapp_floating_click"
  | "whatsapp_tickets_click"
  | "testimonial_video_play"
  | "checkout_start";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...params };

  window.dataLayer?.push(payload);
  window.gtag?.("event", event, params);
  window.fbq?.("trackCustom", event, params);

  if (import.meta.env.DEV) console.debug("[track]", event, params);
}
