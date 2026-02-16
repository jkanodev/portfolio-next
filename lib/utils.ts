export function cn(...inputs: (string | undefined | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function buildNarrationFromError(entry: {
  narration?: string;
  title?: string;
  summary?: string;
  symptoms?: string[];
  root_cause?: string;
  fix_steps?: { step: string; why: string }[];
}): string {
  if (entry.narration?.trim()) return entry.narration;
  const parts: string[] = [];
  if (entry.title) parts.push(entry.title + ".");
  if (entry.summary) parts.push(entry.summary);
  if (entry.symptoms?.length) parts.push("Symptoms: " + entry.symptoms.join(". "));
  if (entry.root_cause) parts.push("Root cause: " + entry.root_cause);
  if (entry.fix_steps?.length) {
    parts.push(
      "Fix: " +
        entry.fix_steps.map((f) => f.step + ". " + f.why).join(" ")
    );
  }
  return parts.join(" ") || "No narration available.";
}
