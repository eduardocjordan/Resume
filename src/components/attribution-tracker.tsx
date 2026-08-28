"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

// Runs once per page view — see src/lib/attribution.ts for what it persists and why.
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution(window.location.search);
  }, []);

  return null;
}
