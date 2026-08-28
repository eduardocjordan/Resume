import { setGtmState } from "./gtm";

// Persists the visitor's most recent tagged (/via/...) landing across later
// same-browser visits, as dataLayer state read into every subsequent event.
// GA4 attributes each session only to that session's own URL params — a
// recruiter who returns days later by typing the URL or a bookmark shows up
// as a fresh, unattributed session. This keeps the last known campaign
// attached to that visitor's later events too, within a bounded window.

const STORAGE_KEY = "casjor_attribution";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days — a job-search follow-up window, not indefinite
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

type StoredAttribution = {
  t: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

// Runs once per page view (see AttributionTracker). If the URL carries fresh
// UTM params, stores and uses those; otherwise falls back to the last stored
// touch, if any and not stale.
export function captureAttribution(search: string): void {
  const params = new URLSearchParams(search);
  const found: Partial<StoredAttribution> = {};
  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }

  let attribution: StoredAttribution | null = null;

  if (Object.keys(found).length > 0) {
    attribution = { ...found, t: Date.now() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    } catch {
      // Storage unavailable (private mode, quota) — still push this visit's own params below.
    }
  } else {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const stored = raw ? (JSON.parse(raw) as StoredAttribution) : null;
      if (stored && Date.now() - stored.t <= MAX_AGE_MS) attribution = stored;
    } catch {
      attribution = null;
    }
  }

  if (!attribution) return;

  setGtmState({
    stored_utm_source: attribution.utm_source ?? null,
    stored_utm_medium: attribution.utm_medium ?? null,
    stored_utm_campaign: attribution.utm_campaign ?? null,
    stored_utm_content: attribution.utm_content ?? null,
  });
}
