// Phase 1 mock catalog. Replace with database-backed queries in Phase 2.
export type Category = { slug: string; name: string; emoji: string; tint: string };
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  unit: string; // e.g. "1 kg"
  unitQty: number; // numeric qty in base unit
  baseUnit: "kg" | "L" | "pc" | "g" | "ml";
  price: number; // selling price INR
  mrp: number;
  emoji: string;
  featured?: boolean;
  veg?: boolean;
};

export const categories: Category[] = [
  { slug: "fruits-vegetables", name: "Fruits & Sabzi", emoji: "🥬", tint: "bg-leaf/10" },
  { slug: "dairy-bread", name: "Dairy & Bread", emoji: "🥛", tint: "bg-accent/60" },
  { slug: "atta-rice-dal", name: "Atta, Rice & Dal", emoji: "🌾", tint: "bg-secondary" },
  { slug: "masala-oil", name: "Masala & Oil", emoji: "🌶️", tint: "bg-primary/10" },
  { slug: "snacks", name: "Namkeen & Snacks", emoji: "🥨", tint: "bg-accent/60" },
  { slug: "beverages", name: "Chai & Drinks", emoji: "☕", tint: "bg-secondary" },
  { slug: "personal-care", name: "Personal Care", emoji: "🧴", tint: "bg-leaf/10" },
  { slug: "home-care", name: "Home & Cleaning", emoji: "🧽", tint: "bg-primary/10" },
];

