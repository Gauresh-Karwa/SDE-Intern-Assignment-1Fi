"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import ProductGrid from "@/components/marketplace/ProductGrid";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

export default function MarketplacePage() {
  const [state, setState] = useState({ status: "loading", products: [] });

  const load = () => {
    setState({ status: "loading", products: [] });
    fetchProducts()
      .then((products) => setState({ status: "success", products }))
      .catch((err) => setState({ status: "error", error: err.message }));
  };

  useEffect(load, []);

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-1">1Fi Marketplace</h1>
      <p className="text-sm text-gray-500 mb-6">Shop now, pay later with 0% interest EMI.</p>

      {state.status === "loading" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      )}

      {state.status === "error" && <ErrorState message={state.error} onRetry={load} />}

      {state.status === "success" && state.products.length === 0 && (
        <EmptyState message="No products available right now." />
      )}

      {state.status === "success" && state.products.length > 0 && <ProductGrid products={state.products} />}
    </div>
  );
}
