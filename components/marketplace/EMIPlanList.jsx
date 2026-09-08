"use client";
import { useState } from "react";

export default function EMIPlanList({ plans, selectedMonths, onSelect }) {
  const [expanded, setExpanded] = useState(true);
  const cheapestMonthly = Math.min(...plans.map((p) => p.monthlyAmount));

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Starts at <span className="font-semibold text-gray-900">₹{cheapestMonthly.toLocaleString("en-IN")}/mo</span>
        </p>
        <button onClick={() => setExpanded((e) => !e)} className="text-sm font-semibold text-brand-600">
          {expanded ? "Hide plans" : "View plans"}
        </button>
      </div>

      {expanded && (
        <div className="flex flex-col mt-3 divide-y divide-gray-100">
          {plans.map((plan) => {
            const active = plan.months === selectedMonths;
            return (
              <button
                key={plan.months}
                onClick={() => onSelect(plan.months)}
                className={`w-full flex items-center justify-between py-3 px-2 rounded-lg ${
                  active ? "bg-brand-50" : ""
                }`}
              >
                <span className="text-sm text-gray-700">
                  {plan.months} months · {plan.ratePct}% p.a.
                </span>
                <span className={`text-sm font-semibold ${active ? "text-brand-700" : "text-gray-900"}`}>
                  ₹{plan.monthlyAmount.toLocaleString("en-IN")}/mo
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
