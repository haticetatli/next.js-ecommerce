"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products as allProducts } from "@/utils/Products";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/cartUtils";
import useCart from "@/hooks/useCart";
import { toast } from "react-hot-toast";
import {
  MdFavorite,
  MdDeleteOutline,
  MdOutlineShoppingBag,
  MdArrowBack,
} from "react-icons/md";

const getValidImageSrc = (raw: unknown): string => {
  let src: unknown = Array.isArray(raw) ? raw[0] : raw;
  if (src && typeof src === "object") {
    const obj = src as Record<string, unknown>;
    src = obj.url ?? obj.src ?? obj.path ?? null;
  }
  if (typeof src !== "string" || !src.trim()) return "/placeholder.webp";
  const s = src.trim();

  if (
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.startsWith("/") ||
    s.startsWith("data:") ||
    s.startsWith("blob:")
  ) {
    return s;
  }

  return `data:image/png;base64,${s}`;
};

export default function FavoritesClient() {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToBasket } = useCart();

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem("tatli_wishlist");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const matched = allProducts.filter((p) => ids.includes(p.id));
        setFavoriteProducts(matched);
      } else {
        setFavoriteProducts([]);
      }
    } catch {
      setFavoriteProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = (productId: string, name: string) => {
    try {
      const stored = localStorage.getItem("tatli_wishlist");
      let ids: string[] = stored ? JSON.parse(stored) : [];
      ids = ids.filter((id) => id !== productId);
      localStorage.setItem("tatli_wishlist", JSON.stringify(ids));
      setFavoriteProducts((prev) => prev.filter((p) => p.id !== productId));
      toast.success(`"${name}" favorilerinizden çıkarıldı.`);
    } catch {
      toast.error("İşlem sırasında hata oluştu.");
    }
  };

  const handleAddToCart = (product: Product) => {
    addToBasket({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      brand: product.brand,
      image: getValidImageSrc(product.image),
      quantity: 1,
      price: product.price,
      inStock: product.inStock,
    });
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-8">
        {/* Başlık */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2.5">
              <MdFavorite className="text-pink-600" />
              <span>Favorilerim</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Beğendiğiniz ve daha sonra satın almak için kaydettiğiniz ürünler.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 hover:text-pink-700 self-start sm:self-auto"
          >
            <MdArrowBack size={16} />
            <span>Alışverişe Devam Et</span>
          </Link>
        </div>

        {/* Liste */}
        {loading ? (
          <div className="py-20 text-center text-xs text-gray-400">
            Favoriler yükleniyor...
          </div>
        ) : favoriteProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-pink-50 text-pink-400 rounded-full flex items-center justify-center mx-auto">
              <MdFavorite size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Henüz Favori Ürününüz Yok
            </h3>
            <p className="text-xs md:text-sm text-gray-500">
              İlginizi çeken ürünlerdeki kalp ikonuna tıklayarak listenize ekleyebilir, fiyatlarını buradan kolayca takip edebilirsiniz.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs px-6 py-2.5 rounded-full transition shadow-sm"
            >
              <MdOutlineShoppingBag size={14} />
              <span>Ürünleri Keşfet</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => {
              const imageSrc = getValidImageSrc(product.image);

              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-3">
                    <div className="w-full h-48 relative bg-gray-50 rounded-2xl overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemove(product.id, product.name)}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-red-500 hover:bg-red-50 flex items-center justify-center shadow-sm transition"
                        title="Favorilerden Çıkar"
                      >
                        <MdDeleteOutline size={18} />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider">
                        {product.brand || product.category}
                      </span>
                      <Link
                        href={`/product/${product.id}`}
                        className="block text-xs md:text-sm font-bold text-gray-900 line-clamp-2 hover:text-pink-600 transition"
                      >
                        {product.name}
                      </Link>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Fiyat</span>
                      <span className="font-extrabold text-sm md:text-base text-gray-900">
                        {formatCurrency(product.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <MdOutlineShoppingBag size={14} />
                      <span>Sepete Ekle</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
