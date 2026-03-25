import { City } from "@/types";

export const cities: City[] = [
  {
    id: "chongqing",
    slug: "chongqing",
    name_en: "Chongqing",
    name_zh: "重庆",
    short_intro:
      "A sprawling mountain city where fiery hot pot, numbing spices, and late-night noodle stalls define everyday life. Chongqing food is bold, loud, and unforgettable.",
    food_identity:
      "Chongqing cuisine is a branch of Sichuan food famous for its liberal use of chili and Sichuan peppercorn. The city is the birthplace of hot pot as most people know it — bubbling, fiery, and deeply communal. Street-side xiaomian (small noodles) fuel the city from dawn.",
    hero_image: "/images/chongqing-hero.jpg",
    map_center: [29.563, 106.5516],
    zoom: 12,
    signature_dish_ids: ["cq-hotpot", "cq-xiaomian", "cq-laziji", "cq-suanlafen", "cq-maoxuewang"],
    first_meal_dish_ids: ["cq-xiaomian", "cq-hotpot", "cq-suanlafen"],
  },
  {
    id: "xian",
    slug: "xian",
    name_en: "Xi'an",
    name_zh: "西安",
    short_intro:
      "An ancient capital where Muslim Quarter street food, hand-pulled noodles, and hearty lamb dishes have been perfected over centuries.",
    food_identity:
      "Xi'an sits at the crossroads of China's culinary traditions. Its Muslim Quarter is one of China's most famous food streets, blending Hui Muslim traditions with northern Chinese cooking. Expect cumin-spiced lamb, impossibly wide noodles, and the iconic roujiamo — China's answer to the sandwich.",
    hero_image: "/images/xian-hero.jpg",
    map_center: [34.2583, 108.9286],
    zoom: 13,
    signature_dish_ids: ["xa-roujiamo", "xa-yangroupaomo", "xa-biangbiang", "xa-liangpi", "xa-guantangbao"],
    first_meal_dish_ids: ["xa-roujiamo", "xa-liangpi", "xa-biangbiang"],
  },
  {
    id: "beijing",
    slug: "beijing",
    name_en: "Beijing",
    name_zh: "北京",
    short_intro:
      "China's capital serves imperial classics alongside earthy hutong comfort food — from lacquered roast duck to hand-pulled noodles in soybean paste.",
    food_identity:
      "Beijing cuisine blends imperial court traditions with hearty northern home cooking. Peking duck is the marquee dish, but the real soul of the city is in its zhajiangmian, jiaozi, copper pot lamb hotpot, and the snack-filled hutong alleys. Food here is savory, wheat-based, and deeply satisfying.",
    hero_image: "/images/beijing-hero.jpg",
    map_center: [39.9042, 116.4074],
    zoom: 12,
    signature_dish_ids: ["bj-roastduck", "bj-zhajiangmian", "bj-hotpot", "bj-jiaozi", "bj-zhajiang"],
    first_meal_dish_ids: ["bj-roastduck", "bj-zhajiangmian", "bj-jiaozi"],
  },
  {
    id: "zhangjiajie",
    slug: "zhangjiajie",
    name_en: "Zhangjiajie",
    name_zh: "张家界",
    short_intro:
      "Nestled in the mountains of western Hunan, Zhangjiajie serves smoky, spicy Tujia and Hunan-style food — rustic, bold, and deeply local.",
    food_identity:
      "Zhangjiajie cuisine reflects its Tujia ethnic minority heritage and western Hunan roots. Expect smoked meats, wild herbs, stir-fries with aggressive chili heat, and unique preparations like three-cup chicken Tujia-style. It's less polished than big-city Hunan food, but just as flavorful.",
    hero_image: "/images/zhangjiajie-hero.jpg",
    map_center: [29.1168, 110.4792],
    zoom: 13,
    signature_dish_ids: ["zjj-sanxiaguo", "zjj-xiangxilarou", "zjj-tujiazhangyu", "zjj-suanroufenpi"],
    first_meal_dish_ids: ["zjj-sanxiaguo", "zjj-tujiazhangyu"],
  },
  {
    id: "furong",
    slug: "furong",
    name_en: "Furong Ancient Town",
    name_zh: "芙蓉镇",
    short_intro:
      "A waterfall-draped ancient town in Xiangxi where rice tofu, cured meats, and Tujia specialties are served along the riverside.",
    food_identity:
      "Furong Ancient Town (Hibiscus Town) is famous for its mi doufu — a unique rice tofu you won't find elsewhere. The food here is Xiangxi-style: smoky cured meats, pickled vegetables, river fish, and simple but satisfying Tujia home cooking. Eating here is part of the scenery.",
    hero_image: "/images/furong-hero.jpg",
    map_center: [28.9497, 109.9883],
    zoom: 15,
    signature_dish_ids: ["fr-midoufu", "fr-larou", "fr-suantangyu", "fr-shebajiang"],
    first_meal_dish_ids: ["fr-midoufu", "fr-larou"],
  },
];
