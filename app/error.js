"use client";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="px-4 py-16 flex flex-col items-center text-center max-w-md mx-auto">
      <AlertTriangle size={32} strokeWidth={1.5} className="mb-3 text-gray-400" />
      <h2 className="text-lg font-bold text-gray-900 mb-1">Something went wrong</h2>
      <p className="text-sm text-gray-500 mb-6">
        {error?.message || "An unexpected error occurred."}
      </p>
      <button onClick={reset} className="pill-btn-solid">
        Try again
      </button>
    </div>
  );
}
