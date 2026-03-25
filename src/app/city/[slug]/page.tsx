import { getCityBySlug } from "@/data";
import { cities } from "@/data/cities";
import { CityPageClient } from "./CityPageClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  return <CityPageClient city={city} />;
}
