export type SpiceLevel = "none" | "mild" | "medium" | "hot" | "very_hot";
export type PriceBand = "$" | "$$" | "$$$";
export type EnglishSupport = "none" | "basic" | "good" | "excellent";

export interface City {
  id: string;
  slug: string;
  name_en: string;
  name_zh: string;
  short_intro: string;
  food_identity: string;
  hero_image: string;
  map_center: [number, number];
  zoom: number;
  signature_dish_ids: string[];
  first_meal_dish_ids: string[];
}

export interface Dish {
  id: string;
  city_id: string;
  name_en: string;
  name_zh: string;
  pinyin: string;
  description: string;
  spice_level: SpiceLevel;
  ingredients: string[];
  dietary_flags: string[];
  first_timer_friendly: boolean;
  adventurous: boolean;
  why_it_matters: string;
  ordering_tip: string;
  avoid_if: string[];
  image: string;
}

export interface Restaurant {
  id: string;
  city_id: string;
  name_en: string;
  name_zh: string;
  cuisine_type: string;
  short_description: string;
  why_go: string;
  address_en: string;
  address_zh: string;
  area: string;
  lat: number;
  lng: number;
  price_band: PriceBand;
  traveler_friendliness_score: number;
  english_support_level: EnglishSupport;
  best_for: string[];
  image: string;
  featured: boolean;
  must_order_dish_ids: string[];
}

export interface RestaurantDishRecommendation {
  restaurant_id: string;
  dish_id: string;
  why_this_version: string;
  priority_rank: number;
}

export interface UserTastePreference {
  spice_tolerance: SpiceLevel;
  adventurous_eater: boolean;
  avoids_offal: boolean;
  halal_friendly_only: boolean;
  vegetarian_preference: boolean;
}
