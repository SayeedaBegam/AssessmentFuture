import { Suspense } from "react";
import QueryContent from "./query-content";
export const metadata = { title: "Competency evidence map" };
export default function Page() {
  return (
    <Suspense
      fallback={
        <p className="section-wrap" role="status">
          Loading page?
        </p>
      }
    >
      <QueryContent />
    </Suspense>
  );
}
