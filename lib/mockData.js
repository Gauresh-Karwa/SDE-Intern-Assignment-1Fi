export const PRODUCTS = [
  {
    id: "iphone-17-pro",
    brand: "Apple",
    name: "iPhone 17 Pro",
    image: null,
    merchant: "Reliance Digital",
    variants: [
      { id: "256gb", label: "2026 · 256 GB", sublabel: "iPhone 17 Pro 256 GB", price: 125900 },
      { id: "512gb", label: "2026 · 512 GB", sublabel: "iPhone 17 Pro 512 GB", price: 134900 },
    ],
    emiRates: [
      { months: 3, ratePct: 10 },
      { months: 6, ratePct: 10 },
      { months: 9, ratePct: 11 },
      { months: 12, ratePct: 12 },
    ],
  },
  {
    id: "macbook-pro",
    brand: "Apple",
    name: "MacBook Pro",
    image: null,
    merchant: "Croma",
    variants: [
      { id: "m4-512", label: "M4 · 512 GB", sublabel: "14-inch, Space Black", price: 169900 },
      { id: "m4-1tb", label: "M4 · 1 TB", sublabel: "14-inch, Space Black", price: 199900 },
    ],
    emiRates: [
      { months: 3, ratePct: 10 },
      { months: 6, ratePct: 10 },
      { months: 12, ratePct: 12 },
      { months: 24, ratePct: 13 },
    ],
  },
  {
    id: "galaxy-s25-ultra",
    brand: "Samsung",
    name: "Galaxy S25 Ultra",
    image: null,
    merchant: "Vijay Sales",
    variants: [
      { id: "256gb", label: "256 GB", sublabel: "Titanium Black", price: 129999 },
      { id: "512gb", label: "512 GB", sublabel: "Titanium Black", price: 144999 },
    ],
    emiRates: [
      { months: 3, ratePct: 10 },
      { months: 6, ratePct: 10 },
      { months: 12, ratePct: 12 },
    ],
  },
  {
    id: "oneplus-15",
    brand: "OnePlus",
    name: "OnePlus 15",
    image: null,
    merchant: "OnePlus Store",
    variants: [
      { id: "256gb", label: "256 GB", sublabel: "Storm Grey", price: 69999 },
    ],
    emiRates: [
      { months: 3, ratePct: 10 },
      { months: 6, ratePct: 10 },
      { months: 9, ratePct: 11 },
    ],
  },
];

export function getAllProductsSummary() {
  return PRODUCTS.map((p) => {
    const minPrice = Math.min(...p.variants.map((v) => v.price));
    return {
      id: p.id,
      brand: p.brand,
      name: p.name,
      image: p.image,
      startingPrice: minPrice,
    };
  });
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}
