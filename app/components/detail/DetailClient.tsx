// DetailClient.tsx
'use client';

import Image from 'next/image';
import PageContainer from '../containers/PageContainer';
import { useState, useEffect, useMemo } from 'react';
import Counter from '../general/Counter';
import Button from '../general/Button';
import { Rating } from '@mui/material';
import Comment from './Comment';
import Heading from '../general/Heading';
import useCart from '@/hooks/useCart';

export type CardProductProps = {
  id: string;              // <- undefined değil, string olsun
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
};

const getValidImageSrc = (raw: any): string => {
  // 1) Dizi ise ilkini al
  let src = Array.isArray(raw) ? raw[0] : raw;

  // 2) Object ise yaygın alanları dene
  if (src && typeof src === 'object') {
    src = src.url ?? src.src ?? src.path ?? null;
  }

  // 3) String değilse placeholder
  if (typeof src !== 'string') return '/images/placeholder.webp';

  src = src.trim();

  // 4) Kabul edilen başlangıçlar
  const ok =
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('/') ||
    src.startsWith('data:') ||
    src.startsWith('blob:');

  if (ok) return src;

  // 5) Göreli yolu normalize et (ters slashları düzelt, başına / koy)
  src = src.replace(/\\/g, '/');
  if (!src.startsWith('/')) src = '/' + src;

  return src;
};

const DetailClient = ({ product }: { product: any }) => {
  const { addToBasket, cartPrdcts } = useCart();
  const [displayButton, setDisplayButton] = useState(false);

  // image src'yi güvenle hazırla
  const imageSrc = useMemo(() => getValidImageSrc(product?.image), [product?.image]);

  const [cardProduct, setCardProduct] = useState<CardProductProps>({
    id: String(product.id),
    name: product.name,
    description: product.description,
    price: Number(product.price),
    quantity: 1,
    image: imageSrc,
    inStock: Boolean(product.inStock),
  });

  useEffect(() => {
    const idx = cartPrdcts?.findIndex((c) => String(c.id) === String(product.id)) ?? -1;
    setDisplayButton(idx > -1);
  }, [cartPrdcts, product.id]);

  const increaseFunc = () => setCardProduct((p) => ({ ...p, quantity: Math.min(10, p.quantity + 1) }));
  const decreaseFunc = () => setCardProduct((p) => ({ ...p, quantity: Math.max(1, p.quantity - 1) }));

  const productRating =
    (product?.reviews?.reduce((acc: number, it: any) => acc + Number(it.rating || 0), 0) ?? 0) /
    Math.max(product?.reviews?.length || 1, 1);

  return (
    <div className="my-10">
      <PageContainer>
        <div className="block md:flex gap-10 justify-center">
          <div className="relative h-[200px] md:h-[400px] w-[200px] md:w-[400px] mb-3 md:mb-0">
            <Image
  src={
    product?.image?.startsWith("data:")
      ? product.image
      : `data:image/png;base64,${product?.image}`
  }
  fill
  alt={product?.name || 'Ürün görseli'}
  className="object-contain rounded bg-gray-100"
/>

          </div>

          <div className="w-full md:w-1/2 space-y-3">
            <div className="text-xl md:text-2xl font-semibold">{product?.name}</div>
            <Rating name="read-only" value={productRating} readOnly />
            <div className="text-slate-500">{product?.description}</div>

            <div>
              <span className="font-semibold">STOK DURUMU: </span>
              {product?.inStock ? (
                <span className="text-green-600">Ürün Stokta Mevcut</span>
              ) : (
                <span className="text-red-600">Ürün Stokta Bulunmamaktadır</span>
              )}
            </div>

            <div className="text-lg md:text-2xl text-red-500 font-bold">{product.price} ₺</div>

            {displayButton ? (
              <Button text="Ürün Sepete Eklendi" small outline onClick={() => {}} />
            ) : (
              <>
                <Counter increaseFunc={increaseFunc} decreaseFunc={decreaseFunc} cardProduct={cardProduct} />
                <Button text="Sepete Ekle" small onClick={() => addToBasket(cardProduct)} />
              </>
            )}
          </div>
        </div>

        <Heading text="Yorumlar" />
        {Array.isArray(product?.reviews) && product.reviews.length > 0 && (
          <div className="mt-6 space-y-3">
            {product.reviews.map((prd: any) => (
              <Comment key={prd.id} prd={prd} />
            ))}
          </div>
        )}
      </PageContainer>
    </div>
  );
};

export default DetailClient;
