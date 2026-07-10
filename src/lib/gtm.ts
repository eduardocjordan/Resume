// Single home for dataLayer pushes (client-side only). Event names and
// parameters are inventoried in ANALYTICS.md — update it when adding events.

export function pushGtmEvent(event: string, extra?: Record<string, unknown>) {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...extra });
}

// Sets persistent dataLayer state without firing an event — GTM variables
// read the latest value at event time (used for chat_session_id so GA4 can
// join a session to the Supabase lead record's Session ID).
export function setGtmState(state: Record<string, unknown>) {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(state);
}
