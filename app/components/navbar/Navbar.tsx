import { Suspense } from "react";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import CardCount from "./CardCount";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import Search from "./Search";
import User from "./User";

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8 px-4 md:px-10 h-20 text-gray-800">
        <Logo />
        <Suspense fallback={<div className="hidden md:flex flex-1 max-w-md mx-auto" />}>
          <Search />
        </Suspense>
        <div className="flex items-center gap-4 md:gap-6">
          <CardCount />
          <User currentUser={currentUser} />
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;