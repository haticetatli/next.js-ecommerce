"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdInventory,
  MdAddBox,
  MdShoppingCart,
  MdStorefront,
} from "react-icons/md";

const navItems = [
  { name: "Genel Bakış", icon: MdDashboard, url: "/admin" },
  { name: "Ürün Yönetimi", icon: MdInventory, url: "/admin/products" },
  { name: "Yeni Ürün Ekle", icon: MdAddBox, url: "/admin/products/new" },
  { name: "Siparişler (Demo)", icon: MdShoppingCart, url: "/cart" },
  { name: "Mağazaya Dön", icon: MdStorefront, url: "/" },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="p-4 space-y-1">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = pathname === item.url;

        return (
          <Link
            key={idx}
            href={item.url}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              isActive
                ? "bg-pink-600 text-white shadow-md shadow-pink-900/30 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminSidebar;
