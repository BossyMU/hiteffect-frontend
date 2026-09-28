// Mock catalogue. Every product, price, stock level and grouping below is taken
// from the storefront screens in the Figma file; extra foil variants are
// generated so the product page's foil picker has something to switch between.

export type Element = "Fire" | "Ice" | "Storm" | "Shadow" | "Arcane" | "Wild";
export type Rarity = "C" | "R" | "M" | "L" | "F" | "T" | "B";
export type Foil = "Non-Foil" | "Rainbow Foil" | "Cold Foil";

export type Variant = { foil: Foil; price: number; stock: number };

export type Product = {
  id: string;
  name: string;
  cardNo: string;
  element: Element;
  rarity?: Rarity;
  game: string;
  set?: string;
  type?: string;
  description?: string;
  /** The first variant is the one shown on product cards. */
  variants: Variant[];
};

export type ShopType = { slug: string; name: string };
export type CardSet = { slug: string; name: string; code: string };
export type Game = { slug: string; name: string; sets: CardSet[] };

export const rarityName: Record<Rarity, string> = {
  C: "Common",
  R: "Rare",
  M: "Majestic",
  L: "Legendary",
  F: "Fabled",
  T: "Token",
  B: "Basic",
};

export const games: Game[] = [
  {
    slug: "flesh-and-blood",
    name: "Flesh and Blood",
    sets: [
      { slug: "welcome-to-rathe", name: "Welcome to Rathe", code: "WTR" },
      { slug: "arcane-rising", name: "Arcane Rising", code: "ARC" },
      { slug: "tales-of-aria", name: "Tales of Aria", code: "ELE" },
      { slug: "outsiders", name: "Outsiders", code: "OUT" },
      { slug: "ashes-of-omnis", name: "Ashes of Omnis", code: "AOM" },
      { slug: "archive", name: "Archive", code: "ARV" },
      { slug: "warriors-of-mastery", name: "Warriors of Mastery", code: "WOM" },
      { slug: "heavy-hitters", name: "Heavy Hitters", code: "HVY" },
    ],
  },
];

export const shopTypes: ShopType[] = [
  { slug: "sleeves", name: "Sleeves" },
  { slug: "card-packs", name: "Card Packs" },
  { slug: "card-boxes", name: "Card Boxes" },
  { slug: "starter-decks", name: "Starter Decks" },
  { slug: "accessories", name: "Accessories" },
];

const FAB = "flesh-and-blood";

type SingleSeed = [
  name: string,
  element: Element,
  rarity: Rarity,
  set: string,
  foil: Foil,
  price: number,
  stock: number,
];

// Order matches the "Flesh and Blood" category screen.
const singles: SingleSeed[] = [
  ["Enigma, Oathkeeper of Ash", "Shadow", "L", "ashes-of-omnis", "Non-Foil", 3200, 2],
  ["Azalea, the Hidden Blade", "Storm", "M", "ashes-of-omnis", "Non-Foil", 3200, 1],
  ["Lightning Flow (Plate A)", "Storm", "F", "ashes-of-omnis", "Non-Foil", 1500, 0],
  ["Lightning Flow (Plate B)", "Storm", "F", "ashes-of-omnis", "Non-Foil", 1500, 2],
  ["Meteor Ascension", "Fire", "M", "ashes-of-omnis", "Non-Foil", 1200, 3],
  ["Charged Impact", "Fire", "R", "welcome-to-rathe", "Non-Foil", 800, 6],
  ["Tectonic Flux", "Ice", "R", "tales-of-aria", "Non-Foil", 900, 2],
  ["Techno-Forged Heart", "Arcane", "L", "arcane-rising", "Rainbow Foil", 5280, 1],
  ["Heart of Ice", "Ice", "L", "tales-of-aria", "Cold Foil", 9480, 0],
  ["Call to the Grave", "Shadow", "M", "outsiders", "Non-Foil", 2000, 0],
  ["Arcknighting", "Storm", "M", "arcane-rising", "Non-Foil", 200, 5],
  ["Starrealm Strike", "Storm", "R", "arcane-rising", "Cold Foil", 9000, 7],
  ["Civic Peak", "Ice", "R", "tales-of-aria", "Non-Foil", 900, 29],
  ["Heavy Swing Strike", "Fire", "M", "welcome-to-rathe", "Non-Foil", 3500, 0],
  ["Kassai of the Golden Sands", "Fire", "L", "archive", "Rainbow Foil", 6980, 0],
  ["Bladeflash Reflection", "Storm", "L", "outsiders", "Rainbow Foil", 7980, 1],
  ["Voltaris", "Storm", "F", "heavy-hitters", "Rainbow Foil", 49800, 1],
  ["Steel Conviction", "Ice", "L", "tales-of-aria", "Cold Foil", 3780, 1],
  ["Golden Hook", "Fire", "L", "heavy-hitters", "Rainbow Foil", 4980, 0],
  ["Command Deck Basics: Storm Hero", "Storm", "B", "warriors-of-mastery", "Non-Foil", 50, 40],
  ["Boundless Blocker Token", "Storm", "T", "warriors-of-mastery", "Non-Foil", 20, 75],
];

type SealedSeed = [name: string, element: Element, type: string, price: number, stock: number, description: string];

