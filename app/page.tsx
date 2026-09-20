import { Suspense } from "react";
import Banner from "./components/home/Banner";
import Category from "./components/home/Category";
import Products from "./components/home/Products";
import Benefits from "./components/home/Benefits";

export default function Home() {
  return (
    <div className="bg-slate-50/40 min-h-screen">
      <Suspense fallback={<div className="h-16" />}>
        <Category />
      </Suspense>
      <Banner />
      <Benefits />
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-16 text-center text-gray-400">
            Ürünler yükleniyor...
          </div>
        }
      >
        <Products />
      </Suspense>
    </div>
  );
}
