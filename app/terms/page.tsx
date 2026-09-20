import { Metadata } from "next";
import Link from "next/link";
import { MdGavel, MdArrowBack } from "react-icons/md";

export const metadata: Metadata = {
  title: "Kullanım Şartları | Tatli.com",
  description: "Tatli.com web sitesi ve e-ticaret platformu kullanım koşulları ve mesafeli satış şartları.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2.5">
              <MdGavel className="text-pink-600" />
              <span>Kullanım Şartları ve Koşulları</span>
            </h1>
            <p className="text-xs text-gray-500">Yürürlük Tarihi: 2026</p>
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
            <h2 className="text-base font-bold text-gray-900">1. Kabul Edilme ve Taraflar</h2>
            <p>
              Tatli.com web sitesini ziyaret eden veya alışveriş yapan her kullanıcı, bu Kullanım Şartlarını ve Mesafeli Satış Sözleşmesi hükümlerini peşinen kabul etmiş sayılır.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900">2. Ürün ve Fiyatlandırma</h2>
            <p>
              Sitede listelenen tüm ürün fiyatları Türk Lirası (₺) cinsindendir ve KDV dahildir. Tatli.com, yazım hatası veya sistem güncellemelerinden kaynaklanan bariz fiyat yanlışlıklarını düzeltme ve siparişi iptal etme hakkını saklı tutar.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900">3. Sipariş ve Teslimat</h2>
            <p>
              Siparişler, banka ödeme onayının alınmasını müteakip işleme alınır. Belirtilen teslimat süreleri tahmini olup kargo firmasının yoğunluk durumuna göre değişebilir.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900">4. Cayma Hakkı</h2>
            <p>
              Tüketici, 6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca malın tesliminden itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin cayma hakkına sahiptir.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900">5. Fikri Mülkiyet</h2>
            <p>
              Tatli.com platformundaki tüm logolar, tasarımlar, metinler ve görseller Tatli.com mülkiyetindedir; izinsiz kopyalanamaz ve ticari amaçla çoğaltılamaz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