const sealed: SealedSeed[] = [
  [
    "Card Sleeves: Ember Crest (100ct)",
    "Shadow",
    "sleeves",
    450,
    40,
    "100 matte sleeves with the Ember Crest back print. Fits standard-size cards.",
  ],
  [
    "Card Sleeves: Frostbind Foil (100ct)",
    "Storm",
    "sleeves",
    650,
    15,
    "100 foil-finish sleeves. Fits standard-size cards.",
  ],
  [
    "Booster Pack: Ashes of Omnis",
    "Shadow",
    "card-packs",
    350,
    60,
    "One sealed booster pack from the Ashes of Omnis set.",
  ],
  ["Booster Pack: Archive", "Storm", "card-packs", 320, 45, "One sealed booster pack from the Archive set."],
  [
    "Booster Box: Ashes of Omnis (24ct)",
    "Shadow",
    "card-boxes",
    7200,
    8,
    "Sealed display of 24 Ashes of Omnis booster packs.",
  ],
  [
    "Booster Box: Warriors of Mastery (Preorder)",
    "Storm",
    "card-boxes",
    7600,
    0,
    "Sealed display of Warriors of Mastery booster packs. Preorder allocation is fully sold.",
  ],
  [
    "Starter Deck: Guardian",
    "Shadow",
    "starter-decks",
    8000,
    4,
    "A ready-to-play Guardian deck with hero, weapon and equipment.",
  ],
  [
    "Starter Deck: Pit Fighter",
    "Storm",
    "starter-decks",
    1200,
    10,
    "A ready-to-play Pit Fighter deck with hero, weapon and equipment.",
  ],
  [
    "Starter Deck: Runeblade",
    "Shadow",
    "starter-decks",
    1200,
    6,
    "A ready-to-play Runeblade deck with hero, weapon and equipment.",
  ],
  [
    "Store Qualifier Entry Ticket",
    "Wild",
    "accessories",
    1000,
    23,
    "Entry to the next in-store Qualifier. Bring your deck list on the day.",
  ],
  [
    "Dedicated Dice Set (8-pack)",
    "Wild",
    "accessories",
    3200,
    54,
    "Eight translucent d6 dice for tracking life and resources.",
  ],
  [
    "Playmat: Hit Effect Crest",
    "Shadow",
    "accessories",
    5000,
    9,
    "Full-size stitched-edge playmat with the Hit Effect crest.",
  ],
  [
    "Mastery Pack: Warrior",
    "Fire",
    "preorder",
    3500,
    30,
    "Now taking preorders — releases August 7. Ships on release day.",
  ],
];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const round10 = (n: number) => Math.max(10, Math.round(n / 10) * 10);

// Deterministic extra foil variants so the foil picker has real choices.
function foilVariants(name: string, foil: Foil, price: number, stock: number, rarity: Rarity): Variant[] {
  const primary = { foil, price, stock };
  if (rarity === "T" || rarity === "B") return [primary];
  const base = foil === "Non-Foil" ? price : foil === "Rainbow Foil" ? price / 3 : price / 8;
  const extra = {
    "Non-Foil": { foil: "Non-Foil" as Foil, price: round10(base), stock: (name.length % 5) + 1 },
    "Rainbow Foil": { foil: "Rainbow Foil" as Foil, price: round10(base * 3), stock: name.length % 4 },
    "Cold Foil": { foil: "Cold Foil" as Foil, price: round10(base * 8), stock: name.length % 3 === 0 ? 1 : 0 },
  };
  const order: Foil[] = ["Non-Foil", "Rainbow Foil", "Cold Foil"];
  return [primary, ...order.filter((f) => f !== foil).map((f) => extra[f])];
}

const setCode = (slug: string) => games[0].sets.find((s) => s.slug === slug)!.code;

export const products: Product[] = [
  ...singles.map(([name, element, rarity, set, foil, price, stock], i) => ({
    id: slugify(name),
    name,
    cardNo: `${setCode(set)}${String(i + 1).padStart(3, "0")}`,
    element,
    rarity,
    game: FAB,
    set,
    variants: foilVariants(name, foil, price, stock, rarity),
  })),
  ...sealed.map(([name, element, type, price, stock, description], i) => ({
    id: slugify(name),
    name,
    cardNo: `HE${String(i + 1).padStart(3, "0")}`,
    element,
    game: FAB,
    type,
    description,
    variants: [{ foil: "Non-Foil" as Foil, price, stock }],
  })),
];

// Home page merchandising, in the order shown on the Home screen.
export const homeSections = {
  hero: "mastery-pack-warrior",
  newArrivals: [
    "enigma-oathkeeper-of-ash",
    "azalea-the-hidden-blade",
    "starrealm-strike",
    "lightning-flow-plate-a",
    "lightning-flow-plate-b",
    "meteor-ascension",
    "charged-impact",
    "store-qualifier-entry-ticket",
  ],
  clearance: [
    "heavy-swing-strike",
    "kassai-of-the-golden-sands",
    "bladeflash-reflection",
    "voltaris",
    "steel-conviction",
    "golden-hook",
    "techno-forged-heart",
    "heart-of-ice",
  ],
  bestSellers: ["tectonic-flux", "civic-peak", "call-to-the-grave", "dedicated-dice-set-8-pack", "arcknighting"],
};

export const storeInfo = {
  email: "support@hiteffect.gg",
  phone: "(555) 019-2245",
  address: "412 Foundry Row, Unit 3, Portland, OR",
  hours: "Tue-Sun, 11:00-19:00",
};

export function findGame(slug?: string) {
  return games.find((g) => g.slug === slug);
}

export function findSet(slug?: string) {
  for (const g of games) {
    const s = g.sets.find((x) => x.slug === slug);
    if (s) return s;
  }
  return undefined;
}

export function findType(slug?: string) {
  return shopTypes.find((t) => t.slug === slug);
}
