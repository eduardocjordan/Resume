import { addDailyUsage, getDailyUsage, type UsageDelta } from "./db";

// Default cap. Configurable via CHAT_MESSAGE_CAP, but the cap itself must never be removed —
// only raised deliberately by changing the env var, never bypassed in code.
const DEFAULT_MESSAGE_CAP = 20;

export function getMessageCap(): number {
  const raw = process.env.CHAT_MESSAGE_CAP;
  const parsed = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MESSAGE_CAP;
}

export function isOverMessageCap(currentMessageCount: number): boolean {
  return currentMessageCount >= getMessageCap();
}

// Haiku 4.5 pricing, USD per million tokens. Cache write/read multipliers are Anthropic's
// standard ephemeral-cache pricing (1.25x base input for writes, 0.1x base input for reads).
// Re-check https://www.anthropic.com/pricing if the model or its pricing changes.
const PRICE_PER_MTOK_INPUT = 1.0;
const PRICE_PER_MTOK_OUTPUT = 5.0;
const CACHE_WRITE_MULTIPLIER = 1.25;
const CACHE_READ_MULTIPLIER = 0.1;

export type ClaudeUsage = {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
};

export function computeCostUsd(usage: ClaudeUsage): number {
  const inputCost = (usage.input_tokens / 1_000_000) * PRICE_PER_MTOK_INPUT;
  const outputCost = (usage.output_tokens / 1_000_000) * PRICE_PER_MTOK_OUTPUT;
  const cacheWriteCost =
    ((usage.cache_creation_input_tokens ?? 0) / 1_000_000) * PRICE_PER_MTOK_INPUT * CACHE_WRITE_MULTIPLIER;
  const cacheReadCost =
    ((usage.cache_read_input_tokens ?? 0) / 1_000_000) * PRICE_PER_MTOK_INPUT * CACHE_READ_MULTIPLIER;
  return inputCost + outputCost + cacheWriteCost + cacheReadCost;
}

function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDailySpendCeilingUsd(): number {
  const raw = process.env.CHAT_DAILY_SPEND_CEILING_USD;
  const parsed = raw ? parseFloat(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 2.0;
}

export async function isDailySpendCeilingExceeded(): Promise<boolean> {
  const usage = await getDailyUsage(todayDateString());
  if (!usage) return false;

  const spentSoFar = computeCostUsd({
    input_tokens: usage.input_tokens,
    output_tokens: usage.output_tokens,
    cache_creation_input_tokens: usage.cache_creation_input_tokens,
    cache_read_input_tokens: usage.cache_read_input_tokens,
  });

  return spentSoFar >= getDailySpendCeilingUsd();
}

export async function recordUsage(usage: ClaudeUsage): Promise<void> {
  const delta: UsageDelta = {
    inputTokens: usage.input_tokens,
    outputTokens: usage.output_tokens,
    cacheCreationInputTokens: usage.cache_creation_input_tokens ?? 0,
    cacheReadInputTokens: usage.cache_read_input_tokens ?? 0,
  };
  await addDailyUsage(todayDateString(), delta);
}

export const DEAD_END_MESSAGE =
  "This assistant is still in development and has a cap on how long a single conversation can run. " +
  "I'd rather you get a real answer than keep talking to a maxed-out bot — please reach out to Eduardo directly at eduardo@casjor.com.";

export const UNAVAILABLE_MESSAGE =
  "This assistant is temporarily unavailable while it's still in development. " +
  "Please reach out to Eduardo directly at eduardo@casjor.com in the meantime.";
