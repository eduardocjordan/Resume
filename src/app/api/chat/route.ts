import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import { CHAT_MODEL } from "@/lib/constants";
import { ensureSession, getSessionTranscript, logMessage, touchSessionAfterMessage } from "@/lib/db";
import type { ChatSession } from "@/lib/db";
import { runFinalizationSweep } from "@/lib/insights";
import { loadKnowledgeBase } from "@/lib/knowledge";
import {
  DEAD_END_MESSAGE,
  UNAVAILABLE_MESSAGE,
  isDailySpendCeilingExceeded,
  isOverMessageCap,
  recordUsage,
} from "@/lib/sessionGuard";
import { buildSystemPrompt } from "@/lib/systemPrompt";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGE_LENGTH = 4000;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  let body: { sessionId?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const sessionId =
    typeof body.sessionId === "string" && UUID_PATTERN.test(body.sessionId) ? body.sessionId : randomUUID();
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  let session: ChatSession;
  let countAfterUserMessage: number;
  let transcript: { role: string; content: string }[];
  try {
    session = await ensureSession(sessionId);

    if (isOverMessageCap(session.message_count)) {
      return NextResponse.json({ sessionId, reply: DEAD_END_MESSAGE, sessionCapped: true });
    }

    if (await isDailySpendCeilingExceeded()) {
      return NextResponse.json({ sessionId, reply: UNAVAILABLE_MESSAGE, unavailable: true });
    }

    await logMessage(sessionId, "user", message);
    countAfterUserMessage = await touchSessionAfterMessage(sessionId, session.message_count);
    transcript = await getSessionTranscript(sessionId);
  } catch (error) {
    console.error("Pre-LLM session/database step failed", error);
    return NextResponse.json({ sessionId, reply: UNAVAILABLE_MESSAGE, unavailable: true });
  }

  const knowledge = loadKnowledgeBase();
  const system = buildSystemPrompt(knowledge);
  const messages = transcript.map((m) => ({
    role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
    content: m.content,
  }));

  let replyText: string;
  try {
    const anthropic = getAnthropicClient();
    const response = await anthropic.messages.create({
      model: CHAT_MODEL,
      max_tokens: 1024,
      temperature: 0.3,
      system,
      messages,
    });

    replyText = response.content
      .filter((block): block is { type: "text"; text: string } => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!replyText) {
      replyText = "I wasn't able to put together a reply to that — could you try rephrasing?";
    }

    await recordUsage(response.usage);
  } catch (error) {
    console.error("Claude API call failed", error);
    replyText =
      "Something went wrong on my end. Please try again, or reach out to Eduardo directly at eduardo@casjor.com.";
  }

  await logMessage(sessionId, "assistant", replyText);
  await touchSessionAfterMessage(sessionId, countAfterUserMessage);

  // Vercel Hobby cron only runs once/day, too coarse for "summarize shortly after a session
  // goes idle." Piggybacking a small sweep on live chat traffic gets closer to that intent;
  // the daily cron route is the guaranteed backstop for idle periods with no chat traffic at all.
  // Best-effort and isolated from the reply above — a failure here must never affect the user's reply.
  try {
    await runFinalizationSweep({ limit: 1, excludeSessionId: sessionId });
  } catch (error) {
    console.error("Opportunistic finalization sweep failed", error);
  }

  return NextResponse.json({ sessionId, reply: replyText });
}
