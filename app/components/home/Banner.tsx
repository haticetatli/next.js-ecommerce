'use client';

import Image from 'next/image';

type BannerProps = {
  src?: string;
  alt?: string;
};

const Banner = ({ src = '/banner.jpeg', alt = 'Özel Kampanyalar' }: BannerProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 my-4">
      <div className="relative w-full h-[200px] md:h-[280px] rounded-3xl overflow-hidden shadow-md bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 flex items-center">
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover mix-blend-overlay opacity-30"
            priority
          />
        )}
        <div className="relative z-10 px-6 md:px-12 text-white max-w-xl space-y-2 md:space-y-3">
          <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Yeni Sezon İndirimleri
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm">
            En Popüler Teknoloji & Moda Ürünleri
          </h1>
          <p className="text-white/90 text-xs md:text-sm font-medium">
            Seçili ürünlerde avantajlı fiyatlar ve hızlı kargo fırsatıyla alışverişe başla!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
