import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { products as fallbackProducts } from "@/utils/Products";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const brand = formData.get("brand") as string;
    const category = formData.get("category") as string;
    const inStock = formData.get("inStock") === "true";

    const file = formData.get("image") as File | null;

    let imageBase64 = "";
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imageBase64 = buffer.toString("base64");
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        brand,
        category,
        inStock,
        image: imageBase64,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Ürün ekleme hatası:", error);
    return NextResponse.json({ error: "Ürün eklenemedi" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    if (products && products.length > 0) {
      return NextResponse.json(products);
    }
    // Veritabanı boş ise fallback verilerini dön
    return NextResponse.json(fallbackProducts);
  } catch (error) {
    console.warn("MongoDB bağlantısı kurulamadı, yerel ürünler gösteriliyor:", error);
    // Veritabanı kapalı veya erişilemez olduğunda sistemin çökmemesi için fallback listesi
    return NextResponse.json(fallbackProducts);
  }
}