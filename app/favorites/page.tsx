import { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Favorilerim | Tatli.com",
  description: "Tatli.com üzerinde beğendiğiniz ve kaydettiğiniz favori ürünler.",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
