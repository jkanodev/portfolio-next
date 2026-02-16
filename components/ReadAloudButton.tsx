"use client";

import { useState, useEffect } from "react";
import { Volume2, Pause, Square } from "lucide-react";
import { speak, pause, resume, stop, isSpeaking, isPaused } from "@/lib/speech";

type State = "idle" | "reading" | "paused";

export default function ReadAloudButton({ text }: { text: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSpeaking()) setState((s) => (s === "paused" ? "paused" : "reading"));
      else if (isPaused()) setState("paused");
      else setState("idle");
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (!text.trim()) return;
    if (state === "reading") {
      pause();
      setState("paused");
    } else if (state === "paused") {
      resume();
      setState("reading");
    } else {
      speak(text);
      setState("reading");
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    stop();
    setState("idle");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] hover:border-[var(--text-muted)]"
        aria-label={state === "idle" ? "Read aloud" : state === "reading" ? "Pause" : "Resume"}
      >
        {state === "reading" ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
        {state === "idle" ? "Read aloud" : state === "reading" ? "Pause" : "Resume"}
      </button>
      {(state === "reading" || state === "paused") && (
        <button
          type="button"
          onClick={handleStop}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
          aria-label="Stop"
        >
          <Square className="h-4 w-4" />
          Stop
        </button>
      )}
    </div>
  );
}
