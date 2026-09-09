/**
 * Camada única de tracking.
 * Pronta para GA4 / GTM — basta os scripts existirem na página.
 */
export type TrackEvent =
  | "page_view"
  | "hero_cta_click"
  | "benefits_cta_click"
  | "schedule_cta_click"
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
  | "checkout_start"
  | "sponsor_whatsapp_click"
  | "gallery_photo_open"
  | "gallery_cta_click"
  | "personal_organizer_whatsapp_click"
  | "editorial_page_view"
  | "editorial_scroll_depth"
  | "editorial_tickets_click"
  | "editorial_sticky_click"
  | "editorial_final_cta_click"
  | "editorial_video_play"
  | "editorial_video_complete"
  | "twofor1_page_view"
  | "twofor1_hero_cta_click"
  | "twofor1_ticket_click"
  | "twofor1_sticky_click"
  | "twofor1_timer_expired"
  | "twofor1_whatsapp_click";


declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", event, params);
  window.dataLayer?.push({ event, ...params });

  if (import.meta.env.DEV) console.debug("[track]", event, params);
}
