"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Lütfen bir görsel seçin");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string; // data:image/...;base64,... şeklinde gelir

      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          brand,
          category,
          inStock,
          image: base64Image,
        }),
      });

      // başarı sonrası yönlendir
      router.push("/admin/products");
      router.refresh();
    };

    reader.readAsDataURL(image); // ✅ dosyayı base64'e çevirme işlemi
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Yeni Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ürün Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value ? Number(e.target.value) : "")
          }
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Marka"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          Stokta Var
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="w-full border rounded p-2"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}
