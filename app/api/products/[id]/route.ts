import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

//Ürünü Düzenle
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // 
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
}


// Ürün Sil
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ burada await et

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Ürün silindi" });
}


//GET

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return new NextResponse('Ürün bulunamadı', { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return new NextResponse('Sunucu hatası', { status: 500 });
  }
}
