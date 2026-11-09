import { notFound } from "next/navigation";
import { assessments } from "@/content/assessments";
import { AssessmentDetail } from "@/components/assessment-detail";
export function generateStaticParams() {
  return assessments.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      assessments.find((a) => a.slug === slug)?.name ?? "Assessment not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = assessments.find((a) => a.slug === slug);
  if (!a) notFound();
  return <AssessmentDetail assessment={a} />;
}
