import Link from "next/link";
import ProductImage from "@/components/ui/ProductImage";

export default function ProductCard({ product }) {
  return (
    <Link href={`/shop/marketplace/${product.id}`}>
      <div className="card p-4 flex flex-col gap-3 active:scale-[0.98] transition h-full">
        <ProductImage name={product.name} src={product.image} className="aspect-square w-full" />
        <div>
          <span className="text-xs text-gray-400">{product.brand}</span>
          <h3 className="font-semibold text-gray-900 leading-tight">{product.name}</h3>
        </div>
        <div className="mt-auto">
          <p className="text-sm font-bold text-gray-900">
            ₹{product.startingPrice.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-brand-600 font-medium">0% interest EMI available</p>
        </div>
      </div>
    </Link>
  );
}
