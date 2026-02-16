import type { Metadata } from "next";
import { pageTitle, metaDescription } from "@/lib/seo";
import KnowledgeLayoutClient from "./KnowledgeLayoutClient";

export const metadata: Metadata = {
  title: pageTitle("Knowledge Base"),
  description: metaDescription("DevOps errors wiki, commands library, Kubernetes notes. Searchable troubleshooting knowledge base."),
};

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KnowledgeLayoutClient>
      {children}
    </KnowledgeLayoutClient>
  );
}
