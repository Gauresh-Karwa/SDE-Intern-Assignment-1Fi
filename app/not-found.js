import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="px-4 py-16 flex flex-col items-center text-center max-w-md mx-auto">
      <SearchX size={32} strokeWidth={1.5} className="mb-3 text-gray-400" />
      <h2 className="text-lg font-bold text-gray-900 mb-1">Page not found</h2>
      <p className="text-sm text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link href="/shop" className="pill-btn-solid">
        Back to Shop
      </Link>
    </div>
  );
}
