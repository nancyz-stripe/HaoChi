import { RestaurantDishRecommendation } from "@/types";

export const recommendations: RestaurantDishRecommendation[] = [
  // Chongqing
  { restaurant_id: "cq-r1", dish_id: "cq-hotpot", why_this_version: "Classic beef-tallow base with premium tripe and sliced beef — the definitive Chongqing hot pot experience.", priority_rank: 1 },
  { restaurant_id: "cq-r2", dish_id: "cq-xiaomian", why_this_version: "The pea and minced pork version here is legendary — punchy, numbing, and perfectly balanced.", priority_rank: 1 },
  { restaurant_id: "cq-r3", dish_id: "cq-hotpot", why_this_version: "Old-school dock-style hot pot in a converted warehouse. The maodu (tripe) is exceptionally fresh.", priority_rank: 1 },
  { restaurant_id: "cq-r3", dish_id: "cq-maoxuewang", why_this_version: "Their version uses ultra-fresh duck blood curd and the broth has real depth.", priority_rank: 2 },

  // Xi'an
  { restaurant_id: "xa-r1", dish_id: "xa-yangroupaomo", why_this_version: "Over 120 years of perfecting this single dish. The lamb broth is rich, clear, and deeply savory.", priority_rank: 1 },
  { restaurant_id: "xa-r1", dish_id: "xa-guantangbao", why_this_version: "Their soup dumplings have thin skins and a generous amount of lamb broth inside.", priority_rank: 2 },
  { restaurant_id: "xa-r2", dish_id: "xa-roujiamo", why_this_version: "Dozens of vendors, each with their own recipe. The bread is baked in front of you and the meat is chopped to order.", priority_rank: 1 },
  { restaurant_id: "xa-r2", dish_id: "xa-liangpi", why_this_version: "Made fresh constantly due to volume. The sesame paste version is smooth and nutty.", priority_rank: 2 },
  { restaurant_id: "xa-r2", dish_id: "xa-biangbiang", why_this_version: "Watch the noodles being hand-pulled and slapped on the counter. Freshness and spectacle combined.", priority_rank: 3 },
  { restaurant_id: "xa-r3", dish_id: "xa-biangbiang", why_this_version: "Consistently excellent noodles with a perfect chew. The chili oil is house-made daily.", priority_rank: 1 },
  { restaurant_id: "xa-r3", dish_id: "xa-roujiamo", why_this_version: "The bread-to-meat ratio is spot-on and the braised meat is fork-tender.", priority_rank: 2 },

  // Beijing
  { restaurant_id: "bj-r1", dish_id: "bj-roastduck", why_this_version: "Da Dong's signature lean roasting produces impossibly crispy skin. Served with artful precision.", priority_rank: 1 },
  { restaurant_id: "bj-r2", dish_id: "bj-zhajiangmian", why_this_version: "Handmade noodles with a generous spread of julienned vegetables. Homestyle perfection.", priority_rank: 1 },
  { restaurant_id: "bj-r2", dish_id: "bj-jiaozi", why_this_version: "Hand-wrapped with generous pork-and-chive filling. Simple and satisfying.", priority_rank: 2 },
  { restaurant_id: "bj-r3", dish_id: "bj-hotpot", why_this_version: "The hand-sliced lamb is the finest in Beijing — marble-threaded and meltingly tender in seconds.", priority_rank: 1 },

  // Zhangjiajie
  { restaurant_id: "zjj-r1", dish_id: "zjj-sanxiaguo", why_this_version: "The dry-fried version is intensely flavorful with properly smoked pork. You choose your three ingredients.", priority_rank: 1 },
  { restaurant_id: "zjj-r1", dish_id: "zjj-xiangxilarou", why_this_version: "Their cured pork has deep, complex smoke flavor from traditional wood-smoking methods.", priority_rank: 2 },
  { restaurant_id: "zjj-r2", dish_id: "zjj-xiangxilarou", why_this_version: "Stir-fried with locally foraged wild garlic — simple and deeply satisfying after a hike.", priority_rank: 1 },
  { restaurant_id: "zjj-r2", dish_id: "zjj-tujiazhangyu", why_this_version: "Cooked in a cast-iron pan until impossibly crispy. The cumin seasoning is perfect.", priority_rank: 2 },
  { restaurant_id: "zjj-r2", dish_id: "zjj-sanxiaguo", why_this_version: "Their version includes local wild boar when available — a special touch.", priority_rank: 3 },

  // Furong
  { restaurant_id: "fr-r1", dish_id: "fr-midoufu", why_this_version: "The original — served in the exact spot where the movie was filmed. Warm, silky, and perfectly seasoned.", priority_rank: 1 },
  { restaurant_id: "fr-r2", dish_id: "fr-suantangyu", why_this_version: "Made with fish from the Youshui River. The sour broth is bright and clean.", priority_rank: 1 },
  { restaurant_id: "fr-r2", dish_id: "fr-larou", why_this_version: "House-smoked using traditional methods. The cured sausage is exceptional.", priority_rank: 2 },
  { restaurant_id: "fr-r2", dish_id: "fr-shebajiang", why_this_version: "Made fresh daily with mugwort leaves. The sweet bean paste version is the crowd favorite.", priority_rank: 3 },
];
