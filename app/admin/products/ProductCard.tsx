"use client";

import { useState } from "react";

export default function ProductCard({ product }: any) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Edit için state’ler
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [brand, setBrand] = useState(product.brand);

  const handleDelete = async () => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

    await fetch(`/api/products/${product.id}`, {
      method: "DELETE",
    });

    window.location.reload(); // sayfayı yenile
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        brand,
        description: product.description,
        category: product.category,
        inStock: product.inStock,
        image: product.image, // resmi değiştirmiyoruz
      }),
    });

    setIsEditOpen(false);
    window.location.reload();
  };

  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col justify-between">
      <div>
        <img
          src={
            product.image?.startsWith("data:")
              ? product.image
              : `data:image/png;base64,${product.image}`
          }
          alt={product.name}
          className="w-full h-48 object-contain rounded bg-gray-100"
        />
        <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-orange-700 font-semibold">{product.price} ₺</p>
        <span
          className={`text-sm ${
            product.inStock ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.inStock ? "Stokta Var" : "Stokta Yok"}
        </span>
      </div>

      {/* Butonlar */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setIsEditOpen(true)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Düzenle
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Sil
        </button>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Ürünü Düzenle</h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded p-2"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border rounded p-2"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Kapat
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
