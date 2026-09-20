"use client";

const Category = () => {
  const categoryList = [
    { name: "Tümü", icon: "✨" },
    { name: "Telefon", icon: "📱" },
    { name: "Laptop", icon: "💻" },
    { name: "Saat", icon: "⌚" },
    { name: "Aksesuar", icon: "🎧" },
    { name: "Ayakkabı", icon: "👟" },
    { name: "Çanta", icon: "👜" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-5">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categoryList.map((category, index) => (
          <button
            key={index}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-sm cursor-pointer ${
              index === 0
                ? "bg-pink-600 text-white shadow-pink-200"
                : "bg-white border border-gray-200 text-gray-700 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/50"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;