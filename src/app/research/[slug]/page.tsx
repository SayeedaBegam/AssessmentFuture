import { notFound } from "next/navigation";
import { papers } from "@/content/research";
import { ResearchDigestView } from "@/components/research-library";
export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: papers.find((p) => p.slug === slug)?.title ?? "Source not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = papers.find((p) => p.slug === slug);
  if (!p) notFound();
  return <ResearchDigestView paper={p} />;
}
