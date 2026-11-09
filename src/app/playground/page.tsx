import { Suspense } from "react";
import QueryContent from "./query-content";
export const metadata = { title: "Interactive design playground" };
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
