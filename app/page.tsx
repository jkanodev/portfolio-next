import Link from "next/link";
import Section from "@/components/Section";
import { ArrowRight, BookOpen, CheckCircle2, Container, Cloud, Terminal } from "lucide-react";
import type { LearningData } from "@/types";
import learningData from "@/content/learning.json";

const data = learningData as LearningData;

export default function HomePage() {
  return (
    <>
      <Section className="border-b border-[var(--border)]">
        <div className="mx-auto max-content px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            {data.profile.name}
          </h1>
          <p className="mt-3 text-lg text-[var(--text-muted)] sm:text-xl">
            Targeting {data.profile.roleTargets.join(", ")} roles. Building and running
            infrastructure with Docker, Kubernetes, and cloud—hands-on learning, documented
            fixes, and production-minded habits.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#what-ive-learned"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--text)] hover:border-[var(--text-muted)]"
            >
              What I&apos;ve Learned
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--text)] hover:border-[var(--text-muted)]"
            >
              Contact
            </Link>
          </div>
        </div>
      </Section>

      <Section id="projects">
        <div className="mx-auto max-content px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">Projects</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Self-hosted portfolio, Kubernetes labs, and deploy pipelines.
          </p>
          <ul className="mt-6 space-y-3">
            <li>
              <Link
                href="/projects#self-hosted-portfolio"
                className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text)] hover:border-[var(--text-muted)]/30 transition-colors"
              >
                <span className="font-medium">Self-Hosted Portfolio</span>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Docker, Cloudflare Tunnel, repeatable deploy.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/projects#kubernetes-labs"
                className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text)] hover:border-[var(--text-muted)]/30 transition-colors"
              >
                <span className="font-medium">Kubernetes Lab & Troubleshooting</span>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  kind, Ingress, cleanup discipline.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/projects#aws-ec2-deploy"
                className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text)] hover:border-[var(--text-muted)]/30 transition-colors"
              >
                <span className="font-medium">AWS EC2 Deploy Pipeline</span>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  EC2, Docker, GitHub Actions, SSH.
                </p>
              </Link>
            </li>
          </ul>
          <Link
            href="/projects"
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section id="what-ive-learned" className="bg-[var(--bg-elevated)]/50">
        <div className="mx-auto max-content px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">What I&apos;ve Learned</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Hands-on experience with infrastructure, cloud, and DevOps workflows.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
              <Cloud className="h-5 w-5 shrink-0 text-[var(--accent)]" />
              <h3 className="mt-2 font-semibold text-[var(--text)]">AWS</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {data.aws.summary[0]} Free Tier, CLI, IAM, EC2, VPC, CloudWatch, S3, and
                Well-Architected Framework (six pillars).
              </p>
              <ul className="mt-2 list-inside list-disc text-xs text-[var(--text-muted)]">
                {data.aws.handsOn.slice(0, 4).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
              <Container className="h-5 w-5 shrink-0 text-[var(--accent)]" />
              <h3 className="mt-2 font-semibold text-[var(--text)]">Kubernetes</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Sections 0 & 1 done; Section 2 in progress (Pod to Node placement). kind,
                Services, Ingress, debugging.
              </p>
              <ul className="mt-2 list-inside list-disc text-xs text-[var(--text-muted)]">
                {data.kubernetes.keyLearnings.slice(0, 3).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
              <Terminal className="h-5 w-5 shrink-0 text-[var(--accent)]" />
              <h3 className="mt-2 font-semibold text-[var(--text)]">Self-Hosting & Deploy</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {data.selfHostingAndDevOps.stack.join(", ")}. Docker lifecycle, Cloudflare
                cache lessons, Tailscale SSH, GitHub Actions.
              </p>
              <ul className="mt-2 list-inside list-disc text-xs text-[var(--text-muted)]">
                {data.selfHostingAndDevOps.lessonsLearned.slice(0, 2).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </Section>

      <Section id="proof">
        <div className="mx-auto max-content px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">Proof</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Verifiable outcomes from real troubleshooting and deploys.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.proof.map((item, i) => (
              <li key={i}>
                <article className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <div>
                    <h3 className="font-medium text-[var(--text)]">{item.title}</h3>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{item.result}</p>
                    <ul className="mt-2 list-inside list-disc text-xs text-[var(--text-muted)]">
                      {item.howToVerify.map((v, j) => (
                        <li key={j}>{v}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-[var(--border)] bg-[var(--bg-elevated)]/50">
        <div className="mx-auto max-content px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">Knowledge Base</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Errors, commands, and Kubernetes notes—searchable and kept up to date.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/knowledge/errors"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--text)] hover:border-[var(--text-muted)]"
            >
              <BookOpen className="h-4 w-4" />
              Errors Wiki
            </Link>
            <Link
              href="/knowledge/commands"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--text)] hover:border-[var(--text-muted)]"
            >
              Commands
            </Link>
            <Link
              href="/knowledge/kubernetes"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--text)] hover:border-[var(--text-muted)]"
            >
              Kubernetes Notes
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
