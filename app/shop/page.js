import ShopOptionCard from "@/components/shop/ShopOptionCard";
import { Tag, MapPin, ShoppingCart } from "lucide-react";

export default function ShopPage() {
  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Shop</h1>
      <p className="text-sm text-gray-500 mb-6">Browse brands, nearby stores, and the 1Fi Marketplace.</p>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <ShopOptionCard href="/shop/top-brands" Icon={Tag} label="Top Brands" />
        <ShopOptionCard href="/shop/nearby-stores" Icon={MapPin} label="Nearby Stores" />
        <ShopOptionCard href="/shop/marketplace" Icon={ShoppingCart} label="1Fi Marketplace" />
      </div>
    </div>
  );
}
