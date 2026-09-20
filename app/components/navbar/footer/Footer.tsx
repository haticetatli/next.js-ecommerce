import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"


const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-pink-50 to-rose-100 border-t border-pink-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ana İçerik */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Şirket Bilgileri */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Şirketimiz</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-pink-600">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-pink-600">Kariyer</a></li>
              <li><a href="#" className="hover:text-pink-600">Basın</a></li>
              <li><a href="#" className="hover:text-pink-600">İletişim</a></li>
            </ul>
          </div>

          {/* Ürünler */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Ürünler</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-pink-600">iPhone</a></li>
              <li><a href="#" className="hover:text-pink-600">MacBook</a></li>
              <li><a href="#" className="hover:text-pink-600">Apple Watch</a></li>
              <li><a href="#" className="hover:text-pink-600">Aksesuar</a></li>
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Müşteri Hizmetleri</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-pink-600">Destek</a></li>
              <li><a href="#" className="hover:text-pink-600">Kargo Takibi</a></li>
              <li><a href="#" className="hover:text-pink-600">İade & Değişim</a></li>
              <li><a href="#" className="hover:text-pink-600">Garanti</a></li>
            </ul>
          </div>

          {/* Bülten */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Bülten</h3>
            <p className="text-sm text-gray-600">Yeni ürünler ve özel fırsatlardan haberdar olun.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 border border-pink-200 rounded-md px-3 py-2 focus:border-pink-400 focus:ring focus:ring-pink-300"
              />
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md">
                Abone Ol
              </button>
            </div>
          </div>
        </div>

    
          
          {/* Sosyal Medya & Ödeme */}
<div className="py-6 border-t border-pink-200 flex flex-col md:flex-row justify-between items-center gap-4">
  <div className="flex items-center gap-4">
    <span className="text-sm text-gray-600">Bizi takip edin:</span>
    <div className="flex gap-3">
      <a
        href="#"
        className="w-8 h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-colors"
      >
        <FaFacebookF size={16} />
      </a>
      <a
        href="#"
        className="w-8 h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-colors"
      >
        <FaTwitter size={16} />
      </a>
      <a
        href="#"
        className="w-8 h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-colors"
      >
        <FaInstagram size={16} />
      </a>
    </div>
  </div>
</div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Güvenli ödeme:</span>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
              <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
              <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">TROY</div>
            </div>
          </div>
        </div>

        {/* Telif Hakkı */}
        <div className="py-4 border-t border-pink-200 text-center">
          <p className="text-sm text-gray-600">
            © 2025 TATLI.COM | KGM STAJ PROJESI | Tüm hakları saklıdır. |
            <a href="#" className="hover:text-pink-600 ml-1">Gizlilik Politikası</a> |
            <a href="#" className="hover:text-pink-600 ml-1">Kullanım Şartları</a>
          </p>
        </div>
    </footer>
  )
}

export default Footer
