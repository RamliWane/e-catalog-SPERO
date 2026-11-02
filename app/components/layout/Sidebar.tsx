"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HouseIcon,
  LayoutGridIcon,
  Layers3Icon,
  Code2Icon,
  LightbulbIcon,
  UserRoundIcon,
  StarIcon,
  ZapIcon,
  BookmarkIcon,
  ArrowRightIcon,
  CubeIcon,
} from "@/lib/icons";

interface NavItem {
  name: string;
  href: string;
}

const PRIMARY_NAV: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
  { name: "Services", href: "/services" },
  { name: "Technologies", href: "/technologies" },
  { name: "Solutions", href: "/solutions" },
  { name: "About", href: "/about" },
];

const QUICK_ACCESS: NavItem[] = [
  { name: "Popular", href: "/catalog?filter=popular" },
  { name: "New Releases", href: "/catalog?filter=new" },
  { name: "Saved", href: "/saved" },
];

const ICONS: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  House: HouseIcon,
  LayoutGrid: LayoutGridIcon,
  Layers3: Layers3Icon,
  Code2: Code2Icon,
  Lightbulb: LightbulbIcon,
  UserRound: UserRoundIcon,
  Star: StarIcon,
  Zap: ZapIcon,
  Bookmark: BookmarkIcon,
};

const ICON_FOR_ITEM: Record<string, string> = {
  Home: "House",
  Catalog: "LayoutGrid",
  Services: "Layers3",
  Technologies: "Code2",
  Solutions: "Lightbulb",
  About: "UserRound",
  Popular: "Star",
  "New Releases": "Zap",
  Saved: "Bookmark",
};

function NavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const Icon = ICONS[ICON_FOR_ITEM[item.name]];
  const isActive = pathname === item.href;
  return (
    <Link
      href={item.href}
      className={`
        flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
        transition-colors duration-150
        ${isActive ? "bg-[#F0F3F7] text-slate-900" : "text-slate-600 hover:bg-slate-100"}
      `}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon size={14} />
      <span>{item.name}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-[230px] flex flex-col border-r border-slate-200 bg-white shrink-0">
      <div className="px-[28px] pt-[28px] pb-[32px]">
        <h2 className="text-[24px] font-semibold text-slate-900">Spero</h2>
      </div>

      <nav className="flex-1 px-5 space-y-2" aria-label="Primary navigation">
        {PRIMARY_NAV.map((item) => (
          <NavItem key={item.name} item={item} pathname={pathname} />
        ))}
      </nav>

      <div className="px-5">
        <div className="border-t border-slate-200 my-[20px]" />
        <h3 className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-3">
          Quick Access
        </h3>
        <nav className="space-y-2" aria-label="Quick access">
          {QUICK_ACCESS.map((item) => (
            <NavItem key={item.name} item={item} pathname={pathname} />
          ))}
        </nav>
      </div>

      <div className="mt-auto px-5 pb-[28px]">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="mb-4 flex items-center justify-center">
            <CubeIcon />
          </div>
          <h3 className="text-sm font-medium text-slate-900 mb-2">
            Need a custom solution?
          </h3>
          <p className="text-xs text-slate-500 mb-4">{`Let's build something together.`}</p>
          <button
            className="w-full bg-slate-900 text-white text-xs font-medium py-2 px-4 rounded-full flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Contact Us
            <ArrowRightIcon size={12} />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-4">
          {"\u00A9"} 2025 Spero. All rights reserved.
        </p>
      </div>
    </aside>
  );
}
