"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";
import { formatCurrency } from "@/utils/cartUtils";
import { Address, Order } from "@/types";
import { toast } from "react-hot-toast";
import {
  MdCreditCard,
  MdSecurity,
  MdCheckCircle,
  MdArrowBack,
  MdInfoOutline,
} from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";

const CheckoutClient = () => {
  const router = useRouter();
  const {
    cartPrdcts,
    subtotal,
    shippingFee,
    discount,
    total,
    coupon,
    removeCart,
    isMounted,
  } = useCart();

  // Form State
  const [address, setAddress] = useState<Address>({
    fullName: "Hatice Tatlı",
    phone: "0555 123 4567",
    email: "hatice@tatli.com",
    addressLine: "Atatürk Caddesi, No: 42, Daire: 7",
    city: "İstanbul",
    district: "Kadıköy",
    postalCode: "34710",
  });

  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">(
    "card"
  );

  // Demo Kart State
  const [cardNumber, setCardNumber] = useState("5520 1234 5678 9010");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("342");
  const [cardName, setCardName] = useState("HATICE TATLI");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isMounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-600" />
      </div>
    );
  }

  if (!cartPrdcts || cartPrdcts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Ödeme Yapılacak Ürün Bulunamadı
        </h2>
        <p className="text-gray-500 text-sm">
          Ödeme adımına geçmeden önce sepetinize ürün eklemelisiniz.
        </p>
        <Link
          href="/"
          className="inline-block bg-pink-600 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-pink-700 transition"
        >
          Ürünleri Keşfet
        </Link>
      </div>
    );
  }

  const deliveryExtraFee = deliveryMethod === "express" ? 29.9 : 0;
  const finalTotal = total + deliveryExtraFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.fullName || !address.phone || !address.addressLine || !address.city) {
      toast.error("Lütfen zorunlu teslimat adres alanlarını doldurun.");
      return;
    }

    setIsProcessing(true);

    // Simüle edilmiş güvenli ödeme ve sipariş oluşturma işlemi
    setTimeout(() => {
      const orderId = `TAT-${Date.now().toString().slice(-6)}`;

      const newOrder: Order = {
        id: orderId,
        items: cartPrdcts.map((p) => ({
          id: String(p.id),
          name: p.name,
          price: p.price,
          quantity: p.quantity,
          image: p.image,
        })),
        subtotal,
        shippingFee: shippingFee + deliveryExtraFee,
        discount,
        total: finalTotal,
        shippingAddress: address,
        paymentMethod: paymentMethod === "card" ? "card" : "cash_on_delivery",
        status: "processing",
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(
          Date.now() + (deliveryMethod === "express" ? 2 : 4) * 86400000
        ).toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          weekday: "long",
        }),
      };

      try {
        // Son siparişi localStorage'da sakla (Success sayfası için)
        localStorage.setItem("last_order", JSON.stringify(newOrder));
      } catch (err) {
        console.error("Order storage error:", err);
      }

      // Sepeti temizle
      removeCart();
      setIsProcessing(false);

      toast.success("Siparişiniz başarıyla alındı!");
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-pink-600 transition"
        >
          <MdArrowBack size={16} />
          <span>Sepete Geri Dön</span>
        </Link>
        <span className="text-xs text-gray-400 font-medium">
          Adım 2 / 2: Güvenli Ödeme
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sol Kolon: Form Adımları */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Teslimat Adresi */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Teslimat Bilgileri
              </h2>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <MdCheckCircle /> Hazır
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Telefon Numarası *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  E-Posta Adresi (Sipariş Takibi İçin) *
                </label>
                <input
                  type="email"
                  name="email"
                  value={address.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Açık Adres (Cadde, Mahalle, Bina No, Daire) *
                </label>
                <textarea
                  name="addressLine"
                  rows={2}
                  value={address.addressLine}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  İl *
                </label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  İlçe *
                </label>
                <input
                  type="text"
                  name="district"
                  value={address.district}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* 2. Kargo Yöntemi */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs flex items-center justify-center font-bold">
                2
              </span>
              Kargo Teslimat Seçeneği
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  deliveryMethod === "standard"
                    ? "border-pink-500 bg-pink-50/30"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "standard"}
                  onChange={() => setDeliveryMethod("standard")}
                  className="mt-1 text-pink-600 focus:ring-pink-500"
                />
                <div className="text-xs space-y-1 flex-1">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Standart Kargo</span>
                    <span>
                      {shippingFee === 0 ? "Ücretsiz" : formatCurrency(shippingFee)}
                    </span>
                  </div>
                  <p className="text-gray-500">3-4 iş günü içinde teslimat</p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  deliveryMethod === "express"
                    ? "border-pink-500 bg-pink-50/30"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "express"}
                  onChange={() => setDeliveryMethod("express")}
                  className="mt-1 text-pink-600 focus:ring-pink-500"
                />
                <div className="text-xs space-y-1 flex-1">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Hızlı Kargo</span>
                    <span>+29,90 ₺</span>
                  </div>
                  <p className="text-gray-500">1-2 iş günü öncelikli teslimat</p>
                </div>
              </label>
            </div>
          </div>

          {/* 3. Ödeme Yöntemi */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs flex items-center justify-center font-bold">
                3
              </span>
              Ödeme Bilgileri
            </h2>

            {/* Demo Modu Uyarısı */}
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-3 text-xs flex items-start gap-2.5">
              <MdInfoOutline size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Portföy Demo Ödeme Modu:</strong> Bu mağaza vitrin amaçlı çalışmaktadır. Gerçek kart bilgisi girmeyiniz. Ön tanımlı demo verilerle testi güvenle tamamlayabilirsiniz.
              </div>
            </div>

            {/* Ödeme Seçenekleri */}
            <div className="flex gap-4 pt-1">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  paymentMethod === "card"
                    ? "border-pink-600 bg-pink-50/40 text-pink-700"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <MdCreditCard size={18} />
                <span>Kredi / Banka Kartı</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  paymentMethod === "cash"
                    ? "border-pink-600 bg-pink-50/40 text-pink-700"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FaMoneyBillWave size={16} />
                <span>Kapıda Ödeme (+15 ₺)</span>
              </button>
            </div>

            {paymentMethod === "card" ? (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Kart Üzerindeki İsim
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Kart Numarası
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white font-mono tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Son Kullanma Tarihi
                    </label>
                    <input
                      type="text"
                      placeholder="AA/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Güvenlik Kodu (CVV)
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-600">
                Siparişinizi teslim alırken kapıda nakit veya POS cihazı ile kredi kartıyla ödeyebilirsiniz.
              </div>
            )}
          </div>
        </div>

        {/* Sağ Kolon: Sipariş Özeti ve Onay */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-28 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100">
              Sipariş Detayı ({cartPrdcts.length} Ürün)
            </h2>

            {/* Ürün Önizleme Listesi */}
            <div className="max-h-56 overflow-y-auto divide-y divide-gray-100 pr-1 space-y-2">
              {cartPrdcts.map((item) => (
                <div key={item.id} className="pt-2 flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 p-1">
                    <Image
                      src={item.image || "/placeholder.webp"}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-xs">
                    <p className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-gray-400">
                      Adet: {item.quantity} · {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Fiyat Tablosu */}
            <div className="space-y-2.5 text-sm pt-4 border-t border-gray-100">
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

              {deliveryMethod === "express" && (
                <div className="flex justify-between text-gray-600">
                  <span>Hızlı Kargo Farkı</span>
                  <span className="font-semibold text-gray-900">+29,90 ₺</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>İndirim ({coupon?.code})</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-4 border-t border-gray-100">
                <span className="text-base font-bold text-gray-900">
                  Ödenecek Toplam
                </span>
                <span className="text-2xl font-black text-pink-600">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>

            {/* Siparişi Onayla Butonu */}
            <button
              onClick={handleSubmitOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 disabled:opacity-60 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Sipariş Oluşturuluyor...</span>
                </>
              ) : (
                <>
                  <MdSecurity size={18} />
                  <span>Siparişi Onayla & Bitir</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-gray-400 text-center leading-relaxed">
              &quot;Siparişi Onayla&quot; butonuna basarak Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formunu kabul etmiş sayılırsınız.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutClient;