export const products: Product[] = [
  { id: "p1", name: "Farm Fresh Tomatoes", brand: "GharMart Fresh", category: "fruits-vegetables", unit: "1 kg", unitQty: 1, baseUnit: "kg", price: 32, mrp: 40, emoji: "🍅", featured: true, veg: true },
  { id: "p2", name: "Onion (Pyaz)", brand: "GharMart Fresh", category: "fruits-vegetables", unit: "1 kg", unitQty: 1, baseUnit: "kg", price: 38, mrp: 45, emoji: "🧅", featured: true, veg: true },
  { id: "p3", name: "Alphonso Mango", brand: "Ratnagiri Farms", category: "fruits-vegetables", unit: "6 pc", unitQty: 6, baseUnit: "pc", price: 449, mrp: 599, emoji: "🥭", veg: true },
  { id: "p4", name: "Coriander Bunch", brand: "GharMart Fresh", category: "fruits-vegetables", unit: "100 g", unitQty: 100, baseUnit: "g", price: 12, mrp: 15, emoji: "🌿", veg: true },
  { id: "p5", name: "Toned Milk", brand: "Gokul Dairy", category: "dairy-bread", unit: "500 ml", unitQty: 500, baseUnit: "ml", price: 28, mrp: 28, emoji: "🥛", featured: true, veg: true },
  { id: "p6", name: "Fresh Paneer", brand: "Desi Dhaba", category: "dairy-bread", unit: "200 g", unitQty: 200, baseUnit: "g", price: 89, mrp: 99, emoji: "🧀", featured: true, veg: true },
  { id: "p7", name: "Whole Wheat Bread", brand: "Tandoor Bakes", category: "dairy-bread", unit: "400 g", unitQty: 400, baseUnit: "g", price: 45, mrp: 50, emoji: "🍞", veg: true },
  { id: "p8", name: "Masala Dahi", brand: "Gokul Dairy", category: "dairy-bread", unit: "400 g", unitQty: 400, baseUnit: "g", price: 42, mrp: 48, emoji: "🥣", veg: true },
  { id: "p9", name: "Chakki Fresh Atta", brand: "Annapurna Mills", category: "atta-rice-dal", unit: "5 kg", unitQty: 5, baseUnit: "kg", price: 249, mrp: 310, emoji: "🌾", featured: true, veg: true },
  { id: "p10", name: "Basmati Rice", brand: "Himalaya Grain", category: "atta-rice-dal", unit: "1 kg", unitQty: 1, baseUnit: "kg", price: 139, mrp: 180, emoji: "🍚", featured: true, veg: true },
  { id: "p11", name: "Toor Dal", brand: "Annapurna Mills", category: "atta-rice-dal", unit: "1 kg", unitQty: 1, baseUnit: "kg", price: 165, mrp: 199, emoji: "🫘", veg: true },
  { id: "p12", name: "Kachi Ghani Mustard Oil", brand: "Sarson Gold", category: "masala-oil", unit: "1 L", unitQty: 1, baseUnit: "L", price: 172, mrp: 210, emoji: "🫒", featured: true, veg: true },
  { id: "p13", name: "Haldi Powder", brand: "Masala Ghar", category: "masala-oil", unit: "200 g", unitQty: 200, baseUnit: "g", price: 54, mrp: 65, emoji: "🟡", veg: true },
  { id: "p14", name: "Garam Masala", brand: "Masala Ghar", category: "masala-oil", unit: "100 g", unitQty: 100, baseUnit: "g", price: 72, mrp: 85, emoji: "🌶️", veg: true },
  { id: "p15", name: "Aloo Bhujia", brand: "Bikaner Bites", category: "snacks", unit: "400 g", unitQty: 400, baseUnit: "g", price: 99, mrp: 120, emoji: "🥨", featured: true, veg: true },
  { id: "p16", name: "Masala Peanuts", brand: "Bikaner Bites", category: "snacks", unit: "200 g", unitQty: 200, baseUnit: "g", price: 45, mrp: 55, emoji: "🥜", veg: true },
  { id: "p17", name: "Assam CTC Chai", brand: "Chai Sutta Co.", category: "beverages", unit: "500 g", unitQty: 500, baseUnit: "g", price: 225, mrp: 280, emoji: "☕", featured: true, veg: true },
  { id: "p18", name: "Nimbu Pani Mix", brand: "Desi Sip", category: "beverages", unit: "1 L", unitQty: 1, baseUnit: "L", price: 60, mrp: 70, emoji: "🍋", veg: true },
  { id: "p19", name: "Neem Face Wash", brand: "Ayur Leaf", category: "personal-care", unit: "150 ml", unitQty: 150, baseUnit: "ml", price: 129, mrp: 165, emoji: "🧴", veg: true },
  { id: "p20", name: "Coconut Hair Oil", brand: "Kerala Pure", category: "personal-care", unit: "500 ml", unitQty: 500, baseUnit: "ml", price: 189, mrp: 220, emoji: "🥥", veg: true },
  { id: "p21", name: "Dishwash Gel Lemon", brand: "Chamak", category: "home-care", unit: "750 ml", unitQty: 750, baseUnit: "ml", price: 115, mrp: 145, emoji: "🍋", featured: true },
  { id: "p22", name: "Floor Cleaner Phenyl", brand: "Chamak", category: "home-care", unit: "1 L", unitQty: 1, baseUnit: "L", price: 99, mrp: 125, emoji: "🧽" },
];

export const serviceablePincodes: Record<string, { area: string; city: string; eta: number }> = {
  "110001": { area: "Connaught Place", city: "New Delhi", eta: 12 },
  "400050": { area: "Bandra West", city: "Mumbai", eta: 15 },
  "560034": { area: "Koramangala", city: "Bengaluru", eta: 10 },
  "411001": { area: "Camp", city: "Pune", eta: 14 },
  "500081": { area: "Madhapur", city: "Hyderabad", eta: 13 },
  "700019": { area: "Ballygunge", city: "Kolkata", eta: 16 },
};

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const discountPct = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

export function unitPrice(p: Product) {
  const map = { kg: [1, "kg"], L: [1, "L"], pc: [1, "pc"], g: [100, "100 g"], ml: [100, "100 ml"] } as const;
  const [per, label] = map[p.baseUnit];
  return `${inr(Math.round((p.price / p.unitQty) * per * 10) / 10)}/${label}`;
}

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const searchProducts = (q: string) => {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return products.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(s));
};
