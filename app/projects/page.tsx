import type { Metadata } from "next";
import projectsData from "@/data/projects.json";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { pageTitle, metaDescription } from "@/lib/seo";
import type { Project } from "@/types";

export const metadata: Metadata = {
  title: pageTitle("Projects"),
  description: metaDescription("DevOps and infrastructure projects: self-hosted portfolio, Kubernetes labs, AWS EC2 pipeline, Landing Zone."),
};

export default function ProjectsPage() {
  const projects = projectsData as Project[];
  const landingZone = projects.find((p) => p.id === "landing-zone");

  return (
    <Section>
      <div className="mx-auto max-content px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-[var(--text)]">Projects</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Real infrastructure with architecture, workflow commands, and prevention checklists.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} id={project.id === "landing-zone" ? undefined : project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {landingZone?.goal && (
          <section
            id="landing-zone"
            className="mt-12 scroll-mt-20 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
            aria-labelledby="landing-zone-title"
          >
            <div className="space-y-6">
              <div>
                <h2 id="landing-zone-title" className="text-xl font-semibold text-[var(--text)]">
                  {landingZone.title}
                </h2>
                {landingZone.status && (
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{landingZone.status}</p>
                )}
                {landingZone.note && (
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{landingZone.note}</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">Goal</h3>
                <p className="mt-2 text-sm text-[var(--text)]">{landingZone.goal}</p>
              </div>

              {landingZone.architecture && landingZone.architecture.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">Architecture</h3>
                  <ul className="mt-2 space-y-1 text-sm text-[var(--text)]">
                    {landingZone.architecture.map((a, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[var(--accent)]" aria-hidden>•</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {landingZone.exercises && landingZone.exercises.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">Exercises checklist</h3>
                  <ul className="mt-2 space-y-2 text-sm text-[var(--text)]">
                    {landingZone.exercises.map((ex, i) => (
                      <li key={i} className="flex min-h-[44px] items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[var(--border)] text-xs text-[var(--text-muted)]" aria-hidden>
                          {i + 1}
                        </span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {landingZone.cloudMapping && landingZone.cloudMapping.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">Cloud mapping (AWS vs Azure)</h3>
                  <div className="mt-2 overflow-x-auto">
                    <table className="w-full min-w-[280px] border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-[var(--border)]">
                          <th className="py-2 pr-4 text-left font-medium text-[var(--text)]">AWS</th>
                          <th className="py-2 text-left font-medium text-[var(--text)]">Azure</th>
                        </tr>
                      </thead>
                      <tbody>
                        {landingZone.cloudMapping.map((row, i) => (
                          <tr key={i} className="border-b border-[var(--border)]/60">
                            <td className="py-2.5 pr-4 text-[var(--text-muted)]">{row.aws}</td>
                            <td className="py-2.5 text-[var(--text-muted)]">{row.azure}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {landingZone.proof && landingZone.proof.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">Proof checklist</h3>
                  <ul className="mt-2 space-y-2 text-sm text-[var(--text)]">
                    {landingZone.proof.map((p, i) => (
                      <li key={i} className="flex min-h-[44px] items-center gap-2">
                        <span className="text-[var(--accent)]" aria-hidden>✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {landingZone.repoLink && (
                <p className="pt-2 text-sm">
                  <a
                    href={landingZone.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-[var(--accent)] hover:underline"
                  >
                    GitHub
                  </a>
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </Section>
  );
}
