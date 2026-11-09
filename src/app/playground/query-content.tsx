"use client";
import { useSearchParams } from "next/navigation";
import { Playground } from "@/components/playground";

export default function QueryContent() {
  const searchParams = useSearchParams();
  const format = searchParams.get("format") ?? undefined;
  const ai = searchParams.get("ai") ?? undefined;
  return (
    <Playground
      key={searchParams.toString()}
      initialFormat={Array.isArray(format) ? format[0] : format}
      initialAi={Array.isArray(ai) ? ai[0] : ai}
    />
  );
}
