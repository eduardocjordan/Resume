import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  }

  client = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
  return client;
}

export type ChatSession = {
  id: string;
  message_count: number;
  finalized: boolean;
};

export async function ensureSession(sessionId: string): Promise<ChatSession> {
  const db = getSupabaseClient();

  const { data: existing, error: selectError } = await db
    .from("chat_sessions")
    .select("id, message_count, finalized")
    .eq("id", sessionId)
    .maybeSingle();
  if (selectError) throw selectError;
  if (existing) return existing as ChatSession;

  const { data: created, error: insertError } = await db
    .from("chat_sessions")
    .insert({ id: sessionId })
    .select("id, message_count, finalized")
    .single();
  if (insertError) throw insertError;
  return created as ChatSession;
}

export async function logMessage(sessionId: string, role: "user" | "assistant", content: string): Promise<void> {
  const db = getSupabaseClient();
  const { error } = await db.from("chat_messages").insert({ session_id: sessionId, role, content });
  if (error) throw error;
}

export async function touchSessionAfterMessage(sessionId: string, currentCount: number): Promise<number> {
  const db = getSupabaseClient();
  const nextCount = currentCount + 1;
  const { error } = await db
    .from("chat_sessions")
    .update({ message_count: nextCount, last_activity_at: new Date().toISOString() })
    .eq("id", sessionId);
  if (error) throw error;
  return nextCount;
}

export async function getSessionTranscript(sessionId: string): Promise<{ role: string; content: string }[]> {
  const db = getSupabaseClient();
  const { data, error } = await db
    .from("chat_messages")
    .select("role, content")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function findIdleUnfinalizedSessions(
  idleMinutes: number,
  limit: number,
  excludeSessionId?: string
): Promise<string[]> {
  const db = getSupabaseClient();
  const cutoff = new Date(Date.now() - idleMinutes * 60_000).toISOString();

  let query = db
    .from("chat_sessions")
    .select("id")
    .eq("finalized", false)
    .lt("last_activity_at", cutoff)
    .order("last_activity_at", { ascending: true })
    .limit(limit);
  if (excludeSessionId) {
    query = query.neq("id", excludeSessionId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((row) => row.id as string);
}

export async function markSessionFinalized(sessionId: string): Promise<void> {
  const db = getSupabaseClient();
  const { error } = await db
    .from("chat_sessions")
    .update({ finalized: true, finalized_at: new Date().toISOString() })
    .eq("id", sessionId);
  if (error) throw error;
}

export type SessionSummaryRecord = {
  narrativeSummary: string;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  statedIntent?: string | null;
  jobDescriptionText?: string | null;
  salaryFigureMentioned?: string | null;
};

export async function saveSessionSummary(sessionId: string, summary: SessionSummaryRecord): Promise<void> {
  const db = getSupabaseClient();
  const { error } = await db.from("chat_session_summaries").upsert({
    session_id: sessionId,
    narrative_summary: summary.narrativeSummary,
    contact_name: summary.contactName ?? null,
    contact_email: summary.contactEmail ?? null,
    contact_phone: summary.contactPhone ?? null,
    stated_intent: summary.statedIntent ?? null,
    job_description_text: summary.jobDescriptionText ?? null,
    salary_figure_mentioned: summary.salaryFigureMentioned ?? null,
    emailed_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export type UsageDelta = {
  inputTokens: number;
  outputTokens: number;
  cacheCreationInputTokens: number;
  cacheReadInputTokens: number;
};

type DailyUsageRow = {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number;
  cache_read_input_tokens: number;
};

export async function getDailyUsage(usageDate: string): Promise<DailyUsageRow | null> {
  const db = getSupabaseClient();
  const { data, error } = await db
    .from("chat_daily_usage")
    .select("input_tokens, output_tokens, cache_creation_input_tokens, cache_read_input_tokens")
    .eq("usage_date", usageDate)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Read-modify-write, not an atomic increment. Acceptable here only because traffic on a
// personal site is low enough that a lost update would undercount spend by a few cents,
// never silently disable the cap entirely.
export async function addDailyUsage(usageDate: string, delta: UsageDelta): Promise<void> {
  const db = getSupabaseClient();
  const existing = await getDailyUsage(usageDate);

  const { error } = await db.from("chat_daily_usage").upsert({
    usage_date: usageDate,
    input_tokens: (existing?.input_tokens ?? 0) + delta.inputTokens,
    output_tokens: (existing?.output_tokens ?? 0) + delta.outputTokens,
    cache_creation_input_tokens: (existing?.cache_creation_input_tokens ?? 0) + delta.cacheCreationInputTokens,
    cache_read_input_tokens: (existing?.cache_read_input_tokens ?? 0) + delta.cacheReadInputTokens,
  });
  if (error) throw error;
}
