import { NextResponse } from "next/server";
import { getProductById } from "@/lib/mockData";
import { buildEmiPlans } from "@/lib/emiCalculator";

export async function GET(_req, { params }) {
  await new Promise((r) => setTimeout(r, 500));
  const product = getProductById(params.productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  const variants = product.variants.map((v) => ({
    ...v,
    emiPlans: buildEmiPlans(v.price, product.emiRates),
  }));
  return NextResponse.json({
    id: product.id,
    brand: product.brand,
    name: product.name,
    image: product.image,
    merchant: product.merchant,
    variants,
  });
}
