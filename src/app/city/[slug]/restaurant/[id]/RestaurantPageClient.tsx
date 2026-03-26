"use client";

import { Restaurant } from "@/types";
import { RestaurantDetail } from "@/components/RestaurantDetail";

export function RestaurantPageClient({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return <RestaurantDetail restaurant={restaurant} />;
}
