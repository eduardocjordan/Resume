import { NextRequest, NextResponse } from "next/server";
import { runFinalizationSweep } from "@/lib/insights";

export const runtime = "nodejs";
export const maxDuration = 60;

const SWEEP_BATCH_LIMIT = 50;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const finalizedCount = await runFinalizationSweep({ limit: SWEEP_BATCH_LIMIT });
  return NextResponse.json({ finalizedCount });
}
