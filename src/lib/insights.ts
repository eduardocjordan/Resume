import { getAnthropicClient } from "./anthropic";
import { CHAT_MODEL, SESSION_IDLE_MINUTES } from "./constants";
import {
  findIdleUnfinalizedSessions,
  getSessionTranscript,
  markSessionFinalized,
  saveSessionSummary,
  type SessionSummaryRecord,
} from "./db";
import { sendSessionSummaryEmail } from "./email";

const SUMMARY_SYSTEM_PROMPT =
  "You read a transcript between a visitor and a chatbot on Eduardo Castro's personal site, and extract only " +
  "what the visitor explicitly volunteered. Do not infer, guess, or profile beyond what is literally stated. " +
  "Use null for anything not explicitly mentioned. Call the record_session_summary tool exactly once.";

const SUMMARY_TOOL = {
  name: "record_session_summary",
  description: "Records what a visitor volunteered during a chat session.",
  input_schema: {
    type: "object" as const,
    properties: {
      narrativeSummary: {
        type: "string",
        description: "2-4 sentence plain summary of what the visitor was asking about and why.",
      },
      contactName: { type: ["string", "null"], description: "Name, if volunteered." },
      contactEmail: { type: ["string", "null"], description: "Email address, if volunteered." },
      contactPhone: { type: ["string", "null"], description: "Phone number, if volunteered." },
      statedIntent: {
        type: ["string", "null"],
        description: "What the visitor said they wanted (e.g. hiring, collaborating, curious).",
      },
      jobDescriptionText: { type: ["string", "null"], description: "Job description text, if shared." },
      salaryFigureMentioned: {
        type: ["string", "null"],
        description: "Any salary or budget figure the visitor disclosed, verbatim.",
      },
    },
    required: ["narrativeSummary"],
  },
};

async function generateSessionSummary(sessionId: string): Promise<SessionSummaryRecord | null> {
  const transcript = await getSessionTranscript(sessionId);
  if (transcript.length === 0) return null;

  const transcriptText = transcript.map((m) => `${m.role === "user" ? "Visitor" : "Bot"}: ${m.content}`).join("\n");

  const anthropic = getAnthropicClient();
  const response = await anthropic.messages.create({
    model: CHAT_MODEL,
    max_tokens: 1024,
    system: SUMMARY_SYSTEM_PROMPT,
    messages: [{ role: "user", content: transcriptText }],
    tools: [SUMMARY_TOOL],
    tool_choice: { type: "tool", name: SUMMARY_TOOL.name },
  });

  const toolUse = response.content.find((block) => block.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") return null;

  const input = toolUse.input as Record<string, unknown>;
  return {
    narrativeSummary: String(input.narrativeSummary ?? ""),
    contactName: (input.contactName as string | null) ?? null,
    contactEmail: (input.contactEmail as string | null) ?? null,
    contactPhone: (input.contactPhone as string | null) ?? null,
    statedIntent: (input.statedIntent as string | null) ?? null,
    jobDescriptionText: (input.jobDescriptionText as string | null) ?? null,
    salaryFigureMentioned: (input.salaryFigureMentioned as string | null) ?? null,
  };
}

async function finalizeSession(sessionId: string): Promise<void> {
  const summary = await generateSessionSummary(sessionId);
  if (!summary) {
    await markSessionFinalized(sessionId);
    return;
  }

  await saveSessionSummary(sessionId, summary);
  await sendSessionSummaryEmail(sessionId, summary);
  await markSessionFinalized(sessionId);
}

export async function runFinalizationSweep(options: { limit: number; excludeSessionId?: string }): Promise<number> {
  const idleSessionIds = await findIdleUnfinalizedSessions(
    SESSION_IDLE_MINUTES,
    options.limit,
    options.excludeSessionId
  );

  let finalizedCount = 0;
  for (const sessionId of idleSessionIds) {
    try {
      await finalizeSession(sessionId);
      finalizedCount += 1;
    } catch (error) {
      console.error(`Failed to finalize session ${sessionId}`, error);
    }
  }
  return finalizedCount;
}
