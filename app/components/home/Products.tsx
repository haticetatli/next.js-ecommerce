"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Heading from "../general/Heading";
import ProductCard from "./ProductCard";
import { Product, SortOption } from "@/types";
import { filterProducts, sortProducts } from "@/utils/filterUtils";
import { FiFilter, FiRefreshCw, FiSearch } from "react-icons/fi";

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams?.get("category") || "Tümü";
  const searchQuery = searchParams?.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("API isteği başarısız oldu");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Ürünler alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtreleme ve Sıralama
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      category: activeCategory,
      search: searchQuery,
      inStockOnly,
    });
    return sortProducts(filtered, sortBy);
  }, [products, activeCategory, searchQuery, inStockOnly, sortBy]);

  const handleClearFilters = () => {
    setSortBy("featured");
    setInStockOnly(false);
    router.push("/");
  };

  return (
    <section id="products-section" className="max-w-7xl mx-auto px-4 md:px-10 py-8">
      {/* Başlık ve Filtre / Sıralama Kontrol Paneli */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <Heading
            text={
              searchQuery
                ? `"${searchQuery}" için Arama Sonuçları`
                : activeCategory !== "Tümü"
                ? `${activeCategory} Koleksiyonu`
                : "Tüm Ürünler"
            }
            center={false}
          />
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Toplam{" "}
            <span className="font-bold text-gray-900">
              {filteredAndSortedProducts.length}
            </span>{" "}
            ürün listeleniyor
          </p>
        </div>

        {/* Filtre ve Sıralama Araçları */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Stok Filtresi */}
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 px-3.5 py-2 rounded-xl cursor-pointer shadow-sm transition">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded text-pink-600 focus:ring-pink-500 w-4 h-4 cursor-pointer"
            />
            <span>Yalnızca Stoktakiler</span>
          </label>

          {/* Sıralama Seçici */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-sm text-xs font-medium text-gray-700">
            <FiFilter className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent outline-none cursor-pointer text-gray-800 font-semibold"
            >
              <option value="featured">Öne Çıkanlar</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="rating-desc">En Çok Değerlendirilen</option>
              <option value="name-asc">İsim (A-Z)</option>
            </select>
          </div>

          {/* Filtreleri Sıfırla */}
          {(activeCategory !== "Tümü" || searchQuery || inStockOnly || sortBy !== "featured") && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1 text-xs font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 px-3 py-2 rounded-xl transition cursor-pointer"
              title="Tüm filtreleri temizle"
            >
              <FiRefreshCw size={12} />
              <span>Sıfırla</span>
            </button>
          )}
        </div>
      </div>

      {/* Ürünler Grid / Yükleniyor / Boş Durum */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm animate-pulse space-y-3"
            >
              <div className="w-full h-44 bg-gray-100 rounded-xl" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-5 bg-gray-100 rounded w-1/3" />
                <div className="h-7 bg-gray-100 rounded-lg w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredAndSortedProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto">
            <FiSearch size={28} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Eşleşen Ürün Bulunamadı
          </h3>
          <p className="text-xs md:text-sm text-gray-500">
            Arama kriterlerinize veya seçtiğiniz kategoriye uygun ürün bulunamadı. Filtreleri temizleyerek tekrar deneyebilirsiniz.
          </p>
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition shadow-sm cursor-pointer"
          >
            <FiRefreshCw size={14} />
            <span>Filtreleri Temizle</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
