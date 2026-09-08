import { PackageOpen } from "lucide-react";

export default function EmptyState({ message = "Nothing to show here yet." }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 text-gray-400">
      <PackageOpen size={32} strokeWidth={1.5} className="mb-2" />
      <p>{message}</p>
    </div>
  );
}
