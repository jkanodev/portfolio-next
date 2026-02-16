const SITE_TITLE = "Joseph Kano – DevOps and Cloud Engineer";

export function pageTitle(segment?: string): string {
  if (!segment) return SITE_TITLE;
  return `${segment} – ${SITE_TITLE}`;
}

export function metaDescription(description: string): string {
  return description;
}

export const defaultDescription =
  "DevOps and Cloud Engineer focused on production-minded infrastructure, automation, and troubleshooting. Docker, Kubernetes, AWS, CI/CD.";

export const defaultOg = {
  title: SITE_TITLE,
  description: defaultDescription,
  type: "website",
};
