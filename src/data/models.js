// --- DATA MODELS ---
// Reggae Kitchen Product & Crew Data

export const FLAVORS = [
  {
    id: 'original',
    name: 'Original Jerk Seasoning Sauce',
    heat: 3,
    price: 12.99,
    color: 'bg-[#8A9A5B]',
    pairs: ['Chicken', 'Pork', 'Beef'],
    desc: "The master foundation of Wayne Reid's legacy. Fresh green scallions, garlic, ginger, and lime blended with pimento wood smoke.",
    image: 'Product Images/drive-download-20260611T162601Z-3-001/Screenshot_20260606_082957_Gmail.jpg'
  },
  {
    id: 'curry',
    name: 'Curry Jerk Sauce with Turmeric',
    heat: 3,
    price: 12.99,
    color: 'bg-[#9E9735]',
    pairs: ['Goat', 'Chicken', 'Chickpeas'],
    desc: "A rich, vibrant fusion of traditional Jamaican jerk heat and South Asian warmth. Powered by golden turmeric, cumin, and fenugreek.",
    image: 'Product Images/drive-download-20260611T162601Z-3-001/Screenshot_20260606_083451_Gmail.jpg'
  },
  {
    id: 'mango',
    name: 'Mango Jerk Seasoning Sauce',
    heat: 2,
    price: 12.99,
    color: 'bg-[#D46A12]',
    pairs: ['Fish', 'Shrimp', 'Tofu'],
    desc: "Sweet tropical heat fusion. Fresh mango meets authentic island spices for a perfectly balanced glaze.",
    image: 'Product Images/drive-download-20260611T162601Z-3-001/Screenshot_20260606_082906_Gmail.jpg'
  },
  {
    id: 'hot',
    name: 'Hot Jerk Seasoning Sauce (XX Spicy)',
    heat: 5,
    price: 12.99,
    color: 'bg-[#CE1126]',
    pairs: ['Wings', 'Pork', 'Ribs'],
    desc: "Pure Scotch Bonnet intensity for the serious heat-seekers. Deep fire tempered with thyme and allspice.",
    image: 'Product Images/drive-download-20260611T162601Z-3-001/Screenshot_20260606_082635_Gmail.jpg'
  },
  {
    id: 'tamarind',
    name: 'Tamarind Jerk Seasoning Sauce',
    heat: 3,
    price: 12.99,
    color: 'bg-[#5C3A21]',
    pairs: ['Ribs', 'Lamb', 'Duck'],
    desc: "Tart, sweet, and deeply savory. A complex fusion of tamarind tang and signature Jamaican allspice.",
    image: 'Product Images/drive-download-20260611T162601Z-3-001/Screenshot_20260606_082730_Gmail.jpg'
  },
  {
    id: 'pepper-free',
    name: 'Pepper-Free Original Jerk Seasoning Sauce',
    heat: 0,
    price: 12.99,
    color: 'bg-[#E6B800]',
    pairs: ['Chicken', 'Pork', 'Vegetables'],
    desc: "All the rich, aromatic wood-smoke flavor of our original recipe, completely free of pepper heat.",
    image: 'Product Images/drive-download-20260611T162601Z-3-001/Screenshot_20260606_082813_Gmail.jpg'
  }
];

export const AI_RECIPE_DB = [
  {
    id: 1,
    triggerWords: ['chicken', 'rice', 'peas'],
    title: "Classic Kingston Chicken Bowl",
    requiredFlavor: 'original',
    time: "35m",
    desc: "A hearty, staple bowl. Rub the chicken in Original Jerk Seasoning Sauce, pan sear, and serve over rice and peas."
  },
  {
    id: 2,
    triggerWords: ['fish', 'shrimp', 'seafood', 'mango'],
    title: "Mango Island Seafood Skewers",
    requiredFlavor: 'mango',
    time: "20m",
    desc: "Glaze your seafood with Mango Jerk Seasoning Sauce before hitting the grill. The sugars caramelize instantly."
  },
  {
    id: 3,
    triggerWords: ['pork', 'ribs', 'potato'],
    title: "Tamarind Tang Glazed Ribs",
    requiredFlavor: 'tamarind',
    time: "2h",
    desc: "Slow roast the pork, basting every 30 mins with Tamarind Jerk Seasoning Sauce for a sticky, sweet-sour bark."
  },
  {
    id: 4,
    triggerWords: ['tofu', 'curry', 'vegetable', 'vegan'],
    title: "Curry Jerk Turmeric Stew",
    requiredFlavor: 'curry',
    time: "45m",
    desc: "A rich, vegan-friendly coconut milk stew powered by the warm heat of Curry Jerk Sauce with Turmeric."
  },
  {
    id: 5,
    triggerWords: ['wings', 'spicy', 'hot'],
    title: "Inferno Midnight Wings",
    requiredFlavor: 'hot',
    time: "40m",
    desc: "Warning: Pure heat. Toss double-fried wings in Hot Jerk Seasoning Sauce (XX Spicy). Serve with cooling sour cream."
  },
  {
    id: 6,
    triggerWords: ['mild', 'kid', 'child', 'pepper-free', 'vegetables'],
    title: "Wayne's Garden Pepper-Free Stir-fry",
    requiredFlavor: 'pepper-free',
    time: "15m",
    desc: "A mild, aromatic stir-fry featuring sweet peppers, broccoli, and snap peas, tossed in our Pepper-Free Original Jerk Sauce."
  }
];

export const CREW = [
  { name: "Wayne Reid", role: "Chef / Owner", email: "Reggaekitchenshow@gmail.com", phone: "647-208-8890", badgeColor: "bg-rasta-gold text-black", initial: "W" },
  { name: "Michel McNeil", role: "Coordinator / Manager", email: "michel@reggaekitchen.com", phone: "437-214-2870", badgeColor: "bg-rasta-green text-white", initial: "M" },
  { name: "Chris Hale", role: "Director of Sales", email: "Chale@reggaekitchen.com", phone: "226-339-8482", badgeColor: "bg-rasta-red text-white", initial: "C" },
  { name: "Machel Lindsay", role: "Ambassador of Music & Entertainment", email: "6stargeneral.reggaekitchen@gmail.com", phone: "647-479-4839", badgeColor: "bg-white/10 text-rasta-gold", initial: "M" }
];

// Corporate Legacy Milestones
export const MILESTONES = [
  { partner: "Loblaws", title: "The Vanguard Partnership", desc: "Canada's largest food retailer spearheaded the label design, cementing Reggae Kitchen as a premium brand from day one." },
  { partner: "Sobeys", title: "The National Scaling", desc: "Pivotal expansion allowing the Wayne Reid legacy to span across provinces with massive mainstream viability." },
  { partner: "Maple Lodge Farms", title: "The Strategic Alliance", desc: "A fusion of titans, merging Canada's premier poultry provider with our original jerk profile for industrial-scale synergy." },
  { partner: "Gov. of Canada", title: "The Sovereign Designation", desc: "First Caribbean food product officially recognized and designated as a certified Canadian Product by the federal government." }
];
