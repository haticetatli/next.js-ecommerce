import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
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
      image: imageBase64, // 
    },
  });

  return NextResponse.json(product);
}


export async function GET() {
  const products = await prisma.product.findMany(); //
  return NextResponse.json(products);
}