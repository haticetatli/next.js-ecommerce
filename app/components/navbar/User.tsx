"use client";

import { User as PrismaUser } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { signOut } from "next-auth/react";

interface UserProps {
  currentUser?: PrismaUser | null;
}

const User: React.FC<UserProps> = ({ currentUser }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  const menuFunc = (type: string) => {
    setOpenMenu(false);

    if (type === "logout") {
      signOut({ callbackUrl: "/login" });
    } else if (type === "register") {
      router.push("/register");
    } else if (type === "login") {
      router.push("/login");
    } else if (type === "admin") {
      router.push("/admin");
    }
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
        <div className="absolute w-[180px] top-12 right-0 bg-white border border-gray-100 shadow-xl p-2 rounded-2xl space-y-1 z-50 text-sm">
          {currentUser ? (
            <>
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="font-semibold text-gray-900 truncate">{currentUser.name}</p>
                <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
              </div>
              <div
                onClick={() => menuFunc("admin")}
                className="text-gray-700 cursor-pointer hover:bg-pink-50 hover:text-pink-600 px-3 py-2 rounded-xl transition-colors font-medium"
              >
                Yönetici Paneli
              </div>
              <div
                onClick={() => menuFunc("logout")}
                className="text-red-600 cursor-pointer hover:bg-red-50 px-3 py-2 rounded-xl transition-colors font-medium"
              >
                Çıkış Yap
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => menuFunc("login")}
                className="text-gray-700 cursor-pointer hover:bg-pink-50 hover:text-pink-600 px-3 py-2 rounded-xl transition-colors font-medium"
              >
                Giriş Yap
              </div>
              <div
                onClick={() => menuFunc("register")}
                className="text-gray-700 cursor-pointer hover:bg-pink-50 hover:text-pink-600 px-3 py-2 rounded-xl transition-colors font-medium"
              >
                Kayıt Ol
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
