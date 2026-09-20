import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { products as fallbackProducts } from "@/utils/Products";

// Bellek içi geçici ürün deposu (MongoDB çevrimdışı olduğunda demo için)
const localMemoryProducts = [...fallbackProducts];

export async function POST(req: Request) {
  try {
    let name = "";
    let description = "";
    let price = 0;
    let brand = "";
    let category = "";
    let inStock = true;
    let image = "";

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = body.name;
      description = body.description;
      price = parseFloat(body.price);
      brand = body.brand;
      category = body.category;
      inStock = body.inStock !== false;
      image = body.image || "";
    } else {
      const formData = await req.formData();
      name = (formData.get("name") as string) || "";
      description = (formData.get("description") as string) || "";
      price = parseFloat((formData.get("price") as string) || "0");
      brand = (formData.get("brand") as string) || "";
      category = (formData.get("category") as string) || "";
      inStock = formData.get("inStock") === "true";

      const file = formData.get("image") as File | null;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        image = buffer.toString("base64");
      }
    }

    try {
      const product = await prisma.product.create({
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
      return NextResponse.json(product, { status: 201 });
    } catch (dbError) {
      console.warn("MongoDB yazma başarısız, belleğe ekleniyor:", dbError);
      const newLocalProduct = {
        id: `mock-${Date.now()}`,
        name,
        description,
        price,
        brand,
        category,
        inStock,
        image: image || "/placeholder.webp",
        reviews: [],
      };
      localMemoryProducts.unshift(newLocalProduct as unknown as (typeof fallbackProducts)[0]);
      return NextResponse.json(newLocalProduct, { status: 201 });
    }
  } catch (error) {
    console.error("Ürün ekleme hatası:", error);
    return NextResponse.json({ error: "Ürün eklenemedi" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
    if (products && products.length > 0) {
      return NextResponse.json(products);
    }
    return NextResponse.json(localMemoryProducts);
  } catch {
    console.warn("MongoDB bağlantısı kurulamadı, yerel ürünler gösteriliyor");
    return NextResponse.json(localMemoryProducts);
  }
}