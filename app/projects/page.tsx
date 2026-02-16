import type { Metadata } from "next";
import projectsData from "@/data/projects.json";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { pageTitle, metaDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Projects"),
  description: metaDescription("DevOps and infrastructure projects: self-hosted portfolio, Kubernetes labs, AWS EC2 pipeline."),
};

export type Project = {
  id: string;
  title: string;
  stack: string[];
  one_liner: string;
  architecture?: string[];
  workflow_commands?: string[];
  linked_errors?: string[];
  prevention_checklist?: string[];
};

export default function ProjectsPage() {
  const projects = projectsData as Project[];

  return (
    <Section>
      <div className="mx-auto max-content px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-[var(--text)]">Projects</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Real infrastructure with architecture, workflow commands, and prevention checklists.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} id={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
