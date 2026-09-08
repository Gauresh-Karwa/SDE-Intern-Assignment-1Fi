"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, FileText, TrendingUp, User } from "lucide-react";

const TABS = [
  { label: "Home", Icon: Home, href: null },
  { label: "Shop", Icon: ShoppingBag, href: "/shop" },
  { label: "EMI Dues", Icon: FileText, href: null },
  { label: "Limit", Icon: TrendingUp, href: null },
  { label: "Profile", Icon: User, href: null },
];

export default function Nav() {
  const pathname = usePathname();

  const renderTab = (tab) => {
    const active = tab.href && pathname.startsWith(tab.href);
    const content = (
      <div className={`flex flex-col items-center gap-0.5 text-xs ${active ? "text-brand-600" : "text-gray-400"}`}>
        <tab.Icon size={20} strokeWidth={active ? 2.4 : 2} />
        <span className={active ? "font-semibold" : ""}>{tab.label}</span>
      </div>
    );
    if (!tab.href) {
      return (
        <div key={tab.label} className="opacity-50 cursor-not-allowed">
          {content}
        </div>
      );
    }
    return (
      <Link key={tab.label} href={tab.href}>
        {content}
      </Link>
    );
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex justify-between z-20">
        {TABS.map(renderTab)}
      </nav>
      <nav className="hidden md:flex sticky top-0 bg-white border-b border-gray-100 px-8 py-3 justify-between items-center z-20">
        <span className="font-bold text-brand-700 text-lg">1Fi</span>
        <div className="flex gap-8">{TABS.map(renderTab)}</div>
      </nav>
    </>
  );
}
