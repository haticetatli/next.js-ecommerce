"use client";

import Link from "next/link";
import useCart from "@/hooks/useCart";
import { MdOutlineShoppingBag } from "react-icons/md";

const CardCount = () => {
  const { productCartQty, cartPrdcts } = useCart();

  const qty =
    typeof productCartQty === "number"
      ? productCartQty
      : cartPrdcts?.reduce((sum, p) => sum + (p.quantity ?? 1), 0) ?? 0;

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center text-gray-700 hover:text-pink-600 transition-colors p-2 rounded-full hover:bg-pink-50"
      title="Sepetim"
    >
      <MdOutlineShoppingBag size={26} />
      {qty > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
          {qty}
        </span>
      )}
    </Link>
  );
};

export default CardCount;
