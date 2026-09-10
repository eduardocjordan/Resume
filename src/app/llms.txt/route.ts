import fs from "fs";
import path from "path";

// Serves the profile facts as crawlable plain text, read from the same
// markdown the chatbot answers from — so there's no second copy to drift
// (STRATEGY.md 2.6). faq.md is excluded on purpose: it holds bot-handling
// instructions, not public profile content.
const PUBLIC_FILES = ["bio.md", "resume.md", "projects.md"];

export const dynamic = "force-static";

export function GET() {
  const dir = path.join(process.cwd(), "data", "knowledge");
  const body = PUBLIC_FILES.map((file) =>
    fs.readFileSync(path.join(dir, file), "utf-8").trim()
  ).join("\n\n---\n\n");

  return new Response(`# Eduardo Castro — Head of Marketing\n\n${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
