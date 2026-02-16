import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="mx-auto max-content px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)]">
            Joseph Kano
          </Link>
          <nav className="flex gap-6" aria-label="Footer navigation">
            <Link href="/projects" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
              Projects
            </Link>
            <Link href="/knowledge" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
              Knowledge Base
            </Link>
            <Link href="/contact" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
