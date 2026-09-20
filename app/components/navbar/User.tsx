"use client";

import { SafeUser } from "@/types";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserProps {
  currentUser?: SafeUser | null;
}

const User: React.FC<UserProps> = ({ currentUser }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    setOpenMenu(false);
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="relative z-50">
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-full hover:bg-pink-50 text-gray-700 hover:text-pink-600 transition"
      >
        <AiOutlineUser size={22} />
        <span className="hidden lg:inline-block text-xs font-semibold">
          {currentUser?.name ?? "Giriş Yap"}
        </span>
      </div>

      {openMenu && (
        <div className="absolute w-[200px] top-12 right-0 bg-white border border-gray-100 shadow-xl p-2 rounded-2xl space-y-1 z-50 text-xs">
          {currentUser ? (
            <>
              <div className="px-3 py-2.5 border-b border-gray-100">
                <p className="font-bold text-gray-900 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-gray-400 truncate">{currentUser.email}</p>
              </div>

              <Link
                href="/profile"
                onClick={() => setOpenMenu(false)}
                className="block text-gray-700 hover:bg-pink-50 hover:text-pink-600 px-3 py-2 rounded-xl transition-colors font-medium"
              >
                Siparişlerim & Profil
              </Link>

              <Link
                href="/admin"
                onClick={() => setOpenMenu(false)}
                className="block text-gray-700 hover:bg-pink-50 hover:text-pink-600 px-3 py-2 rounded-xl transition-colors font-medium"
              >
                Yönetici Paneli
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors font-medium cursor-pointer"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpenMenu(false)}
                className="block text-gray-700 hover:bg-pink-50 hover:text-pink-600 px-3 py-2 rounded-xl transition-colors font-medium"
              >
                Giriş Yap
              </Link>

              <Link
                href="/register"
                onClick={() => setOpenMenu(false)}
                className="block text-gray-700 hover:bg-pink-50 hover:text-pink-600 px-3 py-2 rounded-xl transition-colors font-medium"
              >
                Kayıt Ol
              </Link>

              <Link
                href="/profile"
                onClick={() => setOpenMenu(false)}
                className="block text-gray-700 hover:bg-pink-50 hover:text-pink-600 px-3 py-2 rounded-xl transition-colors font-medium border-t border-gray-100 mt-1 pt-2"
              >
                Demo Siparişler
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
