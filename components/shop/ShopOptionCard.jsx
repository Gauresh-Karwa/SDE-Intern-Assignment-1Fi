import Link from "next/link";

export default function ShopOptionCard({ href, Icon, label, disabled = false }) {
  const body = (
    <div className={`card flex flex-col items-center justify-center gap-2 py-6 ${disabled ? "opacity-60" : "active:scale-[0.98]"} transition`}>
      <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
        <Icon size={22} strokeWidth={2} />
      </div>
      <span className="text-sm font-semibold text-gray-800 text-center px-2">{label}</span>
    </div>
  );
  if (disabled) return body;
  return <Link href={href}>{body}</Link>;
}
