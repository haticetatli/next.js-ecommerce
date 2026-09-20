import { describe, it, expect } from "vitest";
import {
  calculateCartSubtotal,
  calculateShippingFee,
  calculateDiscountAmount,
  calculateOrderTotal,
  formatCurrency,
  AVAILABLE_COUPONS,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from "../utils/cartUtils";
import { CartProduct } from "../types";

describe("cartUtils", () => {
  const mockItems: CartProduct[] = [
    {
      id: "1",
      name: "iPhone 16",
      price: 50000,
      quantity: 1,
      image: "/img1.jpg",
    },
    {
      id: "2",
      name: "AirPods Pro",
      price: 8000,
      quantity: 2,
      image: "/img2.jpg",
    },
  ];

  it("calculates correct cart subtotal", () => {
    const subtotal = calculateCartSubtotal(mockItems);
    expect(subtotal).toBe(50000 + 8000 * 2); // 66000
  });

  it("returns 0 subtotal for empty cart", () => {
    expect(calculateCartSubtotal([])).toBe(0);
  });

  it("calculates free shipping when subtotal exceeds threshold", () => {
    const shipping = calculateShippingFee(FREE_SHIPPING_THRESHOLD + 100);
    expect(shipping).toBe(0);
  });

  it("applies standard shipping fee when subtotal is below threshold", () => {
    const shipping = calculateShippingFee(300);
    expect(shipping).toBe(STANDARD_SHIPPING_FEE);
  });

  it("applies free shipping when freeShipping coupon is provided", () => {
    const shipping = calculateShippingFee(150, AVAILABLE_COUPONS.KARGO);
    expect(shipping).toBe(0);
  });

  it("calculates percent discount correctly", () => {
    const discount = calculateDiscountAmount(1000, AVAILABLE_COUPONS.TATLI10);
    expect(discount).toBe(100);
  });

  it("calculates order total correctly (subtotal + shipping - discount)", () => {
    const total = calculateOrderTotal(1000, 0, 100);
    expect(total).toBe(900);
  });

  it("formats currency in Turkish Lira style", () => {
    const formatted = formatCurrency(1250);
    expect(formatted).toContain("1.250");
    expect(formatted).toContain("₺");
  });
});
