import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import Link from "next/link";
import { MdStorefront } from "react-icons/md";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50/50">
      {/* Sidebar solda (Masaüstünde sabit genişlik, mobilde üstte) */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-5 flex items-center justify-between border-b border-slate-800">
          <Link href="/admin" className="font-extrabold text-lg tracking-tight">
            Tatli<span className="text-pink-500 font-bold">.Admin</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white transition bg-slate-800 px-2 py-1 rounded-lg"
            title="Mağazayı Görüntüle"
          >
            <MdStorefront size={14} />
            <span className="hidden sm:inline">Siteye Git</span>
          </Link>
        </div>
        <AdminSidebar />
      </aside>

      {/* Ana Yönetim İçeriği */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
