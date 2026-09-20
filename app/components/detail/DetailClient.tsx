"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Rating } from "@mui/material";
import useCart from "@/hooks/useCart";
import { formatCurrency } from "@/utils/cartUtils";
import { Product, Review } from "@/types";
import Comment from "./Comment";
import ProductCard from "../home/ProductCard";
import { toast } from "react-hot-toast";
import {
  MdShoppingBag,
  MdFavorite,
  MdFavoriteBorder,
  MdLocalShipping,
  MdShield,
  MdAutorenew,
  MdCheck,
  MdOutlineRateReview,
} from "react-icons/md";

interface DetailClientProps {
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

const DetailClient = ({ product }: DetailClientProps) => {
  const router = useRouter();
  const { addToBasket, cartPrdcts } = useCart();

  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Yeni Değerlendirme Formu State
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");

  const mainImageSrc = getValidImageSrc(product.image);

  // Benzer Ürünleri Çek
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        if (Array.isArray(data)) {
          const filtered = data.filter(
            (p) => String(p.id) !== String(product.id) && p.category === product.category
          );
          setRelatedProducts(filtered.slice(0, 4));
        }
      })
      .catch((err) => console.error("Related products fetch error:", err));
  }, [product.id, product.category]);

  // Favori kontrolü
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (Array.isArray(favs)) {
        setIsFavorite(favs.includes(String(product.id)));
      }
    } catch {
      //
    }
  }, [product.id]);

  const toggleFavorite = () => {
    try {
      const favs: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
      const strId = String(product.id);
      let updated: string[];

      if (favs.includes(strId)) {
        updated = favs.filter((id) => id !== strId);
        setIsFavorite(false);
        toast.success("Favorilerden kaldırıldı");
      } else {
        updated = [...favs, strId];
        setIsFavorite(true);
        toast.success("Favorilere eklendi!");
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const isInCart = useMemo(() => {
    return cartPrdcts.some((item) => String(item.id) === String(product.id));
  }, [cartPrdcts, product.id]);

  const handleAddToCart = () => {
    addToBasket(
      {
        id: String(product.id),
        name: product.name,
        description: product.description,
        price: product.price,
        quantity,
        image: mainImageSrc,
        inStock: product.inStock,
        brand: product.brand,
        category: product.category,
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Lütfen bir yorum yazın");
      return;
    }

    const reviewObj: Review = {
      id: `rev-${Date.now()}`,
      rating: newRating,
      comment: newComment.trim(),
      createdDate: new Date().toISOString(),
      user: {
        name: newName.trim() || "Ziyaretçi",
      },
    };

    setReviewsList((prev) => [reviewObj, ...prev]);
    setNewComment("");
    setNewName("");
    setShowReviewForm(false);
    toast.success("Değerlendirmeniz başarıyla eklendi! ⭐");
  };

  const productRating =
    reviewsList.length > 0
      ? reviewsList.reduce((acc, item) => acc + item.rating, 0) / reviewsList.length
      : 5;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-10 space-y-12">
      {/* Breadcrumbs Navigasyonu */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <Link href="/" className="hover:text-pink-600 transition">
          Ana Sayfa
        </Link>
        <span>/</span>
        <Link
          href={`/?category=${encodeURIComponent(product.category || "")}`}
          className="hover:text-pink-600 transition"
        >
          {product.category || "Kategori"}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Ana Ürün Kartı (Görsel ve Bilgiler) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm">
        {/* Sol Kolon: Ürün Görseli */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full h-[320px] sm:h-[450px] bg-gray-50/60 rounded-2xl overflow-hidden p-4 flex items-center justify-center border border-gray-100">
            <Image
              src={mainImageSrc}
              fill
              alt={product.name || "Ürün Detayı"}
              className="object-contain p-4"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Favori Butonu */}
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
              title="Favorilere Ekle"
            >
              {isFavorite ? (
                <MdFavorite className="text-rose-500 text-xl" />
              ) : (
                <MdFavoriteBorder className="text-gray-400 hover:text-rose-500 text-xl" />
              )}
            </button>
          </div>

          {/* Güven ve Avantajlar Rozetleri */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50/60 border border-gray-100">
              <MdLocalShipping className="text-pink-600 text-xl mb-1" />
              <span className="text-[11px] font-bold text-gray-800">Hızlı Kargo</span>
              <span className="text-[10px] text-gray-500">1-2 Günde Kapında</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50/60 border border-gray-100">
              <MdShield className="text-pink-600 text-xl mb-1" />
              <span className="text-[11px] font-bold text-gray-800">Orijinal Ürün</span>
              <span className="text-[10px] text-gray-500">2 Yıl Distribütör</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50/60 border border-gray-100">
              <MdAutorenew className="text-pink-600 text-xl mb-1" />
              <span className="text-[11px] font-bold text-gray-800">Kolay İade</span>
              <span className="text-[10px] text-gray-500">14 Gün Koşulsuz</span>
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Ürün Detayları ve Satın Alma */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Marka & Kategori */}
            <div className="flex items-center gap-2">
              {product.brand && (
                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.brand}
                </span>
              )}
              <span className="text-xs text-gray-400 font-medium">
                Kategori: <strong>{product.category}</strong>
              </span>
            </div>

            {/* Ürün Başlığı */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Değerlendirme & Yorum Sayısı */}
            <div className="flex items-center gap-2">
              <Rating
                value={productRating}
                readOnly
                size="small"
                precision={0.5}
              />
              <span className="text-xs font-bold text-gray-800">
                {productRating.toFixed(1)}
              </span>
              <span className="text-gray-300">·</span>
              <button
                onClick={() => setActiveTab("reviews")}
                className="text-xs text-pink-600 font-semibold hover:underline cursor-pointer"
              >
                {reviewsList.length} Değerlendirme
              </button>
            </div>

            {/* Fiyat Alanı */}
            <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-pink-600">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                (KDV ve Tüm Vergiler Dahil)
              </span>
            </div>

            {/* Kısa Açıklama */}
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Stok Durumu */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-gray-500">Stok Durumu:</span>
              {product.inStock !== false ? (
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <MdCheck size={14} />
                  Stokta Var - Aynı Gün Kargo
                </span>
              ) : (
                <span className="text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                  Stokta Tükendi
                </span>
              )}
            </div>
          </div>

          {/* Adet Seçimi ve Satın Alma Butonları */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            {/* Adet Arttırma / Azaltma */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-700">Miktar:</span>
              <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-gray-700 hover:text-pink-600 transition cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-gray-700 hover:text-pink-600 transition cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-400">
                (Maksimum 10 adet)
              </span>
            </div>

            {/* Butonlar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.inStock === false}
                className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                <MdShoppingBag size={20} />
                <span>{isInCart ? "Sepeti Güncelle" : "Sepete Ekle"}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.inStock === false}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                <span>Hemen Satın Al</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Bölüm: Açıklama, Özellikler ve Yorumlar Sekmeleri */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
        <div className="flex border-b border-gray-100 gap-6">
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === "desc"
                ? "border-pink-600 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Ürün Açıklaması
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === "specs"
                ? "border-pink-600 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Teknik Özellikler
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === "reviews"
                ? "border-pink-600 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Değerlendirmeler ({reviewsList.length})
          </button>
        </div>

        {/* Tab İçerikleri */}
        {activeTab === "desc" && (
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>{product.description}</p>
            <p>
              Tüm ürünlerimiz %100 orijinal olup, Türkiye resmi distribütör garantisi kapsamındadır.
              Ambalajı açılmamış ve kullanılmamış ürünlerde 14 gün boyunca ücretsiz iade hakkınız mevcuttur.
            </p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-400">Marka</span>
              <span className="font-semibold text-gray-800">{product.brand || "Belirtilmemiş"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-400">Kategori</span>
              <span className="font-semibold text-gray-800">{product.category || "Genel"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-400">Garanti Süresi</span>
              <span className="font-semibold text-gray-800">24 Ay</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-400">Durum</span>
              <span className="font-semibold text-gray-800">Sıfır / Orijinal Kutusunda</span>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Müşteri Yorumları & Puanları
                </h3>
                <p className="text-xs text-gray-500">
                  Ortalama {productRating.toFixed(1)} / 5 ({reviewsList.length} değerlendirme)
                </p>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="flex items-center gap-1.5 bg-pink-50 hover:bg-pink-100 text-pink-600 text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                <MdOutlineRateReview size={16} />
                <span>{showReviewForm ? "Formu Kapat" : "Yorum Yaz"}</span>
              </button>
            </div>

            {/* Yorum Ekleme Formu */}
            {showReviewForm && (
              <form
                onSubmit={handleAddReview}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4"
              >
                <h4 className="text-sm font-bold text-gray-900">Yeni Değerlendirme Bırak</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-700 font-semibold">Puanınız:</span>
                  <Rating
                    value={newRating}
                    onChange={(_, val) => setNewRating(val || 5)}
                    size="medium"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    placeholder="Ürün hakkındaki deneyimlerinizi ve düşüncelerinizi paylaşın..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-pink-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
                >
                  Yorumu Gönder
                </button>
              </form>
            )}

            {/* Yorum Listesi */}
            {reviewsList.length === 0 ? (
              <p className="text-xs text-gray-500 py-4">
                Bu ürün için henüz yorum yapılmamış. İlk değerlendirmeyi siz bırakın!
              </p>
            ) : (
              <div className="space-y-3">
                {reviewsList.map((rev) => (
                  <Comment key={rev.id} prd={rev} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Benzer Ürünler Bölümü */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
            Benzer Ürünler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailClient;
