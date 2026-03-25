import { getRestaurantById, getCityBySlug } from "@/data";
import { restaurants } from "@/data/restaurants";
import { cities } from "@/data/cities";
import { RestaurantPageClient } from "./RestaurantPageClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return restaurants.map((r) => {
    const city = cities.find((c) => c.id === r.city_id);
    return { slug: city?.slug || "", id: r.id };
  });
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const city = getCityBySlug(slug);
  const restaurant = getRestaurantById(id);

  if (!city || !restaurant || restaurant.city_id !== city.id) {
    notFound();
  }

  return <RestaurantPageClient restaurant={restaurant} />;
}
