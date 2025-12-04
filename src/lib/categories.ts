export const CATEGORIES = [
  "FURNITURE",
  "HOUSEHOLD",
  "INDUSTRIAL",
  "GARDENING",
  "GENERAL PRODUCTS",
  "GROCERY STAPLES",
  "FOOD & BEVERAGE PRODUCTS",
] as const;

export type Category = typeof CATEGORIES[number];

export const toSlug = (name: string) => name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
