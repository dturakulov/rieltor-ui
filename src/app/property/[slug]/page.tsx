import { notFound } from "next/navigation";
import { PROPERTIES } from "@/data/properties";
import { getPropertyBySlug } from "@/lib/propertyRepository";
import { PropertyDetailClient } from "@/components/property/PropertyDetailClient";

export function generateStaticParams() {
  return PROPERTIES.map((property) => ({ slug: property.slug }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return <PropertyDetailClient property={property} />;
}
