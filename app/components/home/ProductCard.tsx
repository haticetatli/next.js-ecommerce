"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import textClip from "@/utils/TextClip";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import useCart from "@/hooks/useCart";
import { formatCurrency } from "@/utils/cartUtils";
import { toast } from "react-hot-toast";
import { MdFavorite, MdFavoriteBorder, MdOutlineShoppingBag } from "react-icons/md";

interface ProductCardProps {
  product: Product;
}

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

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { addToBasket } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  // Favoriler kontrolü
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("tatli_wishlist") || "[]");
      if (Array.isArray(favs)) {
        setIsFavorite(favs.includes(String(product.id)));
      }
    } catch {
      // Hata durumunda yoksay
    }
  }, [product.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const favs: string[] = JSON.parse(
        localStorage.getItem("tatli_wishlist") || "[]"
      );
      const strId = String(product.id);
      let updatedFavs: string[];

      if (favs.includes(strId)) {
        updatedFavs = favs.filter((id) => id !== strId);
        setIsFavorite(false);
        toast("Favorilerden kaldırıldı", { icon: "💔" });
      } else {
        updatedFavs = [...favs, strId];
        setIsFavorite(true);
        toast("Favorilere eklendi!", { icon: "❤️" });
      }
      localStorage.setItem("tatli_wishlist", JSON.stringify(updatedFavs));
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToBasket({
      id: String(product.id),
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: 1,
      image: getValidImageSrc(product.image),
      inStock: product.inStock,
      brand: product.brand,
      category: product.category,
    });
  };

  const productRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((acc, item) => acc + item.rating, 0) /
        product.reviews.length
      : 0;

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  const imageSrc = getValidImageSrc(product.image);

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white border border-gray-100 hover:border-pink-300 rounded-2xl p-3.5 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Üst Görsel Alanı */}
      <div className="relative w-full h-[180px] sm:h-[210px] mb-3 bg-gray-50/60 rounded-xl overflow-hidden p-2 flex items-center justify-center">
        <Image
          src={imageSrc}
          fill
          alt={product.name || "Ürün"}
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Stok Durumu Rozeti */}
        {product.inStock !== false ? (
          <span className="absolute top-2 left-2 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
            Stokta
          </span>
        ) : (
          <span className="absolute top-2 left-2 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200">
            Tükendi
          </span>
        )}

        {/* Favori Butonu */}
        <button
          type="button"
          onClick={toggleFavorite}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 cursor-pointer z-10"
          title={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
        >
          {isFavorite ? (
            <MdFavorite className="text-rose-500 text-lg" />
          ) : (
            <MdFavoriteBorder className="text-gray-400 hover:text-rose-500 text-lg" />
          )}
        </button>
      </div>

      {/* Alt Bilgi Alanı */}
      <div className="flex flex-col flex-1 justify-between space-y-2">
        <div>
          {product.brand && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {product.brand}
            </span>
          )}
          <h3 className="text-gray-900 font-semibold text-xs sm:text-sm leading-snug group-hover:text-pink-600 transition-colors line-clamp-2 mt-0.5">
            {textClip(product.name, 50)}
          </h3>
        </div>

        {/* Puan ve Değerlendirme Sayısı */}
        <div className="flex items-center gap-1.5 pt-1">
          <Rating
            name="read-only"
            value={productRating}
            readOnly
            size="small"
            precision={0.5}
          />
          <span className="text-[11px] font-medium text-gray-400">
            ({product.reviews?.length || 0})
          </span>
        </div>

        {/* Fiyat ve Hızlı Sepet Ekle */}
        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400 block leading-none mb-0.5">
              Fiyat
            </span>
            <div className="text-pink-600 font-extrabold text-base sm:text-lg">
              {formatCurrency(product.price)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.inStock === false}
            className="flex items-center gap-1 bg-pink-50 hover:bg-pink-600 text-pink-600 hover:text-white disabled:opacity-40 disabled:hover:bg-pink-50 disabled:hover:text-pink-600 font-semibold text-xs px-3 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
            title="Hızlı Sepete Ekle"
          >
            <MdOutlineShoppingBag size={15} />
            <span className="hidden sm:inline">Ekle</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
