import { Metadata } from "next";
import TrackingClient from "./TrackingClient";

export const metadata: Metadata = {
  title: "Kargo & Sipariş Takibi | Tatli.com",
  description: "Tatli.com üzerinden verdiğiniz siparişlerin anlık kargo takip durumu.",
};

export default function TrackingPage() {
  return <TrackingClient />;
}
