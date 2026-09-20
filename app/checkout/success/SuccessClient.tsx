"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Order } from "@/types";
import { formatCurrency } from "@/utils/cartUtils";
import {
  MdCheckCircle,
  MdLocalShipping,
  MdHome,
  MdPrint,
  MdArrowForward,
} from "react-icons/md";

const SuccessClient = () => {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams ? searchParams.get("orderId") : null;

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("last_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const orderNumber = order?.id || orderIdParam || "TAT-892415";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm text-center space-y-8">
        {/* Başarı İkonu */}
        <div className="space-y-3">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <MdCheckCircle size={56} />
          </div>
          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Sipariş Onaylandı
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Teşekkürler, Siparişiniz Alındı!
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Sipariş numaranız:{" "}
            <strong className="text-gray-900 font-mono">#{orderNumber}</strong>.
            Siparişinizin durumunu e-posta adresinizden takip edebilirsiniz.
          </p>
        </div>

        {/* Sipariş Bilgi Kartı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left border border-gray-100 bg-gray-50/60 rounded-2xl p-5 text-xs">
          <div className="space-y-1">
            <p className="text-gray-400 font-semibold flex items-center gap-1">
              <MdLocalShipping size={16} className="text-pink-600" />
              Tahmini Teslimat
            </p>
            <p className="font-bold text-gray-800 text-sm">
              {order?.estimatedDelivery || "3 İş Günü İçerisinde"}
            </p>
            <p className="text-gray-500">MNG / Yurtiçi Kargo ile gönderilecektir</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400 font-semibold flex items-center gap-1">
              <MdHome size={16} className="text-pink-600" />
              Teslimat Adresi
            </p>
            <p className="font-bold text-gray-800">
              {order?.shippingAddress?.fullName || "Hatice Tatlı"}
            </p>
            <p className="text-gray-500 line-clamp-2">
              {order?.shippingAddress?.addressLine || "Kadıköy, İstanbul"}
            </p>
          </div>
        </div>

        {/* Sipariş Edilen Ürünler */}
        {order && order.items && order.items.length > 0 && (
          <div className="text-left space-y-3 pt-2">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">
              Sipariş Edilen Ürünler ({order.items.length})
            </h3>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 p-1">
                      <Image
                        src={item.image || "/placeholder.webp"}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Adet: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm">
              <span className="font-bold text-gray-700">Toplam Tutar</span>
              <span className="font-extrabold text-pink-600 text-base">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        )}

        {/* Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-gray-100">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full transition shadow-sm"
          >
            <span>Alışverişe Devam Et</span>
            <MdArrowForward size={18} />
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-full transition cursor-pointer"
          >
            <MdPrint size={18} />
            <span>Siparişi Yazdır</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessClient;
