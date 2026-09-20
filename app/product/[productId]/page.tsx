import DetailClient from "@/app/components/detail/DetailClient";
interface DetailPageProps {
  params: { productId: string };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const res = await fetch(`http://localhost:3000/api/products/${params.productId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div>Ürün bulunamadı.</div>;
  }

  const product = await res.json();

  return <DetailClient product={product} />;
}
