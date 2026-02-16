import kubernetesData from "@/data/kubernetes.json";
import { Check, Circle, Minus } from "lucide-react";

const roadmap = kubernetesData.roadmap as {
  name: string;
  completed: string[];
  in_progress: { section: string; current_position: string };
  not_started: string[];
};

export default function KubernetesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-[var(--text)]">Kubernetes Notes</h1>
      <p className="text-[var(--text-muted)]">
        Roadmap progress. Completed, in progress, and not started.
      </p>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--text)]">{roadmap.name}</h2>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
              <Check className="h-4 w-4 text-green-500" /> Completed
            </h3>
            <ul className="list-inside space-y-1 text-[var(--text)]">
              {roadmap.completed.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
              <Minus className="h-4 w-4 text-[var(--accent)]" /> In progress
            </h3>
            <p className="text-[var(--text)]">{roadmap.in_progress.section}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {roadmap.in_progress.current_position}
            </p>
          </div>
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
              <Circle className="h-4 w-4" /> Not started
            </h3>
            <ul className="list-inside space-y-1 text-[var(--text-muted)]">
              {roadmap.not_started.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
