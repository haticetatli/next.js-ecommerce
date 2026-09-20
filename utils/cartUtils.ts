import { CartProduct, Coupon } from "@/types";

export const FREE_SHIPPING_THRESHOLD = 500;
export const STANDARD_SHIPPING_FEE = 49.9;

export const AVAILABLE_COUPONS: Record<string, Coupon> = {
  TATLI10: {
    code: "TATLI10",
    discountPercent: 10,
    description: "%10 Hoş Geldin İndirimi",
  },
  TATLI20: {
    code: "TATLI20",
    discountPercent: 20,
    description: "%20 Sezon Sonu İndirimi",
  },
  KARGO: {
    code: "KARGO",
    freeShipping: true,
    description: "Ücretsiz Kargo Kampanyası",
  },
};

/**
 * Sepetteki ürünlerin brüt ara toplamını hesaplar.
 */
export function calculateCartSubtotal(items: CartProduct[]): number {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => {
    const qty = typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1;
    const price = typeof item.price === "number" && item.price >= 0 ? item.price : 0;
    return sum + price * qty;
  }, 0);
}

/**
 * Kargo ücretini hesaplar.
 * Subtotal 0 ise kargo 0'dır.
 * 500 TL üzeri veya kargo kuponu varsa kargo ücretsizdir (0 TL).
 */
export function calculateShippingFee(
  subtotal: number,
  coupon?: Coupon | null
): number {
  if (subtotal <= 0) return 0;
  if (coupon?.freeShipping) return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return STANDARD_SHIPPING_FEE;
}

/**
 * Kupon indirim tutarını hesaplar.
 */
export function calculateDiscountAmount(
  subtotal: number,
  coupon?: Coupon | null
): number {
  if (!coupon || subtotal <= 0) return 0;

  if (coupon.discountPercent) {
    const calculated = (subtotal * coupon.discountPercent) / 100;
    return Math.round(calculated * 100) / 100;
  }

  if (coupon.discountAmount) {
    return Math.min(coupon.discountAmount, subtotal);
  }

  return 0;
}

/**
 * Sepet genel toplamını hesaplar (Subtotal + Kargo - İndirim).
 */
export function calculateOrderTotal(
  subtotal: number,
  shippingFee: number,
  discount: number
): number {
  const total = subtotal + shippingFee - discount;
  return Math.max(0, Math.round(total * 100) / 100);
}

/**
 * Para birimini Türk Lirası formatında gösterir (örn: 1.250,00 ₺).
 */
export function formatCurrency(amount: number): string {
  if (typeof amount !== "number" || isNaN(amount)) return "0 ₺";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace("TRY", "₺");
}
