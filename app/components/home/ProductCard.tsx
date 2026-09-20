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
    id: number;
    image: string;
    name: string;
    price: number;
    reviews?: Review[];
  };
}

const ProductCard = ({ product }: ProductProps) => {
  const router = useRouter();

  const productRating =
    product.reviews?.reduce((acc: number, item: Review) => acc + item.rating, 0)! /
      product.reviews?.length || 0;

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-[240px] cursor-pointer flex flex-col flex-1 shadow-lg p-2 rounded-md"
    >
      <div className="relative h-[150px]">
        <Image
          src={
            product.image?.startsWith("data:")
              ? product.image
              : `data:image/png;base64,${product.image}`
          }
          fill
          alt={product.name}
          className="object-contain"
        />
      </div>
      <div className="text-center mt-2 space-y-1">
        <div>{textClip(product.name)}</div>
        <Rating name="read-only" value={productRating} readOnly />
        <div className="text-red-400 font-bold text-lg md:text-xl">
          {product.price} ₺
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
