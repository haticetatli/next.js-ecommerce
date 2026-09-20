"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MdHelpOutline,
  MdKeyboardArrowDown,
  MdSearch,
  MdChat,
} from "react-icons/md";

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      q: "Siparişim ne zaman kargoya verilir?",
      a: "Hafta içi saat 16:00'a kadar verdiğiniz tüm siparişler aynı gün içerisinde Yurtiçi Kargo'ya teslim edilir. Hafta sonu verilen siparişler ise Pazartesi günü ilk iş saatlerinde kargoya verilir.",
      cat: "Sipariş & Teslimat",
    },
    {
      q: "Kargo ücreti ne kadar?",
      a: "Sepet tutarınız 500 ₺ ve üzerinde olduğunda tüm Türkiye geneline kargo tamamen ÜCRETSİZDİR. 500 ₺ altındaki siparişlerde standart kargo ücreti 49,90 ₺'dir. Ayrıca sepetinizde 'KARGO' kupon kodunu kullanarak alt limitsiz ücretsiz kargo hakkı elde edebilirsiniz.",
      cat: "Sipariş & Teslimat",
    },
    {
      q: "Ürünler orijinal ve Türkiye garantili mi?",
      a: "Evet, Tatli.com bünyesinde satılan tüm ürünler %100 orijinal olup, Türkiye resmi distribütör garantilidir. Apple, Samsung, Sony vb. tüm markalar 2 yıl resmi üretici garantisi kapsamındadır.",
      cat: "Ürün & Garanti",
    },
    {
      q: "İade sürecini nasıl başlatabilirim?",
      a: "Ürünü teslim aldığınız tarihten itibaren 14 gün içinde hiçbir mazeret belirtmeksizin iade edebilirsiniz. 'Profilim > Siparişlerim' veya 'Kolay İade' sayfasından Yurtiçi Kargo ücretsiz iade kodunuzu alıp şubeye teslim etmeniz yeterlidir.",
      cat: "İade & Değişim",
    },
    {
      q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
      a: "Tüm yerli ve yabancı Visa, MasterCard, Troy kredi ve banka kartlarıyla 256-bit SSL ve 3D Secure güvencesiyle tek çekim ya da 12 aya varan taksit seçenekleriyle ödeme yapabilirsiniz.",
      cat: "Ödeme & Güvenlik",
    },
    {
      q: "Siparişimi iptal edebilir miyim?",
      a: "Siparişiniz kargoya verilmeden önce Hesabım panelinden tek tıkla iptal edilebilir. Ücretiniz anında kredi kartınıza iade edilir.",
      cat: "Sipariş & Teslimat",
    },
    {
      q: "İndirim kuponumu nasıl kullanırım?",
      a: "Sepetim sayfasına gittiğinizde sağ tarafta yer alan 'İndirim Kuponu' alanına 'TATLI10' veya 'TATLI20' kodunu yazarak 'Uygula' butonuna basmanız yeterlidir.",
      cat: "Ödeme & Güvenlik",
    },
  ];

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-10">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto">
            <MdHelpOutline size={26} />
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto">
            Alışveriş, teslimat ve garanti süreçlerinizle ilgili en çok merak edilen soruların yanıtlarını derledik.
          </p>
        </div>

        {/* Arama */}
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sorunuzu arayın (örn: kargo, iade, taksit)..."
            className="w-full py-3 pl-10 pr-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-800 outline-none focus:border-pink-500 shadow-sm transition"
          />
          <MdSearch className="absolute left-3.5 top-3.5 text-gray-400 text-lg" />
        </div>

        {/* Akordeon Listesi */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-xs text-gray-500">
              Aramanızla eşleşen soru bulunamadı. Lütfen canlı destek hattımıza başvurun.
            </div>
          ) : (
            filtered.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-pink-50/20 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full hidden sm:inline-block">
                        {faq.cat}
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-gray-900">
                        {faq.q}
                      </span>
                    </div>

                    <MdKeyboardArrowDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-pink-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Canlı Destek Kutusu */}
        <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-white border border-pink-100 rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            Cevabını bulamadığınız bir sorunuz mu var?
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Müşteri destek ekibimiz haftanın her günü sorularınızı yanıtlamaktan mutluluk duyar.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition shadow-sm"
            >
              <MdChat size={16} />
              <span>Bize Ulaşın</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
