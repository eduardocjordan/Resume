import fs from "fs";
import path from "path";

const KNOWLEDGE_DIR = path.join(process.cwd(), "data", "knowledge");
const KNOWLEDGE_FILES = ["bio.md", "resume.md", "projects.md", "faq.md"];

let cachedKnowledge: string | null = null;

export function loadKnowledgeBase(): string {
  if (cachedKnowledge) return cachedKnowledge;

  cachedKnowledge = KNOWLEDGE_FILES.map((file) => {
    const fullPath = path.join(KNOWLEDGE_DIR, file);
    const contents = fs.readFileSync(fullPath, "utf-8");
    return `<!-- source: ${file} -->\n${contents.trim()}`;
  }).join("\n\n---\n\n");

  return cachedKnowledge;
}
