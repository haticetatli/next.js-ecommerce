'use client';

import { usePathname } from 'next/navigation';
import AdminSidebarItem from './AdminSiderbarItem';
import { MdDashboard, MdPeople, MdSettings, MdInventory } from 'react-icons/md';

const adminPanel = [
  { name: 'Dashboard', icon: MdDashboard, url: '/admin' },
  { name: 'Kullanıcılar', icon: MdPeople, url: '/admin/users' },
  { name: 'Ayarlar', icon: MdSettings, url: '/admin/settings' },
  { name: 'Ürünler', icon: MdInventory, url: '/admin/products' },
  { name: 'Yeni Ürün', icon: MdInventory, url: '/admin/products/new' },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-full bg-gray-800 p-4 text-white">
      <div className="flex flex-col gap-2">
        {adminPanel.map((admin, i) => (
          <AdminSidebarItem
            key={i}
            selected={pathname === admin.url}
            name={admin.name}
            icon={admin.icon}
            url={admin.url}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
