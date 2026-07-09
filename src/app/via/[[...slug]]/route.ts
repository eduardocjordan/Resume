import { NextRequest, NextResponse } from "next/server";

// Short, application-friendly attribution links (see ANALYTICS.md §UTM):
//
//   /via/pepsico                                → /?utm_source=pepsico&utm_medium=application
//   /via/pepsico/resume-pdf                     → /?utm_source=pepsico&utm_medium=resume-pdf
//   /via/pepsico/application/brand-dir-2026-07  → …&utm_campaign=brand-dir-2026-07
//
// Segments are [source, medium?, campaign?]. Medium defaults to "application"
// (the most common share context). Values are normalized to lowercase
// [a-z0-9-] so GA4 never sees case/whitespace variants of the same company.

const DEFAULT_MEDIUM = "application";

function normalize(segment: string | undefined): string | null {
  if (!segment) return null;
  const cleaned = decodeURIComponent(segment)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
  return cleaned || null;
}

export function GET(request: NextRequest, { params }: { params: { slug?: string[] } }) {
  const [source, medium, campaign] = (params.slug ?? []).map((s) => normalize(s));

  const destination = new URL("/", request.nextUrl.origin);
  if (source) {
    destination.searchParams.set("utm_source", source);
    destination.searchParams.set("utm_medium", medium ?? DEFAULT_MEDIUM);
    if (campaign) destination.searchParams.set("utm_campaign", campaign);
  }

  return NextResponse.redirect(destination, 302);
}
