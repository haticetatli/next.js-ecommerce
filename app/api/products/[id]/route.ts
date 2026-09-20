import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { products as fallbackProducts } from "@/utils/Products";

// Ürünü Düzenle
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { name, description, price, brand, category, inStock, image } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        brand,
        category,
        inStock,
        image,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Ürün güncelleme hatası:", error);
    return NextResponse.json({ error: "Ürün güncellenemedi" }, { status: 500 });
  }
}

// Ürün Sil
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Ürün silindi" });
  } catch (error) {
    console.error("Ürün silme hatası:", error);
    return NextResponse.json({ error: "Ürün silinemedi" }, { status: 500 });
  }
}

// GET Tek Ürün
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });
      if (product) {
        return NextResponse.json(product);
      }
    } catch (dbError) {
      console.warn("MongoDB sorgulanamadı, fallback verisinden aranıyor:", dbError);
    }

    // Fallback listesinde ara
    const localProduct = fallbackProducts.find((p) => String(p.id) === String(id));
    if (localProduct) {
      return NextResponse.json(localProduct);
    }

    return new NextResponse("Ürün bulunamadı", { status: 404 });
  } catch (error) {
    console.error("Ürün getirme hatası:", error);
    return new NextResponse("Sunucu hatası", { status: 500 });
  }
}
