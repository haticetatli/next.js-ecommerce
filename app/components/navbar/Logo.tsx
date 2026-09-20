"use client";

import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="cursor-pointer font-black text-2xl md:text-3xl tracking-tight flex items-center gap-1 group select-none"
    >
      <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
        Tatli
      </span>
      <span className="bg-pink-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
        .com
      </span>
    </div>
  );
};

export default Logo;
