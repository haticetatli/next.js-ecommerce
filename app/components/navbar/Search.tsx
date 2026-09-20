"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams?.get("search") || "";

  const [query, setQuery] = useState(currentSearch);

  useEffect(() => {
    setQuery(searchParams?.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }
    router.push(`/?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.delete("search");
    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="hidden md:flex flex-1 max-w-md mx-auto items-center relative"
    >
      <div className="absolute left-3 text-gray-400 pointer-events-none">
        <FiSearch size={16} />
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-2 pl-9 pr-20 bg-gray-50 border border-gray-200 outline-none rounded-full text-xs md:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
        type="text"
        placeholder="Ürün, marka veya model ara..."
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-14 text-gray-400 hover:text-gray-600 p-1"
          title="Temizle"
        >
          <FiX size={14} />
        </button>
      )}
      <button
        type="submit"
        className="absolute right-1.5 px-3.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs rounded-full transition-colors shadow-sm cursor-pointer"
      >
        Ara
      </button>
    </form>
  );
};

export default Search;
