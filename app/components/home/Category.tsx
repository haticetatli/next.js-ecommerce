"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categoryList = [
  { name: "Tümü", icon: "✨" },
  { name: "Telefon", icon: "📱" },
  { name: "Laptop", icon: "💻" },
  { name: "Saat", icon: "⌚" },
  { name: "Aksesuar", icon: "🎧" },
  { name: "Ayakkabı", icon: "👟" },
  { name: "Çanta", icon: "👜" },
];

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams?.get("category") || "Tümü";

  const handleSelect = (name: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    if (name === "Tümü") {
      params.delete("category");
    } else {
      params.set("category", name);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-4">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {categoryList.map((cat, index) => {
          const isSelected =
            cat.name === activeCategory ||
            (cat.name === "Tümü" && !searchParams?.get("category"));

          return (
            <button
              key={index}
              onClick={() => handleSelect(cat.name)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-sm cursor-pointer ${
                isSelected
                  ? "bg-pink-600 text-white shadow-pink-200 ring-2 ring-pink-500/20"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/40"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Category;