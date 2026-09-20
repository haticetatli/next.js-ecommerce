"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
  MdSend,
  MdCheckCircle,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Genel Bilgi",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Lütfen zorunlu alanları doldurunuz.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Mesajınız başarıyla iletildi! En kısa sürede dönüş yapacağız.");
    }, 800);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-12">
        {/* Başlık */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
            Bizimle İletişime Geçin
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Nasıl Yardımcı Olabiliriz?
          </h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">
            Siparişleriniz, ürünlerimiz veya iş birlikleri hakkında her türlü soru ve öneriniz için bize dilediğiniz zaman ulaşabilirsiniz.
          </p>
        </div>

        {/* İletişim Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto">
              <MdPhone size={24} />
            </div>
            <h3 className="font-bold text-sm text-gray-900">Müşteri Hattı</h3>
            <p className="text-xs text-gray-500">Hafta içi 09:00 - 18:00</p>
            <p className="text-xs font-semibold text-pink-600 pt-1">0850 300 00 00</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <FaWhatsapp size={24} />
            </div>
            <h3 className="font-bold text-sm text-gray-900">WhatsApp Destek</h3>
            <p className="text-xs text-gray-500">Hızlı yanıt & canlı sohbet</p>
            <p className="text-xs font-semibold text-emerald-600 pt-1">+90 555 000 00 00</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <MdEmail size={24} />
            </div>
            <h3 className="font-bold text-sm text-gray-900">E-Posta Desteği</h3>
            <p className="text-xs text-gray-500">Ortalama yanıt süresi 2 saat</p>
            <p className="text-xs font-semibold text-blue-600 pt-1">destek@tatli.com</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <MdLocationOn size={24} />
            </div>
            <h3 className="font-bold text-sm text-gray-900">Genel Merkez</h3>
            <p className="text-xs text-gray-500">Levent Teknoloji Plaza</p>
            <p className="text-xs font-semibold text-purple-600 pt-1">Beşiktaş / İstanbul</p>
          </div>
        </div>

        {/* Form ve Ofis Bilgisi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* İletişim Formu */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <MdCheckCircle size={36} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Mesajınız Alındı!
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Talebinizi aldık. İlgili birimimiz en geç 24 saat içerisinde e-posta adresiniz üzerinden sizinle iletişime geçecektir.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "Genel Bilgi",
                      message: "",
                    });
                  }}
                  className="inline-flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition shadow-sm"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      E-Posta Adresiniz *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Örn: ahmet@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Telefon Numarası
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05XX XXX XX XX"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Konu Başlığı
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition cursor-pointer"
                    >
                      <option value="Sipariş Durumu">Sipariş Durumu & Kargo</option>
                      <option value="Ürün Bilgisi">Ürün & Stok Bilgisi</option>
                      <option value="İade ve İptal">İade & Değişim Talebi</option>
                      <option value="İş Birliği">Kurumsal Satış & İş Birliği</option>
                      <option value="Genel Bilgi">Diğer / Genel Soru</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Mesajınız *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Size nasıl yardımcı olabileceğimizi detaylıca anlatın..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs px-8 py-3 rounded-full transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <MdSend size={16} />
                      <span>Mesajı Gönder</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Çalışma Saatleri & Bilgilendirme */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-white border border-pink-100 rounded-3xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2 text-pink-600 font-bold text-sm">
                <MdAccessTime size={20} />
                <span>Çalışma & Destek Saatleri</span>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between py-1 border-b border-pink-100/50">
                  <span className="font-semibold text-gray-700">Pazartesi - Cuma:</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-pink-100/50">
                  <span className="font-semibold text-gray-700">Cumartesi:</span>
                  <span>10:00 - 15:00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-semibold text-gray-700">Pazar:</span>
                  <span className="text-pink-600 font-semibold">Yalnızca E-Posta</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed pt-2">
                Online web sitemiz 7 gün 24 saat kesintisiz sipariş kabul etmektedir.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-gray-900">Sık Sorulan Sorular</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Kargonuz nerede, iade süreci nasıl işler ya da ödeme yöntemleri nelerdir merak ediyorsanız yardım merkezimize göz atabilirsiniz.
              </p>
              <a
                href="/faq"
                className="inline-block text-xs font-semibold text-pink-600 hover:text-pink-700 underline"
              >
                Sıkça Sorulan Soruları Gör →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
