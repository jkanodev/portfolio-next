import type { Metadata } from "next";
import Section from "@/components/Section";
import { pageTitle, metaDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Contact"),
  description: metaDescription("Contact Joseph Kano – DevOps and Cloud Engineer. Email and GitHub."),
};

export default function ContactPage() {
  return (
    <Section>
      <div className="mx-auto max-content px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-[var(--text)]">Contact</h1>
        <p className="mt-4 text-[var(--text-muted)]">
          Let&apos;s talk infrastructure.
        </p>
        <ul className="mt-6 space-y-2">
          <li>
            <a
              href="mailto:dev.joseph.k@gmail.com"
              className="text-[var(--accent)] hover:underline"
            >
              dev.joseph.k@gmail.com
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jkanodev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}
