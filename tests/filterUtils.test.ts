import { describe, it, expect } from "vitest";
import { filterProducts, sortProducts } from "../utils/filterUtils";
import { Product } from "../types";

describe("filterUtils", () => {
  const mockProducts: Product[] = [
    {
      id: "p1",
      name: "Apple iPhone 16",
      description: "Son model akıllı telefon",
      price: 60000,
      brand: "Apple",
      category: "Telefon",
      inStock: true,
      image: "/p1.jpg",
      reviews: [{ id: "r1", rating: 5, comment: "Harika", createdDate: "2025" }],
    },
    {
      id: "p2",
      name: "MacBook Pro M4",
      description: "Güçlü dizüstü bilgisayar",
      price: 90000,
      brand: "Apple",
      category: "Laptop",
      inStock: true,
      image: "/p2.jpg",
      reviews: [{ id: "r2", rating: 4, comment: "İyi", createdDate: "2025" }],
    },
    {
      id: "p3",
      name: "Samsung Galaxy Watch",
      description: "Akıllı saat",
      price: 7000,
      brand: "Samsung",
      category: "Saat",
      inStock: false,
      image: "/p3.jpg",
      reviews: [],
    },
  ];

  it("filters by category", () => {
    const phones = filterProducts(mockProducts, { category: "Telefon" });
    expect(phones.length).toBe(1);
    expect(phones[0].name).toBe("Apple iPhone 16");
  });

  it("filters by search term in title or brand", () => {
    const samsung = filterProducts(mockProducts, { search: "Samsung" });
    expect(samsung.length).toBe(1);
    expect(samsung[0].id).toBe("p3");
  });

  it("filters by inStock only", () => {
    const inStock = filterProducts(mockProducts, { inStockOnly: true });
    expect(inStock.length).toBe(2);
    expect(inStock.some((p) => p.id === "p3")).toBe(false);
  });

  it("sorts by price ascending", () => {
    const sorted = sortProducts(mockProducts, "price-asc");
    expect(sorted[0].price).toBe(7000);
    expect(sorted[sorted.length - 1].price).toBe(90000);
  });

  it("sorts by price descending", () => {
    const sorted = sortProducts(mockProducts, "price-desc");
    expect(sorted[0].price).toBe(90000);
    expect(sorted[sorted.length - 1].price).toBe(7000);
  });
});
