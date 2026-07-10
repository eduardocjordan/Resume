import { NextRequest, NextResponse } from "next/server";

// Short, application-friendly attribution links (see ANALYTICS.md §UTM):
//
//   /via/linkedin                                    → /?utm_source=linkedin&utm_medium=social
//   /via/resume                                      → /?utm_source=resume&utm_medium=document
//   /via/linkedin/pepsico                            → …&utm_campaign=pepsico
//   /via/linkedin/pepsico/marketing-director-2026-07 → …&utm_content=marketing-director-2026-07
//
// Segments are [source, company?, campaign?]. Source is the channel the click
// came from (linkedin, resume, application, email, …) and drives the medium
// lookup below; company is the target company (utm_campaign); campaign is
// the specific role + date (utm_content). Values are normalized to lowercase
// [a-z0-9-] so GA4 never sees case/whitespace variants of the same source or
// company.

const MEDIUM_BY_SOURCE: Record<string, string> = {
  linkedin: "social",
  resume: "document",
  application: "referral",
  email: "email",
};
const DEFAULT_MEDIUM = "referral";

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
  const [source, company, campaign] = (params.slug ?? []).map((s) => normalize(s));

  const destination = new URL("/", request.nextUrl.origin);
  if (source) {
    destination.searchParams.set("utm_source", source);
    destination.searchParams.set("utm_medium", MEDIUM_BY_SOURCE[source] ?? DEFAULT_MEDIUM);
    if (company) destination.searchParams.set("utm_campaign", company);
    if (campaign) destination.searchParams.set("utm_content", campaign);
  }

  return NextResponse.redirect(destination, 302);
}
