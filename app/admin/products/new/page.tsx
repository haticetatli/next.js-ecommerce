"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { MdArrowBack, MdCloudUpload, MdCheck } from "react-icons/md";

const predefinedCategories = [
  "Telefon",
  "Laptop",
  "Saat",
  "Aksesuar",
  "Ayakkabı",
  "Çanta",
];

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Telefon");
  const [inStock, setInStock] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description) {
      toast.error("Lütfen zorunlu alanları doldurunuz.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          brand,
          category,
          inStock,
          image: imagePreview || "/placeholder.webp",
        }),
      });

      if (res.ok) {
        toast.success("Ürün başarıyla eklendi!");
        router.push("/admin/products");
        router.refresh();
      } else {
        toast.error("Ürün eklenirken bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      toast.error("İşlem gerçekleştirilemedi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-pink-600 transition"
        >
          <MdArrowBack size={16} />
          <span>Ürün Listesine Dön</span>
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Yeni Ürün Ekle
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Kataloğa yeni bir ürün eklemek için aşağıdaki formu eksiksiz doldurun.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ürün Adı */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Ürün Adı *
            </label>
            <input
              type="text"
              placeholder="Örn: iPhone 16 Pro Max 256GB"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:border-pink-500 focus:bg-white transition"
            />
          </div>

          {/* Marka & Kategori */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Marka
              </label>
              <input
                type="text"
                placeholder="Örn: Apple, Samsung, Nike"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:border-pink-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Kategori *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:border-pink-500 focus:bg-white transition cursor-pointer"
              >
                {predefinedCategories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fiyat & Stok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Fiyat (₺) *
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value ? Number(e.target.value) : "")
                }
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:border-pink-500 focus:bg-white transition"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-pink-500 w-4 h-4 cursor-pointer"
                />
                <span>Hemen Stokta Satışa Aç</span>
              </label>
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Ürün Açıklaması *
            </label>
            <textarea
              rows={3}
              placeholder="Ürünün özelliklerini ve detaylarını yazın..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:border-pink-500 focus:bg-white transition"
            />
          </div>

          {/* Görsel Yükleme & Önizleme */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Ürün Görseli
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-pink-400 hover:bg-pink-50/20 transition">
                <MdCloudUpload className="text-gray-400 text-3xl mb-1" />
                <span className="text-xs font-semibold text-gray-700">
                  Görsel Yüklemek İçin Tıklayın
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  PNG, JPG veya WEBP (Max 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <div className="relative w-24 h-24 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden p-2 flex items-center justify-center">
                  <Image
                    src={imagePreview}
                    alt="Önizleme"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Kaydet Butonu */}
          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold rounded-2xl shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Ürün Kaydediliyor...</span>
                </>
              ) : (
                <>
                  <MdCheck size={18} />
                  <span>Ürünü Kataloğa Ekle</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
