"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { CartProduct, Coupon } from "@/types";
import {
  AVAILABLE_COUPONS,
  calculateCartSubtotal,
  calculateDiscountAmount,
  calculateOrderTotal,
  calculateShippingFee,
} from "@/utils/cartUtils";

export type CardProductProps = CartProduct;

interface CartContextProps {
  productCartQty: number;
  cartPrdcts: CartProduct[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  coupon: Coupon | null;
  isMounted: boolean;
  addToBasket: (product: CartProduct, quantity?: number) => void;
  addToBasketIncrease: (product: CartProduct) => void;
  addToBasketDecrease: (product: CartProduct) => void;
  removeFromCart: (product: CartProduct) => void;
  removeCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

export const CartContext = createContext<CartContextProps | null>(null);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartPrdcts, setCartPrdcts] = useState<CartProduct[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // 1. Client mount kontrolü ve localStorage yükleme
  useEffect(() => {
    setIsMounted(true);
    try {
      const rawCart = localStorage.getItem("cart");
      if (rawCart) {
        const parsed = JSON.parse(rawCart);
        if (Array.isArray(parsed)) setCartPrdcts(parsed);
      }

      const rawCoupon = localStorage.getItem("cart_coupon");
      if (rawCoupon) {
        const parsedCoupon = JSON.parse(rawCoupon);
        if (parsedCoupon && parsedCoupon.code) setCoupon(parsedCoupon);
      }
    } catch {
      // Hatalı JSON durumunda sessizce varsayılana dön
    }
  }, []);

  // 2. Sepet değiştikçe localStorage'a kaydet
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("cart", JSON.stringify(cartPrdcts));
    } catch (e) {
      console.error("Cart storage error:", e);
    }
  }, [cartPrdcts, isMounted]);

  // 3. Kupon değiştikçe localStorage'a kaydet
  useEffect(() => {
    if (!isMounted) return;
    try {
      if (coupon) {
        localStorage.setItem("cart_coupon", JSON.stringify(coupon));
      } else {
        localStorage.removeItem("cart_coupon");
      }
    } catch (e) {
      console.error("Coupon storage error:", e);
    }
  }, [coupon, isMounted]);

  // Hesaplamalar
  const productCartQty = useMemo(() => {
    return cartPrdcts.reduce(
      (sum, p) => sum + (typeof p.quantity === "number" ? p.quantity : 1),
      0
    );
  }, [cartPrdcts]);

  const subtotal = useMemo(() => {
    return calculateCartSubtotal(cartPrdcts);
  }, [cartPrdcts]);

  const shippingFee = useMemo(() => {
    return calculateShippingFee(subtotal, coupon);
  }, [subtotal, coupon]);

  const discount = useMemo(() => {
    return calculateDiscountAmount(subtotal, coupon);
  }, [subtotal, coupon]);

  const total = useMemo(() => {
    return calculateOrderTotal(subtotal, shippingFee, discount);
  }, [subtotal, shippingFee, discount]);

  // Sepete Ekle
  const addToBasket = useCallback((product: CartProduct, quantity: number = 1) => {
    setCartPrdcts((prev) => {
      const idx = prev.findIndex((p) => String(p.id) === String(product.id));
      const addQty = quantity > 0 ? quantity : 1;

      if (idx > -1) {
        const copy = [...prev];
        const newQty = Math.min(10, (copy[idx].quantity ?? 1) + addQty);
        copy[idx] = { ...copy[idx], quantity: newQty };
        return copy;
      }

      return [...prev, { ...product, quantity: Math.min(10, addQty) }];
    });
    toast.success(`${product.name} sepete eklendi 🛍️`);
  }, []);

  // Miktar Artır
  const addToBasketIncrease = useCallback((product: CartProduct) => {
    setCartPrdcts((prev) => {
      const idx = prev.findIndex((p) => String(p.id) === String(product.id));
      if (idx > -1) {
        if ((prev[idx].quantity ?? 1) >= 10) {
          toast.error("Maksimum 10 adet satın alabilirsiniz");
          return prev;
        }
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: (copy[idx].quantity ?? 1) + 1 };
        return copy;
      }
      return prev;
    });
  }, []);

  // Miktar Azalt
  const addToBasketDecrease = useCallback((product: CartProduct) => {
    setCartPrdcts((prev) => {
      const idx = prev.findIndex((p) => String(p.id) === String(product.id));
      if (idx > -1) {
        if ((prev[idx].quantity ?? 1) <= 1) {
          toast.success("Ürün sepetten çıkarıldı");
          return prev.filter((p) => String(p.id) !== String(product.id));
        }
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: (copy[idx].quantity ?? 1) - 1 };
        return copy;
      }
      return prev;
    });
  }, []);

  // Ürünü Sepetten Kaldır
  const removeFromCart = useCallback((product: CartProduct) => {
    setCartPrdcts((prev) => prev.filter((p) => String(p.id) !== String(product.id)));
    toast.success("Ürün sepetten silindi");
  }, []);

  // Sepeti Sıfırla
  const removeCart = useCallback(() => {
    setCartPrdcts([]);
    setCoupon(null);
    toast.success("Sepetiniz temizlendi");
  }, []);

  // Kupon Uygula
  const applyCoupon = useCallback((code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS[cleanCode];

    if (found) {
      setCoupon(found);
      toast.success(`${found.description} uygulandı! 🎉`);
      return true;
    } else {
      toast.error("Geçersiz kupon kodu. (Örn: TATLI10, KARGO)");
      return false;
    }
  }, []);

  // Kupon Kaldır
  const removeCoupon = useCallback(() => {
    setCoupon(null);
    toast.success("Kupon kaldırıldı");
  }, []);

  const value: CartContextProps = {
    productCartQty,
    cartPrdcts,
    subtotal,
    shippingFee,
    discount,
    total,
    coupon,
    isMounted,
    addToBasket,
    addToBasketIncrease,
    addToBasketDecrease,
    removeFromCart,
    removeCart,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => {
  const ctx = useContext(CartContext);
  if (ctx === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return ctx;
};

export default useCart;
