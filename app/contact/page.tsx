import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "İletişim | Tatli.com",
  description: "Tatli.com müşteri hizmetleri, telefon, adres ve iletişim formu.",
};

export default function ContactPage() {
  return <ContactClient />;
}
