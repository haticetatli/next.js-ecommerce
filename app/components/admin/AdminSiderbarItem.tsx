'use client';

import React from 'react';
import Link from 'next/link';

interface AdminSidebarItemProps {
  selected?: boolean;
  name: string;
  icon: React.ElementType;
  url: string;
}

const AdminSidebarItem: React.FC<AdminSidebarItemProps> = ({
  selected,
  name,
  icon: Icon,
  url,
}) => {
  return (
    <Link
      href={url}
      className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
        selected ? 'text-slate-600 font-bold bg-slate-100' : 'text-white'
      }`}
    >
      <Icon size={25} />
      <div>{name}</div>
    </Link>
  );
};

export default AdminSidebarItem;
