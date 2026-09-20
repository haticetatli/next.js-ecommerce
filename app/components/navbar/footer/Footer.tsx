import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-pink-50/70 via-rose-50/40 to-white border-t border-pink-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ana İçerik */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Şirket Bilgileri */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900">Şirketimiz</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-pink-600 transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-pink-600 transition-colors">
                  Kariyer
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-pink-600 transition-colors">
                  Kampanyalar & Fırsatlar
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-600 transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Ürünler */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900">Popüler Kategoriler</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/?category=Telefon" className="hover:text-pink-600 transition-colors">
                  iPhone & Telefonlar
                </Link>
              </li>
              <li>
                <Link href="/?category=Laptop" className="hover:text-pink-600 transition-colors">
                  MacBook & Bilgisayarlar
                </Link>
              </li>
              <li>
                <Link href="/?category=Saat" className="hover:text-pink-600 transition-colors">
                  Akıllı Saatler
                </Link>
              </li>
              <li>
                <Link href="/?category=Aksesuar" className="hover:text-pink-600 transition-colors">
                  Orijinal Aksesuarlar
                </Link>
              </li>
              <li>
                <Link href="/?category=Ayakkabı" className="hover:text-pink-600 transition-colors">
                  Spor & Ayakkabı
                </Link>
              </li>
              <li>
                <Link href="/?category=Çanta" className="hover:text-pink-600 transition-colors">
                  Sırt & Laptop Çantaları
                </Link>
              </li>
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900">Müşteri Hizmetleri</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/contact" className="hover:text-pink-600 transition-colors">
                  Canlı Destek
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-pink-600 transition-colors">
                  Kargo & Teslimat Takibi
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-pink-600 transition-colors">
                  Kolay İade & Değişim
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-pink-600 transition-colors">
                  Sıkça Sorulan Sorular & Garanti
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-pink-600 transition-colors">
                  Favorilerim
                </Link>
              </li>
            </ul>
          </div>

          {/* Bülten */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900">Bültene Abone Olun</h3>
            <p className="text-sm text-gray-600">En yeni fırsatlardan ilk siz haberdar olun.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
              />
              <button
                type="button"
                className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Abone Ol
              </button>
            </div>
          </div>
        </div>

        {/* Sosyal Medya & Ödeme Yöntemleri */}
        <div className="py-6 border-t border-pink-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">Bizi takip edin:</span>
            <div className="flex gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-transform hover:scale-105"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-transform hover:scale-105"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-transform hover:scale-105"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Güvenli Ödeme:</span>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-blue-700 rounded text-white text-[11px] flex items-center justify-center font-bold tracking-tight">
                VISA
              </div>
              <div className="w-10 h-6 bg-rose-600 rounded text-white text-[11px] flex items-center justify-center font-bold tracking-tight">
                MC
              </div>
              <div className="w-10 h-6 bg-cyan-700 rounded text-white text-[11px] flex items-center justify-center font-bold tracking-tight">
                TROY
              </div>
            </div>
          </div>
        </div>

        {/* Telif Hakkı */}
        <div className="py-5 border-t border-pink-100 text-center">
          <p className="text-xs text-gray-500">
            © 2026 Tatli.com | Tüm hakları saklıdır. ·{" "}
            <Link href="/privacy" className="hover:text-pink-600 transition-colors">
              Gizlilik Politikası
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="hover:text-pink-600 transition-colors">
              Kullanım Şartları
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
