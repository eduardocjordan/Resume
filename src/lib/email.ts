import { Resend } from "resend";
import type { SessionSummaryRecord } from "./db";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (resendClient) return resendClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatSummaryHtml(sessionId: string, summary: SessionSummaryRecord): string {
  const fields: [string, string | null | undefined][] = [
    ["Contact name", summary.contactName],
    ["Contact email", summary.contactEmail],
    ["Contact phone", summary.contactPhone],
    ["Stated intent", summary.statedIntent],
    ["Salary figure mentioned", summary.salaryFigureMentioned],
  ];

  const fieldsHtml = fields
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value as string)}</p>`)
    .join("\n");

  const jdHtml = summary.jobDescriptionText
    ? `<p><strong>Job description shared:</strong></p><pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(
        summary.jobDescriptionText
      )}</pre>`
    : "";

  return `
    <div>
      <p>${escapeHtml(summary.narrativeSummary)}</p>
      ${fieldsHtml}
      ${jdHtml}
      <p style="color:#888;font-size:12px;">Session ID: ${sessionId}</p>
    </div>
  `.trim();
}

export async function sendSessionSummaryEmail(sessionId: string, summary: SessionSummaryRecord): Promise<void> {
  const toAddress = process.env.OWNER_NOTIFICATION_EMAIL;
  if (!toAddress) {
    throw new Error("Missing OWNER_NOTIFICATION_EMAIL environment variable.");
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL;
  if (!fromAddress) {
    throw new Error("Missing RESEND_FROM_EMAIL environment variable.");
  }

  const client = getResendClient();
  await client.emails.send({
    from: fromAddress,
    to: toAddress,
    subject: `Chat summary — ${summary.contactName ?? "anonymous visitor"}`,
    html: formatSummaryHtml(sessionId, summary),
  });
}
