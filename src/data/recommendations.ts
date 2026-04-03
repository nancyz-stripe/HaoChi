import { RestaurantDishRecommendation } from "@/types";

export const recommendations: RestaurantDishRecommendation[] = [
  // Chongqing
  { restaurant_id: "cq-r1", dish_id: "cq-hotpot", why_this_version: "Classic beef-tallow base with premium tripe and sliced beef — the definitive Chongqing hot pot experience.", priority_rank: 1 },
  { restaurant_id: "cq-r2", dish_id: "cq-xiaomian", why_this_version: "The pea and minced pork version here is legendary — punchy, numbing, and perfectly balanced.", priority_rank: 1 },
  { restaurant_id: "cq-r3", dish_id: "cq-hotpot", why_this_version: "Old-school dock-style hot pot in a converted warehouse. The maodu (tripe) is exceptionally fresh.", priority_rank: 1 },
  { restaurant_id: "cq-r3", dish_id: "cq-maoxuewang", why_this_version: "Their version uses ultra-fresh duck blood curd and the broth has real depth.", priority_rank: 2 },

  { restaurant_id: "cq-r4", dish_id: "cq-hotpot", why_this_version: "Hot pot inside a repurposed WWII air-raid cave — the natural cool air contrasts perfectly with the fiery pot. A viral Douyin sensation.", priority_rank: 1 },
  { restaurant_id: "cq-r4", dish_id: "cq-maoxuewang", why_this_version: "The cave atmosphere adds drama to this already bold dish. Great for photos and flavor.", priority_rank: 2 },
  { restaurant_id: "cq-r5", dish_id: "cq-lengguochuanchuan", why_this_version: "Dozens of skewer stalls competing for your attention — grab handfuls and explore. The late-night energy here is peak Chongqing.", priority_rank: 1 },
  { restaurant_id: "cq-r5", dish_id: "cq-kaoyu", why_this_version: "The grilled fish stalls here serve Wanzhou-style kaoyu with a proper charcoal char and mala kick.", priority_rank: 2 },

  // Xi'an
  { restaurant_id: "xa-r1", dish_id: "xa-yangroupaomo", why_this_version: "Over 120 years of perfecting this single dish. The lamb broth is rich, clear, and deeply savory.", priority_rank: 1 },
  { restaurant_id: "xa-r1", dish_id: "xa-guantangbao", why_this_version: "Their soup dumplings have thin skins and a generous amount of lamb broth inside.", priority_rank: 2 },
  { restaurant_id: "xa-r2", dish_id: "xa-roujiamo", why_this_version: "Dozens of vendors, each with their own recipe. The bread is baked in front of you and the meat is chopped to order.", priority_rank: 1 },
  { restaurant_id: "xa-r2", dish_id: "xa-liangpi", why_this_version: "Made fresh constantly due to volume. The sesame paste version is smooth and nutty.", priority_rank: 2 },
  { restaurant_id: "xa-r2", dish_id: "xa-biangbiang", why_this_version: "Watch the noodles being hand-pulled and slapped on the counter. Freshness and spectacle combined.", priority_rank: 3 },
  { restaurant_id: "xa-r3", dish_id: "xa-biangbiang", why_this_version: "Consistently excellent noodles with a perfect chew. The chili oil is house-made daily.", priority_rank: 1 },
  { restaurant_id: "xa-r3", dish_id: "xa-roujiamo", why_this_version: "The bread-to-meat ratio is spot-on and the braised meat is fork-tender.", priority_rank: 2 },

  { restaurant_id: "xa-r4", dish_id: "xa-huluji", why_this_version: "The restaurant that perfected gourd chicken — nearly a century of triple-cooking mastery. Shatteringly crispy skin.", priority_rank: 1 },
  { restaurant_id: "xa-r4", dish_id: "xa-biangbiang", why_this_version: "Xi'an Fanzhuang's banquet-quality biangbiang noodles — wider and silkier than street versions.", priority_rank: 2 },
  { restaurant_id: "xa-r5", dish_id: "xa-hulataing", why_this_version: "The breakfast stalls on Sajin Qiao serve Xi'an's best meatball spicy soup — thick, peppery, and packed with ingredients. Locals' pick over the Muslim Quarter.", priority_rank: 1 },
  { restaurant_id: "xa-r5", dish_id: "xa-roujiamo", why_this_version: "The roujiamo vendors here cater to locals, not tourists — better meat-to-bread ratio and lower prices.", priority_rank: 2 },
  { restaurant_id: "xa-r5", dish_id: "xa-liangpi", why_this_version: "Made fresh for a local crowd that knows the difference. The sesame paste version here is outstanding.", priority_rank: 3 },

  // Beijing
  { restaurant_id: "bj-r1", dish_id: "bj-roastduck", why_this_version: "Da Dong's signature lean roasting produces impossibly crispy skin. Served with artful precision.", priority_rank: 1 },
  { restaurant_id: "bj-r2", dish_id: "bj-zhajiangmian", why_this_version: "Handmade noodles with a generous spread of julienned vegetables. Homestyle perfection.", priority_rank: 1 },
  { restaurant_id: "bj-r2", dish_id: "bj-jiaozi", why_this_version: "Hand-wrapped with generous pork-and-chive filling. Simple and satisfying.", priority_rank: 2 },
  { restaurant_id: "bj-r3", dish_id: "bj-hotpot", why_this_version: "The hand-sliced lamb is the finest in Beijing — marble-threaded and meltingly tender in seconds.", priority_rank: 1 },

  { restaurant_id: "bj-r4", dish_id: "bj-baodu", why_this_version: "Century-old tripe specialist with Michelin Bib Gourmand. 13 different cuts, each blanched to exact perfection. The sesame dip is a guarded recipe.", priority_rank: 1 },
  { restaurant_id: "bj-r4", dish_id: "bj-hotpot", why_this_version: "They also serve excellent shuan yang rou with premium half-fatty lamb cuts.", priority_rank: 2 },
  { restaurant_id: "bj-r5", dish_id: "bj-zhajiangmian", why_this_version: "Single-dish menu — only zhajiangmian, perfected to an art. Hand-pulled noodles, deeply aromatic sauce. Michelin Bib Gourmand.", priority_rank: 1 },

  // Zhangjiajie
  { restaurant_id: "zjj-r1", dish_id: "zjj-sanxiaguo", why_this_version: "The dry-fried version is intensely flavorful with properly smoked pork. You choose your three ingredients.", priority_rank: 1 },
  { restaurant_id: "zjj-r1", dish_id: "zjj-xiangxilarou", why_this_version: "Their cured pork has deep, complex smoke flavor from traditional wood-smoking methods.", priority_rank: 2 },
  { restaurant_id: "zjj-r2", dish_id: "zjj-xiangxilarou", why_this_version: "Stir-fried with locally foraged wild garlic — simple and deeply satisfying after a hike.", priority_rank: 1 },
  { restaurant_id: "zjj-r2", dish_id: "zjj-tujiazhangyu", why_this_version: "Cooked in a cast-iron pan until impossibly crispy. The cumin seasoning is perfect.", priority_rank: 2 },
  { restaurant_id: "zjj-r2", dish_id: "zjj-sanxiaguo", why_this_version: "Their version includes local wild boar when available — a special touch.", priority_rank: 3 },

  { restaurant_id: "zjj-r3", dish_id: "zjj-yanerji", why_this_version: "Their rock ear chicken uses wild-harvested cliff fungus and free-range mountain chicken. The broth is deeply nourishing.", priority_rank: 1 },
  { restaurant_id: "zjj-r3", dish_id: "zjj-tujiakourou", why_this_version: "CCTV-featured Tujia braised pork belly — glossy, tender, and perfectly steamed over preserved mustard greens.", priority_rank: 2 },
  { restaurant_id: "zjj-r3", dish_id: "zjj-xiangxilarou", why_this_version: "Master chef Li Xiqing's traditionally smoked pork — deep, complex smoke flavor.", priority_rank: 3 },
  { restaurant_id: "zjj-r4", dish_id: "zjj-sanxiaguo", why_this_version: "Lekoufu's dry-fried sanxia guo is reliably excellent with generous portions at budget prices.", priority_rank: 1 },
  { restaurant_id: "zjj-r4", dish_id: "zjj-tujiakourou", why_this_version: "Their version uses a slightly sweet glaze that caramelizes beautifully during steaming.", priority_rank: 2 },
  { restaurant_id: "zjj-r4", dish_id: "zjj-tujiazhangyu", why_this_version: "Crispy fried potatoes with a house-blend cumin spice mix that keeps locals coming back.", priority_rank: 3 },

  // Furong
  { restaurant_id: "fr-r1", dish_id: "fr-midoufu", why_this_version: "The original — served in the exact spot where the movie was filmed. Warm, silky, and perfectly seasoned.", priority_rank: 1 },
  { restaurant_id: "fr-r2", dish_id: "fr-suantangyu", why_this_version: "Made with fish from the Youshui River. The sour broth is bright and clean.", priority_rank: 1 },
  { restaurant_id: "fr-r2", dish_id: "fr-larou", why_this_version: "House-smoked using traditional methods. The cured sausage is exceptional.", priority_rank: 2 },
  { restaurant_id: "fr-r2", dish_id: "fr-shebajiang", why_this_version: "Made fresh daily with mugwort leaves. The sweet bean paste version is the crowd favorite.", priority_rank: 3 },
  { restaurant_id: "fr-r3", dish_id: "fr-xuebaya", why_this_version: "Their blood cake duck uses freshly made blood-rice cakes with a perfect crispy-chewy contrast. The chili heat is balanced.", priority_rank: 1 },
  { restaurant_id: "fr-r3", dish_id: "fr-heluo", why_this_version: "River snails pulled fresh from the Youshui River, stir-fried in a fiery sour-spicy sauce. Best enjoyed on the terrace with waterfall views.", priority_rank: 2 },
  { restaurant_id: "fr-r3", dish_id: "fr-suantangyu", why_this_version: "Their sour soup uses locally fermented tomatoes — the broth is tangy, bright, and deeply comforting.", priority_rank: 3 },
];
