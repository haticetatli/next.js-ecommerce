import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  MdLocalOffer,
  MdFlashOn,
  MdPercent,
} from "react-icons/md";

export const metadata: Metadata = {
  title: "Kampanyalar & Fırsatlar | Tatli.com",
  description: "Tatli.com indirim kuponları, flaş fırsatlar ve sezon indirimleri.",
};

export default function DealsPage() {
  const coupons = [
    {
      code: "TATLI10",
      discount: "%10 İNDİRİM",
      title: "Tüm Ürünlerde Geçerli",
      desc: "Sepetinizdeki tüm teknoloji ve yaşam tarzı ürünlerinde geçerli %10 anında sepet indirimi.",
      minSpend: "Alt limitsiz",
      badge: "Popüler",
      color: "from-pink-500 to-rose-600",
    },
    {
      code: "TATLI20",
      discount: "%20 İNDİRİM",
      title: "Büyük Alışveriş Fırsatı",
      desc: "1.000 ₺ ve üzeri tüm alışverişlerinizde %20 doğrudan indirim sağlar.",
      minSpend: "1.000 ₺ üzeri",
      badge: "Süper Fırsat",
      color: "from-purple-600 to-indigo-600",
    },
    {
      code: "KARGO",
      discount: "BEDAVA KARGO",
      title: "Ücretsiz Standart Teslimat",
      desc: "Sepet tutarı ne olursa olsun 49,90 ₺ standart kargo ücretini tamamen sıfırlar.",
      minSpend: "Alt limitsiz",
      badge: "Kargo Bedava",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const campaigns = [
    {
      title: "Yeni Nesil Laptoplarda Fırsat Günleri",
      category: "Laptop",
      discount: "2.500 ₺'ye Varan İndirim",
      desc: "Apple M4, ASUS ROG ve Dell XPS modellerinde peşin fiyatına 6 taksit avantajı.",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Akıllı Saat & Giyilebilir Teknoloji",
      category: "Saat",
      discount: "%15 Ek İndirim",
      desc: "Apple Watch, Galaxy Watch ve Garmin serilerinde spor severlere özel fırsatlar.",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Sokak Modası Sneaker Koleksiyonu",
      category: "Ayakkabı",
      discount: "Sezon Sonu İndirimi",
      desc: "Air Jordan, New Balance 9060 ve Ultraboost modellerinde sınırlı stok avantajı.",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-14">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white p-8 md:p-14 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
              <MdFlashOn size={16} />
              <span>Günün Fırsatları & İndirim Kuponları</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Ayrıcalıklı İndirimleri Yakalayın
            </h1>
            <p className="text-pink-100 text-xs md:text-sm leading-relaxed">
              Tatli.com&apos;a özel tanımlanmış kupon kodlarını kopyalayın, sepet sayfasında anında indirim kazanın!
            </p>
          </div>
        </div>

        {/* Aktif Kuponlar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                <MdLocalOffer className="text-pink-600" />
                <span>Aktif İndirim Kuponları</span>
              </h2>
              <p className="text-xs text-gray-500">
                Aşağıdaki kuponları sepet sayfasındaki kupon kutusuna yazarak hemen kullanabilirsiniz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coupons.map((c, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-pink-50 text-pink-700">
                      {c.badge}
                    </span>
                    <span className="text-[11px] text-gray-400">{c.minSpend}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-black text-gray-900">
                      {c.discount}
                    </div>
                    <h3 className="font-bold text-sm text-gray-800">{c.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="bg-gray-100 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-gray-800 tracking-wider">
                    {c.code}
                  </div>
                  <Link
                    href={`/cart`}
                    className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1"
                  >
                    <span>Sepete Uygula</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Özel Kampanyalı Koleksiyonlar */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <MdPercent className="text-pink-600" />
              <span>Öne Çıkan Kampanyalar</span>
            </h2>
            <p className="text-xs text-gray-500">
              Kategorilere özel kaçırılmayacak indirimler ve avantajlı teklifler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((camp, idx) => (
              <Link
                key={idx}
                href={`/?category=${encodeURIComponent(camp.category)}`}
                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden relative">
                  <Image
                    src={camp.image}
                    alt={camp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-pink-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm z-10">
                    {camp.discount}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase text-pink-600 tracking-wider">
                    {camp.category}
                  </span>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-pink-600 transition">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {camp.desc}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-pink-600 flex items-center gap-1">
                    <span>Fırsatları İncele</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
