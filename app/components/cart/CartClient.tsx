"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useCart from "@/hooks/useCart";
import { formatCurrency, FREE_SHIPPING_THRESHOLD } from "@/utils/cartUtils";
import {
  MdDeleteOutline,
  MdArrowForward,
  MdShoppingBag,
  MdLocalShipping,
  MdSecurity,
  MdCheckCircle,
} from "react-icons/md";
import { HiOutlineTag } from "react-icons/hi2";

const CartClient = () => {
  const {
    cartPrdcts,
    subtotal,
    shippingFee,
    discount,
    total,
    coupon,
    removeFromCart,
    removeCart,
    addToBasketIncrease,
    addToBasketDecrease,
    applyCoupon,
    removeCoupon,
    isMounted,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-600" />
      </div>
    );
  }

  // Boş Sepet Görünümü
  if (!cartPrdcts || cartPrdcts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-pink-600 shadow-inner">
          <MdShoppingBag size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Sepetiniz Şu Anda Boş
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">
            Henüz sepetinize bir ürün eklemediniz. En popüler ürünlerimizi keşfederek alışverişe başlayabilirsiniz.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <span>Alışverişe Başla</span>
            <MdArrowForward size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const freeShippingLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    if (applyCoupon(couponInput)) {
      setCouponInput("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Alışveriş Sepeti
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sepetinizde{" "}
            <span className="font-semibold text-gray-800">
              {cartPrdcts.reduce((sum, p) => sum + (p.quantity || 1), 0)}
            </span>{" "}
            ürün bulunuyor
          </p>
        </div>
        <button
          onClick={removeCart}
          className="text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <MdDeleteOutline size={16} />
          <span>Sepeti Temizle</span>
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ürün Listesi */}
        <div className="lg:col-span-2 space-y-4">
          {/* Ücretsiz Kargo İlerleme Çubuğu */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <MdLocalShipping className="text-pink-600 text-lg" />
              {freeShippingLeft > 0 ? (
                <span>
                  Ücretsiz kargo için sepetinize{" "}
                  <strong className="text-pink-600">
                    {formatCurrency(freeShippingLeft)}
                  </strong>{" "}
                  değerinde ürün daha ekleyin!
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1">
                  <MdCheckCircle className="text-emerald-600" />
                  Tebrikler! Siparişinizde kargo tamamen ücretsiz.
                </span>
              )}
            </div>
            <div className="w-full bg-white/80 rounded-full h-2 mt-3 overflow-hidden border border-pink-100">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Ürün Kartları */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
            {cartPrdcts.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 p-2">
                    <Image
                      src={item.image || "/placeholder.webp"}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    {item.brand && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {item.brand}
                      </span>
                    )}
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-pink-600 mt-1">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>

                {/* Miktar Sayacı & Silme Butonu */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6">
                  <div className="flex items-center border border-gray-200 rounded-full bg-gray-50/50 p-1">
                    <button
                      onClick={() => addToBasketDecrease(item)}
                      className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-pink-50 font-bold text-base transition-colors"
                      title="Azalt"
                    >
                      -
                    </button>
                    <span className="w-9 text-center text-sm font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToBasketIncrease(item)}
                      className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-pink-50 font-bold text-base transition-colors"
                      title="Artır"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <p className="text-base font-extrabold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                    title="Ürünü sepetten çıkar"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700"
            >
              <span>← Alışverişe Devam Et</span>
            </Link>
          </div>
        </div>

        {/* Sipariş Özeti Kartı */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-28 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 pb-4 border-b border-gray-100">
              Sipariş Özeti
            </h2>

            {/* Kupon Kodu Girişi */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                İndirim Kuponu
              </label>
              {coupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-medium text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <HiOutlineTag size={16} className="text-emerald-600" />
                    <span>
                      <strong>{coupon.code}</strong> - {coupon.description}
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-500 hover:text-red-700 font-bold text-xs underline cursor-pointer"
                  >
                    Kaldır
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Örn: TATLI10 veya KARGO"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 uppercase bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Uygula
                  </button>
                </form>
              )}

              {/* Demo kupon ipuçları */}
              {!coupon && (
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-400">
                  <span>Deneyebileceğiniz kodlar:</span>
                  <button
                    type="button"
                    onClick={() => applyCoupon("TATLI10")}
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    TATLI10
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => applyCoupon("KARGO")}
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    KARGO
                  </button>
                </div>
              )}
            </div>

            {/* Fiyat Detayları */}
            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Ara Toplam</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Kargo</span>
                <span className="font-semibold text-gray-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">Ücretsiz</span>
                  ) : (
                    formatCurrency(shippingFee)
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Kupon İndirimi</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-4 border-t border-gray-100">
                <span className="text-base font-bold text-gray-900">
                  Toplam Tutar
                </span>
                <span className="text-2xl font-black text-pink-600">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Ödemeye İlerle Butonu */}
            <div>
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Siparişi Tamamla</span>
                <MdArrowForward size={18} />
              </Link>
            </div>

            {/* Güvenlik Rozetleri */}
            <div className="pt-2 border-t border-gray-100 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <MdSecurity className="text-pink-600 text-base" />
                <span>256-Bit SSL ile güvenli ödeme</span>
              </div>
              <div className="flex items-center gap-2">
                <MdCheckCircle className="text-pink-600 text-base" />
                <span>14 gün içinde koşulsuz ücretsiz iade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
