"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import {
  MdShoppingBag,
  MdOutlineDashboard,
  MdPersonOutline,
} from "react-icons/md";
import useCart from "@/hooks/useCart";

const categories = [
  { name: "Telefon", icon: "📱" },
  { name: "Laptop", icon: "💻" },
  { name: "Saat", icon: "⌚" },
  { name: "Aksesuar", icon: "🎧" },
  { name: "Ayakkabı", icon: "👟" },
  { name: "Çanta", icon: "👜" },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const router = useRouter();
  const { productCartQty } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileSearch.trim()) return;
    setIsOpen(false);
    router.push(`/?search=${encodeURIComponent(mobileSearch.trim())}`);
  };

  const handleCategoryClick = (catName: string) => {
    setIsOpen(false);
    router.push(`/?category=${encodeURIComponent(catName)}`);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex md:hidden p-2 rounded-xl text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition cursor-pointer"
        aria-label="Menüyü Aç"
      >
        <FiMenu size={24} />
      </button>

      {/* Arka Plan Karartma (Backdrop) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        />
      )}

      {/* Slide-over Çekmece (Drawer) */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Çekmece Başlığı */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="font-black text-xl tracking-tight flex items-center gap-1"
            >
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Tatli
              </span>
              <span className="bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                .com
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Mobil Arama Çubuğu */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Ürün ara..."
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-xs text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
          </form>

          {/* Menü Linkleri */}
          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-2">
              Kategoriler
            </p>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition text-left"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Hızlı İşlemler */}
          <div className="space-y-1 pt-3 border-t border-gray-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-2">
              Hesap & Alışveriş
            </p>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition"
            >
              <div className="flex items-center gap-2">
                <MdShoppingBag size={18} className="text-pink-600" />
                <span>Sepetim</span>
              </div>
              {productCartQty > 0 && (
                <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {productCartQty}
                </span>
              )}
            </Link>

            <Link
              href="/favorites"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition"
            >
              <span className="text-pink-600">❤️</span>
              <span>Favorilerim</span>
            </Link>

            <Link
              href="/deals"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition"
            >
              <span>🔥</span>
              <span>Kampanyalar & Kuponlar</span>
            </Link>

            <Link
              href="/tracking"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition"
            >
              <span>📦</span>
              <span>Kargo & Sipariş Takibi</span>
            </Link>

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition"
            >
              <MdPersonOutline size={18} className="text-pink-600" />
              <span>Giriş Yap / Kayıt Ol</span>
            </Link>

            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition"
            >
              <MdOutlineDashboard size={18} className="text-pink-600" />
              <span>Yönetici Paneli</span>
            </Link>
          </div>

          {/* Kurumsal & Destek */}
          <div className="space-y-1 pt-3 border-t border-gray-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-2">
              Bilgi & Destek
            </p>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-1.5 text-xs text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition"
            >
              Hakkımızda
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-1.5 text-xs text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition"
            >
              İletişim & Destek
            </Link>
            <Link
              href="/returns"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-1.5 text-xs text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition"
            >
              Kolay İade & Değişim
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-1.5 text-xs text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition"
            >
              Sıkça Sorulan Sorular
            </Link>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-[11px] text-gray-400">
          Tatli.com E-Commerce Platform
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;