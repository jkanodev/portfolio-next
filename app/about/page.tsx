import type { Metadata } from "next";
import Section from "@/components/Section";
import { pageTitle, metaDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("About"),
  description: metaDescription("Joseph Kano – DevOps and Cloud Engineer, Virginia, USA. Terminal-first, production discipline, postmortem-driven learning."),
};

export default function AboutPage() {
  return (
    <Section>
      <div className="mx-auto max-content px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-[var(--text)]">About</h1>
        <p className="mt-4 text-[var(--text-muted)]">
          Joseph Kano – DevOps and Cloud Engineer, Virginia, USA.
        </p>
        <p className="mt-4 text-[var(--text-muted)]">
          I approach infrastructure with a terminal-first mindset and a production
          engineer&apos;s discipline. No bachelor&apos;s degree. My education comes from
          shipping real services, breaking them, and writing the postmortem so the
          next failure is cheaper.
        </p>
        <p className="mt-4 text-[var(--text-muted)]">
          I prefer direct commands over heavy abstractions, incremental
          troubleshooting over guessing, and documenting every mistake so the team
          and future me never repeats it.
        </p>
        <p className="mt-4 text-[var(--text-muted)]">
          Currently advancing through a structured Kubernetes roadmap. Completed
          foundations and workloads. Now deep in the scheduler and multi-node
          behavior.
        </p>
        <p className="mt-4 text-[var(--text-muted)]">
          I&apos;m actively building and maintaining self-hosted services, refining
          deployment pipelines, and expanding my Kubernetes lab.
        </p>
        <p className="mt-4 text-[var(--text-muted)]">
          Open to DevOps Engineer, Cloud Engineer, and Platform Engineer roles.
        </p>
      </div>
    </Section>
  );
}
