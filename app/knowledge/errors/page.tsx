import { Suspense } from "react";
import ErrorsClient from "./ErrorsClient";

export default function ErrorsPage() {
  return (
    <Suspense fallback={<div className="text-sm opacity-70">Loading errors…</div>}>
      <ErrorsClient />
    </Suspense>
  );
}
