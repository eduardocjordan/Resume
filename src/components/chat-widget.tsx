"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SESSION_STORAGE_KEY = "chat_session_id";
const REVEAL_FALLBACK_MS = 8000;
const CHAT_DISCLAIMER =
  "This is an early-stage assistant I'm testing to help screen initial conversations — it only knows what's in my public bio, resume, and project write-ups. For anything else, reach out to me directly.";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  capped?: boolean;
  failed?: boolean;
};

function pushGtmEvent(event: string, extra?: Record<string, unknown>) {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...extra });
}

export function ChatWidget() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCapped, setIsCapped] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveal = () => setIsRevealed(true);
    window.addEventListener("site:loader-complete", reveal);
    const fallback = window.setTimeout(reveal, REVEAL_FALLBACK_MS);
    return () => {
      window.removeEventListener("site:loader-complete", reveal);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    let stored = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) {
      stored = crypto.randomUUID();
      window.localStorage.setItem(SESSION_STORAGE_KEY, stored);
    }
    sessionIdRef.current = stored;
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isRevealed) return null;

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading || isCapped) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsLoading(true);
    pushGtmEvent("chat_message_sent");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current, message: trimmed }),
      });
      const data = await response.json();

      if (typeof data.sessionId === "string") {
        sessionIdRef.current = data.sessionId;
        window.localStorage.setItem(SESSION_STORAGE_KEY, data.sessionId);
      }

      if (!response.ok || typeof data.reply !== "string") {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Something went wrong. Please try again in a moment.", failed: true },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply, capped: Boolean(data.sessionCapped) }]);
      if (data.sessionCapped) {
        setIsCapped(true);
        pushGtmEvent("chat_capped");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again in a moment.", failed: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={() => {
          setIsOpen((open) => {
            const next = !open;
            pushGtmEvent(next ? "chat_open" : "chat_close");
            return next;
          });
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-white shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="material-symbols-outlined text-2xl">{isOpen ? "close" : "forum"}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] max-h-[70vh] bg-paper border border-rule shadow-xl rounded-lg flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-rule">
              <p className="font-headline italic text-lg text-ink">Ask about Eduardo</p>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              <p className="text-xs text-ink/60 leading-relaxed">{CHAT_DISCLAIMER}</p>

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "text-sm leading-relaxed px-4 py-2.5 rounded-lg max-w-[85%]",
                    m.role === "user" ? "bg-accent/10 text-ink ml-auto" : "bg-paper-dark text-ink",
                    m.capped && "border-l-4 border-accent/60 bg-accent-soft",
                    m.failed && "border-l-4 border-error/60"
                  )}
                >
                  {m.content}
                </div>
              ))}

              {isLoading && (
                <div className="bg-paper-dark text-ink/50 text-sm px-4 py-2.5 rounded-lg max-w-[85%]">…</div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t border-rule p-3 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isCapped}
                placeholder={isCapped ? "Conversation limit reached" : "Type a message…"}
                className="flex-1 text-sm px-3 py-2 rounded-md border border-rule bg-paper text-ink disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={isCapped || isLoading || !input.trim()}
                aria-label="Send message"
                className="w-9 h-9 rounded-md bg-accent text-white flex items-center justify-center disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
