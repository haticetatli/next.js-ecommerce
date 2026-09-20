import { Metadata } from "next";
import Link from "next/link";
import {
  MdShoppingBag,
  MdShield,
  MdLocalShipping,
  MdSupportAgent,
  MdCheckCircle,
  MdWorkspacePremium,
} from "react-icons/md";

export const metadata: Metadata = {
  title: "Hakkımızda | Tatli.com",
  description: "Tatli.com e-ticaret platformunun vizyonu, misyonu ve kurumsal değerleri.",
};

export default function AboutPage() {
  const stats = [
    { label: "Mutlu Müşteri", value: "25.000+" },
    { label: "Orijinal Ürün", value: "5.000+" },
    { label: "Aynı Gün Kargo", value: "%98.5" },
    { label: "Müşteri Memnuniyeti", value: "%99.2" },
  ];

  const values = [
    {
      icon: MdWorkspacePremium,
      title: "%100 Orijinal Ürün Garantisi",
      desc: "Platformumuzdaki tüm ürünler doğrudan yetkili distribütörlerden ve üreticilerden temin edilir. Her ürün hologramlı ve orijinal ambalajında sevk edilir.",
    },
    {
      icon: MdLocalShipping,
      title: "Hızlı & Güvenli Lojistik",
      desc: "Saat 16:00'a kadar verilen tüm siparişler aynı gün kargoya teslim edilir. Özel darbe emici paketleme ve sigortalı taşımacılık sunuyoruz.",
    },
    {
      icon: MdShield,
      title: "256-Bit SSL & Şeffaflık",
      desc: "Ödeme süreçleriniz en üst seviye banka standartlarındaki SSL şifreleme ve 3D Secure ile korunur. Gizliliğiniz bizim için en öncelikli ilkedir.",
    },
    {
      icon: MdSupportAgent,
      title: "7/24 Kesintisiz Destek",
      desc: "Satış öncesi ve sonrası sorularınızda uzman müşteri destek ekibimiz canlı destek, e-posta ve çağrı merkezi üzerinden daima yanınızdadır.",
    },
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-16">
        {/* Hero Bölümü */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white p-8 md:p-16 shadow-xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
            <MdCheckCircle size={16} />
            <span>Türkiye&apos;nin Yeni Nesil E-Ticaret Deneyimi</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Alışverişi Güven, Hız ve Teknolojiyle Yeniden Tanımlıyoruz
          </h1>
          <p className="text-pink-100 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Tatli.com, modern tüketicinin ihtiyaç duyduğu en son teknoloji elektronik cihazları,
            aksesuarları ve yaşam tarzı ürünlerini şeffaf fiyatlandırma ve mükemmel müşteri hizmetiyle buluşturur.
          </p>
        </div>

        {/* Sayılarla Biz */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-500 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Hikayemiz & Misyonumuz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
              Hikayemiz
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Küçük Bir Fikirden Global Standartlara
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tatli.com, teknoloji tutkusu ve mühendislik disipliniyle kuruldu. İnternet alışverişinde yaşanan kafa karıştırıcı süreçleri ortadan kaldırmak, sadece gerçek stoktaki orijinal ürünleri en şeffaf koşullarla kullanıcılara sunmak için yola çıktık.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Bugün akıllı telefonlardan en güçlü dizüstü bilgisayarlara, giyilebilir teknolojiden seçkin aksesuarlara kadar binlerce ürünü aynı gün kargo avantajıyla kapınıza kadar ulaştırıyoruz.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-white border border-pink-100 rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Misyon & Vizyon</h3>
            <ul className="space-y-3 text-xs md:text-sm text-gray-600">
              <li className="flex items-start gap-2.5">
                <MdCheckCircle size={18} className="text-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong>Sıfır Mağduriyet:</strong> 14 gün koşulsuz kolay iade ve birebir değişim imkanı.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MdCheckCircle size={18} className="text-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong>Yüksek Performans:</strong> Modern web mimarisiyle saniyeler içinde tamamlanan sipariş deneyimi.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MdCheckCircle size={18} className="text-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong>Dürüst Fiyatlandırma:</strong> Gizli kargo masrafı veya sürpriz ücret olmadan net alışveriş.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Değerlerimiz */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Bizi Farklı Kılan Değerlerimiz
            </h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">
              Her adımda müşteri memnuniyetini odağımıza alarak standartların ötesinde bir hizmet sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900">{v.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Aksiyon Çağrısı */}
        <div className="text-center bg-white border border-pink-100 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            Aramıza Katılmaya Hazır Mısınız?
          </h3>
          <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto">
            Geniş ürün kataloğumuzu keşfedin, avantajlı kuponları kullanarak ayrıcalıklı alışverişe başlayın.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs px-6 py-3 rounded-full transition shadow-sm"
            >
              <MdShoppingBag size={16} />
              <span>Ürünleri Keşfet</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
