import { notFound } from "next/navigation";
import { catalogue } from "@/content/catalogue";
import { ImplementationDetail } from "@/components/implementation-detail";
export function generateStaticParams() {
  return catalogue.implementations.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      catalogue.implementations.find((p) => p.slug === slug)?.title ??
      "Implementation not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pathway = catalogue.implementations.find((p) => p.slug === slug);
  if (!pathway) notFound();
  return <ImplementationDetail pathway={pathway} />;
}
