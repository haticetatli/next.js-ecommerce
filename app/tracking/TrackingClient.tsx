"use client";

import { useState } from "react";
import {
  MdLocalShipping,
  MdSearch,
  MdCheckCircle,
  MdSchedule,
  MdPlace,
  MdInventory2,
} from "react-icons/md";

export default function TrackingClient() {
  const [orderId, setOrderId] = useState("");
  const [searchedId, setSearchedId] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (idToTrack?: string) => {
    const target = (idToTrack || orderId).trim();
    if (!target) return;

    setIsTracking(true);
    setTimeout(() => {
      setSearchedId(target);
      setIsTracking(false);
    }, 500);
  };

  const steps = [
    {
      title: "Sipariş Alındı",
      desc: "Siparişiniz sistemimize kaydedildi ve onaylandı.",
      date: "20 Eylül 2026, 14:32",
      icon: MdCheckCircle,
      completed: true,
    },
    {
      title: "Hazırlanıyor & Paketleniyor",
      desc: "Ürünleriniz kalite kontrolünden geçirilerek darbe emici kutuya yerleştirildi.",
      date: "20 Eylül 2026, 16:45",
      icon: MdInventory2,
      completed: true,
    },
    {
      title: "Kargoya Verildi",
      desc: "Yurtiçi Kargo aktarma merkezine teslim edildi. Takip Kodu: YK-94821038",
      date: "21 Eylül 2026, 09:15",
      icon: MdLocalShipping,
      completed: true,
    },
    {
      title: "Dağıtıma Çıktı",
      desc: "Kurye teslimat adresinize doğru yola çıktı.",
      date: "Tahmini Bugün 17:00'ye kadar",
      icon: MdPlace,
      completed: false,
      active: true,
    },
    {
      title: "Teslim Edildi",
      desc: "Alıcıya bizzat teslimat sağlanacak.",
      date: "--",
      icon: MdSchedule,
      completed: false,
    },
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-10">
        {/* Başlık */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto">
            <MdLocalShipping size={26} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Kargo ve Sipariş Takibi
          </h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto">
            Sipariş onayınızda ve e-postanızda yer alan sipariş takip kodunu girerek kargonuzun nerede olduğunu anlık izleyin.
          </p>
        </div>

        {/* Arama Kutusu */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Örn: ORD-829143-TR veya telefon numarası"
                className="w-full py-3 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
              />
              <MdSearch className="absolute left-3.5 top-3.5 text-gray-400 text-lg" />
            </div>

            <button
              type="submit"
              disabled={isTracking || !orderId.trim()}
              className="inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs px-7 py-3 rounded-2xl transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isTracking ? "Sorgulanıyor..." : "Kargomu Bul"}
            </button>
          </form>

          {/* Hızlı Demo Seçenekleri */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-gray-500">
            <span>Hızlı Test Kodları:</span>
            <button
              type="button"
              onClick={() => {
                setOrderId("ORD-829143-TR");
                handleTrack("ORD-829143-TR");
              }}
              className="bg-pink-50 text-pink-700 hover:bg-pink-100 px-2.5 py-1 rounded-lg font-mono text-[11px] transition cursor-pointer"
            >
              #ORD-829143-TR
            </button>
            <button
              type="button"
              onClick={() => {
                setOrderId("ORD-542190-TR");
                handleTrack("ORD-542190-TR");
              }}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-2.5 py-1 rounded-lg font-mono text-[11px] transition cursor-pointer"
            >
              #ORD-542190-TR
            </button>
          </div>
        </div>

        {/* Takip Sonuç Kartı */}
        {searchedId && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-pink-600">
                  Sipariş Detayı
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
                  {searchedId}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1.5" />
                  Dağıtımda
                </span>
                <span className="text-xs text-gray-400">
                  Yurtiçi Kargo
                </span>
              </div>
            </div>

            {/* Zaman Çizelgesi (Timeline) */}
            <div className="space-y-6 relative pl-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-pink-100">
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        step.completed
                          ? "bg-pink-600 text-white"
                          : step.active
                          ? "bg-pink-100 text-pink-600 ring-4 ring-pink-50"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <StepIcon size={14} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4
                          className={`text-xs sm:text-sm font-bold ${
                            step.completed || step.active
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
