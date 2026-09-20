"use client";

import { useEffect, useState } from "react";
import Heading from "../general/Heading";
import ProductCard from "./ProductCard";

interface Review {
  rating: number;
}

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  reviews?: Review[];
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
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
    <div>
      <Heading text="Tüm Ürünler" />
      {loading ? (
        <p className="text-center text-gray-500 mt-4">Ürünler yükleniyor...</p>
      ) : (
        <div className="flex items-center flex-wrap gap-3 md:gap-10 px-3 md:px-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
