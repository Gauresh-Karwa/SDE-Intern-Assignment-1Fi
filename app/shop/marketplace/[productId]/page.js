"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProduct } from "@/lib/api";
import VariantSelector from "@/components/marketplace/VariantSelector";
import EMIPlanList from "@/components/marketplace/EMIPlanList";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import Button from "@/components/ui/Button";
import ProductImage from "@/components/ui/ProductImage";
import { calculateEmi } from "@/lib/emiCalculator";
import { Share2, Pencil, Store } from "lucide-react";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const router = useRouter();

  const [state, setState] = useState({ status: "loading", product: null });
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState(null);
  const [amountInput, setAmountInput] = useState("");
  const [editingAmount, setEditingAmount] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const load = () => {
    setState({ status: "loading", product: null });
    setConfirmed(false);
    fetchProduct(productId)
      .then((product) => {
        setState({ status: "success", product });
        const firstVariant = product.variants[0];
        setSelectedVariantId(firstVariant?.id ?? null);
        setSelectedMonths(firstVariant?.emiPlans[0]?.months ?? null);
        setAmountInput(firstVariant ? String(firstVariant.price) : "");
      })
      .catch((err) => setState({ status: "error", error: err.message }));
  };

  useEffect(load, [productId]);

  if (state.status === "loading") {
    return (
      <div className="px-4 md:px-8 py-6 flex flex-col gap-4 max-w-2xl mx-auto">
        <Skeleton className="h-64" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (state.status === "error") {
    return <ErrorState message={state.error} onRetry={load} />;
  }

  const { product } = state;
  const variant = product.variants.find((v) => v.id === selectedVariantId);

  const parsedAmount = Number(amountInput);
  const principal =
    Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : variant?.price ?? 0;

  const plans =
    variant?.emiPlans.map((p) => ({
      ...p,
      monthlyAmount: calculateEmi(principal, p.ratePct, p.months),
    })) ?? [];

  const selectedPlan = plans.find((p) => p.months === selectedMonths);
  const amountExceedsPrice = variant ? principal > variant.price : false;

  const handleVariantSelect = (id) => {
    setSelectedVariantId(id);
    const v = product.variants.find((x) => x.id === id);
    setSelectedMonths(v.emiPlans[0]?.months ?? null);
    setAmountInput(String(v.price));
    setEditingAmount(false);
    setConfirmed(false);
  };

  return (
    <div className="px-4 md:px-8 py-6 max-w-2xl mx-auto">
      <button onClick={() => router.back()} className="text-sm text-gray-500 mb-4">
        ← Pay using 1Fi
      </button>

      <div className="card p-6 flex items-center justify-center mb-4">
        <ProductImage name={product.name} src={product.image} className="h-40 w-40" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="inline-block text-xs bg-gray-100 rounded-full px-2 py-0.5 mb-1">{product.brand}</span>
          <h1 className="text-lg font-bold text-gray-900">{product.name}</h1>
        </div>
        <button
          aria-label="Share this product"
          className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center text-brand-600"
        >
          <Share2 size={16} strokeWidth={2} />
        </button>
      </div>

      <VariantSelector variants={product.variants} selectedId={selectedVariantId} onSelect={handleVariantSelect} />

      {variant && (
        <div className="card p-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Suggested amount</p>
            {!editingAmount && (
              <button className="text-xs font-semibold text-brand-600" onClick={() => setEditingAmount(true)}>
                Edit if paying different amount
              </button>
            )}
          </div>

          {editingAmount ? (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-400">₹</span>
              <input
                type="number"
                value={amountInput}
                min={1}
                max={variant.price}
                onChange={(e) => setAmountInput(e.target.value)}
                className="text-2xl font-bold text-gray-900 border-b border-brand-300 focus:outline-none focus:border-brand-600 w-40 bg-transparent"
                autoFocus
              />
              <button className="text-xs font-semibold text-brand-600 ml-auto" onClick={() => setEditingAmount(false)}>
                Done
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-gray-900">₹{principal.toLocaleString("en-IN")}</p>
              <button onClick={() => setEditingAmount(true)} aria-label="Edit amount" className="text-gray-400">
                <Pencil size={14} strokeWidth={2} />
              </button>
            </div>
          )}

          {amountExceedsPrice && (
            <p className="text-xs text-red-500 mt-1">
              Amount can't exceed the product price of ₹{variant.price.toLocaleString("en-IN")}.
            </p>
          )}

          <EMIPlanList plans={plans} selectedMonths={selectedMonths} onSelect={setSelectedMonths} />
        </div>
      )}

      {product.merchant && (
        <div className="card p-4 mt-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Paying to</p>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
              <Store size={12} strokeWidth={2} />
            </span>
            <span className="text-sm font-semibold text-gray-900">{product.merchant}</span>
          </div>
        </div>
      )}

      <div className="mt-6 mb-4">
        <Button
          variant="solid"
          className="w-full"
          onClick={() => setConfirmed(true)}
          disabled={!selectedPlan || amountExceedsPrice || principal <= 0}
        >
          Proceed with this plan
        </Button>
      </div>

      {confirmed && selectedPlan && (
        <div className="card p-4 border border-brand-200 bg-brand-50 text-sm text-gray-800">
          You're proceeding with <strong>{variant.label}</strong> at{" "}
          <strong>₹{selectedPlan.monthlyAmount.toLocaleString("en-IN")}/mo</strong> for {selectedPlan.months} months.
        </div>
      )}
    </div>
  );
}
