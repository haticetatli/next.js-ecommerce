import DetailClient from "@/app/components/detail/DetailClient";
import prisma from "@/libs/prismadb";
import { products as fallbackProducts } from "@/utils/Products";
import { Product } from "@/types";

interface DetailPageProps {
  params: Promise<{ productId: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { productId } = await params;

  let product: Product | null = null;

  try {
    const dbProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    if (dbProduct) {
      product = {
        ...dbProduct,
        reviews: dbProduct.reviews.map((r) => ({
          ...r,
          createdDate: r.createdDate.toISOString(),
        })),
      };
    }
  } catch (err) {
    console.warn("MongoDB üzerinden ürün sorgulanamadı, fallback aranıyor:", err);
  }

  if (!product) {
    product = fallbackProducts.find((p) => String(p.id) === String(productId)) || null;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-24 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">Ürün Bulunamadı</h2>
        <p className="text-gray-500 mt-2">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
      </div>
    );
  }

  return <DetailClient product={product} />;
}
