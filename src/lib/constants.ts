export const CHAT_MODEL = "claude-haiku-4-5-20251001";

// How long a session must sit idle, with no new message, before it's eligible for
// finalization (summary + email). Picked up either by the opportunistic sweep piggybacked
// on live chat traffic, or by the once-daily cron backstop — see app/api/cron/finalize-sessions.
export const SESSION_IDLE_MINUTES = 20;
