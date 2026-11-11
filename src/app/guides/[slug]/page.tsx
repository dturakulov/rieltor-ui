import { notFound } from "next/navigation";
import { GUIDES } from "@/data/content";
import { getGuideBySlug } from "@/lib/propertyRepository";
import { GuideDetailClient } from "@/components/guides/GuideDetailClient";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getGuideBySlug(slug);

  if (!article) {
    notFound();
  }

  return <GuideDetailClient article={article} />;
}
