import ProfileClient from "./ProfileClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hesabım & Siparişlerim | Tatli.com",
  description: "Kullanıcı profili ve sipariş geçmişi.",
};

export default function ProfilePage() {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      <ProfileClient />
    </div>
  );
}
