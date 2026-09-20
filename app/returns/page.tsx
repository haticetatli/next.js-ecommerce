import { Metadata } from "next";
import Link from "next/link";
import {
  MdAutorenew,
  MdHelpOutline,
  MdArrowBack,
} from "react-icons/md";

export const metadata: Metadata = {
  title: "Kolay İade & Değişim | Tatli.com",
  description: "Tatli.com 14 gün koşulsuz kolay iade ve değişim politikası.",
};

export default function ReturnsPage() {
  const steps = [
    {
      num: "01",
      title: "İade Talebi Oluşturun",
      desc: "Hesabım > Siparişlerim sayfasından iade etmek istediğiniz ürünü seçip tek tıkla talep oluşturun.",
    },
    {
      num: "02",
      title: "Ücretsiz Kargo Kodu Alın",
      desc: "Talebiniz sonrasında SMS ve e-posta ile size özel Yurtiçi Kargo ücretsiz iade gönderi kodu iletilecektir.",
    },
    {
      num: "03",
      title: "Paketinizi Teslim Edin",
      desc: "Ürünü orijinal kutusu ve tüm aksesuarlarıyla birlikte paketleyerek en yakın kargo şubesine teslim edin.",
    },
    {
      num: "04",
      title: "Hızlı Para İadesi",
      desc: "Ürün depomuza ulaştığı gün incelenir ve ücret iadesi bankanıza bağlı olarak 1-3 iş günü içinde kartınıza yansıtılır.",
    },
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-12">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto">
            <MdAutorenew size={26} />
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
            14 Gün Koşulsuz Kolay İade & Değişim
          </h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">
            Tatli.com&apos;dan aldığınız tüm ürünleri, teslim aldığınız tarihten itibaren 14 gün içinde hiçbir gerekçe belirtmeksizin ücretsiz iade edebilirsiniz.
          </p>
        </div>

        {/* 4 Adımda İade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-3 relative overflow-hidden"
            >
              <div className="text-3xl font-black text-pink-100 absolute top-4 right-4">
                {s.num}
              </div>
              <div className="w-8 h-8 rounded-full bg-pink-600 text-white font-bold text-xs flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="font-bold text-sm text-gray-900">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* İade Şartları */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <h2 className="text-base md:text-lg font-bold text-gray-900">
            Önemli İade Koşulları
          </h2>
          <ul className="space-y-3 text-xs md:text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Ürünün faturası, orijinal ambalajı ve koruyucu bantları zarar görmemiş olmalıdır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Kutu içerisindeki kablo, adaptör, kullanım kılavuzu ve hediye ürünler eksiksiz gönderilmelidir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Hijyen gereği kulak içi kulaklıklarda koruma bandı açılmamış olmalıdır.</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs px-6 py-3 rounded-full transition shadow-sm"
          >
            <MdArrowBack size={16} />
            <span>Alışverişe Başla</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-xs px-6 py-3 rounded-full transition shadow-sm"
          >
            <MdHelpOutline size={16} />
            <span>Destek Ekibine Ulaş</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
