import { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular & Yardım | Tatli.com",
  description: "Tatli.com sipariş, kargo, ödeme, garanti ve iade süreçleriyle ilgili merak edilenler.",
};

export default function FaqPage() {
  return <FaqClient />;
}
