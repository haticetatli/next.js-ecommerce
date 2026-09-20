import CheckoutClient from "./CheckoutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Güvenli Ödeme | Tatli.com",
  description: "Siparişinizi tamamlayın ve güvenli ödeme yapın.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      <CheckoutClient />
    </div>
  );
}
