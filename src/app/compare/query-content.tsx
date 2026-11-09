"use client";
import { useSearchParams } from "next/navigation";
import { Compare } from "@/components/compare";

export default function QueryContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.getAll("ids");
  return (
    <Compare
      key={searchParams.toString()}
      initialIds={ids.flatMap((value) => value.split(","))}
    />
  );
}
