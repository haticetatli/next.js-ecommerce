"use client";

import { useEffect, useState } from "react";
import Heading from "../general/Heading";
import ProductCard from "./ProductCard";

interface Review {
  rating: number;
}

interface Product {
  id: string | number;
  image: string;
  name: string;
  price: number;
  brand?: string;
  category?: string;
  inStock?: boolean;
  reviews?: Review[];
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
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

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-10 mb-6">
        <Heading text="Tüm Ürünler" center={false} />
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-16 gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500"></div>
          <p className="text-sm text-gray-500 font-medium">Ürünler listeleniyor...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-gray-500">Henüz ürün bulunamadı.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 md:px-10 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
