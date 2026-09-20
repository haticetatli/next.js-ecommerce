"use client";

import Link from "next/link";
import useCart from "@/hooks/useCart";
import { MdShoppingBasket } from "react-icons/md";

const CardCount = () => {
  const { productCartQty, cartPrdcts } = useCart();

  // Güvenli toplam adet (hook'tan geliyorsa onu kullan, yoksa hesaplarsın)
  const qty =
    typeof productCartQty === "number"
      ? productCartQty
      : cartPrdcts?.reduce((sum, p) => sum + (p.quantity ?? 1), 0) ?? 0;

  return (
    <Link href="/cart" className="hidden md:flex relative">
      <MdShoppingBasket size={30} />
      {qty > 0 && (
        <div className="absolute -top-3 -right-3 bg-orange-900 w-5 h-5 flex items-center justify-center rounded-full text-white text-xs">
          {qty}
        </div>
      )}
    </Link>
  );
};

export default CardCount;
