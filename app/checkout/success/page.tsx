import { Suspense } from "react";
import SuccessClient from "./SuccessClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sipariş Onaylandı | Tatli.com",
  description: "Siparişiniz başarıyla alındı.",
};

export default function OrderSuccessPage() {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-600" />
          </div>
        }
      >
        <SuccessClient />
      </Suspense>
    </div>
  );
}
