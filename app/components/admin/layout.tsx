import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden md:block md:w-1/4 lg:w-1/5">
        <AdminSidebar />
      </div>

      {/* Content */}
      <main className="flex-1 p-4 bg-white overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
