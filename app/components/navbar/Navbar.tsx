import { Suspense } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import CardCount from "./CardCount";
import WishlistCount from "./WishlistCount";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import Search from "./Search";
import User from "./User";
import { MdLocalShipping } from "react-icons/md";

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-6 px-4 md:px-10 h-20 text-gray-800">
        <Logo />

        <Suspense fallback={<div className="hidden md:flex flex-1 max-w-md mx-auto" />}>
          <Search />
        </Suspense>

        {/* Masaüstü Hızlı Navigasyon Butonları */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-gray-600">
          <Link
            href="/deals"
            className="flex items-center gap-1.5 hover:text-pink-600 transition py-1"
          >
            <MdLocalShipping size={16} className="text-pink-600 hidden" />
            <span className="font-semibold">Kampanyalar</span>
          </Link>
          <Link
            href="/tracking"
            className="flex items-center gap-1.5 hover:text-pink-600 transition py-1"
          >
            <MdLocalShipping size={16} className="text-pink-600" />
            <span>Kargo Takip</span>
          </Link>
          <Link
            href="/about"
            className="hover:text-pink-600 transition py-1"
          >
            Hakkımızda
          </Link>
          <Link
            href="/contact"
            className="hover:text-pink-600 transition py-1"
          >
            İletişim
          </Link>
        </nav>

        {/* İşlem İkonları */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <WishlistCount />
          <CardCount />
          <User currentUser={currentUser} />
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;