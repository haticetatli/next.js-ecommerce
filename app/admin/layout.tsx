import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar solda sabit */}
      <div className="w-1/5">
        <AdminSidebar />
      </div>

      {/* Seçilen sayfa sağda beyaz alanda */}
      <main className="flex-1 bg-white p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
