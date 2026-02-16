"use client";

const VOICE_KEY = "jkano_voice";
const RATE_KEY = "jkano_speech_rate";
const PITCH_KEY = "jkano_speech_pitch";

let synth: SpeechSynthesis | null = null;

function getSynth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  if (!synth) synth = window.speechSynthesis;
  return synth;
}

export function getVoices(): Promise<SpeechSynthesisVoice[]> {
  const s = getSynth();
  if (!s) return Promise.resolve([]);
  let list = s.getVoices();
  if (list.length > 0) return Promise.resolve(list);
  return new Promise((resolve) => {
    s.onvoiceschanged = () => resolve(s.getVoices());
  });
}

export function getStoredVoice(): { voiceName: string; rate: number; pitch: number } {
  if (typeof window === "undefined")
    return { voiceName: "", rate: 1, pitch: 1 };
  return {
    voiceName: localStorage.getItem(VOICE_KEY) || "",
    rate: parseFloat(localStorage.getItem(RATE_KEY) || "1"),
    pitch: parseFloat(localStorage.getItem(PITCH_KEY) || "1"),
  };
}

export function setStoredVoice(voiceName: string, rate: number, pitch: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(VOICE_KEY, voiceName);
  localStorage.setItem(RATE_KEY, String(rate));
  localStorage.setItem(PITCH_KEY, String(pitch));
}

export function speak(
  text: string,
  options: { voiceName?: string; rate?: number; pitch?: number } = {}
): void {
  const s = getSynth();
  if (!s || !text.trim()) return;
  s.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = options.rate ?? getStoredVoice().rate;
  u.pitch = options.pitch ?? getStoredVoice().pitch;
  const voices = s.getVoices();
  const voice = options.voiceName
    ? voices.find((v) => v.name === options.voiceName) || voices[0]
    : voices.find((v) => v.name === getStoredVoice().voiceName) || voices[0];
  if (voice) u.voice = voice;
  s.speak(u);
}

export function pause(): void {
  const s = getSynth();
  if (s) s.pause();
}

export function resume(): void {
  const s = getSynth();
  if (s) s.resume();
}

export function stop(): void {
  const s = getSynth();
  if (s) s.cancel();
}

export function isSpeaking(): boolean {
  const s = getSynth();
  return s ? s.speaking : false;
}

export function isPaused(): boolean {
  const s = getSynth();
  return s ? s.paused : false;
}
