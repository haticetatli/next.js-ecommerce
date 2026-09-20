"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MdFavoriteBorder } from "react-icons/md";

const WishlistCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem("tatli_wishlist");
        if (stored) {
          const ids = JSON.parse(stored);
          setCount(Array.isArray(ids) ? ids.length : 0);
        } else {
          setCount(0);
        }
      } catch {
        setCount(0);
      }
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    // Dinamik güncellemeler için custom event
    window.addEventListener("wishlist_updated", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("wishlist_updated", updateCount);
    };
  }, []);

  return (
    <Link
      href="/favorites"
      className="relative flex items-center justify-center text-gray-700 hover:text-pink-600 transition-colors p-2 rounded-full hover:bg-pink-50"
      title="Favorilerim"
    >
      <MdFavoriteBorder size={24} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
          {count}
        </span>
      )}
    </Link>
  );
};

export default WishlistCount;
