"use client";

import { useState } from "react";
import Modal from "./Modal";
import CopyButton from "./CopyButton";
import type { Project } from "@/types";

export default function ProjectCard({
  project,
  onViewCaseStudy,
}: {
  project: Project;
  onViewCaseStudy?: () => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--text-muted)]/30">
        <h3 className="text-lg font-semibold text-[var(--text)]">{project.title}</h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{project.one_liner}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded bg-[var(--bg)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
            >
              {s}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="mt-3 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Case study
        </button>
      </article>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={project.title}
      >
        <div className="space-y-4 text-sm">
          <p className="text-[var(--text-muted)]">{project.one_liner}</p>
          {project.architecture && (
            <div>
              <h4 className="font-medium text-[var(--text)]">Architecture</h4>
              <ul className="mt-1 list-inside list-disc space-y-0.5 text-[var(--text-muted)]">
                {project.architecture.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {project.workflow_commands && project.workflow_commands.length > 0 && (
            <div>
              <h4 className="font-medium text-[var(--text)]">Workflow commands</h4>
              <ul className="mt-2 space-y-1">
                {project.workflow_commands.map((cmd, i) => (
                  <li key={i} className="flex items-center justify-between gap-2">
                    <code className="rounded bg-[var(--bg)] px-2 py-1 text-xs">
                      {cmd}
                    </code>
                    <CopyButton text={cmd} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.prevention_checklist && (
            <div>
              <h4 className="font-medium text-[var(--text)]">Prevention</h4>
              <ul className="mt-1 list-inside list-disc space-y-0.5 text-[var(--text-muted)]">
                {project.prevention_checklist.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
