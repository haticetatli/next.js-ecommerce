import { Product, FilterState } from "@/types";

/**
 * Ürünleri kategori, arama terimi, fiyat aralığı ve stok durumuna göre filtreler.
 */
export function filterProducts(
  products: Product[],
  filters: Partial<FilterState>
): Product[] {
  if (!products || !Array.isArray(products)) return [];

  return products.filter((product) => {
    // 1. Kategori Filtresi
    if (
      filters.category &&
      filters.category !== "Tümü" &&
      filters.category.trim() !== ""
    ) {
      const prodCat = (product.category || "").toLowerCase().trim();
      const filterCat = filters.category.toLowerCase().trim();

      const normalize = (cat: string) => {
        if (cat === "telefon" || cat === "phone") return "telefon";
        if (cat === "laptop" || cat === "bilgisayar" || cat === "computer") return "laptop";
        if (cat === "saat" || cat === "watch") return "saat";
        if (cat === "aksesuar" || cat === "accessory" || cat === "accessories") return "aksesuar";
        if (cat === "ayakkabı" || cat === "ayakkabi" || cat === "shoes" || cat === "shoe") return "ayakkabı";
        if (cat === "çanta" || cat === "canta" || cat === "bag" || cat === "bags") return "çanta";
        return cat;
      };

      const normProd = normalize(prodCat);
      const normFilter = normalize(filterCat);

      if (normProd !== normFilter && !prodCat.includes(filterCat) && !filterCat.includes(prodCat)) {
        return false;
      }
    }

    // 2. Arama Filtresi (Başlık, Marka, Açıklama)
    if (filters.search && filters.search.trim() !== "") {
      const query = filters.search.toLowerCase().trim();
      const nameMatch = (product.name || "").toLowerCase().includes(query);
      const brandMatch = (product.brand || "").toLowerCase().includes(query);
      const descMatch = (product.description || "").toLowerCase().includes(query);
      const catMatch = (product.category || "").toLowerCase().includes(query);

      if (!nameMatch && !brandMatch && !descMatch && !catMatch) {
        return false;
      }
    }

    // 3. Fiyat Aralığı Filtresi
    if (typeof filters.minPrice === "number" && product.price < filters.minPrice) {
      return false;
    }
    if (typeof filters.maxPrice === "number" && product.price > filters.maxPrice) {
      return false;
    }

    // 4. Yalnızca Stoktakiler
    if (filters.inStockOnly && product.inStock === false) {
      return false;
    }

    return true;
  });
}

/**
 * Ürünleri seçilen sıralama seçeneğine göre sıralar.
 */
export function sortProducts(
  products: Product[],
  sortBy: FilterState["sortBy"]
): Product[] {
  if (!products || !Array.isArray(products)) return [];
  const copy = [...products];

  switch (sortBy) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);

    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);

    case "rating-desc":
      return copy.sort((a, b) => {
        const ratingA =
          a.reviews && a.reviews.length > 0
            ? a.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
              a.reviews.length
            : 0;
        const ratingB =
          b.reviews && b.reviews.length > 0
            ? b.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
              b.reviews.length
            : 0;
        return ratingB - ratingA;
      });

    case "name-asc":
      return copy.sort((a, b) => (a.name || "").localeCompare(b.name || "", "tr"));

    case "featured":
    default:
      return copy;
  }
}
