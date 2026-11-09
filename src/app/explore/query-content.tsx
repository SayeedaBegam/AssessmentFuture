"use client";
import { useSearchParams } from "next/navigation";
import { Explorer } from "@/components/explorer";

export default function QueryContent() {
  const searchParams = useSearchParams();
  const family = searchParams.get("family") ?? undefined;
  return <Explorer key={searchParams.toString()} initialFamily={family} />;
}
