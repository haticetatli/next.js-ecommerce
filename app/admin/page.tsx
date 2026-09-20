import Link from "next/link";
import prisma from "@/libs/prismadb";
import { products as fallbackProducts } from "@/utils/Products";
import {
  MdAttachMoney,
  MdShoppingCart,
  MdInventory2,
  MdPeople,
  MdAdd,
  MdArrowForward,
} from "react-icons/md";

export default async function AdminDashboardPage() {
  let productsCount = fallbackProducts.length;
  try {
    const count = await prisma.product.count();
    if (count > 0) productsCount = count;
  } catch {
    // fallback
  }

  const kpis = [
    {
      title: "Toplam Ciro (Demo)",
      value: "428.500 ₺",
      change: "+14.8% bu ay",
      icon: MdAttachMoney,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Toplam Sipariş",
      value: "152 Adet",
      change: "+8.4% geçen haftaya göre",
      icon: MdShoppingCart,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Katalogdaki Ürünler",
      value: `${productsCount} Ürün`,
      change: "Tüm kategoriler aktif",
      icon: MdInventory2,
      color: "bg-pink-50 text-pink-600 border-pink-100",
    },
    {
      title: "Kayıtlı Müşteriler",
      value: "74 Üye",
      change: "+12 yeni üye",
      icon: MdPeople,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Başlık ve Eylem */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Yönetici Kontrol Paneli
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Mağazanızın canlı durumunu, sipariş metriklerini ve ürün kataloğunu yönetin.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition"
        >
          <MdAdd size={18} />
          <span>Yeni Ürün Ekle</span>
        </Link>
      </div>

      {/* KPI Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">
                  {kpi.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center ${kpi.color}`}
                >
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">
                  {kpi.value}
                </h3>
                <p className="text-[11px] font-medium text-emerald-600 mt-1">
                  {kpi.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hızlı İşlemler Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ürün Kataloğu Yönetimi */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">
              Ürün Kataloğu & Stok
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Mevcut ürünleri güncelleyin, fiyatları ve stok durumlarını kontrol edin veya silme işlemlerini gerçekleştirin.
            </p>
          </div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700"
          >
            <span>Tüm Ürünleri Yönet</span>
            <MdArrowForward size={14} />
          </Link>
        </div>

        {/* Mağaza Görünümü */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">
              Canlı Mağaza Vitrini
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Ziyaretçilerin gördüğü ana sayfayı, sepet ve ödeme akışını canlı olarak görüntüleyin.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700"
          >
            <span>Vitrine Git</span>
            <MdArrowForward size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
