import { Metadata } from "next";
import Link from "next/link";
import { MdSecurity, MdArrowBack } from "react-icons/md";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Tatli.com",
  description: "Tatli.com kişisel verilerin korunması ve gizlilik politikası metni.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2.5">
              <MdSecurity className="text-pink-600" />
              <span>Gizlilik ve Çerez Politikası</span>
            </h1>
            <p className="text-xs text-gray-500">Son Güncelleme: 2026</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 hover:text-pink-700"
          >
            <MdArrowBack size={16} />
            <span>Ana Sayfa</span>
          </Link>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900">1. Genel Bilgilendirme ve Kapsam</h2>
            <p>
              Tatli.com (&quot;Platform&quot;), 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve ilgili mevzuat uyarınca kullanıcılarının kişisel verilerinin gizliliğini ve güvenliğini en yüksek seviyede sağlamayı taahhüt eder.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900">2. Toplanan Kişisel Veriler</h2>
            <p>
              Sipariş oluşturma, üyelik ve iletişim süreçlerinde adınız, soyadınız, teslimat adresiniz, telefon numaranız, e-posta adresiniz ve fatura bilgileriniz toplanır. Kredi kartı ve ödeme bilgileriniz doğrudan banka altyapısına iletilir; sunucularımızda kesinlikle saklanmaz.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900">3. Verilerin Kullanım Amacı</h2>
            <p>
              Toplanan veriler yalnızca siparişlerin hazırlanması, kargo teslimatının sağlanması, fatura düzenlenmesi, satış sonrası destek ve yasal yükümlülüklerin ifası amacıyla işlenmektedir.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900">4. Çerezler (Cookies)</h2>
            <p>
              Platformumuzda sepetinizin hatırlanması, oturum güvenliğinin sağlanması ve kullanıcı deneyiminin iyileştirilmesi amacıyla zorunlu ve analitik çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan dilediğiniz zaman çerez tercihlerinizi değiştirebilirsiniz.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900">5. Veri Güvenliği ve SSL</h2>
            <p>
              Web sitemiz 256-Bit SSL şifreleme sertifikası ile korunmaktadır. Veri transferleri şifreli tüneller üzerinden gerçekleştirilir ve üçüncü tarafların erişimine kapalıdır.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
