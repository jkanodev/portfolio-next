import Link from "next/link";
import Section from "@/components/Section";
import { ArrowRight, Container, Cloud, Terminal } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Section className="border-b border-[var(--border)]">
        <div className="mx-auto max-content px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Joseph Kano
          </h1>
          <p className="mt-2 text-xl text-[var(--text-muted)]">
            DevOps and Cloud Engineer focused on production-minded infrastructure,
            automation, and hard-won troubleshooting.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/knowledge/errors"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--text)] hover:border-[var(--text-muted)]"
            >
              Explore Errors Wiki
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-content px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Core strengths
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <li className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
              <Container className="h-5 w-5 shrink-0 text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-muted)]">
                Docker-first shipping mindset
              </span>
            </li>
            <li className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
              <Terminal className="h-5 w-5 shrink-0 text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-muted)]">
                Kubernetes fundamentals with real troubleshooting
              </span>
            </li>
            <li className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
              <Cloud className="h-5 w-5 shrink-0 text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-muted)]">
                AWS EC2 deployments and pipeline automation
              </span>
            </li>
            <li className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 sm:col-span-2 lg:col-span-1">
              <span className="text-sm text-[var(--text-muted)]">
                Cloudflare and Tailscale approach to secure access
              </span>
            </li>
            <li className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 sm:col-span-2">
              <span className="text-sm text-[var(--text-muted)]">
                I document mistakes and fixes like a production engineer
              </span>
            </li>
          </ul>
        </div>
      </Section>

      <Section className="bg-[var(--bg-elevated)]/50">
        <div className="mx-auto max-content px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Featured projects
          </h2>
          <ul className="mt-4 space-y-3">
            <li>
              <Link
                href="/projects#self-hosted-portfolio"
                className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text)] hover:border-[var(--text-muted)]/30"
              >
                <span className="font-medium">Self Hosted Portfolio Platform</span>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Docker, Cloudflare Tunnel, repeatable deploy
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/projects#kubernetes-labs"
                className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text)] hover:border-[var(--text-muted)]/30"
              >
                <span className="font-medium">Kubernetes Lab and Troubleshooting</span>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  kind, Ingress, cleanup discipline
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/projects#aws-ec2-deploy"
                className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text)] hover:border-[var(--text-muted)]/30"
              >
                <span className="font-medium">AWS EC2 Website Deployment Pipeline</span>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  EC2, Docker, GitHub Actions, SSH
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-content px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Why I&apos;m different
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-[var(--text-muted)]">
            <li>I ship real infrastructure, not tutorial clones</li>
            <li>I write postmortems for every failure</li>
            <li>
              I can explain what broke, why it broke, and how I prevented it next
              time
            </li>
            <li>
              I&apos;m comfortable debugging networks, containers, DNS, caching, and
              Kubernetes behavior
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
