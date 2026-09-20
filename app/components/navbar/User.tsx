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
    setOpenMenu(false); // menüyü kapat

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
  <div className="hidden md:flex relative z-50">
    <div
      onClick={() => setOpenMenu(!openMenu)}
      className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 transition"
    >
      <AiOutlineUser size={24} className="text-orange-700" />
      <span className="text-sm font-medium text-gray-800">
        {currentUser?.name ?? "Hesap"}
      </span>
    </div>

    {openMenu && (
      <div className="absolute w-[150px] top-10 right-0 bg-white shadow-lg p-2 rounded-md space-y-1 z-50">
        {currentUser ? (
          <>
            <div
              onClick={() => menuFunc("admin")}
              className="text-slate-600 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
            >
              Admin
            </div>
            <div
              onClick={() => menuFunc("logout")}
              className="text-slate-600 cursor-pointer hover:bg-red-100 px-2 py-1 rounded"
            >
              Logout
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => menuFunc("register")}
              className="text-slate-600 cursor-pointer hover:bg-green-100 px-2 py-1 rounded"
            >
              Register
            </div>
            <div
              onClick={() => menuFunc("login")}
              className="text-slate-600 cursor-pointer hover:bg-blue-100 px-2 py-1 rounded"
            >
              Login
            </div>
          </>
        )}
      </div>
    )}
  </div>
);

};

export default User;
