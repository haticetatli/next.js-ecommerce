"use client";

import Image from "next/image";
import Rating from "@mui/material/Rating";
import textClip from "@/utils/TextClip";
import { useRouter } from "next/navigation";

interface Review {
  rating: number;
}

interface ProductProps {
  product: {
    id: string | number;
    image: string;
    name: string;
    price: number;
    brand?: string;
    category?: string;
    inStock?: boolean;
    reviews?: Review[];
  };
}

const getValidImageSrc = (raw: any): string => {
  let src = Array.isArray(raw) ? raw[0] : raw;
  if (src && typeof src === "object") {
    src = src.url ?? src.src ?? src.path ?? null;
  }
  if (typeof src !== "string" || !src.trim()) return "/placeholder.webp";
  src = src.trim();

  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  return `data:image/png;base64,${src}`;
};

const ProductCard = ({ product }: ProductProps) => {
  const router = useRouter();

  const productRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((acc: number, item: Review) => acc + item.rating, 0) /
        product.reviews.length
      : 0;

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  const imageSrc = getValidImageSrc(product.image);

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-100 hover:border-pink-300 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden"
    >
      <div className="relative w-full h-[190px] mb-3 bg-gray-50/50 rounded-xl overflow-hidden p-2 flex items-center justify-center">
        <Image
          src={imageSrc}
          fill
          alt={product.name || "Ürün"}
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {product.inStock !== false && (
          <span className="absolute top-2 left-2 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
            Stokta
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 justify-between space-y-2">
        {product.brand && (
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
            {product.brand}
          </span>
        )}
        <h3 className="text-gray-800 font-medium text-sm md:text-base leading-snug group-hover:text-pink-600 transition-colors line-clamp-2">
          {textClip(product.name, 45)}
        </h3>

        <div className="flex items-center gap-1">
          <Rating name="read-only" value={productRating} readOnly size="small" precision={0.5} />
          <span className="text-xs text-gray-400">({product.reviews?.length || 0})</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="text-pink-600 font-bold text-lg md:text-xl">
            {Number(product.price).toLocaleString("tr-TR")} ₺
          </div>
          <button className="bg-pink-50 hover:bg-pink-500 text-pink-600 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
            İncele
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
