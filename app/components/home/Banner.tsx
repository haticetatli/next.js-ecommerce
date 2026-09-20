'use client';

import Image from 'next/image';

type BannerProps = {
  src?: string;                 // opsiyonel: gelmezse placeholder gösterilir
  alt?: string;
};

const Banner = ({ src, alt = 'Banner' }: BannerProps) => {
  return (
    <div className="h-[237px] bg-white flex items-center justify-center">
      <div className="relative h-[137px] w-full">
        {src ? (
          <Image src={src} alt={alt} fill className="object-cover" priority />
        ) : (
          // src boşsa hata vermemesi için basit bir placeholder
          <div className="h-full w-full rounded-md bg-gray-100" />
        )}
      </div>
    </div>
  );
};

export default Banner;
