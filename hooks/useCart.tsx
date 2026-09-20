'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';

export type CardProductProps = {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image: string;
  inStock?: boolean;
};

type CartContextProps = {
  productCartQty: number;
  cartPrdcts: CardProductProps[];
  addToBasket: (product: CardProductProps) => void;
  addToBasketIncrease: (product: CardProductProps) => void;
  addToBasketDecrease: (product: CardProductProps) => void;
  removeFromCart: (product: CardProductProps) => void;
  removeCart: () => void;
};

export const CartContext = createContext<CartContextProps | null>(null);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[]>([]);
  const [productCartQty, setProductCartQty] = useState<number>(0);

  // İlk yüklemede localStorage'dan sepeti çek
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('cart');
      if (!raw) return;
      const parsed = JSON.parse(raw) as CardProductProps[];
      if (Array.isArray(parsed)) setCartPrdcts(parsed);
    } catch {
      // parse hatası sessiz geç
    }
  }, []);

  // Sepet değişince kaydet + toplam adet hesapla
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cart', JSON.stringify(cartPrdcts));

    const qty = cartPrdcts.reduce(
      (sum, p) => sum + (typeof p.quantity === 'number' ? p.quantity : 1),
      0
    );
    setProductCartQty(qty);
  }, [cartPrdcts]);

  // Ürünü sepete ekle
  const addToBasket = useCallback((product: CardProductProps) => {
    setCartPrdcts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: (copy[idx].quantity ?? 1) + (product.quantity ?? 1) };
        return copy;
      }
      return [...prev, { ...product, quantity: product.quantity ?? 1 }];
    });
    toast.success('Ürün sepete eklendi ✅');
  }, []);

  // 🔹 Maksimum 10 adet kontrolü
  const addToBasketIncrease = useCallback((product: CardProductProps) => {
    setCartPrdcts((prev) => {
      const updatedCart = [...prev];
      const idx = updatedCart.findIndex((p) => p.id === product.id);

      if (idx > -1) {
        if (updatedCart[idx].quantity >= 10) {
          toast.error('Daha fazla ekleyemezsiniz...');
          return prev;
        }
        updatedCart[idx] = {
          ...updatedCart[idx],
          quantity: updatedCart[idx].quantity + 1,
        };
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  // 🔹 Minimum 1 kontrolü (0 olursa ürün silinir)
  const addToBasketDecrease = useCallback((product: CardProductProps) => {
    setCartPrdcts((prev) => {
      const updatedCart = [...prev];
      const idx = updatedCart.findIndex((p) => p.id === product.id);

      if (idx > -1) {
        if (updatedCart[idx].quantity <= 1) {
          toast.error('Ürün sepetten çıkarıldı');
          return prev.filter((p) => p.id !== product.id);
        }
        updatedCart[idx] = {
          ...updatedCart[idx],
          quantity: updatedCart[idx].quantity - 1,
        };
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  // Ürünü tamamen sil
  const removeFromCart = useCallback((product: CardProductProps) => {
    setCartPrdcts((prev) => prev.filter((p) => p.id !== product.id));
    toast.success('Ürün sepetten silindi');
  }, []);

  // Sepeti temizle
  const removeCart = useCallback(() => {
    setCartPrdcts([]);
    toast.success('Sepet temizlendi');
  }, []);

  const value: CartContextProps = {
    productCartQty,
    cartPrdcts,
    addToBasket,
    addToBasketIncrease,
    addToBasketDecrease,
    removeFromCart,
    removeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => {
  const ctx = useContext(CartContext);
  if (ctx === null) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return ctx;
};

export default useCart;
