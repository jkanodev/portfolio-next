"use client";

import { useState, useEffect } from "react";
import { getVoices, getStoredVoice, setStoredVoice } from "@/lib/speech";

export default function VoicePicker() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  useEffect(() => {
    getVoices().then((v) => {
      setVoices(v);
      const stored = getStoredVoice();
      setVoiceName(stored.voiceName || (v[0]?.name ?? ""));
      setRate(stored.rate);
      setPitch(stored.pitch);
    });
  }, []);

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setVoiceName(name);
    setStoredVoice(name, rate, pitch);
  };
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const r = parseFloat(e.target.value);
    setRate(r);
    setStoredVoice(voiceName, r, pitch);
  };
  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = parseFloat(e.target.value);
    setPitch(p);
    setStoredVoice(voiceName, rate, p);
  };

  return (
    <div className="space-y-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
      <label className="block text-sm font-medium text-[var(--text-muted)]">
        Voice
      </label>
      <select
        value={voiceName}
        onChange={handleVoiceChange}
        className="w-full rounded border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)]"
      >
        {voices.map((v) => (
          <option key={v.name + v.lang} value={v.name}>
            {v.name} ({v.lang})
          </option>
        ))}
      </select>
      <div>
        <label className="block text-sm font-medium text-[var(--text-muted)]">
          Rate: {rate.toFixed(1)}
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
          className="w-full accent-[var(--accent)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-muted)]">
          Pitch: {pitch.toFixed(1)}
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={handlePitchChange}
          className="w-full accent-[var(--accent)]"
        />
      </div>
    </div>
  );
}
