"use client";
import { useSearchParams } from "next/navigation";
import { AIIntegration } from "@/components/ai-integration";

export default function QueryContent() {
  const searchParams = useSearchParams();
  const ai = searchParams.get("ai") ?? undefined;
  const initialAi = Array.isArray(ai) ? ai[0] : ai;
  return <AIIntegration key={initialAi ?? "default"} initialAi={initialAi} />;
}
