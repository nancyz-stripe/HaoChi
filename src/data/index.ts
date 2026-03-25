import { cities } from "./cities";
import { dishes } from "./dishes";
import { restaurants } from "./restaurants";
import { recommendations } from "./recommendations";
import { City, Dish, Restaurant, RestaurantDishRecommendation } from "@/types";

export { cities, dishes, restaurants, recommendations };

// Helper functions
export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getDishesByCity(cityId: string): Dish[] {
  return dishes.filter((d) => d.city_id === cityId);
}

export function getDishById(id: string): Dish | undefined {
  return dishes.find((d) => d.id === id);
}

export function getRestaurantsByCity(cityId: string): Restaurant[] {
  return restaurants.filter((r) => r.city_id === cityId);
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getRecommendationsForRestaurant(
  restaurantId: string
): (RestaurantDishRecommendation & { dish: Dish })[] {
  return recommendations
    .filter((r) => r.restaurant_id === restaurantId)
    .sort((a, b) => a.priority_rank - b.priority_rank)
    .map((rec) => ({
      ...rec,
      dish: dishes.find((d) => d.id === rec.dish_id)!,
    }))
    .filter((rec) => rec.dish);
}

export function getSignatureDishes(city: City): Dish[] {
  return city.signature_dish_ids
    .map((id) => dishes.find((d) => d.id === id))
    .filter((d): d is Dish => d !== undefined);
}

export function getFirstMealDishes(city: City): Dish[] {
  return city.first_meal_dish_ids
    .map((id) => dishes.find((d) => d.id === id))
    .filter((d): d is Dish => d !== undefined);
}

export function getFirstTimerDishes(cityId: string): Dish[] {
  return dishes.filter((d) => d.city_id === cityId && d.first_timer_friendly);
}

export function getMildDishes(cityId: string): Dish[] {
  return dishes.filter(
    (d) =>
      d.city_id === cityId &&
      (d.spice_level === "none" || d.spice_level === "mild")
  );
}
