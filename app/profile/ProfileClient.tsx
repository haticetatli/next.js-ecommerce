"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Order } from "@/types";
import { formatCurrency } from "@/utils/cartUtils";
import {
  MdShoppingBag,
  MdLocalShipping,
  MdHome,
  MdCheckCircle,
  MdOutlineReceiptLong,
} from "react-icons/md";

const ProfileClient = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("last_order");
      if (stored) {
        setOrders([JSON.parse(stored)]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-10 py-8 md:py-12 space-y-8">
      {/* Kullanıcı Başlık Kartı */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-pink-500/20">
            HT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-gray-900">
                Hatice Tatlı
              </h1>
              <span className="text-[10px] bg-pink-50 text-pink-700 font-bold px-2 py-0.5 rounded-full border border-pink-200">
                Müşteri Hesabı
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              hatice@tatli.com · İstanbul, Türkiye
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-2 rounded-xl transition"
        >
          <MdShoppingBag size={16} />
          <span>Alışverişe Devam Et</span>
        </Link>
      </div>

      {/* Sipariş Geçmişi */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MdOutlineReceiptLong className="text-pink-600" size={22} />
            Sipariş Geçmişim
          </h2>
          <span className="text-xs text-gray-400">
            {orders.length} Kayıtlı Sipariş
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto">
              <MdShoppingBag size={28} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">
                Henüz Bir Siparişiniz Bulunmuyor
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
                Sepetinize ürün ekleyip demo ödeme adımını tamamladığınızda siparişleriniz bu ekranda listelenecektir.
              </p>
            </div>
            <Link
              href="/"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs px-6 py-2.5 rounded-full transition shadow-sm"
            >
              Kataloğu Keşfet
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-5"
              >
                {/* Sipariş Başlığı */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gray-900 text-sm">
                        #{order.id}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        <MdCheckCircle size={12} />
                        Hazırlanıyor
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Sipariş Tarihi:{" "}
                      {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">
                      Toplam Tutar
                    </span>
                    <span className="text-lg font-black text-pink-600">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>

                {/* Ürünler */}
                <div className="divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 p-1">
                          <Image
                            src={item.image || "/placeholder.webp"}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Adet: {item.quantity} · Birim Fiyat: {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-extrabold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Teslimat Bilgisi */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between text-xs text-gray-500 gap-2">
                  <div className="flex items-center gap-1.5">
                    <MdLocalShipping className="text-pink-600" size={16} />
                    <span>
                      Tahmini Teslimat: <strong>{order.estimatedDelivery}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MdHome className="text-pink-600" size={16} />
                    <span>
                      {order.shippingAddress.city}, {order.shippingAddress.district}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileClient;
