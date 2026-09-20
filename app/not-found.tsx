import Link from "next/link";
import { MdShoppingBag } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gray-50/40">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-sm space-y-6">
        <div className="w-20 h-20 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Sayfa Bulunamadı
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            Aradığınız sayfa taşınmış, silinmiş veya geçici olarak kullanım dışı kalmış olabilir.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs px-6 py-3 rounded-full transition shadow-sm"
          >
            <MdShoppingBag size={16} />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
