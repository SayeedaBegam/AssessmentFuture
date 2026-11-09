"use client";
import { useSearchParams } from "next/navigation";
import { EvidenceMap } from "@/components/evidence-map";

export default function QueryContent() {
  const searchParams = useSearchParams();
  const focus = searchParams.get("focus") ?? undefined;
  const challenge = searchParams.get("challenge") ?? undefined;
  const initialChallenge = Array.isArray(challenge) ? challenge[0] : challenge;
  const initialFocus = Array.isArray(focus) ? focus[0] : focus;
  return (
    <EvidenceMap
      key={`${initialFocus ?? "default"}:${initialChallenge ?? "all"}`}
      initialFocus={initialFocus}
      initialChallenge={initialChallenge}
    />
  );
}
