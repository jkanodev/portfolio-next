"use client";

import Link from "next/link";

type Item = { label: string; href: string };

export default function MobileMenuOffcanvas({ items }: { items: Item[] }) {
  return (
    <div
      className="offcanvas offcanvas-end d-md-none"
      tabIndex={-1}
      id="mobileNav"
      aria-labelledby="mobileNavLabel"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="mobileNavLabel">
          Menu
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close menu"
          style={{ minWidth: 44, minHeight: 44 }}
        />
      </div>
      <div className="offcanvas-body">
        <nav aria-label="Main navigation">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link-mobile"
              data-bs-dismiss="offcanvas"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
