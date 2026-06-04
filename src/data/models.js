// --- DATA MODELS ---
// Reggae Kitchen Product & Crew Data

export const FLAVORS = [
  { id: 'orig', name: 'The Original', heat: 3, price: 12.99, color: 'bg-orange-700', pairs: ['Chicken', 'Pork', 'Beef'], desc: "Wayne Reid's master foundation. Thyme, allspice, and fire." },
  { id: 'mango', name: 'Mango Island', heat: 2, price: 14.95, color: 'bg-rasta-gold', pairs: ['Fish', 'Shrimp', 'Tofu'], desc: "Sweet tropical heat fusion. Fresh mango meets island spice." },
  { id: 'tamarind', name: 'Tamarind Tang', heat: 3, price: 14.95, color: 'bg-amber-900', pairs: ['Ribs', 'Lamb', 'Duck'], desc: "Tart and deep profile. Ideal for grilled pork and fresh fish." },
  { id: 'masala', name: 'Brampton Masala', heat: 4, price: 15.99, color: 'bg-orange-600', pairs: ['Curry', 'Goat', 'Potatoes'], desc: "The legend of the city. Caribbean fire meets South Asian warmth." },
  { id: 'inferno', name: 'The Inferno', heat: 5, price: 13.99, color: 'bg-rasta-red', pairs: ['Everything', 'Wings'], desc: "Pure Scotch Bonnet intensity for the serious heat-seekers." },
];

export const AI_RECIPE_DB = [
  { id: 1, triggerWords: ['chicken', 'rice', 'peas'], title: "Classic Kingston Chicken Bowl", requiredFlavor: 'orig', time: "35m", desc: "A hearty, staple bowl. Rub the chicken in The Original, pan sear, and serve over rice and peas." },
  { id: 2, triggerWords: ['fish', 'shrimp', 'seafood', 'mango'], title: "Mango Island Seafood Skewers", requiredFlavor: 'mango', time: "20m", desc: "Glaze your seafood with Mango Island before hitting the grill. The sugars caramelize instantly." },
  { id: 3, triggerWords: ['pork', 'ribs', 'potato'], title: "Tamarind Tang Glazed Ribs", requiredFlavor: 'tamarind', time: "2h", desc: "Slow roast the pork, basting every 30 mins with Tamarind Tang for a sticky, sweet-sour bark." },
  { id: 4, triggerWords: ['tofu', 'curry', 'vegetable', 'vegan'], title: "Brampton Masala Eye-tahl Stew", requiredFlavor: 'masala', time: "45m", desc: "A rich, vegan-friendly coconut milk stew powered by the deep heat of Brampton Masala." },
  { id: 5, triggerWords: ['wings', 'spicy', 'hot'], title: "Inferno Midnight Wings", requiredFlavor: 'inferno', time: "40m", desc: "Warning: Pure heat. Toss double-fried wings in The Inferno. Serve with cooling sour cream." },
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
