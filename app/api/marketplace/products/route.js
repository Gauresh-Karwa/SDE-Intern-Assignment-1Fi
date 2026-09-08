import { NextResponse } from "next/server";
import { getAllProductsSummary } from "@/lib/mockData";

export async function GET() {
  await new Promise((r) => setTimeout(r, 500)); // simulate network latency
  try {
    const products = getAllProductsSummary();
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
