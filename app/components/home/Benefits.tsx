import {
  MdLocalShipping,
  MdShield,
  MdAutorenew,
  MdHeadsetMic,
} from "react-icons/md";

const benefits = [
  {
    icon: MdLocalShipping,
    title: "Ücretsiz Kargo",
    desc: "500 ₺ üzeri tüm siparişlerde",
  },
  {
    icon: MdShield,
    title: "Güvenli Ödeme",
    desc: "256-Bit SSL sertifikalı altyapı",
  },
  {
    icon: MdAutorenew,
    title: "Kolay İade Garantisi",
    desc: "14 gün içinde koşulsuz iade",
  },
  {
    icon: MdHeadsetMic,
    title: "7/24 Canlı Destek",
    desc: "Müşteri temsilcilerimiz hazır",
  },
];

const Benefits = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                <Icon size={22} />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-gray-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] md:text-xs text-gray-500 mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Benefits;
